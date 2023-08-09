use crate::{Cache, Client};
use reywen::structures::channels::Channel;

/// Fetch a channel from ID.
#[tauri::command]
pub async fn fetch_channel(
    client: tauri::State<'_, Client>,
    channel_id: &str,
) -> Result<Channel, String> {
    let Some(channel) = client.cache.read().await.contains_channel(channel_id) else {
        let channel = client
            .driver
            .read()
            .await
            .channel_fetch(channel_id)
            .await
            .map_err(|err| format!("{err:?}"))?;
        *client.cache.write().await = client
            .cache
            .read()
            .await
            .clone()
            .insert_channel(channel.clone());
        return Ok(channel);
    };

    Ok(channel)
}

impl Cache {
    #[must_use]
    pub fn contains_channel(&self, channel_id: &str) -> Option<Channel> {
        self.channels
            .iter()
            .filter(|channel| channel.id() == channel_id)
            .collect::<Vec<&Channel>>()
            .get(0)
            .copied()
            .cloned()
    }

    #[must_use]
    pub fn insert_channel(&mut self, channel: Channel) -> Self {
        if self.contains_channel(&channel.id()).is_none() {
            self.insert_channel_unchecked(channel)
        } else {
            self.clone()
        }
    }
    #[must_use]
    pub fn insert_channel_unchecked(&mut self, channel: Channel) -> Self {
        self.channels.push(channel);
        self.clone()
    }
}
