use futures_util::SinkExt;
use reywen::websocket::data::WebSocketSend;
use serde::{Deserialize, Serialize};

use crate::Client;

/// Send a `BeginTyping` event to WebSocket using `channel` (id).
#[tauri::command]
pub async fn start_typing(client: tauri::State<'_, Client>, channel: String) -> Result<(), ()> {
    let (_, write) = client.driver.read().await.websocket.dual_async().await;

    let _ = write
        .lock()
        .await
        .send(WebSocketSend::BeginTyping { channel }.into())
        .await;

    Ok(())
}

/// Send a `BeginTyping` event to WebSocket using `channel` (id).
#[tauri::command]
pub async fn stop_typing(client: tauri::State<'_, Client>, channel: String) -> Result<(), ()> {
    let (_, write) = client.driver.read().await.websocket.dual_async().await;

    let _ = write
        .lock()
        .await
        .send(WebSocketSend::EndTyping { channel }.into())
        .await;

    Ok(())
}

/// Payload containing a `channel_id` and a `user_id` for another user that emitted
/// the `BeginTyping` or `EndTyping` websocket event.
#[derive(Serialize, Deserialize, Clone)]
pub struct TypingPayload {
    /// Channel ID where typing began or ended.
    pub channel_id: String,

    /// User ID of the user that began or ended typing.
    pub user_id: String,
}
