use crate::{Cache, Client};
use reywen::structures::users::User;

/// Fetch a user from ID.
#[tauri::command]
pub async fn fetch_user(client: tauri::State<'_, Client>, user_id: &str) -> Result<User, String> {
    let Some(user) = client.cache.read().await.contains_user(user_id) else {
        let user = client
            .driver
            .read()
            .await
            .user_fetch(user_id)
            .await
            .map_err(|err| format!("{err:?}"))?;
        *client.cache.write().await = client.cache.read().await.clone().insert_user(user.clone());
        return Ok(user);
    };

    Ok(user)
}

impl Cache {
    #[must_use]
    pub fn contains_user(&self, user_id: &str) -> Option<User> {
        self.users
            .iter()
            .filter(|user| user.id == user_id)
            .collect::<Vec<&User>>()
            .get(0)
            .copied()
            .cloned()
    }
    #[must_use]
    pub fn insert_user(&mut self, user: User) -> Self {
        if self.contains_user(&user.id).is_none() {
            self.insert_user_unchecked(user)
        } else {
            self.clone()
        }
    }
    #[must_use]
    pub fn insert_user_unchecked(&mut self, user: User) -> Self {
        self.users.push(user);
        self.clone()
    }
}
