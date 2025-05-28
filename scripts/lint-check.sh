#!/bin/bash
set -e

# Print the current directory for debugging
echo "Running lint check from $(pwd)"

# Run the linting check with strict settings
echo "Executing: pnpm run lint:check"
pnpm run lint:check

# Report the exit status
EXIT_CODE=$?
if [ $EXIT_CODE -eq 0 ]; then
  echo "✅ Lint check passed!"
else
  echo "❌ Lint check failed with exit code: $EXIT_CODE"
fi

exit $EXIT_CODE
