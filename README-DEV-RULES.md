# SPEC: Development Rules

1. Objectve: to inform the foundational principles and their associated rules used during development and deployment. 
2. Rules:
    1. This document is to be updated when improvements or additions to the rules below are found.
    2. The product is built on a bullet-proof, error-free, high-quality, scaleable, high-performing, very fast, secure, efficient, API-based platform that relies heavily on caching for a snappy user experience. It’s implemented as cost-efficiently as possible.
    3. The product is built on Vercel, with the Next.js framework, TypeScript, Tailwind, Postgres via Neon, and Redis.
    4. All code is sourced from a single monorepo in Github. 
    5. All code is well documented, clean, consistently formatted, and follows the DRY principle (Don’t Repeat Yourself).
    6. All code is well instrumented with unit, component, integration, snapshot, mocking, and spying tests using the Vitest framework.
    7. ESLint is used for static code analysis, and Prettier for formatting.
    8. The Chrome DevTools console is used for additional quality checks and debugging. 
    9. All code commits are done via Changesets.
    10. pnpm is the default package manager used. Dependencies are kept up to date, regularly audited for security, and minimized where possible.
    11. The local development environment is run within Docker.
    12. Branch & Environment Mapping Rules
        
        
        | **Branch Name** | **Purpose** | **Environment** |
        | --- | --- | --- |
        | main | Stable development base | Staging |
        | production | Production-ready code | Production |
        | feature/* | Feature development | Vercel Preview |
        | bugfix/* | Bug fix development | Vercel Preview |
        | hotfix/* | Critical production fixes | Vercel Preview |
    13. Branching Rules
        1. Create new work from main using branches like:
            1. feature/loginpage
            2. bugfix/missingavatar
        2. Never work directly on main or production.
        3. Use clear prefixes: feature/, hotfix/, bugfix/.
        4. Always start hotfix/* branches from production.
    14. Pull Request Rules 
        1. Pull requests are **required** for all merges.
        2. Target branches:
            1. feature/* → main
            2. hotfix/* → production
            3. main → production (release promotion)
        3. All PRs must:
            1. Pass all **CI checks and tests**
            2. Be approved by **at least one reviewer**
            3. Be properly titled and linked to a work item.
    15. Merging Rules
        1. Use **Squash merges** for feature/* → main
        2. Use **Merge commits** (not squash) for main → production
        3. Backmerge production → main after hotfix
        4. PR title must use [Conventional Commits](https://www.conventionalcommits.org/) style
    16. **Environment Deployment Rules**
        1. **Vercel Environment Mapping**:
            1. Each package in the monorepo corresponds to a separate Vercel project. For example:
                1. `web` package → `vercel-web` project
                2. `api` package → `vercel-api` project
            2. These projects are individually connected to the repository and follow the standard environment mapping:
                1. `main` branch → Staging Environment
                2. `production` branch → Production Environment
                3. `feature/*`, `hotfix/*` branches → Preview Deployments
        2. Deployments are triggered automatically via:
            1. Vercel Git Integration for each package (web/api)
            2. Manual API call from GitHub Actions for per-package deploys
    17. **Hotfix Flow f**or critical production bugs:
        1. Create hotfix/fixname from production
        2. Apply fix, open PR → production
        3. Merge, trigger release
        4. Backmerge production → main to sync changes
    18. **Versioning, Tagging, and Release Notes**
        1. Use **Changesets** to track per-package version changes
        2. Run `pnpm dlx changeset` to record a change with semver bump (major/minor/patch)
        3. On merge to production, a manual approval is required before continuing the release process. Once approved, GitHub Actions will:
            1. Auto-version affected packages (e.g. web@1.2.3, api@0.9.1)
            2. Create a Git tag for each package
            3. Generate and publish GitHub Release with changelog
        4. All commits **must follow Conventional Commit format**
            1. `feat(web): add dark mode`
            2. `fix(api): handle timeout edge case`
            3. `BREAKING CHANGE:` footer if applicable
    19. **CI/CD Configuration Notes**
        1. GitHub Actions workflow `.github/workflows/release.yml` handles:
            1. Semantic versioning via Changesets
            2. Package-level release and tagging
            3. Conditional Vercel deployment via API for changed packages
        2. CI must:
            1. Run tests on all PRs
            2. Block merges if tests fail
            3. Use commitlint and husky to enforce commit message format locally
