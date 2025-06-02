#!/bin/bash

# Teardown script to kill processes on ports 3000 and 3001

echo "🔫 Checking for processes on ports 3000 and 3001..."

for port in 3000 3001; do
  pid=$(lsof -ti :$port)
  if [ ! -z "$pid" ]; then
    echo "  Killing process $pid on port $port"
    kill -9 $pid
  else
    echo "  No process found on port $port"
  fi
done

echo "✅ Teardown complete"
