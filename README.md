# nextjs-monorepo-template

This is a production-ready monorepo setup using Next.js, Changesets, Vercel, and GitHub Actions for CI/CD. Each package in packages/ is independently versioned and deployed.
TODO: I was able to add a file via GH GUI - can this be disallowed, how does it fit in the framework?

This repository provides a minimal monorepo setup for Next.js applications. It uses pnpm workspaces, Changesets, and Vercel for deployment. Each package under `packages/` is versioned and deployed independently.

## Getting Started

Follow these steps to bootstrap a new project from this template and deploy it to Vercel.

### 1. Create a new repository

1. Click **Use this template** on GitHub and create a repository under your account.
2. Clone the new repository:

```bash
git clone https://github.com/<your-user>/<your-repo>.git
cd <your-repo>
```

### 2. Install pnpm and dependencies

1. Install pnpm globally if it is not installed:

```bash
npm install -g pnpm
```

2. Install workspace dependencies:

```bash
pnpm install
```

3. Add the Next.js runtime packages to each workspace if they are not already present:

```bash
pnpm add next react react-dom --filter web
pnpm add next react react-dom --filter api
```

### 3. Create environment files

Create `.env.local` files in both packages:

```bash
packages/api/.env.local
packages/web/.env.local
```

Add the following contents:

```bash
# packages/api/.env.local
HELLO_MESSAGE=hello world
PORT=3001

# packages/web/.env.local
NEXT_PUBLIC_API_URL=http://localhost:3001/api/hello
```

### 4. Add a hello world route

Inside `packages/api`, create `pages/api/hello.ts` with the following code:

```ts
export default function handler(req: any, res: any) {
  res.status(200).json({ message: process.env.HELLO_MESSAGE || 'hello world' });
}
```

### 5. Display the message in the web app

Update `packages/web/pages/index.tsx`:

```tsx
import { useEffect, useState } from 'react'

export default function Home() {
  const [message, setMessage] = useState('loading...')

  useEffect(() => {
    fetch(process.env.NEXT_PUBLIC_API_URL as string)
      .then((res) => res.json())
      .then((data) => setMessage(data.message))
  }, [])

  return <div>{message}</div>
}
```

### 6. Run locally

Start both projects in separate terminals:

```bash
pnpm dev:api
pnpm dev:web
```

Visit `http://localhost:3000` and you should see `hello world` displayed.

### 7. Use Docker for local development

1. Ensure you have Docker and Docker Compose installed.
2. Build the development containers:

```bash
docker compose build
```

3. Start the services:

```bash
docker compose up
```

This runs both the `web` and `api` packages inside Docker containers. The web app will be available at `http://localhost:3000` and will fetch data from the API container at `http://localhost:3001`.

### 8. Create Vercel projects

1. Create **two** Vercel projects, one for `packages/web` and one for `packages/api`.
2. When connecting each project to GitHub, set the **Root Directory** to the corresponding package (`packages/web` or `packages/api`).
3. Use these settings for both projects:
   - **Install Command:** `pnpm install --frozen-lockfile`
   - **Build Command:**
     - Web: `pnpm --filter web build`
     - API: `pnpm --filter api build`
   - **Output Directory:** `.next`
4. Add the environment variables from your local `.env.local` files to the project settings.
5. Deploy by pushing your code to GitHub.

After deployment, the web project will fetch the greeting from the API project, and visiting the web URL will display `hello world`.

