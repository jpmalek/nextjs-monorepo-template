# Documentation for `.`

**Package Name**: `nextjs-monorepo`
**Version**: `0.0.0`

## Scripts
- `dev:web`: `pnpm --filter web dev`
- `dev:api`: `pnpm --filter api dev`
- `prepare`: `husky install`
- `release`: `changeset version && changeset publish`
- `lint`: `eslint "packages/**/*.{ts,tsx}"`
- `lint:check`: `eslint "packages/**/*.{ts,tsx}" --max-warnings=0`
- `test`: `vitest run`

## Dependencies
- `cross-env` (^7.0.3): Run scripts that set and use environment variables across platforms
- `next` (15.3.2): The React Framework
- `next-sitemap` (^4.2.3): Sitemap generator for next.js
- `react` (^19.1.0): React is a JavaScript library for building user interfaces.
- `react-dom` (19.1.0): React package for working with the DOM.
- `sharp` (0.32.6): High performance Node.js image processing, the fastest module to resize JPEG, PNG, WebP, GIF, AVIF and TIFF images
- `tailwind-merge` (^2.3.0): Merge Tailwind CSS classes without style conflicts
- `tailwindcss-animate` (^1.0.7): A Tailwind CSS plugin for creating beautiful animations.

## Dev Dependencies
- `@changesets/changelog-github` (^0.4.2): A changelog entry generator for GitHub that links to commits, PRs and users
- `@changesets/cli` (^2.26.0): Organise your package versioning and publishing to make both contributors and maintainers happy
- `@commitlint/cli` (^18.0.0): Lint your commit messages
- `@commitlint/config-conventional` (^18.0.0): Shareable commitlint config enforcing conventional commits
- `@tailwindcss/postcss` (^4): PostCSS plugin for Tailwind CSS, a utility-first CSS framework for rapidly building custom user interfaces
- `@types/node` (^20): TypeScript definitions for node
- `@types/react` (^19): TypeScript definitions for react
- `@types/react-dom` (^19): TypeScript definitions for react-dom
- `@typescript-eslint/eslint-plugin` (^8.32.1): TypeScript plugin for ESLint
- `@typescript-eslint/parser` (^8.32.1): An ESLint custom parser which leverages TypeScript ESTree
- `eslint` (^9.27.0): An AST-based pattern checker for JavaScript.
- `fast-glob` (^3.2.15): It's a very fast and efficient glob library for Node.js
- `husky` (^8.0.3): Modern native Git hooks
- `node-fetch` (^2.7.0): A light-weight module that brings Fetch API to node.js
- `tailwindcss` (^4): A utility-first CSS framework for rapidly building custom user interfaces.
- `typescript` (^5.3.3): TypeScript is a language for application scale JavaScript development
- `vitest` (^1.0.0): Next generation testing framework powered by Vite