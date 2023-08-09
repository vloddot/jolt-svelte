use crate::{cache_impl, route_fn};
use reywen::structures::channels::Channel;

route_fn! {
    /// Fetch a channel from ID.
    pub fn fetch_channel(channel_id: &str) -> Channel {
        channel_fetch();
        (contains_channel, insert_channel)
    }
}

cache_impl!(
    Channel,
    channels,
    contains_channel,
    insert_channel,
    insert_channel_unchecked,
    |channel: &&Channel| channel.id()
);
