use crate::Client;
use reywen::client::methods::member::ResponseMemberAll;

#[tauri::command]
/// Fetch all members in a server using server ID.
///
/// # Errors
///
/// This function will return an error if the request fails.
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
