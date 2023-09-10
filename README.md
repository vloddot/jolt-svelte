<!-- omit in toc -->
# Jolt

In physics, [jolt](https://en.m.wikipedia.org/wiki/Jerk_(physics)) is the rate at which an object's acceleration changes with respect to time. It is a vector quantity (having both magnitude and direction). Jolt is most commonly denoted by the symbol `j` and expressed in m/s<sup>3</sup> (SI units) or standard gravities per second (g<sub>0</sub>/s).

Custom [Revolt](https://www.github.com/revoltchat) client for desktop made in Tauri and Svelte.

<!-- omit in toc -->
## Table of Contents

- [Installation](#installation)
- [Running and compiling the project](#running-and-compiling-the-project)
- [Development Server](#development-server)
- [Links](#links)
- [Contributing](#contributing)

## Installation

To install, follow the [releases page](https://www.github.com/vloddot/jolt/releases) and pick out the version you need.

## Running and compiling the project

<!-- omit in toc -->
### Prerequisites

To compile or launch Jolt in a development server on your own machine, you're going to need Rust (through [rustup](https://rustup.rs)) and [Bun](https://bun.sh), first run the following command to install NPM packages: `bun install` (you have to install packages to build), then you need to do some setup, if you are on NixOS, just run `nix develop` (recommended) or `nix-shell shell.nix`. If not, you can find the prerequisites in the [`shell.nix`](shell.nix) or [`flake.nix`](flake.nix) files in the Nix language. The things to install are in `packages` and `libraries` keys and a bit of setup to add to a shellrc or such is in `shellHook` key.

<!-- omit in toc -->
### Build Command

To build the desktop app (has to build the browser app with it; see below), execute this command:

```bash
cargo tauri build
```

> Once it is finished, you will find the build files in [`src-tauri/target/bundle`](src-tauri/target/bundle).

To build the browser app, execute this command:

```bash
bun run build
```

## Development Server

If you want to test the application before building it or installing the application through [GitHub Releases](https://github.com/vloddot/jolt/releases), you can run it in a development server. It will not have the best performance compared to the built executable.

Just run the following command:

```bash
cargo tauri dev
```

or if you want to run it in a browser:

```bash
bun run dev
```

## Links

- [Jolt Development Server on Revolt](https://rvlt.gg/AaCgcvgg)
- [Tauri](https://tauri.app)
- [Svelte](https://svelte.dev)
- [SvelteKit](https://kit.svelte.dev)

## Contributing

To contribute, make sure you follow the [CONTRIBUTING.md](CONTRIBUTING.md) guide.
