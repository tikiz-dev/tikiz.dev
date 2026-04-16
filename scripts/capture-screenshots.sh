#!/usr/bin/env bash
# Capture screenshots of running dev servers using Chrome's built-in
# headless mode. No npm install needed.
#
# Usage:
#   ./scripts/capture-screenshots.sh <url> <output.png> [width] [height]
#
# Example:
#   ./scripts/capture-screenshots.sh http://localhost:3001 \
#     public/work/wd/hero.png 1440 900

set -euo pipefail

CHROME="/Applications/Google Chrome.app/Contents/MacOS/Google Chrome"
URL="${1:?need URL}"
OUT="${2:?need output path}"
WIDTH="${3:-1440}"
HEIGHT="${4:-900}"

mkdir -p "$(dirname "$OUT")"

echo "→ Capturing $URL → $OUT (${WIDTH}x${HEIGHT})"

"$CHROME" \
  --headless=new \
  --disable-gpu \
  --hide-scrollbars \
  --window-size="${WIDTH},${HEIGHT}" \
  --screenshot="$OUT" \
  --virtual-time-budget=4000 \
  --default-background-color=00000000 \
  "$URL" \
  2>/dev/null

if [ -f "$OUT" ]; then
  SIZE=$(stat -f%z "$OUT" 2>/dev/null || stat -c%s "$OUT")
  echo "✓ saved ($SIZE bytes)"
else
  echo "✗ failed"
  exit 1
fi
