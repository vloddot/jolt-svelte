use crate::Client;
use reywen::client::methods::member::ResponseMemberAll;

#[tauri::command]
pub async fn fetch_members(
    client: tauri::State<'_, Client>,
    server: &str,
) -> Result<ResponseMemberAll, String> {
    client
        .driver
        .read()
        .await
        .member_fetch_all(server)
        .await
        .map_err(|err| format!("{err:?}"))
}
