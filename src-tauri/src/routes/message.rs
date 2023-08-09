use crate::Client;
use reywen::{
    client::methods::message::{DataMessageSend, DataQueryMessages},
    structures::channels::message::{BulkMessageResponse, Message, MessageSort},
};

/// Fetch a bulk of messages.
#[tauri::command]
pub async fn fetch_messages(
    client: tauri::State<'_, Client>,
    channel: &str,
    limit: Option<i64>,
) -> Result<BulkMessageResponse, String> {
    client
        .driver
        .read()
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
pub async fn send_message(
    client: tauri::State<'_, Client>,
    channel: &str,
    data_message_send: DataMessageSend,
) -> Result<Message, String> {
    client
        .driver
        .read()
        .await
        .message_send(channel, &data_message_send)
        .await
        .map_err(|err| format!("{err:?}"))
}
