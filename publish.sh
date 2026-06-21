#!/bin/zsh
# Daily refresh for GruhaAlert, run from the Mac (the only machine that can reach
# the KHB govt site, which blocks foreign/cloud servers). It re-scrapes KHB and
# deploys the fresh data straight to Vercel via the CLI — no GitHub Action, no
# git auto-deploy needed.
export PATH="/opt/homebrew/bin:$HOME/.nvm/versions/node/v22.22.3/bin:/usr/bin:/bin:/usr/sbin:/sbin"
cd "$(dirname "$0")" || exit 1

# --no-wait: upload + submit the production deploy, then exit immediately.
# Vercel builds & promotes on its own. This avoids long-poll connection resets
# and keeps the scheduled job fast and reliable.
echo "=== $(date) ===" >> publish.log
if node worker/scrape.mjs >> publish.log 2>&1; then
  vercel deploy --prod --yes --no-wait >> publish.log 2>&1 && echo "deploy submitted OK $(date)" >> publish.log
else
  echo "scrape failed, skipping deploy $(date)" >> publish.log
fi
