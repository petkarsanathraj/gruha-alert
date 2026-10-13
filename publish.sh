#!/bin/zsh
# Daily refresh for GruhaAlert, run from the Mac (the only machine that can reach
# the KHB govt site, which blocks foreign/cloud servers).
#
# Flow: scrape KHB -> commit fresh seed.json -> push to GitHub. Vercel is connected
# to this repo, so the push auto-deploys (server-side build with the new data).
# No flaky `vercel deploy` upload, no deploy hook needed.
export PATH="/opt/homebrew/bin:$HOME/.local/node22/bin:/usr/bin:/bin:/usr/sbin:/sbin"
export INDEXNOW_ENABLED=1   # notify Bing/IndexNow of changed notices after each scrape
cd "$(dirname "$0")" || exit 1
export NODE_EXTRA_CA_CERTS="$PWD/worker/khb-intermediate.pem"  # KHB's server omits this GlobalSign intermediate cert

# Runs at login, 9:30 and hourly; only the first successful run after 9:30 each day does work.
STAMP=.last-run
[ "$(date +%H%M)" -lt 0930 ] && exit 0
[ "$(cat $STAMP 2>/dev/null)" = "$(date +%F)" ] && exit 0

echo "=== $(date) ===" >> publish.log
if ! node worker/scrape.mjs >> publish.log 2>&1; then
  echo "scrape failed, skipping deploy $(date)" >> publish.log
  exit 0
fi
date +%F > $STAMP

if git diff --quiet -- data/seed.json; then
  echo "no data change, nothing to deploy $(date)" >> publish.log
  exit 0
fi

git add data/seed.json >> publish.log 2>&1
git -c user.name="gruha-bot" -c user.email="bot@gruha-alert.local" \
    commit -m "data: refresh KHB plots $(date -u +%F)" >> publish.log 2>&1
if git push origin main >> publish.log 2>&1; then
  echo "pushed → Vercel auto-deploys $(date)" >> publish.log
else
  echo "git push failed $(date)" >> publish.log
fi
