# Nordic Analytics — Portfolio Performance Dashboard

> Institutional-grade fund monitoring dashboard for private equity fund managers.
> Built with Next.js 16, React 19, TypeScript, Tailwind CSS v4, and Recharts.

---

## Getting Started

### Prerequisites

- Node.js >= 18.17.0
- npm >= 9.0.0

### Installation

```bash
# 1. Clone the repository
git clone https://github.com/your-org/nordic-dashboard.git
cd nordic-dashboard

# 2. Install dependencies
npm install

# 3. Start the development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### Production Build

```bash
npm run build
npm start
```

---

## Project Structure

```
nordic-dashboard/
├── app/
│   ├── components/        # UI components (KPI cards, chart, table, fund selector)
│   ├── data/              # funds.json static dataset
│   ├── hooks/             # Custom React hooks (useFund, useSort)
│   ├── lib/               # Utility functions (formatters, helpers)
│   ├── types/             # TypeScript interfaces
│   ├── globals.css        # Global styles + Tailwind theme tokens
│   ├── layout.tsx         # Root layout
│   └── page.tsx           # Dashboard entry point
├── public/
├── requirements.txt       # Human-readable dependency manifest
├── package.json
└── README.md
```

---

## Key Technical Decisions

### Next.js App Router
Chosen for its file-based routing, React Server Components support, and first-class
TypeScript integration. Even though this is a single-page dashboard, Next.js gives us
a production-ready build pipeline with zero config.

### Tailwind CSS v4
Utility-first approach allows rapid iteration on the dense institutional UI without
writing custom CSS files. Tailwind v4's CSS variable-based theming makes our dark
navy color system easy to maintain and extend.

### Recharts for NAV Chart
Recharts is React-native (no DOM manipulation), composes well with TypeScript, and
supports multi-line overlays out of the box — required for the multi-fund comparison
bonus feature.

### Static JSON Import (No Backend)
`funds.json` is imported directly as a module. This keeps the app fully static,
deployable to any CDN, and avoids infrastructure complexity for a dashboard of this
scope.

### clsx for Conditional Classes
Keeps component className logic readable when applying conditional styles (watch/risk
row highlighting, active fund tab states).

---

## Features

- [x] Fund selector (tab-based, reactive)
- [x] KPI summary cards (IRR, TVPI, DPI, RVPI, NAV)
- [x] NAV performance line chart (12-month history)
- [x] Portfolio company table with sortable columns
- [x] Watch row highlighting (amber)
- [x] At-risk row highlighting (red)
- [x] Negative EBITDA margin alert banner
- [x] Multi-fund NAV overlay (toggle comparison)
- [x] Responsive layout

---

## Known Limitations

- Data is static (no live API). Refreshing the page resets all UI state.
- No authentication or role-based access control.
- Currency is hardcoded as EUR. Multi-currency support would require an exchange rate feed.
- Chart does not support export to PNG/PDF out of the box.

---

## What I Would Add Given More Time

1. **Export to PDF** — generate a one-page fund tear sheet from dashboard state
2. **Date range filter** — allow the NAV chart to show custom time windows
3. **Benchmark overlay** — plot a benchmark index (e.g. MSCI Europe) on the NAV chart
4. **Drill-down company modal** — click a portfolio row to see full company detail
5. **Animated transitions** — smooth number countup on KPI cards when switching funds
6. **Unit tests** — Jest + React Testing Library for hooks and formatter utilities
7. **Storybook** — isolated component development and visual regression testing

---

*Nordic Analytics — Confidential*
