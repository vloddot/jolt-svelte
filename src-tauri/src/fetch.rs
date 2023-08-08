use reywen::{
    client::methods::{
        member::ResponseMemberAll,
        message::{DataMessageSend, DataQueryMessages},
    },
    structures::{
        channels::{
            message::{BulkMessageResponse, Message, MessageSort},
            Channel,
        },
        server::Server,
        users::User,
    },
};

use crate::Client;

/// Fetch a user from ID.
#[tauri::command]
pub async fn fetch_user(client: tauri::State<'_, Client>, user: &str) -> Result<User, String> {
    let Some(user) = client.cache.lock().await.contains_user(user) else {
        return client
            .driver
            .lock()
            .await
            .user_fetch(user)
            .await
            .map_err(|err| format!("{err:?}"));
    };

    Ok(user)
}

#[tauri::command]
pub async fn fetch_members(
    client: tauri::State<'_, Client>,
    server: &str,
) -> Result<ResponseMemberAll, String> {
    client
        .driver
        .lock()
        .await
        .member_fetch_all(server)
        .await
        .map_err(|err| format!("{err:?}"))
}

/// Fetch a server from ID.
#[tauri::command]
pub async fn fetch_server(
    client: tauri::State<'_, Client>,
    server_id: &str,
) -> Result<Server, String> {
    let Some(channel) = client.cache.lock().await.contains_server(server_id) else {
        return client
            .driver
            .lock()
            .await
            .server_fetch(server_id)
            .await
            .map_err(|err| format!("{err:?}"));
    };

    Ok(channel)
}

/// Fetch a channel from ID.
#[tauri::command]
pub async fn fetch_channel(
    client: tauri::State<'_, Client>,
    channel: &str,
) -> Result<Channel, String> {
    let Some(channel) = client.cache.lock().await.contains_channel(channel) else {
        return client
            .driver
            .lock()
            .await
            .channel_fetch(channel)
            .await
            .map_err(|err| format!("{err:?}"));
    };

    Ok(channel)
}

/// Fetch a bulk of messages.
#[tauri::command]
pub async fn fetch_messages(
    client: tauri::State<'_, Client>,
    channel: &str,
    limit: Option<i64>,
) -> Result<BulkMessageResponse, String> {
    client
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
pub async fn send_message(
    client: tauri::State<'_, Client>,
    channel: &str,
    data_message_send: DataMessageSend,
) -> Result<Message, String> {
    client
        .driver
        .lock()
        .await
        .message_send(channel, &data_message_send)
        .await
        .map_err(|err| format!("{err:?}"))
}
