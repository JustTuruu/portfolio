#!/bin/sh
# Renders cv/cv.html to cv.pdf at the site root with headless Chrome.
set -e
cd "$(dirname "$0")/.."
CHROME="${CHROME:-/Applications/Google Chrome.app/Contents/MacOS/Google Chrome}"
"$CHROME" --headless=new --disable-gpu --no-pdf-header-footer \
  --virtual-time-budget=5000 \
  --print-to-pdf="$PWD/cv.pdf" "file://$PWD/cv/cv.html"
