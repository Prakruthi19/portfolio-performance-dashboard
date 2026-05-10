# Portfolio Performance Dashboard

Institutional-grade fund monitoring dashboard for private equity fund managers.
Built with Next.js 16, React 19, TypeScript, Tailwind CSS v4, and Recharts.

---

## Running Locally

```bash
git clone https://github.com/your-org/portfolio-performance-dashboard.git
cd portfolio-performance-dashboard
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000). Node >= 18.17 required.

---

## Technical Decisions

**Next.js App Router** — file-based routing, first-class TypeScript, production-ready build pipeline with zero config.

**Tailwind CSS v4** — utility-first approach suits dense institutional UI. CSS variable theming keeps the dark navy token system maintainable.

**Recharts** — React-native, TypeScript-friendly, supports multi-line overlays out of the box for the fund comparison feature.

**Static JSON import** — `funds.json` imported directly as a module. No backend needed, fully static, deployable to any CDN.

**clsx** — keeps conditional className logic readable for watch/risk row states and active tab styles.

**KPI thresholds (design decision)** — trend arrows on KPI cards use standard private equity benchmarks: IRR ≥ 15% = strong, TVPI ≥ 2x = capital doubled, DPI ≥ 1x = full capital returned to LPs. These were not specified in the brief — applied from PE industry knowledge to make the dashboard feel functional rather than decorative. Can be removed or made configurable.

---

## Known Limitations

- Data is static — no live API, page refresh resets all UI state
- Currency hardcoded as EUR — multi-currency would require an exchange rate feed
- No chart export (PNG/PDF) out of the box
- No authentication or role-based access

---

## What I Would Add Given More Time

1. **Date range filter** — custom time windows on the NAV chart
2. **Benchmark overlay** — plot MSCI Europe or similar index alongside NAV
3. **Company drill-down modal** — click a portfolio row for full detail view
4. **PDF tear sheet export** — one-page fund summary from dashboard state
5. **Animated KPI transitions** — number countup when switching funds
6. **Unit tests** — Jest + React Testing Library for hooks and formatters