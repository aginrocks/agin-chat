# Agin Chat

**Agin Chat** is a fast, lightweight Matrix client built with [Tauri](https://tauri.app/) and powered by Rust and web technologies. It aims to provide a clean Matrix experience.
---

## ✨ Features

* Secure and privacy-focused Matrix messaging
* Lightweight and performant (powered by Tauri)
* Cross-platform (Linux, macOS, Windows)
* Minimal and modern UI
* Encrypted chats (Matrix E2EE support)

---

## 🚀 Getting Started

### 🛠 Prerequisites

Ensure you have the following tools installed:

* **[Rust](https://www.rust-lang.org/tools/install)**
* **[Node.js](https://nodejs.org/)** (LTS recommended)
* **[pnpm](https://pnpm.io/)** (or npm/yarn)
* **[Tauri CLI](https://tauri.app/v1/guides/getting-started/prerequisites/#installing-the-tauri-cli)**

```bash
cargo install tauri-cli
```

---

### 📦 Install dependencies

```bash
pnpm install
```

---

### 🧪 Run in development

```bash
pnpm tauri dev
```

This will launch Agin Chat in development mode with hot reloads.

---

### 🛠 Build for production

```bash
pnpm tauri build
```

Build output can be found in the `src-tauri/target/release/bundle` directory.

---

## ⚙️ Configuration

Agin Chat uses Matrix homeservers (like `matrix.org`) for login. Configuration (e.g., default homeserver) can be adjusted in the project source.

E2EE is supported depending on the Matrix SDK integration.

---

## 📁 Project Structure

```
.
├── src/            # Frontend (React/Svelte/etc.)
├── src-tauri/      # Tauri backend (Rust)
├── tauri.conf.json # Tauri config
└── README.md
```

---

## 🧩 Contributing

Pull requests, issues, and suggestions are welcome! Please make sure any code changes are cleanly formatted and tested.
