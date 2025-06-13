#!/bin/bash

# Teardown script to kill processes on ports 3000 and 3001
echo "🔫 Running docker-compose down --volumes --remove-orphans ..."
docker-compose down --volumes --remove-orphans
# Remove all Docker images associated with the project
docker rmi $(docker images -q 'nextjs-monorepo-template*')

# Remove all unused images
#docker image prune -a -f

# Remove all unused volumes
docker volume prune -f

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
