use reywen::{
    client::methods::{
        member::ResponseMemberAll,
        message::{DataMessageSend, DataQueryMessages},
    },
    structures::{
        channels::{
            message::{BulkMessageResponse, Message, MessageSort},
            Channel,
        },
        server::Server,
        users::User,
    },
};

use crate::Client;

macro_rules! route_fn {
    (
        $(#[$outer:meta])*
        $vis:vis fn $fn_name:ident($name:ident: $at:ty$(, $args:ident: $tys:ty)*) -> $rt:ty;
        $fetch_fn:ident($($add_args:expr)*),
        $cache_fn:ident
    ) => {
        #[tauri::command]
        $(#[$outer])*
        $vis async fn $fn_name(
            client: tauri::State<'_, Client>,
            $name: $at,
            $($args: $tys)*
        ) -> Result<$rt, String> {
            let Some($name) = client.cache.lock().await.$cache_fn($name) else {
                return client
                    .driver
                    .lock()
                    .await
                    .$fetch_fn($name, $($add_args)*)
                    .await
                    .map_err(|err| format!("{err:?}"));
            };

            Ok($name)
        }
    };
    (
        $(#[$outer:meta])*
        $vis:vis fn $fn_name:ident($name:ident: $at:ty$(, $args:ident: $tys:ty)*) -> $rt:ty;
        $fetch_fn:ident($($add_args:expr)*)
    ) => {
        #[tauri::command]
        $(#[$outer])*
        $vis async fn $fn_name(
            client: tauri::State<'_, Client>,
            $name: $at,
            $($args: $tys)*
        ) -> Result<$rt, String> {
            client
                .driver
                .lock()
                .await
                .$fetch_fn($name, $($add_args)*)
                .await
                .map_err(|err| format!("{err:?}"))
        }
    };
}

route_fn! {
    /// Fetch a user from ID.
    pub fn fetch_user(user: &str) -> User;
    user_fetch(),
    contains_user
}

route_fn! {
    /// Fetch a server from ID.
    pub fn fetch_server(server: &str) -> Server;
    server_fetch(),
    contains_server
}

route_fn! {
    /// Fetch a channel from ID.
    pub fn fetch_channel(channel: &str) -> Channel;
    channel_fetch(),
    contains_channel
}

route_fn! {
    /// Fetch all members from server ID.
    pub fn fetch_members(server: &str) -> ResponseMemberAll;
    member_fetch_all()
}

route_fn! {
    /// Fetch a bulk of messages.
    pub fn fetch_messages(channel: &str, limit: Option<i64>) -> BulkMessageResponse;
    message_query(
        &DataQueryMessages::new()
            .set_limit(limit.unwrap_or(50))
            .set_sort(MessageSort::Latest)
            .set_include_users(true)
    )
}

route_fn! {
    pub fn send_message(channel: &str, data_message_send: DataMessageSend) -> Message;
    message_send(&data_message_send)
}
