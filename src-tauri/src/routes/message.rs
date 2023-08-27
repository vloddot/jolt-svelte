use crate::Client;
use reywen::{
    client::methods::message::{DataEditMessage, DataMessageSend, DataQueryMessages},
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

/// Edits a specified message using its ID and the channel ID.
///
/// # Errors
///
/// This function will return an error if the request fails.
#[tauri::command(rename_all = "snake_case")]
pub async fn edit_message(
    client: tauri::State<'_, Client>,
    channel_id: &str,
    message_id: &str,
    data_edit_message: DataEditMessage,
) -> Result<Message, String> {
    client
        .driver
        .read()
        .await
        .message_edit(channel_id, message_id, &data_edit_message)
        .await
        .map_err(|err| format!("{err:?}"))
}

/// Deletes a specified message using its ID and the channel ID.
///
/// # Errors
///
/// This function will return an error if the request fails.
#[tauri::command(rename_all = "snake_case")]
pub async fn delete_message(
    client: tauri::State<'_, Client>,
    channel_id: &str,
    message_id: &str,
) -> Result<(), String> {
    client
        .driver
        .read()
        .await
        .message_delete(channel_id, message_id)
        .await
        .map_err(|err| format!("{err:?}"))
}
