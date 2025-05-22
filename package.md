# Documentation for `.`

**Package Name**: `nextjs-monorepo`
**Version**: `0.0.0`

## Scripts
- `dev:web`: `pnpm --filter web dev`
- `dev:api`: `pnpm --filter api dev`
- `prepare`: `husky install`
- `release`: `changeset version && changeset publish`
- `lint`: `eslint "packages/**/*.{ts,tsx}" --max-warnings=0`
- `lint:check`: `eslint "packages/**/*.{ts,tsx}" --max-warnings=0`
- `test`: `vitest run`

## Dependencies
- `cross-env` (^7.0.3): Run scripts that set and use environment variables across platforms
- `next` (15.3.2): The React Framework
- `next-sitemap` (^4.2.3): Sitemap generator for next.js
- `react` (^19.1.0): React is a JavaScript library for building user interfaces.
- `react-dom` (19.1.0): React package for working with the DOM.
- `sharp` (0.34.2): High performance Node.js image processing, the fastest module to resize JPEG, PNG, WebP, GIF, AVIF and TIFF images
- `tailwind-merge` (^3.3.0): Merge Tailwind CSS classes without style conflicts
- `tailwindcss-animate` (^1.0.7): A Tailwind CSS plugin for creating beautiful animations.

## Dev Dependencies
- `@changesets/changelog-github` (^0.5.1): A changelog entry generator for GitHub that links to commits, PRs and users
- `@changesets/cli` (^2.29.4): Organise your package versioning and publishing to make both contributors and maintainers happy
- `@commitlint/cli` (^19.8.1): Lint your commit messages
- `@commitlint/config-conventional` (^19.8.1): Shareable commitlint config enforcing conventional commits
- `@tailwindcss/postcss` (^4.1.7): PostCSS plugin for Tailwind CSS, a utility-first CSS framework for rapidly building custom user interfaces
- `@types/node` (^22.15.20): TypeScript definitions for node
- `@types/react` (^19.1.4): TypeScript definitions for react
- `@types/react-dom` (^19.1.5): TypeScript definitions for react-dom
- `@typescript-eslint/eslint-plugin` (^8.32.1): TypeScript plugin for ESLint
- `@typescript-eslint/parser` (^8.32.1): An ESLint custom parser which leverages TypeScript ESTree
- `clsx` (^2.1.1): A tiny (239B) utility for constructing className strings conditionally.
- `eslint` (^9.27.0): An AST-based pattern checker for JavaScript.
- `fast-glob` (^3.3.3): It's a very fast and efficient glob library for Node.js
- `husky` (^9.1.7): Modern native Git hooks
- `node-fetch` (^3.3.2): A light-weight module that brings Fetch API to node.js
- `pnpm` (^10.11.0): Fast, disk space efficient package manager
- `tailwindcss` (^4.1.7): A utility-first CSS framework for rapidly building custom user interfaces.
- `typescript` (^5.8.3): TypeScript is a language for application scale JavaScript development
- `vitest` (^3.1.4): Next generation testing framework powered by Vite
- `execa` (^9.5.3): Process execution for humans