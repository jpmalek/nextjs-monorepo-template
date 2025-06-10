# nextjs-monorepo-template

This is a production-ready monorepo setup using Turborepo, Next.js, Changesets, Vercel, and GitHub Actions for CI/CD. Each package in packages/ is independently versioned and deployed.

## AI and Agentic Support
- There's an AGENTS.md file that contains the rules that AI should follow during development, and configuration files that point to it, for both Cursor and Windsurf.

## PackageVersion Management, Node and pnpm 
Package dependencies are kept up to date, automatically documented, regularly audited for security, and limited to only what is necessary.

- If the node version needs to be updated, update .nvmrc and CI will follow. 
- npnm version is handled already by CI and tracks with package.
- There's a Gihub workflow update-dependencies.yml that will update dependencies weekly on Monday mornings on a dedicated branch (e.g., deps/update). Review changes via PR.
- Dependabot support: there's a .github/dependabot.yml file that will run checks on Tuesdays, check for major version updates and security fixes, and create PRs as needed.

## Quality and Security Constraints
Turborepo caching is used to speed up the build process. 

When committing code, the Husky commit-msg hook runs commitlint, which enforces a commit message format. You must use the format "type(scope): subject", and the acceptable types can be found in commitlint.config.js.

Then the Husky pre-commit hook runs the following:
- sherif, which checks for and fixes package.json file formatting and versioning.
- a custom script that checks to see if any package.json files were changed, and if so, generate package docs in package.md files.
- lint, which uses eslint to check for code formatting issues. It fails on all warnings, so you must fix them before committing.
- test, which uses vitest to run tests, including a unit test that verifies the lint config is working properly.All tests must pass before committing.
- check-types, which checks for Typescript compilation errors for Typescript files in the apps and packages directories.

Changes to the product branch can only be made by squash-merging staging into it, or by creating a hotfix branch from production. 

Changes to the staging branch can only be done via new branches and pull requests. 

When merging to the staging or production branches, the CI GitHub Actions workflow (ci.yml) will run. 
- For pull requests to merge into the staging branch, this will run lint and all tests, which must pass before the PR can be merged.

## Tools
  When you want to:
    - completely and recursively clean up all the pids: `pnpm run teardown`
    - completely and recursively clean package repositories, and reinstall: `pnpm run `

## TODO:

- as of 5/28/2025 CI run takes 1m in staging.
- manually change branch protection rules to require 1 approval and previous merge commit
- Do not add or create new .js files in this repository. Use Typescript, and the .ts extension for standard TypeScript files, and .tsx only when the file contains JSX (i.e., HTML-like syntax used in React components).

## Getting Started

Follow these steps to bootstrap a new project from this template and deploy it to Vercel.

### 1. Clone this repository

1. Clone this template repository to your local machine:

```bash
git clone https://github.com/jpmalek/nextjs-monorepo-template.git
```

### 2. Create a new repository from the template:

1. If you've already cloned the template repository, set the GITHUB_PERSONAL_TOKEN environment variable locally and then run the "SETUP - step 1" script using the following command, which will run in the current shell properly (vs ./SETUP-step 1-create repo.sh which will run in a subshell and not affect the current shell). This will ask you for a repository name, create a new repository from this template, clone it to your local machine, and cd to the new repository.

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

1. Create a Personal Access Token (PAT) with repo scope
2. Add it as a repository secret named PAT in your GitHub repository settings (Settings > Secrets > Actions > New repository secret)
3. Go to the new repository on Github and click **Settings**
4. VERIFY:



### 4. Install Docker and Docker Compose

This project is configured to use Docker for development and testing in an environment that closely mimics the Vercel production environment on Ubuntu.

1. Install Docker and Docker Compose if they are not already installed.

TODO: each package will be deployed to its own container — each package should have its own Dockerfile.

### 5. Build and start the development containers

```bash
docker-compose up
```

This will start both the web and API services in development mode.

### 6. Development Workflow

The Docker setup includes:

- **Web Service**: NextJS web application running on port 3000
- **API Service**: API server running on port 3001
- **Test Service**: Environment for running tests that mimics production
- **Lint Service**: Service for running linting checks

All services use the same Docker image based on Ubuntu 22.04 with Node.js 18 (matching Vercel's Node.js version).

## Common Commands

### 7. Start just the web application

```bash
docker-compose up web
```

### 8. Start just the API server

```bash
docker-compose up api
```

### 9. Run tests in production-like environment

```bash
docker-compose run test
```

### 10. Run lint checks

```bash
docker-compose run lint
```

### 11. Execute commands in a running container

```bash
docker-compose exec web bash
```

Then run your commands inside the container.

### 12. Build without cache

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

### 13. TODO: pick up here. delete test repo # 1

### 14. Install pnpm and dependencies

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

### 15. Create environment files

Create `.env.local` files in both packages:

```bash
apps/api/.env.local
apps/web/.env.local
```

Add the following contents:

```bash
# apps/api/.env.local
HELLO_MESSAGE=hello world
PORT=3001

# apps/web/.env.local
NEXT_PUBLIC_API_URL=http://localhost:3001/api/hello
```

### 16. Add a hello world route

Inside `apps/api`, create `pages/api/hello.ts` with the following code:

```ts
export default function handler(req: any, res: any) {
  res.status(200).json({ message: process.env.HELLO_MESSAGE || "hello world" });
}
```

### 17. Display the message in the web app

Update `apps/web/pages/index.tsx`:

```tsx
import { useEffect, useState } from "react";

export default function Home() {
  const [message, setMessage] = useState("loading...");

  useEffect(() => {
    fetch(process.env.NEXT_PUBLIC_API_URL as string)
      .then((res) => res.json())
      .then((data) => setMessage(data.message));
  }, []);

  return <div>{message}</div>;
}
```

### 18. Run locally

Start both projects in separate terminals:

```bash
pnpm dev:api
pnpm dev:web
```

Visit `http://localhost:3000` and you should see `hello world` displayed.

### 19. Use Docker for local development

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

### 20. Create Vercel projects

1. Create **two** Vercel projects, one for `apps/web` and one for `apps/api`.
2. When connecting each project to GitHub, set the **Root Directory** to the corresponding package (`apps/web` or `apps/api`).
3. Use these settings for both projects:
   - **Install Command:** `pnpm install --frozen-lockfile`
   - **Build Command:**
     - Web: `pnpm --filter web build`
     - API: `pnpm --filter api build`
   - **Output Directory:** `.next`
4. Add the environment variables from your local `.env.local` files to the project settings.
5. Deploy by pushing your code to GitHub.

After deployment, the web project will fetch the greeting from the API project, and visiting the web URL will display `hello world`.
