//! Binary for the Jolt app.
//! This binary contains commands for management of login, web socket connection and doing other requests.

#![warn(
    clippy::all,
    clippy::pedantic,
    clippy::style,
    clippy::nursery,
    clippy::unwrap_used,
    clippy::expect_used
)]
#![allow(clippy::used_underscore_binding)]
// Prevents additional console window on Windows in release, DO NOT REMOVE!!
#![cfg_attr(not(debug_assertions), windows_subsystem = "windows")]

use core::ops::Deref;

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
            message::{BulkMessageResponse, Message, MessageSort},
            Channel,
        },
        server::Server,
        users::User,
    },
    websocket::data::{WebSocketEvent, WebSocketSend},
};

const APP_NAME: &str = "Jolt";

/// Session friendly name to be used for login.
macro_rules! session_friendly_name {
    () => {{
        #[cfg(target_os = "windows")]
        const PLATFORM: &str = "Windows";

        #[cfg(target_os = "darwin")]
        const PLATFORM: &str = "macOS";

        #[cfg(target_os = "linux")]
        const PLATFORM: &str = "Linux";

        #[cfg(not(any(target_os = "windows", target_os = "darwin", target_os = "linux")))]
        const PLATFORM: &str = "Unknown Device";

        format!(
            "{app_name} desktop client on {platform}",
            app_name = $crate::APP_NAME,
            platform = PLATFORM
        )
    }};
}

/// Payload containing a `channel_id` and a `user_id` for another user that emitted
/// the `BeginTyping` or `EndTyping` websocket event.
#[derive(Serialize, Deserialize, Clone)]
struct TypingPayload {
    /// Channel ID where typing began or ended.
    channel_id: String,

    /// User ID of the user that began or ended typing.
    user_id: String,
}

/// `tauri::State` wrapper for `reywen::client::Client` to be used globally.
#[derive(Debug)]
struct Client(tokio::sync::Mutex<reywen::client::Client>);

impl Deref for Client {
    type Target = tokio::sync::Mutex<reywen::client::Client>;

    fn deref(&self) -> &Self::Target {
        &self.0
    }
}

/// Payload to be sent back when logging in.
#[derive(Serialize, Deserialize)]
#[serde(tag = "type")]
enum LoginPayload {
    /// User has logged in.
    Success(Session),

    /// MFA is required to log in.
    Mfa {
        /// MFA ticket.
        ticket: String,

        /// Allowed MFA methods.
        allowed_methods: Vec<MFAMethod>,
    },
}

#[derive(Serialize, Deserialize)]
#[serde(tag = "type")]
enum LoginError {
    AccountDisabled { user_id: String },
    DeltaError { error: String },
}

/// Log user in.
///
/// # Errors
///
/// This function will return an error if login fails or the account is disabled.
#[tauri::command]
async fn login(
    client: tauri::State<'_, Client>,
    email: String,
    password: String,
    mfa_response: Option<MFAResponse>,
) -> Result<LoginPayload, LoginError> {
    let login =
        match reywen::client::Client::session_login_smart(&email, &password, mfa_response, None)
            .await
        {
            Ok(ResponseLogin::Disabled { user_id }) => Err(LoginError::AccountDisabled { user_id }),
            Ok(ResponseLogin::MFA {
                ticket,
                allowed_methods,
            }) => Ok(LoginPayload::Mfa {
                ticket,
                allowed_methods,
            }),
            Ok(ResponseLogin::Success(session)) => Ok(LoginPayload::Success(session)),

            Err(error) => Err(LoginError::DeltaError {
                error: format!("{:#?}", error),
            }),
        };

    if let Ok(LoginPayload::Success(session)) = &login {
        if let Err(a) = login_with_token(client, &session.token).await {
            return Err(LoginError::DeltaError { error: a });
        };
    }
    login
}

/// Login with session token.
#[tauri::command]
async fn login_with_token(client: tauri::State<'_, Client>, token: &str) -> Result<(), String> {
    *client.lock().await =
        reywen::client::Client::from_token(token, false).map_err(|err| format!("{err:?}"))?;

    Ok(())
}

/// Fetch a user from ID.
#[tauri::command]
async fn fetch_user(client: tauri::State<'_, Client>, user: &str) -> Result<User, String> {
    let a = client
        .lock()
        .await
        .user_fetch(user)
        .await
        .map_err(|err| format!("{err:?}"));
    println!("target user: {}\nresult: {:#?}", user, a);
    a
}

/// Fetch a server from ID.
#[tauri::command]
async fn fetch_server(client: tauri::State<'_, Client>, server: &str) -> Result<Server, String> {
    client
        .lock()
        .await
        .server_fetch(server)
        .await
        .map_err(|err| format!("{err:?}"))
}

/// Fetch a channel from ID.
#[tauri::command]
async fn fetch_channel(client: tauri::State<'_, Client>, channel: &str) -> Result<Channel, String> {
    client
        .lock()
        .await
        .channel_fetch(channel)
        .await
        .map_err(|err| format!("{err:?}"))
}

/// Fetch a bulk amount of messages.
#[tauri::command]
async fn fetch_messages(
    client: tauri::State<'_, Client>,
    channel: &str,
    limit: Option<i64>,
) -> Result<BulkMessageResponse, String> {
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
        .map_err(|err| format!("{err:?}"))
}

/// Send a message to `channel`.
#[tauri::command]
async fn send_message(
    client: tauri::State<'_, Client>,
    channel: &str,
    data_message_send: DataMessageSend,
) -> Result<Message, String> {
    client
        .lock()
        .await
        .message_send(channel, &data_message_send)
        .await
        .map_err(|err| format!("{err:?}"))
}

/// Send a `BeginTyping` event to WebSocket using `channel` (id).
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

/// Run client event loop.
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
    let client = reywen::client::Client::new();

    #[allow(clippy::expect_used)]
    tauri::Builder::default()
        .manage(Client(tokio::sync::Mutex::new(client)))
        .invoke_handler(tauri::generate_handler![
            login,
            login_with_token,
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
