# execute this from the project root directory to clean all node_modules and pnpm-lock.yaml
# Remove node_modules and lock file
rm -rf node_modules
rm -rf packages/*/node_modules
rm pnpm-lock.yaml

# Clean pnpm store
pnpm store prune
# @tailwindcss/oxide - Used by Tailwind CSS v3+ for faster builds
# esbuild - A fast JavaScript bundler
# sharp - Image processing library used by Next.js
pnpm approve-builds 

pnpm install

