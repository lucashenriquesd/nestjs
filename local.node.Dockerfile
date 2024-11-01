FROM node:22.11-alpine3.20

# Install pnpm globally
RUN npm install -g pnpm@9.0.6

# Set the global bin directory for pnpm
# This is to ensure that the global bin directory is not in the project directory
RUN pnpm config set global-bin-dir "/usr/local/bin"

# Set the store directory for pnpm to a specific location
# This is to ensure that the store directory is not in the project directory
RUN pnpm config set store-dir /usr/local/share/pnpm-store

# Install @nestjs/cli globally
RUN pnpm add -g @nestjs/cli

# Ensure the store directory has correct permissions
RUN mkdir -p /usr/local/share/pnpm-store && chown -R node:node /usr/local/share/pnpm-store
