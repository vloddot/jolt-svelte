use crate::Client;
use reywen::structures::channels::Channel;

#[tauri::command]
/// Fetch a channel from ID.
/// " # Errors"
///
/// This function will return an error if the request fails.
pub async fn fetch_channel(
    client: tauri::State<'_, Client>,
    channel_id: &str,
) -> Result<Channel, String> {
    let Some(channel_id) = client.cache.read().await.contains_channel(channel_id) else {
        let result = client
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
            .insert_channel(result.clone());

        return Ok(result);
    };

    Ok(channel_id)
}

impl crate::Cache {
    /// Checks if the item exists in the cache.
    #[must_use]
    #[allow(clippy::redundant_closure_call)]
    pub fn contains_channel(&self, item_id: &str) -> Option<Channel> {
        self.channels
            .iter()
            .filter(|item| (|channel: &&Channel| channel.id())(item) == item_id)
            .collect::<Vec<&Channel>>()
            .get(0)
            .copied()
            .cloned()
    }

    /// Inserts an item into the cache if it doesn\'t exist.
    #[must_use]
    #[allow(clippy::redundant_closure_call)]
    pub fn insert_channel(&mut self, item: Channel) -> Self {
        if self
            .contains_channel(&(|channel: &&Channel| channel.id())(&&item))
            .is_none()
        {
            unsafe { self.insert_channel_unchecked(item) }
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
    pub unsafe fn insert_channel_unchecked(&mut self, item: Channel) -> Self {
        self.channels.push(item);
        self.clone()
    }
}
