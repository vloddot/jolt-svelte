use crate::{cache_impl, route_fn};
use reywen::structures::server::Server;

route_fn! {
    /// Fetch a server from ID.
    pub fn fetch_server(server_id: &str) -> Server {
        server_fetch();
        (contains_server, insert_server)
    }
}

cache_impl!(
    Server,
    servers,
    contains_server,
    insert_server,
    insert_server_unchecked,
    |server: &&Server| server.id.clone()
);
