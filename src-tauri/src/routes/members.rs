use crate::Client;
use reywen::{client::methods::member::ResponseMemberAll, structures::server::member::Member};

/// Fetch all members in a server using server ID.
///
/// # Errors
///
/// This function will return an error if the request fails.
#[tauri::command(rename_all = "snake_case")]
pub async fn fetch_members(
    client: tauri::State<'_, Client>,
    server_id: &str,
) -> Result<ResponseMemberAll, String> {
    client
        .driver
        .read()
        .await
        .member_fetch_all(server_id)
        .await
        .map_err(|err| format!("{err:?}"))
}

/// Fetch member from server ID and user ID.
///
/// # Errors
///
/// This function will return an error if the request fails.
#[tauri::command(rename_all = "snake_case")]
pub async fn fetch_member(
    client: tauri::State<'_, Client>,
    server_id: &str,
    member_id: &str,
) -> Result<Member, String> {
    client
        .driver
        .read()
        .await
        .member_fetch(server_id, member_id)
        .await
        .map_err(|err| format!("{err:?}"))
}
