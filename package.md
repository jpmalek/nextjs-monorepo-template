# Documentation for `.`

**Package Name**: `nextjs-monorepo`
**Version**: `0.0.0`

## Scripts
- `dev:web`: `pnpm --filter web dev`
- `dev:api`: `pnpm --filter api dev`
- `build`: `turbo build`
- `build:web`: `pnpm --filter web build`
- `build:api`: `pnpm --filter api build`
- `start`: `turbo start`
- `start:web`: `pnpm --filter web start`
- `start:api`: `pnpm --filter api start`
- `prepare`: `husky install`
- `release`: `changeset version && changeset publish`
- `lint`: `eslint "{apps,packages}/**/*.{ts,tsx}" --max-warnings=0`
- `test`: `vitest run`
- `check-types`: `tsc --noEmit`
- `teardown`: `./scripts/teardown.sh`

## Dependencies
- `cross-env` (^7.0.3): Run scripts that set and use environment variables across platforms
- `next` (15.3.3): The React Framework
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
- `@eslint/js` (^9.28.0): ESLint JavaScript language implementation
- `@next/eslint-plugin-next` (^15.3.3): ESLint plugin for Next.js.
- `@tailwindcss/postcss` (^4.1.8): PostCSS plugin for Tailwind CSS, a utility-first CSS framework for rapidly building custom user interfaces
- `@testing-library/jest-dom` (^6.6.3): Custom jest matchers to test the state of the DOM
- `@testing-library/react` (^16.3.0): Simple and complete React DOM testing utilities that encourage good testing practices.
- `@types/node` (^22.15.29): TypeScript definitions for node
- `@types/react` (^19.1.6): TypeScript definitions for react
- `@types/react-dom` (^19.1.5): TypeScript definitions for react-dom
- `@types/webpack` (^5.28.5): TypeScript definitions for webpack
- `@typescript-eslint/eslint-plugin` (^8.33.1): TypeScript plugin for ESLint
- `@typescript-eslint/parser` (^8.33.1): An ESLint custom parser which leverages TypeScript ESTree
- `@vitejs/plugin-react` (^4.5.1): The default Vite plugin for React projects
- `clsx` (^2.1.1): A tiny (239B) utility for constructing className strings conditionally.
- `eslint` (^9.28.0): An AST-based pattern checker for JavaScript.
- `eslint-plugin-next` (^0.0.0): No description available.
- `execa` (^9.6.0): Process execution for humans
- `fast-glob` (^3.3.3): It's a very fast and efficient glob library for Node.js
- `globals` (^16.2.0): Global identifiers from different JavaScript environments
- `husky` (^9.1.7): Modern native Git hooks
- `ignore-loader` (^0.1.2): Webpack loader to ignore certain package on build.
- `jsdom` (^26.1.0): A JavaScript implementation of many web standards
- `node-fetch` (^3.3.2): A light-weight module that brings Fetch API to node.js
- `pnpm` (^10.11.1): Fast, disk space efficient package manager
- `tailwindcss` (^4.1.8): A utility-first CSS framework for rapidly building custom user interfaces.
- `turbo` (^2.5.4): Turborepo is a high-performance build system for JavaScript and TypeScript codebases.
- `typescript` (^5.8.3): TypeScript is a language for application scale JavaScript development
- `vitest` (^3.2.1): Next generation testing framework powered by Vite
- `webpack` (^5.99.9): Packs ECMAScript/CommonJs/AMD modules for the browser. Allows you to split your codebase into multiple bundles, which can be loaded on demand. Supports loaders to preprocess files, i.e. json, jsx, es7, css, less, ... and your custom stuff.