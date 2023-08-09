/// Session friendly name to be used for login.
#[macro_export]
macro_rules! session_friendly_name {
    () => {{
        #[cfg(any(target_os = "ios", target_os = "android"))]
        const APP_NAME: &str = "Jolt mobile client";
        #[cfg(not(any(target_os = "ios", target_os = "android")))]
        const APP_NAME: &str = "Jolt desktop client";

        #[cfg(target_os = "windows")]
        const PLATFORM: &str = "Windows";

        #[cfg(target_os = "darwin")]
        const PLATFORM: &str = "macOS";

        #[cfg(target_os = "linux")]
        const PLATFORM: &str = "Linux";

        #[cfg(not(any(target_os = "windows", target_os = "darwin", target_os = "linux")))]
        const PLATFORM: &str = "Unknown Device";

        format!("{APP_NAME} on {PLATFORM}")
    }};
}
