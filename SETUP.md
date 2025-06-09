# Setup local project and Github

- npm install -g corepack && corepack prepare pnpm@latest --activate # corepack manages pnpm versions bestpnpm
- npx create-turbo@latest -e kitchen-sink
  - project-name
  - use pnpm
- cd project-name, pnpm dlx turbo login && npx turbo link
- pnpm install && pnpm build
- browse to Github and create a new repository, no README, no .gitignore, no license
- git init
- git remote add origin <remote-repo-url>
- git branch -M staging # use staging instead of main
- git add .
- git commit -m "Initial commit"
- git push -u origin staging
- pnpm dlx sherif@latest
- Navigate to your repository settings on GitHub.In the left sidebar, go to Actions > General. Scroll down to the Workflow permissions section.Ensure that the option "Allow GitHub Actions to create and approve pull requests" is checked/enabled.

# Setup AI rules

- Windsurf: go to Windsurf settings -> Local Rules -> Edit rules
  - add @AGENTS.md to reference the agent rules and reuse across agents.
- Cursor:

# Setup new Vercel website app

- mkdir apps/website
- cd apps/website
- cd payload
- git clone git@github.com:payloadcms/payload.git
- cp -R payload/templates/with-vercel-postgres/.(D) . # to get all dot files as well
- delete the payload folder
- Ask AI: I've added a new website app to the project. Please review all repository files and settings and suggest updates so that this new project is properly integrated with the repo. AGENTS.md, package.json and any other configuration files should be updated and if necessary updated, so that the new project is consistent with the rest of the monorepo.
- Deploy to Vercel in new app
- Make node and pnpm and next.js version the same for all apps and packages
- Fix package issues with Payload and drizzle-kit
- Centralize where the node and pnpm and next.js version are defined

# Develop
- Install the Prettier extension in your IDE.
- Use AI to generate draft code commit messages.
- Use the Chrome DevTools console for additional quality checks and debugging.