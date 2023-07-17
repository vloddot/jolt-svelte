#![warn(clippy::all, clippy::pedantic, clippy::style, clippy::nursery)]
#![allow(clippy::used_underscore_binding)]
// Prevents additional console window on Windows in release, DO NOT REMOVE!!
#![cfg_attr(not(debug_assertions), windows_subsystem = "windows")]

use std::{collections::HashMap, ops::Deref};

use futures_util::StreamExt;

use reywen_http::driver::Method;
use tauri::Manager;

use reywen::{
    structures::{channels::channel::Channel, server::server::Server, users::user::User},
    websocket::data::WebSocketEvent,
};

#[derive(Debug)]
struct Client(tokio::sync::Mutex<reywen::client::Client>);

impl Deref for Client {
    type Target = tokio::sync::Mutex<reywen::client::Client>;

    fn deref(&self) -> &Self::Target {
        &self.0
    }
}

// Learn more about Tauri commands at https://tauri.app/v1/guides/features/command
#[tauri::command]
async fn login(
    global_client: tauri::State<'_, Client>,
    email: String,
    password: String,
) -> Result<String, String> {
    let mut client = global_client.lock().await;
    client.http.content_type = Some("application/json".to_string());

    let result = client
        .http
        .set_url("https://api.revolt.chat")
        .request(
            Method::POST,
            "/auth/session/login",
            Some(&format!(r#"{{"email":{email:?},"password":{password:?}}}"#)),
        )
        .await;

    let body: HashMap<String, serde_json::Value> =
        result.map_err(|err| format!("Failed to login: {err:?}"))?;

    let Some(serde_json::Value::String(token)) = body.get("token") else {
        return Err(String::from("Invalid JSON schema: `token` not found"));
    };

    *client = reywen::client::Client::from_token(token, false)
        .map_err(|err| format!("Failed to initialize client: {err:?}"))?;
    drop(client);

    Ok(token.clone())
}

#[tauri::command]
async fn fetch_user(client: tauri::State<'_, Client>, user: &str) -> Result<User, String> {
    client
        .0
        .lock()
        .await
        .user_fetch(user)
        .await
        .map_err(|err| format!("Fetch error: {err:?}"))
}

#[tauri::command]
async fn fetch_server(client: tauri::State<'_, Client>, server: &str) -> Result<Server, String> {
    client
        .0
        .lock()
        .await
        .server_fetch(server)
        .await
        .map_err(|err| format!("Fetch error: {err:?}"))
}

#[tauri::command]
async fn fetch_channel(client: tauri::State<'_, Client>, channel: &str) -> Result<Channel, String> {
    client
        .0
        .lock()
        .await
        .channel_fetch(channel)
        .await
        .map_err(|err| format!("Fetch error: {err:?}"))
}

#[tauri::command]
async fn set_session_token(client: tauri::State<'_, Client>, token: &str) -> Result<(), String> {
    *client.0.lock().await =
        reywen::client::Client::from_token(token, false).map_err(|err| format!("{err:?}"))?;

    Ok(())
}

#[tauri::command]
async fn run_client<R: tauri::Runtime>(
    app: tauri::AppHandle<R>,
    client: tauri::State<'_, Client>,
) -> Result<(), ()> {
    loop {
        let (mut read, _) = client.0.lock().await.websocket.dual_async().await;

        while let Some(event) = read.next().await {
            match event {
                WebSocketEvent::Ready { .. } => {
                    let _ = app.emit_all("ready", event);
                }
                WebSocketEvent::Message { message } => {
                    let _ = app.emit_all("message", message);
                }
                _ => {}
            }
        }
    }
}

fn main() {
    tauri::Builder::default()
        .manage(Client(tokio::sync::Mutex::new(
            reywen::client::Client::new(),
        )))
        .invoke_handler(tauri::generate_handler![
            login,
            fetch_user,
            fetch_server,
            fetch_channel,
            set_session_token,
            run_client
        ])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
