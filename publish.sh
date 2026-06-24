#!/bin/zsh
# Daily refresh for GruhaAlert, run from the Mac (the only machine that can reach
# the KHB govt site, which blocks foreign/cloud servers).
#
# Flow: scrape KHB -> commit fresh seed.json -> push to GitHub -> ping the Vercel
# Deploy Hook. The hook makes Vercel build the LATEST commit server-side (with the
# new data) — reliable, no flaky `vercel deploy` upload, no dependence on the
# git auto-trigger. The hook URL lives in .deployhook (gitignored; repo is public).
export PATH="/opt/homebrew/bin:$HOME/.nvm/versions/node/v22.22.3/bin:/usr/bin:/bin:/usr/sbin:/sbin"
cd "$(dirname "$0")" || exit 1

HOOK=$(cat .deployhook 2>/dev/null)

echo "=== $(date) ===" >> publish.log
if ! node worker/scrape.mjs >> publish.log 2>&1; then
  echo "scrape failed, skipping deploy $(date)" >> publish.log
  exit 0
fi

if git diff --quiet -- data/seed.json; then
  echo "no data change, nothing to deploy $(date)" >> publish.log
  exit 0
fi

git add data/seed.json >> publish.log 2>&1
git -c user.name="gruha-bot" -c user.email="bot@gruha-alert.local" \
    commit -m "data: refresh KHB plots $(date -u +%F)" >> publish.log 2>&1
git push origin main >> publish.log 2>&1 || echo "git push failed $(date)" >> publish.log

if [ -n "$HOOK" ]; then
  curl -sf -X POST "$HOOK" >> publish.log 2>&1 && echo "deploy hook fired $(date)" >> publish.log
else
  echo "no .deployhook file — deploy not triggered $(date)" >> publish.log
fi
