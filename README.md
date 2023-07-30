# Jolt

Custom [Revolt](https://revolt.chat) client for desktop machines made in Tauri and Svelte.

## Build

### Prerequisites

To build Jolt for your own machine, you need some prerequisites, these packages are included in the [`shell.nix`](shell.nix) and [`flake.nix`](flake.nix) files. If you are on NixOS, just run `nix develop` (recommended) or `nix-shell shell.nix`. If not, you will have to install the packages and libraries listed [`shell.nix`](shell.nix) or [`flake.nix`](flake.nix) and add the libraries to the `LD_LIBRARY_PATH` variable.

### Build Process

```bash
pnpm run tauri build # (or "npm run tauri dev", "yarn run tauri dev", etc.)
```

## Development Server

If you want to test the application before building it, you can run it in a development server:

```bash
pnpm run tauri dev # (or "npm run tauri dev", "yarn run tauri dev", etc.)
```

## Recommended IDE Setup

[VS Code](https://code.visualstudio.com/) + [Svelte](https://marketplace.visualstudio.com/items?itemName=svelte.svelte-vscode) + [Tauri](https://marketplace.visualstudio.com/items?itemName=tauri-apps.tauri-vscode) + [rust-analyzer](https://marketplace.visualstudio.com/items?itemName=rust-lang.rust-analyzer).
