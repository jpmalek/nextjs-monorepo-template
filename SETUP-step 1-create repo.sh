#!/bin/bash

# Prompt for new repo name
read -p "Enter the name of your new GitHub repository: " REPO_NAME

# Check for GitHub token
if [ -z "$GITHUB_PERSONAL_TOKEN" ]; then
  echo "❌ GITHUB_PERSONAL_TOKEN environment variable is not set."
  exit 1
fi

# Configuration
GITHUB_USERNAME="jpmalek"
TEMPLATE_REPO="nextjs-monorepo-template"

# Create GitHub repo from template
echo "📦 Creating private repository '$REPO_NAME' from template..."

CREATE_RESPONSE=$(curl -s -w "%{http_code}" -o /tmp/create_repo_response.json \
  -X POST \
  -H "Authorization: token $GITHUB_PERSONAL_TOKEN" \
  -H "Accept: application/vnd.github+json" \
  https://api.github.com/repos/$GITHUB_USERNAME/$TEMPLATE_REPO/generate \
  -d "{\"owner\":\"$GITHUB_USERNAME\",\"name\":\"$REPO_NAME\",\"private\":true}")

if [ "$CREATE_RESPONSE" != "201" ]; then
  echo "❌ Failed to create repository. Response:"
  cat /tmp/create_repo_response.json
  exit 1
fi

echo "✅ Repository '$REPO_NAME' created."

# Move to parent directory and clone the new repo
cd ..
echo "📥 Cloning $REPO_NAME..."
git clone "https://github.com/$GITHUB_USERNAME/$REPO_NAME.git"

cd "$REPO_NAME" || exit 1
echo "📂 Entered repository directory: $(pwd)"

