#!/usr/bin/env bash

{
  pushd ..
  /usr/bin/env npm install
  # Start the server
  /usr/bin/env npm start &
  sleep 3
  npx vitest run --reporter=json --outputFile=.hyf/report.json
  popd || exit
} >/dev/null

PASSING_SCORE=50 /usr/bin/env node tester.js

# Kill the server
kill -9 "$(lsof -t -i:3000)" >/dev/null 2>&1
