# Ensure pnpm is installed
if ! command -v pnpm &> /dev/null; then
  echo "📦 pnpm not found. Installing..."
  npm install -g pnpm
else
  echo "✅ pnpm is already installed."
fi

# Run Docker
echo "🐳 Running Docker Compose build and up..."
docker compose build
docker compose up

# Install dependencies
echo "📦 Running pnpm install..."
pnpm install

# Add base dependencies to filtered workspaces
echo "📦 Adding next, react, and react-dom to web and api..."
pnpm add next react react-dom --filter web
pnpm add next react react-dom --filter api

# Create .env.local files
touch packages/api/.env.local
touch packages/web/.env.local
echo "📝 Created .env.local files in packages/api and packages/web"

