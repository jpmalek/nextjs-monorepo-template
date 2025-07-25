#!/bin/bash

set -euo pipefail

# === CONFIGURATION ===
UPSTREAM_REMOTE="${1:-${UPSTREAM_REMOTE:-upstream}}"
UPSTREAM_BRANCH="${2:-${UPSTREAM_BRANCH:-staging}}"
WORKING_BRANCH="${3:-${WORKING_BRANCH:-staging}}"
EXCLUDE_FILES=("package.json" "package-lock.json" "pnpm-lock.yaml" "yarn.lock")
TMP_BRANCH="upstream-merge-$(date +%Y-%m-%d-%H-%M)"
IS_GITHUB_ACTION="${GITHUB_ACTIONS:-false}"

# === IDENTIFIER for Upstream Repository ===
# Normalized format: github.com/owner/repo (no .git, slash-separated)
UPSTREAM_IDENTIFIER="github.com/jpmalek/nextjs-monorepo-template"

# === FUNCTION: Normalize a remote URL ===
normalize_url() {
  local url="$1"
  url="${url%.git}"          # remove trailing .git
  url="${url/://}"           # change first ':' to '/'
  url="${url#git@}"          # remove git@ prefix
  url="${url#https://}"      # remove https:// prefix
  echo "$url"
}

# === SAFETY CHECK: Exit if this repo is the upstream ===
ORIGIN_URL=$(git remote get-url origin 2>/dev/null || echo "")
# echo "ORIGIN_URL: $ORIGIN_URL"
origin_norm=$(normalize_url "$ORIGIN_URL")
# echo "origin_norm: $origin_norm"
# echo "UPSTREAM_IDENTIFIER: $UPSTREAM_IDENTIFIER"

if [[ "$origin_norm" == "$UPSTREAM_IDENTIFIER" ]]; then
  echo "❌ Error: This is the upstream repository."
  echo "   The sync script is meant to run only in a downstream/private clone."
  exit 1
fi

# === START SCRIPT ===
echo "🔄 Fetching from $UPSTREAM_REMOTE..."
git fetch "$UPSTREAM_REMOTE"

echo "🌿 Creating temporary merge branch: $TMP_BRANCH"
git checkout -b "$TMP_BRANCH" "$UPSTREAM_REMOTE/$UPSTREAM_BRANCH"

echo "🚫 Reverting excluded files: ${EXCLUDE_FILES[*]}"
for name in "${EXCLUDE_FILES[@]}"; do
  for path in $(git ls-files | grep "/$name$\|^$name$"); do
    echo "  - Resetting $path"
    git restore --source="$WORKING_BRANCH" "$path" || true
  done
done

# === SKIP IF NO CHANGES ===
if git diff --quiet; then
  echo "✅ No non-package file changes detected. Cleaning up."
  git checkout "$WORKING_BRANCH"
  git branch -D "$TMP_BRANCH"

  if [[ "$IS_GITHUB_ACTION" == "true" ]]; then
    echo "skipped=true" >> "$GITHUB_OUTPUT"
  fi
  exit 0
fi

# === COMMIT MERGED CHANGES ===
echo "📦 Committing non-package upstream changes..."
git commit -am "Merge $UPSTREAM_REMOTE/$UPSTREAM_BRANCH without package file changes"

echo "IS_GITHUB_ACTION: $IS_GITHUB_ACTION"
echo "GITHUB_TOKEN: $GITHUB_TOKEN"

if [[ "$IS_GITHUB_ACTION" != "true" && -n "${GITHUB_TOKEN:-}" ]]; then
  echo "📬 Creating pull request via GitHub API..."

  REPO_SLUG=$(normalize_url "$ORIGIN_URL")  # e.g. github.com/owner/repo
  REPO_SLUG="${REPO_SLUG#github.com/}"       # remove domain prefix
  echo "REPO_SLUG: $REPO_SLUG"

  API_URL="https://api.github.com/repos/$REPO_SLUG/pulls"
  echo "API_URL: $API_URL"

  PR_PAYLOAD=$(jq -n \
    --arg title "Sync upstream/$UPSTREAM_BRANCH (excluding package files)" \
    --arg head "$TMP_BRANCH" \
    --arg base "$WORKING_BRANCH" \
    --arg body "This PR includes upstream changes excluding dependency files. Auto-created by sync-upstream.sh." \
    '{title: $title, head: $head, base: $base, body: $body}'
  )
  echo "PR_PAYLOAD: $PR_PAYLOAD"
  RESPONSE=$(curl -s -X POST "$API_URL" \
    -H "Authorization: token $GITHUB_TOKEN" \
    -H "Content-Type: application/json" \
    -d "$PR_PAYLOAD")
  echo "RESPONSE: $RESPONSE"
  if echo "$RESPONSE" | grep -q '"html_url":'; then
    echo "✅ Pull request created:"
    echo "$RESPONSE" | jq -r '.html_url'
  else
    echo "❌ Failed to create pull request:"
    echo "$RESPONSE"
  fi
else   
    echo "Either running as a Github Action or no GITHUB_TOKEN is set."
    echo "skipped=false" >> "$GITHUB_OUTPUT"
fi
