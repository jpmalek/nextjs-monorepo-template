#!/bin/bash
# This script should be run from the repo root, and it:
# 1. Checks to see if it's being run from the upstream repo and bails if so.
# 2. Fetches the upstream repo and creates a temporary branch.
# 3. Reverts excluded files from the temporary branch.
# 4. Commits the changes and creates a pull request.
# 5. Cleans up the temporary branch.

set -euo pipefail

# === CONFIGURATION ===
UPSTREAM_REMOTE="${1:-${UPSTREAM_REMOTE:-upstream}}"
UPSTREAM_BRANCH="${2:-${UPSTREAM_BRANCH:-staging}}"
WORKING_BRANCH="${3:-${WORKING_BRANCH:-staging}}"
EXCLUDE_FILES=("sync-upstream.sh" "package.json" "package.md" "package-lock.json" "pnpm-lock.yaml" "yarn.lock")
TMP_BRANCH="upstream-merge-$(date +%Y-%m-%d-%H-%M)"
IS_GITHUB_ACTION="${GITHUB_ACTIONS:-false}"

# === IDENTIFIER for Upstream Repository ===
UPSTREAM_IDENTIFIER="github.com/jpmalek/nextjs-monorepo-template"

normalize_url() {
  local url="$1"
  url="${url%.git}"
  url="${url/://}"
  url="${url#git@}"
  url="${url#https://}"
  echo "$url"
}

# === SAFETY CHECK: Bail if this is the upstream ===
ORIGIN_URL=$(git remote get-url origin 2>/dev/null || echo "")
origin_norm=$(normalize_url "$ORIGIN_URL")

if [[ "$origin_norm" == "$UPSTREAM_IDENTIFIER" ]]; then
  echo "❌ This is the upstream repo. Aborting."
  exit 1
fi

echo "🔄 Fetching upstream..."
git fetch "$UPSTREAM_REMOTE"

echo "🌿 Creating temp branch: $TMP_BRANCH"
git checkout -b "$TMP_BRANCH" "$WORKING_BRANCH"
git merge --no-commit --no-ff -X theirs "$UPSTREAM_REMOTE/$UPSTREAM_BRANCH"

# === CLEAN OUT EXCLUDED FILES ===
echo "🧹 Force-reverting all excluded files..."

for pattern in "${EXCLUDE_FILES[@]}"; do
  echo "🔍 Searching for pattern: $pattern"
  # Prevent grep failure from killing the script
  git ls-files | grep -E "(^|/)$pattern$" || true | while read -r file; do
    echo "  - Cleaning: $file"
    if git ls-tree -r "$WORKING_BRANCH" --name-only | grep -Fxq "$file"; then
      git restore --source="$WORKING_BRANCH" --staged --worktree "$file"
    else
      git rm -f --cached "$file" 2>/dev/null || true
      rm -f "$file" 2>/dev/null || true
    fi
  done
done

# === SKIP IF NO CHANGES ===
if git diff --quiet "$WORKING_BRANCH"; then
  echo "✅ No remaining changes after exclusion. Cleaning up."
  git checkout "$WORKING_BRANCH"
  git branch -D "$TMP_BRANCH"
  if [[ "$IS_GITHUB_ACTION" == "true" ]]; then
    echo "skipped=true" >> "$GITHUB_OUTPUT"
  fi
  exit 0
fi

# === COMMIT ONLY NON-EXCLUDED FILES ===
echo "📦 Committing sanitized changes..."
git reset

for file in $(git diff --name-only "$WORKING_BRANCH"); do
  skip=false
  for pattern in "${EXCLUDE_FILES[@]}"; do
    if [[ "$file" == "$pattern" || "$file" == */"$pattern" ]]; then
      echo "  - Skipping excluded file: $file"
      skip=true
      break
    fi
  done
  if [[ "$skip" == false ]]; then
    echo "  - Adding file: $file"
    git add "$file"
  fi
done

echo "🔍 Staged files:"
git diff --cached --name-only

git commit -m "deps: merge $UPSTREAM_REMOTE/$UPSTREAM_BRANCH without excluded files"

# === PUSH AND CREATE PULL REQUEST IF NOT IN CI ===
if [[ "$IS_GITHUB_ACTION" != "true" ]]; then
  # === PUSH AND CREATE PULL REQUEST (using gh CLI) ===
if command -v gh >/dev/null; then
  echo "📬 Creating pull request using gh CLI..."

  # Push the branch first
  git push origin "$TMP_BRANCH"
  REPO_SLUG=$(git remote get-url origin | sed -E 's#(git@|https://)github.com[/:]##; s/\.git$//')
  # Create PR
  gh pr create \
    --repo "$REPO_SLUG" \
    --base "$WORKING_BRANCH" \
    --head "$TMP_BRANCH" \
    --title "Sync upstream/$UPSTREAM_BRANCH (excluding specific files)" \
    --body "This PR includes upstream changes excluding package/config files. Auto-created by sync-upstream.sh."

  echo "✅ Pull request created via gh."
else
  echo "❌ Error: gh CLI not found. Cannot create pull request."
  echo "   Please install GitHub CLI: https://cli.github.com/"
  echo "   Or fall back to using GITHUB_TOKEN and curl."
  exit 1
fi
else
  echo "⚠️ Skipping PR creation — either running in GitHub Actions or GITHUB_TOKEN is not set."
  echo "skipped=false" >> "$GITHUB_OUTPUT"
fi
git checkout "$WORKING_BRANCH"
git reset --hard "$WORKING_BRANCH"
git clean -fd
git branch -D "$TMP_BRANCH"