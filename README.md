# admin-blackroad-io

Part of the [BlackRoad OS](https://blackroad.io) ecosystem.

## Overview

Admin Control Panel for BlackRoad OS, Inc. A single-page static HTML/CSS/JavaScript dashboard for managing users, agents, payments, deployments, and system configuration.

## What's Working (Verified)

**158 automated tests passing** across 4 test suites. Every item below has been verified end-to-end.

### Pages (9 pages, all functional)

| Page | Status | What It Does |
|------|--------|--------------|
| Dashboard | Working | Stats grid (Total Users, Active Agents, Revenue, System Health), activity table (5 entries), performance chart (Chart.js line chart), real-time stat auto-increment every 5s |
| Analytics | Working | User Growth line chart (30-day), Revenue Breakdown bar chart (Free/Pro/Enterprise) |
| Users | Working | User table (4 users), search/filter by name or email, plan filter dropdown, Add User modal, Edit/Delete action buttons |
| Agents | Working | Agent table (4 agents: lucidia-v2, quantum-sim, code-analyzer, data-processor), stats cards (Running Agents, Avg Response Time, Total Requests), View/Configure/Stop actions |
| Payments | Working | Transaction table (4 transactions), stats cards (Total Revenue, Active Subscriptions, Failed Payments, MRR), status badges (paid/failed) |
| Deployments | Working | Deployment table (3 environments: Production, Staging, Development), version display, View/Rollback actions |
| Settings | Working | General settings form (Site Name, Admin Email), Maintenance Mode toggle switch, Stripe integration config (Publishable Key, Secret Key, Webhook Secret), Save/Reset buttons |
| Logs | Working | 50 color-coded log entries (INFO=green, WARN=yellow, ERROR=red, DEBUG=gray), monospace console-style display, dynamically generated on page load |
| API Keys | Working | API key table (3 keys: Production, Development, Mobile App), masked key display, Copy/Revoke actions, Generate Key modal trigger |

### UI Components (all verified)

- **Sidebar navigation** with 3 sections (Overview, Management, System) and active state highlighting
- **Page routing** via `showPage()` - click nav item, correct page displays, previous page hides
- **Modal system** - `openModal()` / `closeModal()` add/remove `.active` class
- **Search** - `searchUsers()` filters user table rows in real-time, resets on empty query
- **Stat cards** with icons, values, and trend indicators (up/down arrows with color)
- **Data tables** with column headers, row data, status badges, and action buttons
- **Badges** - 4 variants: success (green), warning (yellow), danger (red), info (blue)
- **Buttons** - 3 variants: primary (purple), secondary (outlined), danger (red)
- **Form inputs** - text, email, password, select, textarea, toggle switch
- **Charts** - 3 Chart.js visualizations (performance line, user growth line, revenue bar)
- **Dark theme** - pure black (#000) background with CSS custom properties throughout
- **Responsive design** - mobile breakpoint at 768px (sidebar collapses)

### CI/CD Pipeline

- **GitHub Actions CI** - Node.js 18, runs `npm test` on push to main/master and all PRs
- **Cloudflare Pages deployment** - brand compliance color checking, static site deploy
- **CodeQL security scanning** - automated vulnerability detection
- **Dependabot** - automated dependency updates
- **PR auto-merge** - squash merges Dependabot PRs when CI passes

## Tech Stack

- HTML5 / CSS3 / Vanilla JavaScript (no frameworks)
- Chart.js 4.4.0 (CDN)
- Node.js 18 + jsdom (testing)
- GitHub Actions (CI/CD)
- Cloudflare Pages (hosting)

## Getting Started

```bash
# View the admin panel (no build step needed)
open index.html

# Run the test suite
npm install
npm test
```

## Running Tests

```bash
npm test              # Run all 158 tests
npm run test:html     # HTML validation (68 tests)
npm run test:js       # JavaScript functions (28 tests)
npm run test:css      # CSS validation (43 tests)
npm run test:structure # Project structure (19 tests)
```

## License

Copyright 2025 BlackRoad OS, Inc.

## Links

- [BlackRoad OS](https://blackroad.io)
- [Documentation](https://docs.blackroad.io)
- [GitHub](https://github.com/BlackRoad-OS)
