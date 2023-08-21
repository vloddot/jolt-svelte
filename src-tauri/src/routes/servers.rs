use crate::Client;
use reywen::structures::server::Server;

/// Fetch a server from ID.
/// # Errors
///
/// This function will return an error if the request fails.
#[tauri::command(rename_all = "snake_case")]
pub async fn fetch_server(
    client: tauri::State<'_, Client>,
    server_id: &str,
) -> Result<Server, String> {
    let Some(server_id) = client.cache.read().await.contains_server(server_id) else {
        let result = client
            .driver
            .read()
            .await
            .server_fetch(server_id)
            .await
            .map_err(|err| format!("{err:?}"))?;

        *client.cache.write().await = client
            .cache
            .read()
            .await
            .clone()
            .insert_server(result.clone());

        return Ok(result);
    };

    Ok(server_id)
}

impl crate::Cache {
    /// Checks if the item exists in the cache.
    #[must_use]
    #[allow(clippy::redundant_closure_call)]
    pub fn contains_server(&self, item_id: &str) -> Option<Server> {
        self.servers
            .iter()
            .filter(|item| (|server: &&Server| server.id.clone())(item) == item_id)
            .collect::<Vec<&Server>>()
            .get(0)
            .copied()
            .cloned()
    }

    /// Inserts an item into the cache if it doesn\'t exist.
    #[must_use]
    #[allow(clippy::redundant_closure_call)]
    pub fn insert_server(&mut self, item: Server) -> Self {
        if self
            .contains_server(&(|server: &&Server| server.id.clone())(&&item))
            .is_none()
        {
            unsafe { self.insert_server_unchecked(item) }
        } else {
            self.clone()
        }
    }

    #[must_use]
    /// Inserts an item into the cache no matter what.
    ///
    /// # Safety
    ///
    /// This function should not be called if the caller is not sure if the item exists or not.
    pub unsafe fn insert_server_unchecked(&mut self, item: Server) -> Self {
        self.servers.push(item);
        self.clone()
    }
}
