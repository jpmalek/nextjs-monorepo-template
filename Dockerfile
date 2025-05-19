FROM node:18

# enable pnpm via corepack
RUN corepack enable \
    && corepack prepare pnpm@latest --activate

WORKDIR /app

COPY package.json pnpm-workspace.yaml ./
COPY packages/*/package.json packages/*/
RUN pnpm install

COPY . .

CMD ["pnpm", "dev:web"]
