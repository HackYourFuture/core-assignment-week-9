# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

HackYourFuture (HYF) educational assignment repository for the Core Program. Contains two independent tasks teaching REST APIs and HTTP requests to trainees (refugees/displaced people training for tech careers). Trainees typically have no prior programming experience.

Our students are called **"trainees"** — never use the word "student" in documentation (`.md` files). Code files (`.js`) are exempt.

## Commands

```bash
npm start                # Start Task 1 Express server on port 3000
npm test                 # Run all tests (Vitest)
npm run test:task-1      # Run Task 1 tests only
npm run test:task-2      # Run Task 2 tests only
```

No linting or formatting tools are configured.

## Architecture

### Task 1: Users REST API + curl scripts

Express.js server (`task-1/server/server.js`) with JSON file storage (`task-1/server/users.json`). Trainees write four bash scripts (`solutions/task-1/{get,post,patch,delete}.sh`) using `curl` to interact with the API. Passwords are bcrypt-hashed on write and excluded from all responses.

### Task 2: Nobel Prizes Web App

Client-side app fetching from `https://api.nobelprize.org/2.1`. Trainees complete `task-2/services.js` to construct URLs with query parameters (year, category, offset, limit, sort). The dependency chain: `index.js` -> `ui.js` -> `services.js` -> `fetcher.js` -> `fetch API`.

### Tests

Vitest with no config file. Task 1 tests seed `users.json` from `tests/seed.json`, then exec bash scripts via `child_process`. Task 2 tests mock `global.fetch` and validate URL construction. Test titles contain point values in `[n]` format for auto-grading (passing score: 50%).

### Auto-grading

GitHub Actions (`.github/workflows/grade-assignment.yml`) triggers on PRs to main. Runs `.hyf/test.sh` which starts the server, runs Vitest with JSON reporter, then `.hyf/tester.js` parses results into `score.json`.

## Internal Infrastructure

The `.hyf/` folder contains CI/grading infrastructure and is exempt from trainee-facing and cross-platform rules.

## Code Style for Trainee-Facing Code

- Prefer simple, inline code over abstractions to aid comprehension
- Offer hints where repetition could be reduced
- README files are trainee-facing; don't expose internal/admin details
- All code must work cross-platform (macOS, Windows, Linux)
- ES modules throughout (`"type": "module"` in package.json)
