use crate::Client;
use reywen::{
    client::methods::message::{DataMessageSend, DataQueryMessages},
    structures::channels::message::{BulkMessageResponse, Message, MessageSort},
};

/// Fetch a bulk amount of messages from a channel given an optional limit.
/// Default limit is 50 messages.
///
/// # Errors
///
/// This function will return an error if the request fails.
#[tauri::command(rename_all = "snake_case")]
pub async fn fetch_messages(
    client: tauri::State<'_, Client>,
    channel_id: &str,
) -> Result<BulkMessageResponse, String> {
    client
        .driver
        .read()
        .await
        .message_query(
            channel_id,
            &DataQueryMessages::new()
                .set_sort(MessageSort::Latest)
                .set_include_users(true),
        )
        .await
        .map_err(|err| format!("{err:?}"))
}

/// Sends a message payload to a given channel
///
/// # Errors
///
/// This function will return an error if the request fails.
#[tauri::command(rename_all = "snake_case")]
pub async fn send_message(
    client: tauri::State<'_, Client>,
    channel_id: &str,
    data_message_send: DataMessageSend,
) -> Result<Message, String> {
    client
        .driver
        .read()
        .await
        .message_send(channel_id, &data_message_send)
        .await
        .map_err(|err| format!("{err:?}"))
}
