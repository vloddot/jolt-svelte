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
    client::methods::{
        member::ResponseMemberAll,
        message::{DataMessageSend, DataQueryMessages},
    },
    structures::{
        authentication::{login::ResponseLogin, mfa::MFAResponse},
        channels::{
            message::{BulkMessageResponse, Message, MessageSort},
            Channel,
        },
        server::Server,
        users::User,
    },
    websocket::data::{WebSocketEvent, WebSocketSend},
};
use tokio::sync::Mutex;

/// Session friendly name to be used for login.
macro_rules! session_friendly_name {
    () => {{
        #[cfg(any(target_os = "ios", target_os = "android"))]
        const APP_NAME: &str = "Jolt mobile client";
        #[cfg(not(any(target_os = "ios", target_os = "android")))]
        const APP_NAME: &str = "Jolt desktop client";

        #[cfg(target_os = "windows")]
        const PLATFORM: &str = "Windows";

        #[cfg(target_os = "darwin")]
        const PLATFORM: &str = "macOS";

        #[cfg(target_os = "linux")]
        const PLATFORM: &str = "Linux";

        #[cfg(not(any(target_os = "windows", target_os = "darwin", target_os = "linux")))]
        const PLATFORM: &str = "Unknown Device";

        format!("{APP_NAME} on {PLATFORM}")
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

#[derive(Debug)]
struct Client(tokio::sync::Mutex<System>);

#[derive(Debug, Default)]
pub struct System {
    pub driver: tokio::sync::Mutex<reywen::client::Client>,
    pub cache: Mutex<Cache>,
}

impl System {}
#[derive(Debug, Default)]
pub struct Cache {
    pub users: Vec<User>,
    pub servers: Vec<Server>,
    pub channels: Vec<Channel>,
}

impl Cache {
    pub fn contains_user(&self, user_id: &str) -> Option<User> {
        self.users
            .iter()
            .filter_map(|item| if item.id == user_id { Some(item) } else { None })
            .collect::<Vec<&User>>()
            .get(0)
            .copied()
            .cloned()
    }
    pub fn insert_user(&mut self, user: User) -> bool {
        if self.contains_user(&user.id).is_some() {
            false
        } else {
            self.users.push(user);
            true
        }
    }
    pub fn contains_server(&self, server_id: &str) -> Option<Server> {
        self.servers
            .iter()
            .filter_map(|item| {
                if item.id == server_id {
                    Some(item)
                } else {
                    None
                }
            })
            .collect::<Vec<&Server>>()
            .get(0)
            .copied()
            .cloned()
    }
    pub fn contains_channel(&self, channel_id: &str) -> Option<Channel> {
        self.channels
            .iter()
            .filter_map(|item| {
                if item.id() == channel_id {
                    Some(item)
                } else {
                    None
                }
            })
            .collect::<Vec<&Channel>>()
            .get(0)
            .copied()
            .cloned()
    }
}

impl System {
    pub fn new() -> Self {
        System::default()
    }
}

impl Deref for Client {
    type Target = tokio::sync::Mutex<System>;

    fn deref(&self) -> &Self::Target {
        &self.0
    }
}

/// Log user in.
///
/// # Errors
///
/// This function will return an error if login fails or the account is disabled.
#[tauri::command]
async fn login(
    client: tauri::State<'_, Client>,
    email: &str,
    password: &str,
    mfa_response: Option<MFAResponse>,
) -> Result<ResponseLogin, String> {
    match reywen::client::Client::session_login_smart(
        email,
        password,
        mfa_response,
        Some(&session_friendly_name!()),
    )
    .await
    .map_err(|error| format!("{error:?}"))?
    {
        ResponseLogin::Success(session) => {
            login_with_token(client, &session.token).await?;

            Ok(ResponseLogin::Success(session))
        }
        response => Ok(response),
    }
}

/// Login with session token.
#[tauri::command]
async fn login_with_token(client: tauri::State<'_, Client>, token: &str) -> Result<(), String> {
    *client.lock().await.driver.lock().await =
        reywen::client::Client::from_token(token, false).map_err(|err| format!("{err:?}"))?;

    Ok(())
}

/// Fetch a user from ID.
#[tauri::command]
async fn fetch_user(client: tauri::State<'_, Client>, user: &str) -> Result<User, String> {
    let ref_client = client.lock().await;
    let x = if let Some(user) = ref_client.cache.lock().await.contains_user(user) {
        Ok(user)
    } else {
        ref_client
            .driver
            .lock()
            .await
            .user_fetch(user)
            .await
            .map_err(|err| format!("{err:?}"))
    };
    x
}

#[tauri::command]
async fn fetch_members(
    client: tauri::State<'_, Client>,
    server: &str,
) -> Result<ResponseMemberAll, String> {
    client
        .lock()
        .await
        .driver
        .lock()
        .await
        .member_fetch_all(server)
        .await
        .map_err(|err| format!("{err:?}"))
}

/// Fetch a server from ID.
#[tauri::command]
async fn fetch_server(client: tauri::State<'_, Client>, server_id: &str) -> Result<Server, String> {
    let ref_client = client.lock().await;
    let x = if let Some(channel) = ref_client.cache.lock().await.contains_server(server_id) {
        Ok(channel)
    } else {
        ref_client
            .driver
            .lock()
            .await
            .server_fetch(server_id)
            .await
            .map_err(|err| format!("{err:?}"))
    };
    x
}

/// Fetch a channel from ID.
#[tauri::command]
async fn fetch_channel(
    client: tauri::State<'_, Client>,
    channel_id: &str,
) -> Result<Channel, String> {
    let ref_client = client.lock().await;
    let x = if let Some(channel) = ref_client.cache.lock().await.contains_channel(channel_id) {
        Ok(channel)
    } else {
        ref_client
            .driver
            .lock()
            .await
            .channel_fetch(channel_id)
            .await
            .map_err(|err| format!("{err:?}"))
    };
    x
}

/// Fetch a bulk of messages.
#[tauri::command]
async fn fetch_messages(
    client: tauri::State<'_, Client>,
    channel: &str,
    limit: Option<i64>,
) -> Result<BulkMessageResponse, String> {
    client
        .lock()
        .await
        .driver
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
        .driver
        .lock()
        .await
        .message_send(channel, &data_message_send)
        .await
        .map_err(|err| format!("{err:?}"))
}

/// Send a `BeginTyping` event to WebSocket using `channel` (id).
#[tauri::command]
async fn start_typing(client: tauri::State<'_, Client>, channel: String) -> Result<(), ()> {
    let (_, write) = client
        .lock()
        .await
        .driver
        .lock()
        .await
        .websocket
        .dual_async()
        .await;

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
        let (mut read, write) = client
            .lock()
            .await
            .driver
            .lock()
            .await
            .websocket
            .dual_async()
            .await;

        while let Some(event) = read.next().await {
            let app = app.clone();
            let write = std::sync::Arc::clone(&write);

            match event.clone() {
                WebSocketEvent::Ready {
                    users,
                    servers,
                    channels,
                    ..
                } => {
                    *client.lock().await.cache.lock().await = Cache {
                        users,
                        servers,
                        channels,
                    };
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
        }
    }
}

fn main() {
    #[allow(clippy::expect_used)]
    tauri::Builder::default()
        .manage(Client(tokio::sync::Mutex::new(System::new())))
        .invoke_handler(tauri::generate_handler![
            login,
            login_with_token,
            fetch_user,
            fetch_members,
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
