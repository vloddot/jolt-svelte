use crate::{cache_impl, route_fn};
use reywen::structures::users::User;

route_fn! {
    /// Fetch a user from ID.
    ///
    /// # Errors
    ///
    /// This function will return an error if the request fails.
    pub fn fetch_user(user: &str) -> User {
        user_fetch();
        (contains_user, insert_user)
    }
}

cache_impl!(
    User,
    users,
    contains_user,
    insert_user,
    insert_user_unchecked,
    |user: &&User| user.id.clone()
);
