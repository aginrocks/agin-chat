FROM nailyudha/tauri:latest

WORKDIR /home/nonroot

# Define and persist pnpm path
ENV PNPM_HOME="/home/nonroot/.local/share/pnpm"
ENV PATH="${PNPM_HOME}:${PATH}"

# Manually install pnpm
RUN curl -fsSL https://github.com/pnpm/pnpm/releases/latest/download/pnpm-linuxstatic-x64 -o pnpm && \
    chmod +x pnpm && \
    mkdir -p "$PNPM_HOME" && \
    mv pnpm "$PNPM_HOME"

# Install dependencies
COPY package.json pnpm-lock.yaml ./
RUN pnpm install --frozen-lockfile

# Copy rest of the app
COPY . .

# Build Tauri app
RUN pnpm tauri build
