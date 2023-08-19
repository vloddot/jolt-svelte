use crate::{events::typing::TypingPayload, Cache, Client};
use futures_util::{SinkExt, StreamExt};
use reywen::websocket::data::{WebSocketEvent, WebSocketSend};
use tauri::Manager;

/// Run client event loop.
#[tauri::command(rename_all = "snake_case")]
pub async fn run_client<R: tauri::Runtime>(
    app: tauri::AppHandle<R>,
    client: tauri::State<'_, Client>,
) -> Result<(), ()> {
    let (mut read, _) = client.driver.read().await.websocket.dual_async().await;
    while let Some(event) = read.next().await {
        if let WebSocketEvent::Ready {
            users,
            servers,
            channels,
            ..
        } = event
        {
            let cache = Cache {
                users,
                servers,
                channels,
            };
            let _ = app.emit_all("ready", &cache.servers);
            *client.cache.write().await = cache;
            break;
        }
    }

    loop {
        let (mut read, write) = client.driver.read().await.websocket.dual_async().await;

        while let Some(event) = read.next().await {
            let app = app.clone();
            let write = std::sync::Arc::clone(&write);

            tokio::spawn(async move {
                match event {
                    WebSocketEvent::Ready { .. } => {
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
