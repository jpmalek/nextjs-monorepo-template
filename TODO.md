TODO: make the evaluation 
    - The point of this excersize is to understand how well we'd work together, if you were brought on to the team. So in our meeting, you're free to use whatever tools you want, and ask me any questions you'd like, or ask me for help. This is how we'd work together. The point is not to gauge how smart you are, how much you know, or whether you can solve difficult problems. The point is to gauge how well we'd work together.
    - Prepare for our meeting: 
        - We will be creating a simple one page website in apps/web using Next.js and a simple API project in apps/api using NestJS. The website will perform all CRUD operations via the API project. 
        - Clone this monorepo locally. 
        - Review the monorepo to understand how it works, starting with README.md.
        - See if you can find any problems or issues with the monorepo. There's one problem in particular that is out of alignment with the requirements above. If you find anything, fix it and create a pull request. 
    

TODO: The local development environment is run within Docker.
TODO: check out Argo for CI/CD
TODO:
    - as of 5/28/2025 CI run takes 1m in staging.
    - manually change branch protection rules to require 1 approval and previous merge commit
    - Do not add or create new .js files in this repository. Use Typescript, and the .ts extension for standard TypeScript files, and .tsx only when the file contains JSX (i.e., HTML-like syntax used in React components).
TODO: notes from call with Grant
    Vercel: avoid PPR (ISR - vercel's version of this).
    Vercel: THey use opentelemetry, plug in 
    Vercel: image hosting is expensive via Next Image component
    Vercel: check out render
    Vercel: can be costly check out cloudflare, hard to beat for CDN, they partnered with open next, to hotwire next on cloudfrlare
    https://github.com/leerob/next-self-host
    https://opennext.js.org/cloudflare
    https://www.better-auth.com/
    ? enterprise account: nope, pro plan
    ? use case w/ cached docs: depends on costs
    ? auth: clerk
TODO: add MCP   
TODO: Vercel to notify me when build completes, with pass/fail and log.
TODO: Corepack vs...whatever I had before
    https://github.com/nodejs/corepack
    Corepack is a zero-runtime-dependency Node.js script that acts as a bridge between Node.js projects and the package managers they are intended to be used with during development. In practical terms, Corepack lets you use Yarn, npm, and pnpm without having to install them.
TODO: I don't like ../api/pages/api, and don't know what next.config.ts is actually doing wrt "not allowing" test files.

TODO: Next.js page files must have "page" in their filename, e.g. index.page.tsx. This is because we want .test.tsx and .test.tx files grouped with the page files, but without causing Next.js to treat them as pages.

TODO: All filename.ts and filename.tsx files have a matching test file in the format TODO: filename.test.ts or filename.test.tsx, in the same directory. Exceptions include:
 - Configuration files (\*.config.ts, eslint.config.ts, vitest.config.ts)
 - TypeScript declaration files (\*.d.ts)
 - Build artifacts (\*.tsbuildinfo)
