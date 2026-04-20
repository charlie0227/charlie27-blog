#!/bin/bash
# First-time push helper
# Run from project root after downloading.
set -e

if [ ! -d .git ]; then
  git init
  git branch -M main
fi

git add .
git commit -m "Initial: Charlie's Field Notes WP theme + CI" || echo "Nothing to commit"

if ! git remote | grep -q origin; then
  git remote add origin https://github.com/charlie0227/charlie27-blog.git
fi

git push -u origin main
echo ""
echo "✓ Pushed to https://github.com/charlie0227/charlie27-blog"
echo ""
echo "Next: set secrets at"
echo "  https://github.com/charlie0227/charlie27-blog/settings/secrets/actions"
