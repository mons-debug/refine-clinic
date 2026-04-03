#!/bin/bash
export PATH="/usr/local/bin:$PATH"
exec /usr/local/bin/node node_modules/.bin/next dev --webpack --port "${PORT:-3000}"
