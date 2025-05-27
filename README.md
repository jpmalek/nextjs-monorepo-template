# nextjs-monorepo-template

This is a production-ready monorepo setup using Next.js, Changesets, Vercel, and GitHub Actions for CI/CD. Each package in packages/ is independently versioned and deployed.
TODO: I was able to add a file via GH GUI - can this be disallowed, how does it fit in the framework?

This repository provides a minimal monorepo setup for Next.js applications. It uses pnpm workspaces, Changesets, and Vercel for deployment. Each package under `packages/` is versioned and deployed independently.

## Getting Started

Follow these steps to bootstrap a new project from this template and deploy it to Vercel.
### 1. Clone this repository

1. Clone this template repository to your local machine:

```bash
git clone https://github.com/jpmalek/nextjs-monorepo-template.git
```

### 2. Create a new repository from the template:

1. Run the "SETUP - step 1" script after setting the GITHUB_PERSONAL_TOKEN environment variable locally. This will ask you for a repository name, create a new repository from this template, clone it to your local machine, and cd to the new repository. Use the following command, which will run in the current shell properly (vs ./SETUP-step 1-create repo.sh which will run in a subshell and not affect the current shell):

```bash
export GITHUB_PERSONAL_TOKEN=<your-token>
chmod +x ./SETUP-step 1-create repo.sh
source ./SETUP-step 1-create repo.sh
```

Or, you can manually create a new repository from this template on GitHub and clone it to your local machine: click **Use this template** on GitHub and create a repository under your account, then clone the new repository:

```bash
git clone https://github.com/<your-user>/<your-repo>.git
cd <your-repo>
```
### 3. Configure the new repo in Github
Create a Personal Access Token (PAT) with repo scope
Add it as a repository secret named PAT in your GitHub repository settings (Settings > Secrets > Actions > New repository secret)
1. 
Go to the new repository on Github and click **Settings**
2. VERIFY: 
  - change name of default branch to staging. 
  - delete the main branch
  - create staging and production environments;create new envs using the setup-envs workflow, change user id if need be, add workflow file to production branch, manually trigger workflows
3. Go to **Branches**
4. Click **Add branch protection rule**
5. Set the name to **staging**
6. Click **Create**
7. Go to **Branches**
8. Click **Add branch protection rule**
8. Set the name to **production**
9. Click **Create**
10. c

### 3. Install Docker and Docker Compose
This project is configured to use Docker for development and testing in an environment that closely mimics the Vercel production environment on Ubuntu.

1. Install Docker and Docker Compose if they are not already installed.

### 4. Build and start the development containers

```bash
docker-compose up
```

This will start both the web and API services in development mode.

### Development Workflow

The Docker setup includes:

- **Web Service**: NextJS web application running on port 3000
- **API Service**: API server running on port 3001
- **Test Service**: Environment for running tests that mimics production
- **Lint Service**: Service for running linting checks

All services use the same Docker image based on Ubuntu 22.04 with Node.js 18 (matching Vercel's Node.js version).

## Common Commands

### Start just the web application

```bash
docker-compose up web
```

### Start just the API server

```bash
docker-compose up api
```

### Run tests in production-like environment

```bash
docker-compose run test
```

### Run lint checks

```bash
docker-compose run lint
```

### Execute commands in a running container

```bash
docker-compose exec web bash
```

Then run your commands inside the container.

### Build without cache

```bash
docker-compose build --no-cache
```

## Volume Mounts

The Docker Compose configuration mounts your local directory to `/app` in the container, allowing you to:

- Edit code on your local machine
- See changes reflected immediately in the container
- Avoid node_modules conflicts with host machine

## Environment Variables

The containers are configured with appropriate environment variables:

- `NODE_ENV`: Set to "development" for dev services, "production" for test service
- `NEXT_TELEMETRY_DISABLED`: Disables Next.js telemetry
- Service-specific variables as needed

## Testing Production Builds

To test a production build locally:

```bash
# Create a custom docker-compose override
echo "version: '3.8'
services:
  web:
    command: bash -c \"pnpm build && pnpm start\"
    environment:
      NODE_ENV: production" > docker-compose.prod.yml

# Run with the override
docker-compose -f docker-compose.yml -f docker-compose.prod.yml up web
```

## Vercel Compatibility

This Docker environment is designed to closely match the Vercel production environment, including:

- Ubuntu 22.04 base OS
- Node.js 22.x
- Similar environment variable structure

This helps ensure that code that works in the development container will also work when deployed to Vercel.

TODO: pick up here. delete test repo # 1
### 4. Install pnpm and dependencies

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

### 5. Create environment files

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

### 6. Add a hello world route

Inside `packages/api`, create `pages/api/hello.ts` with the following code:

```ts
export default function handler(req: any, res: any) {
  res.status(200).json({ message: process.env.HELLO_MESSAGE || 'hello world' });
}
```

### 7. Display the message in the web app

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

### 8. Run locally

Start both projects in separate terminals:

```bash
pnpm dev:api
pnpm dev:web
```

Visit `http://localhost:3000` and you should see `hello world` displayed.

### 9. Use Docker for local development

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

### 10. Create Vercel projects

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

