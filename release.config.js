module.exports = {
  branches: ['production'],
  plugins: [
    '@semantic-release/commit-analyzer',
    '@semantic-release/release-notes-generator',
    '@semantic-release/changelog',
    '@semantic-release/git',
    '@semantic-release/github',
    [
      '@semantic-release/exec',
      {
        successCmd: `
          if echo "$GITHUB_RELEASE_NOTES" | grep -q "web:"; then
            curl -X POST https://api.vercel.com/v13/deployments \
              -H "Authorization: Bearer $VERCEL_TOKEN" \
              -H "Content-Type: application/json" \
              -d '{"projectId":"'$VERCEL_WEB_PROJECT_ID'","target":"production","teamId":"'$VERCEL_TEAM_ID'"}'
          fi

          if echo "$GITHUB_RELEASE_NOTES" | grep -q "api:"; then
            curl -X POST https://api.vercel.com/v13/deployments \
              -H "Authorization: Bearer $VERCEL_TOKEN" \
              -H "Content-Type: application/json" \
              -d '{"projectId":"'$VERCEL_API_PROJECT_ID'","target":"production","teamId":"'$VERCEL_TEAM_ID'"}'
          fi
        `
      }
    ]
  ]
};