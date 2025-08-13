# Documentation for `.`

**Package Name**: `nextjs-monorepo`
**Version**: `0.0.0`

## Scripts
- `preinstall`: `node scripts/check-pnpm.js`
- `dev`: `turbo run dev`
- `dev:web`: `pnpm --filter web dev`
- `dev:api`: `pnpm --filter api dev`
- `build`: `turbo run build`
- `build:web`: `pnpm --filter web build`
- `build:api`: `pnpm --filter api build`
- `start`: `turbo run start`
- `start:web`: `pnpm --filter web start`
- `start:api`: `pnpm --filter api start`
- `prepare`: `husky`
- `release`: `changeset version && changeset publish`
- `lint`: `eslint "{apps,packages}/**/*.{ts,tsx}" --max-warnings=0`
- `test`: `vitest run`
- `check-types`: `pnpm -r --filter "./apps/*" --filter "./packages/*" exec tsc --noEmit`
- `teardown`: `./scripts/teardown.sh`
- `reset-packages`: `./scripts/reset-pnpm-packages.sh`

## Dev Dependencies
- `@changesets/changelog-github` (^0.5.1): A changelog entry generator for GitHub that links to commits, PRs and users
- `@changesets/cli` (^2.29.5): Organise your package versioning and publishing to make both contributors and maintainers happy
- `@commitlint/cli` (^19.8.1): Lint your commit messages
- `@commitlint/config-conventional` (^19.8.1): Shareable commitlint config enforcing conventional commits
- `@eslint/js` (^9.33.0): ESLint JavaScript language implementation
- `@next/eslint-plugin-next` (15.4.6): ESLint plugin for Next.js.
- `@tailwindcss/postcss` (^4.1.11): PostCSS plugin for Tailwind CSS, a utility-first CSS framework for rapidly building custom user interfaces
- `@testing-library/jest-dom` (^6.7.0): Custom jest matchers to test the state of the DOM
- `@testing-library/react` (^16.3.0): Simple and complete React DOM testing utilities that encourage good testing practices.
- `@types/node` (^24.2.1): TypeScript definitions for node
- `@types/react` (^19.1.10): TypeScript definitions for react
- `@types/react-dom` (^19.1.7): TypeScript definitions for react-dom
- `@types/webpack` (^5.28.5): TypeScript definitions for webpack
- `@typescript-eslint/eslint-plugin` (^8.39.1): TypeScript plugin for ESLint
- `@typescript-eslint/parser` (^8.39.1): An ESLint custom parser which leverages TypeScript ESTree
- `@vitejs/plugin-react` (^5.0.0): The default Vite plugin for React projects
- `clsx` (^2.1.1): A tiny (239B) utility for constructing className strings conditionally.
- `cross-env` (^10.0.0): Run scripts that set and use environment variables across platforms
- `eslint` (^9.33.0): An AST-based pattern checker for JavaScript.
- `eslint-plugin-next` (^0.0.0): No description available.
- `execa` (^9.6.0): Process execution for humans
- `fast-glob` (^3.3.3): It's a very fast and efficient glob library for Node.js
- `globals` (^16.3.0): Global identifiers from different JavaScript environments
- `husky` (^9.1.7): Modern native Git hooks
- `ignore-loader` (^0.1.2): Webpack loader to ignore certain package on build.
- `jsdom` (^26.1.0): A JavaScript implementation of many web standards
- `next` (15.4.6): The React Framework
- `node-fetch` (^3.3.2): A light-weight module that brings Fetch API to node.js
- `pnpm` (^10.14.0): Fast, disk space efficient package manager
- `react` (^19.1.1): React is a JavaScript library for building user interfaces.
- `react-dom` (^19.1.1): React package for working with the DOM.
- `tailwindcss` (^4.1.11): A utility-first CSS framework for rapidly building custom user interfaces.
- `turbo` (^2.5.5): Turborepo is a high-performance build system for JavaScript and TypeScript codebases.
- `typescript` (^5.9.2): TypeScript is a language for application scale JavaScript development
- `vitest` (^3.2.4): Next generation testing framework powered by Vite
- `webpack` (^5.101.1): Packs ECMAScript/CommonJs/AMD modules for the browser. Allows you to split your codebase into multiple bundles, which can be loaded on demand. Supports loaders to preprocess files, i.e. json, jsx, es7, css, less, ... and your custom stuff.