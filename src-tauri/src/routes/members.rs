use crate::{route_fn, Client};
use reywen::client::methods::member::ResponseMemberAll;

route_fn! {
    /// Fetch all members from server.
    pub fn fetch_members(server_id: &str) -> ResponseMemberAll {
        member_fetch_all();
    }
}
