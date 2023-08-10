use crate::route_fn;
use reywen::{
    client::methods::message::{DataMessageSend, DataQueryMessages},
    structures::channels::message::{BulkMessageResponse, Message, MessageSort},
};

route_fn! {
    /// Fetch a bulk amount of messages from a channel given an optional limit.
    /// Default limit is 50 messages.
    pub fn fetch_messages(channel_id: &str, limit: Option<i64>) -> BulkMessageResponse {
        message_query(
            &DataQueryMessages::new()
                .set_limit(limit.unwrap_or(50))
                .set_sort(MessageSort::Latest)
                .set_include_users(true)
        );
    }
}

route_fn! {
    /// Sends a message payload to a given channel
    pub fn send_message(channel_id: &str, data_message_send: DataMessageSend) -> Message {
        message_send(&data_message_send);
    }
}
