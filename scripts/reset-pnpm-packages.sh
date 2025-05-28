# execute this from the project root directory to clean all node_modules and pnpm-lock.yaml
# Remove node_modules and lock file
echo "Removing node_modules and pnpm-lock.yaml..."
rm -rf node_modules
rm -rf packages/*/node_modules
rm pnpm-lock.yaml

# Clean pnpm store
echo "Cleaning pnpm store..."
pnpm store prune
echo "Approving builds..."
pnpm approve-builds 
echo "Installing dependencies..."
pnpm install
echo "Updating dependencies..."
pnpm -r update --latest

