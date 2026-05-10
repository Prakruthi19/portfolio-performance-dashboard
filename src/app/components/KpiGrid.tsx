"use client";

import KpiCard from "../components/KpiCard";
import { formatCurrency, formatPercent, formatMultiple } from "../lib/formatter";
import type { FundMetrics } from "../types";

interface KpiGridProps {
  metrics: FundMetrics;
  totalCommitments: number;
}

export default function KpiGrid({ metrics, totalCommitments }: KpiGridProps) {
  const { irr, tvpi, dpi, rvpi, nav } = metrics;

  // Deployment ratio: NAV vs total commitments
  const deploymentPct = ((nav / totalCommitments) * 100).toFixed(0);

  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3">

      {/* IRR */}
      <KpiCard
        label="IRR"
        value={formatPercent(irr)}
        subLabel="Net Internal Rate of Return"
        accent
        highlight="amber"
        trend={irr >= 15 ? "up" : irr >= 8 ? "neutral" : "down"}
      />

      {/* TVPI */}
      <KpiCard
        label="TVPI"
        value={formatMultiple(tvpi)}
        subLabel="Total Value to Paid-In"
        accent={tvpi >= 2}
        highlight="green"
        trend={tvpi >= 2 ? "up" : tvpi >= 1.5 ? "neutral" : "down"}
      />

      {/* DPI */}
      <KpiCard
        label="DPI"
        value={formatMultiple(dpi)}
        subLabel="Distributions to Paid-In"
        accent={dpi >= 1}
        highlight="cyan"
        trend={dpi >= 1 ? "up" : dpi >= 0.5 ? "neutral" : "down"}
      />

      {/* RVPI */}
      <KpiCard
        label="RVPI"
        value={formatMultiple(rvpi)}
        subLabel="Residual Value to Paid-In"
        accent={false}
        highlight="pink"
        trend="neutral"
      />

      {/* NAV */}
      <KpiCard
        label="Current NAV"
        value={formatCurrency(nav)}
        subLabel={`${deploymentPct}% of €${(totalCommitments / 1_000_000).toFixed(0)}M committed`}
        accent
        highlight="amber"
        trend="neutral"
      />

    </div>
  );
}