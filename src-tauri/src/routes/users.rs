use crate::Client;
use reywen::structures::users::User;

#[tauri::command]
/// Fetch a user from ID.
///
/// # Errors
///
/// This function will return an error if the request fails.
pub async fn fetch_user(client: tauri::State<'_, Client>, user_id: &str) -> Result<User, String> {
    let Some(user_id) = client.cache.read().await.contains_user(user_id) else {
        let result = client
            .driver
            .read()
            .await
            .user_fetch(user_id)
            .await
            .map_err(|err| format!("{err:?}"))?;
        *client.cache.write().await = client
            .cache
            .read()
            .await
            .clone()
            .insert_user(result.clone());
        return Ok(result);
    };
    Ok(user_id)
}

impl crate::Cache {
    /// Checks if the item exists in the cache.
    #[must_use]
    #[allow(clippy::redundant_closure_call)]
    pub fn contains_user(&self, item_id: &str) -> Option<User> {
        self.users
            .iter()
            .filter(|item| (|user: &&User| user.id.clone())(item) == item_id)
            .collect::<Vec<&User>>()
            .get(0)
            .copied()
            .cloned()
    }

    /// Inserts an item into the cache if it doesn't exist.
    #[must_use]
    #[allow(clippy::redundant_closure_call)]
    pub fn insert_user(&mut self, item: User) -> Self {
        if self
            .contains_user(&(|user: &&User| user.id.clone())(&&item))
            .is_none()
        {
            unsafe { self.insert_user_unchecked(item) }
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
    pub unsafe fn insert_user_unchecked(&mut self, item: User) -> Self {
        self.users.push(item);
        self.clone()
    }
}
