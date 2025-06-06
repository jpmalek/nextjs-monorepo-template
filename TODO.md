
TODO: Scheduled Dependency Update Job
    Use a GitHub Action or cron job to run pnpm up --recursive weekly or biweekly on a dedicated branch (e.g., deps/update). Review changes via PR.
TODO: Renovate or Dependabot
    Use automated tools that open PRs with dependency upgrades, including changelogs and CI runs. They can be scoped by version range or package type.

TODO: Vercel to notify me when build completes, with pass/fail and log.
TODO: Corepack vs...whatever I had before
    https://github.com/nodejs/corepack
    Corepack is a zero-runtime-dependency Node.js script that acts as a bridge between Node.js projects and the package managers they are intended to be used with during development. In practical terms, Corepack lets you use Yarn, npm, and pnpm without having to install them.
TODO: I don't like ../api/pages/api, and don't know what next.config.ts is actually doing wrt "not allowing" test files.

TODO: Next.js page files must have "page" in their filename, e.g. index.page.tsx. This is because we want .test.tsx and .test.tx files grouped with the page files, but without causing Next.js to treat them as pages.

TODO: All filename.ts and filename.tsx files have a matching test file in the format TODO: filename.test.ts or filename.test.tsx, in the same directory. Exceptions include:
TODO: Configuration files (\*.config.ts, eslint.config.ts, vitest.config.ts)
TODO: TypeScript declaration files (\*.d.ts)
TODO: Build artifacts (\*.tsbuildinfo)
TODO: add MCP
The repository structure is as follows:
    apps/
    ├── web/ # Next.js
    ├── admin/ # Next.js + Payload
    ├── mobile/ # React Native
    ├── api/ # Next.js API
    ├── iac/ # Infrastructure as Code, Terragrunt and Terraform
    packages/
    ├── ui/ # Shared component library
    ├── utils/ # Shared utils

TODO: The product uses Redis.
TODO: Package dependencies are kept up to date, automatically documented, regularly audited for security, and limited to only what is necessary.
TODO: The local development environment is run within Docker.
TODO: Branch & Environment Mapping Rules

    | **Branch Name** | **Purpose**               | **Environment** |
    | --------------- | ------------------------- | --------------- |
    | staging         | Stable development base   | Staging         |
    | production      | Production-ready code     | Production      |
    | feature/\*      | Feature development       | Vercel Preview  |
    | bugfix/\*       | Bug fix development       | Vercel Preview  |
    | hotfix/\*       | Critical production fixes | Vercel Preview  |

22. TODO: Branching Rules
    1.  Create new work from staging using branches like:
        1. feature/loginpage
        2. bugfix/missingavatar
    2.  Never work directly on staging or production.
    3.  Use clear prefixes: feature/, hotfix/, bugfix/.
    4.  Always start hotfix/\* branches from production.
23. TODO: Pull Request Rules
    1.  Pull requests are **required** for all merges.
    2.  Target branches:
        1. feature/\* → staging
        2. hotfix/\* → production
        3. staging → production (release promotion)
    3.  All PRs must:
        1. Pass all **CI checks and tests**
        2. Be approved by **at least one reviewer**
        3. Be properly titled and linked to a work item.
24. Merging Rules
    1.  Use **Squash merges** for feature/\* → staging
    2.  Use **Merge commits** (not squash) for staging → production
    3.  Backmerge production → staging after hotfix
    4.  PR title must use [Conventional Commits](https://www.conventionalcommits.org/) style
25. **Environment Deployment Rules**
    1.  **Vercel Environment Mapping**:
        1. Each package in the monorepo corresponds to a separate Vercel project. For example:
           1. `web` package → `vercel-web` project
           2. `api` package → `vercel-api` project
        2. These projects are individually connected to the repository and follow the standard environment mapping:
           1. `staging` branch → Staging Environment
           2. `production` branch → Production Environment
           3. `feature/*`, `hotfix/*` branches → Preview Deployments
    2.  TODO: Deployments are triggered automatically via:
        1. Vercel Git Integration for each package (web/api)
        2. Manual API call from GitHub Actions for per-package deploys
26. **Hotfix Flow for critical production bugs**:
    1.  Create hotfix/fixname from production
    2.  Apply fix, open PR → production
    3.  Merge, trigger release
    4.  Backmerge production → staging to sync changes
27. **Versioning, Tagging, and Release Notes**
    1.  Use **Changesets** to track per-package version changes
    2.  Run `pnpm dlx changeset` to record a change with semver bump (major/minor/patch)
    3.  On merge to production, a manual approval is required before continuing the release process. Once approved, GitHub Actions will:
        1. Auto-version affected packages (e.g. web@1.2.3, api@0.9.1)
        2. Create a Git tag for each package
        3. Generate and publish GitHub Release with changelog
    4.  All commits **must follow Conventional Commit format**
        1. `feat(web): add dark mode`
        2. `fix(api): handle timeout edge case`
        3. `BREAKING CHANGE:` footer if applicable
28. **CI/CD Configuration Notes**
    1.  TODO: GitHub Actions workflow `.github/workflows/release.yml` handles:
        1. Semantic versioning via Changesets
        2. Package-level release and tagging
        3. Conditional Vercel deployment via API for changed packages
    2.  TODO: CI must:
        1. Run tests on all PRs
        2. Block merges if tests fail
        3. Use commitlint and husky to enforce commit message format locally
29. TODO: move this to SOP:
    1.  