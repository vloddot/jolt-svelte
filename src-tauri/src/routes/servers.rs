use crate::{Cache, Client};
use reywen::structures::server::Server;

/// Fetch a server from ID.
#[tauri::command]
pub async fn fetch_server(
    client: tauri::State<'_, Client>,
    server_id: &str,
) -> Result<Server, String> {
    let Some(server) = client.cache.read().await.contains_server(server_id) else {
        let server = client
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
            .insert_server(server.clone());
        return Ok(server);
    };

    Ok(server)
}

impl Cache {
    #[must_use]
    pub fn contains_server(&self, server_id: &str) -> Option<Server> {
        self.servers
            .iter()
            .filter(|server| server.id == server_id)
            .collect::<Vec<&Server>>()
            .get(0)
            .copied()
            .cloned()
    }
    #[must_use]
    pub fn insert_server(&mut self, server: Server) -> Self {
        if self.contains_server(&server.id).is_none() {
            self.insert_server_unchecked(server)
        } else {
            self.clone()
        }
    }
    #[must_use]
    pub fn insert_server_unchecked(&mut self, server: Server) -> Self {
        self.servers.push(server);
        self.clone()
    }
}
