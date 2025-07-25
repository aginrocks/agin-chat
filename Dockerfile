FROM debian:bullseye-slim

# Install system dependencies
RUN apt-get update && apt-get install -y \
    curl wget gnupg ca-certificates \
    libwebkit2gtk-4.0-dev \
    build-essential \
    libssl-dev \
    libgtk-3-dev \
    libayatana-appindicator3-dev \
    librsvg2-dev \
    nodejs npm \
    git \
    && rm -rf /var/lib/apt/lists/*

# Install Rust
RUN curl https://sh.rustup.rs -sSf | bash -s -- -y
ENV PATH="/root/.cargo/bin:${PATH}"

# Install appimagetool
RUN mkdir -p /opt/appimage \
    && curl -Lo /opt/appimage/appimagetool https://github.com/AppImage/AppImageKit/releases/latest/download/appimagetool-x86_64.AppImage \
    && chmod +x /opt/appimage/appimagetool

ENV PATH="/opt/appimage:${PATH}"

# Install Tauri CLI
RUN cargo install tauri-cli

# Set working directory
WORKDIR /app

# Copy project files
COPY . .

RUN corepack enable

# Install frontend deps and build
RUN pnpm install && pnpm run build

# Build Tauri AppImage
RUN tauri build

CMD ["bash"]
