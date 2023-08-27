//! Tauri binary for the Jolt app.
//! This binary contains commands for management of login, web socket connection and doing other requests.

#![warn(
    clippy::all,
    clippy::pedantic,
    clippy::style,
    clippy::nursery,
    clippy::unwrap_used,
    clippy::expect_used
)]
#![allow(clippy::used_underscore_binding, clippy::module_name_repetitions)]
// Prevents additional console window on Windows in release, DO NOT REMOVE!!
#![cfg_attr(not(debug_assertions), windows_subsystem = "windows")]

// main websocket process
pub mod ws;

// sending websocket events
pub mod events;

// api routes
pub mod routes;

use reywen::structures::{channels::Channel, server::Server, users::User};
use serde::Serialize;
use tokio::sync::RwLock;

#[derive(Debug, Default)]
pub struct Client {
    pub driver: RwLock<reywen::client::Client>,
    pub cache: RwLock<Cache>,
}

#[derive(Serialize, Debug, Default, Clone)]
pub struct Cache {
    pub users: Vec<User>,
    pub servers: Vec<Server>,
    pub channels: Vec<Channel>,
}

impl Client {
    #[must_use]
    pub async fn new() -> Self {
        let client = Self::default();
        client.driver.write().await.http.timeout = std::time::Duration::from_secs(5);
        client
    }
}

#[tokio::main]
async fn main() {
    #[allow(clippy::expect_used)]
    tauri::Builder::default()
        .manage(Client::new().await)
        .invoke_handler(tauri::generate_handler![
            routes::session::login,
            routes::session::login_with_token,
            routes::users::fetch_user,
            routes::members::fetch_members,
            routes::servers::fetch_server,
            routes::channels::fetch_channel,
            routes::channels::fetch_direct_messages,
            routes::message::fetch_messages,
            routes::message::send_message,
            routes::message::edit_message,
            routes::message::delete_message,
            events::typing::start_typing,
            ws::run_client,
        ])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
