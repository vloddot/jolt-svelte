use futures_util::{SinkExt, StreamExt};
use reywen::{
    structures::{channels::Channel, server::Server, users::User},
    websocket::data::{WebSocketEvent, WebSocketSend},
};
use serde::{Deserialize, Serialize};
use tauri::Manager;

use crate::Client;

#[derive(Serialize, Deserialize, Debug, Default)]
pub struct Cache {
    pub users: Vec<User>,
    pub servers: Vec<Server>,
    pub channels: Vec<Channel>,
}

/// Payload containing a `channel_id` and a `user_id` for another user that emitted
/// the `BeginTyping` or `EndTyping` websocket event.
#[derive(Serialize, Deserialize, Clone)]
pub struct TypingPayload {
    /// Channel ID where typing began or ended.
    channel_id: String,

    /// User ID of the user that began or ended typing.
    user_id: String,
}

impl Cache {
    #[must_use]
    pub fn contains_user(&self, user_id: &str) -> Option<User> {
        self.users
            .iter()
            .filter(|user| user.id == user_id)
            .collect::<Vec<&User>>()
            .get(0)
            .copied()
            .cloned()
    }

    #[must_use]
    pub fn contains_server(&self, server_id: &str) -> Option<Server> {
        self.servers
            .iter()
            .filter(|server| server.id == server_id)
            .collect::<Vec<&Server>>()
            .get(0)
            .copied()
            .cloned()
    }

    #[must_use]
    pub fn contains_channel(&self, channel_id: &str) -> Option<Channel> {
        self.channels
            .iter()
            .filter(|channel| channel.id() == channel_id)
            .collect::<Vec<&Channel>>()
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
}

/// Send a `BeginTyping` event to WebSocket using `channel` (id).
#[tauri::command]
pub async fn start_typing(client: tauri::State<'_, Client>, channel: String) -> Result<(), ()> {
    let (_, write) = client.driver.lock().await.websocket.dual_async().await;

    let _ = write
        .lock()
        .await
        .send(WebSocketSend::BeginTyping { channel }.into())
        .await;

    Ok(())
}

/// Run client event loop.
#[tauri::command]
pub async fn run_client<R: tauri::Runtime>(
    app: tauri::AppHandle<R>,
    client: tauri::State<'_, Client>,
) -> Result<(), ()> {
    loop {
        let (mut read, write) = client.driver.lock().await.websocket.dual_async().await;

        while let Some(event) = read.next().await {
            let app = app.clone();
            let write = std::sync::Arc::clone(&write);

            match event {
                WebSocketEvent::Ready {
                    users,
                    servers,
                    channels,
                    ..
                } => {
                    let cache = Cache {
                        users,
                        servers,
                        channels,
                    };

                    let _ = app.emit_all("ready", &cache);
                    *client.cache.lock().await = cache;

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
