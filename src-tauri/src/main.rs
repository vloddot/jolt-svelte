#![warn(clippy::all, clippy::pedantic, clippy::style, clippy::nursery)]
#![allow(clippy::used_underscore_binding)]
// Prevents additional console window on Windows in release, DO NOT REMOVE!!
#![cfg_attr(not(debug_assertions), windows_subsystem = "windows")]

use std::ops::Deref;

use futures_util::{SinkExt, StreamExt};

use serde::{Deserialize, Serialize};
use tauri::Manager;

use reywen::{
    client::methods::message::{DataMessageSend, DataQueryMessages},
    structures::{
        authentication::{
            login::{DataLogin, ResponseLogin},
            mfa::{MFAMethod, MFAResponse},
            session::Session,
        },
        channels::{
            message::{BulkMessageResponse2, Message, MessageSort},
            Channel,
        },
        server::Server,
        users::User,
    },
    websocket::data::{WebSocketEvent, WebSocketSend},
};

#[cfg(target_os = "windows")]
const PLATFORM: &str = "Windows";

#[cfg(target_os = "darwin")]
const PLATFORM: &str = "macOS";

#[cfg(target_os = "linux")]
const PLATFORM: &str = "Linux";

#[cfg(not(any(target_os = "windows", target_os = "darwin", target_os = "linux")))]
const PLATFORM: &str = "Unknown Device";

#[derive(Debug)]
struct Client(tokio::sync::Mutex<reywen::client::Client>);

impl Deref for Client {
    type Target = tokio::sync::Mutex<reywen::client::Client>;

    fn deref(&self) -> &Self::Target {
        &self.0
    }
}

#[derive(Serialize, Deserialize)]
#[serde(tag = "type")]
enum LoginPayload {
    Success(Session),
    Mfa {
        ticket: String,
        allowed_methods: Vec<MFAMethod>,
    },
}

// Learn more about Tauri commands at https://tauri.app/v1/guides/features/command
#[tauri::command]
async fn login(
    client: tauri::State<'_, Client>,
    email: String,
    password: String,
) -> Result<LoginPayload, String> {
    match reywen::client::Client::session_login(
        &DataLogin::Email {
            email,
            password,
            friendly_name: Some(format!("Jolt client on {PLATFORM}")),
        },
        None,
    )
    .await
    .map_err(|err| format!("Unable to login: {err:?}"))?
    {
        ResponseLogin::Success(session) => {
            login_with_token(client, &session.token).await?;

            Ok(LoginPayload::Success(session))
        }
        ResponseLogin::MFA {
            ticket,
            allowed_methods,
        } => Ok(LoginPayload::Mfa {
            ticket,
            allowed_methods,
        }),
        ResponseLogin::Disabled { user_id } => {
            Err(format!("Account with user ID {user_id} is disabled."))
        }
    }
}

#[tauri::command]
async fn login_mfa(
    client: tauri::State<'_, Client>,
    mfa_ticket: String,
    mfa_response: MFAResponse,
) -> Result<Session, String> {
    let session =
        match reywen::client::Client::session_login(
            &DataLogin::MFA {
                mfa_ticket,
                mfa_response: Some(mfa_response),
                friendly_name: Some(format!("Jolt client on {PLATFORM}")),
            },
            None,
        )
        .await
        .map_err(|err| format!("Unable to login: {err:?}"))?
        {
            ResponseLogin::Success(session) => session,
            ResponseLogin::MFA { .. } => return Err(String::from(
                "Could not log in through MFA; server requires MFA again, please try again later.",
            )),
            ResponseLogin::Disabled { user_id } => {
                return Err(format!("User with ID {user_id} is disabled."));
            }
        };

    login_with_token(client, &session.token).await?;

    Ok(session)
}

#[tauri::command]
async fn login_with_token(client: tauri::State<'_, Client>, token: &str) -> Result<(), String> {
    *client.lock().await = reywen::client::Client::from_token(token, false)
        .map_err(|err| format!("Failed to initialize client: {err:?}"))?;

    Ok(())
}

#[tauri::command]
async fn fetch_user(client: tauri::State<'_, Client>, user: &str) -> Result<User, String> {
    client
        .lock()
        .await
        .user_fetch(user)
        .await
        .map_err(|err| format!("Fetch error: {err:?}"))
}

#[tauri::command]
async fn fetch_server(client: tauri::State<'_, Client>, server: &str) -> Result<Server, String> {
    client
        .lock()
        .await
        .server_fetch(server)
        .await
        .map_err(|err| format!("Fetch error: {err:?}"))
}

#[tauri::command]
async fn fetch_channel(client: tauri::State<'_, Client>, channel: &str) -> Result<Channel, String> {
    client
        .lock()
        .await
        .channel_fetch(channel)
        .await
        .map_err(|err| format!("Fetch error: {err:?}"))
}

#[tauri::command]
async fn fetch_messages(
    client: tauri::State<'_, Client>,
    channel: &str,
    limit: Option<i64>,
) -> Result<BulkMessageResponse2, String> {
    client
        .lock()
        .await
        .message_query(
            channel,
            &DataQueryMessages::new()
                .set_limit(limit.unwrap_or(50))
                .set_sort(MessageSort::Latest)
                .set_include_users(true),
        )
        .await
        .map_err(|err| format!("Fetch error: {err:?}"))
}

#[tauri::command]
async fn send_message(
    client: tauri::State<'_, Client>,
    channel: &str,
    content: &str,
) -> Result<Message, String> {
    client
        .lock()
        .await
        .message_send(channel, &DataMessageSend::new().set_content(content))
        .await
        .map_err(|err| format!("Error sending message: {err:?}"))
}

#[tauri::command]
async fn start_typing(client: tauri::State<'_, Client>, channel: String) -> Result<(), ()> {
    let (_, write) = client.lock().await.websocket.dual_async().await;

    let _ = write
        .lock()
        .await
        .send(WebSocketSend::BeginTyping { channel }.into())
        .await;

    Ok(())
}

#[derive(Serialize, Deserialize, Clone)]
struct TypingPayload {
    channel_id: String,
    user_id: String,
}

#[tauri::command]
async fn run_client<R: tauri::Runtime>(
    app: tauri::AppHandle<R>,
    client: tauri::State<'_, Client>,
) -> Result<(), ()> {
    loop {
        let (mut read, write) = client.lock().await.websocket.dual_async().await;

        while let Some(event) = read.next().await {
            let app = app.clone();
            let write = std::sync::Arc::clone(&write);

            tokio::spawn(async move {
                match event {
                    WebSocketEvent::Ready { .. } => {
                        let _ = app.emit_all("ready", event);

                        let _ = write.lock().await.send(WebSocketSend::ping(0).into()).await;
                    }
                    WebSocketEvent::Message { message } => {
                        let _ = app.emit_all("message", message);
                    }
                    WebSocketEvent::Pong { .. } => {
                        tokio::time::sleep(tokio::time::Duration::from_secs(10)).await;
                        let _ = write.lock().await.send(WebSocketSend::ping(0).into()).await;
                    }
                    WebSocketEvent::ChannelStartTyping {
                        channel_id,
                        user_id,
                    } => {
                        let _ = app.emit_all(
                            "channel_start_typing",
                            TypingPayload {
                                channel_id,
                                user_id,
                            },
                        );
                    }
                    WebSocketEvent::ChannelStopTyping {
                        channel_id,
                        user_id,
                    } => {
                        let _ = app.emit_all(
                            "channel_stop_typing",
                            TypingPayload {
                                channel_id,
                                user_id,
                            },
                        );
                    }
                    _ => {}
                }
            });
        }
    }
}

fn main() {
    tauri::Builder::default()
        .manage(Client(tokio::sync::Mutex::new(
            reywen::client::Client::new(),
        )))
        .invoke_handler(tauri::generate_handler![
            login,
            login_with_token,
            login_mfa,
            fetch_user,
            fetch_server,
            fetch_channel,
            fetch_messages,
            send_message,
            start_typing,
            run_client
        ])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
