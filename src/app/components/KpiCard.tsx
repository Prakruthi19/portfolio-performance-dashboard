"use client";

import clsx from "clsx";

interface KpiCardProps {
  label: string;
  value: string;
  subLabel?: string;
  accent?: boolean;
  highlight?: "amber" | "green" | "cyan" | "pink";
  trend?: "up" | "down" | "neutral";
}

const HIGHLIGHT_STYLES = {
  amber: "text-[#f5a623]",
  green: "text-[#4ade80]",
  cyan:  "text-[#22d3ee]",
  pink:  "text-[#f472b6]",
};

const TREND_ICON = {
  up:      { symbol: "▲", color: "text-[#4ade80]" },
  down:    { symbol: "▼", color: "text-[#f87171]" },
  neutral: { symbol: "—", color: "text-[#3d5166]" },
};

export default function KpiCard({
  label,
  value,
  subLabel,
  accent = false,
  highlight = "amber",
  trend,
}: KpiCardProps) {
  const valueColor = accent ? HIGHLIGHT_STYLES[highlight] : "text-[#e8f0fe]";

  return (
    <div
      className={clsx(
        "relative flex flex-col justify-between",
        "bg-[#111823] border border-[#1e2a38]",
        "rounded-sm px-4 py-3 min-w-0",
        "hover:border-[#243452] transition-colors duration-150"
      )}
    >
      {/* Top accent line */}
      {accent && (
        <span
          className="absolute top-0 left-0 right-0 h-[1px]"
          style={{
            background:
              highlight === "amber" ? "#f5a623" :
              highlight === "green" ? "#4ade80" :
              highlight === "cyan"  ? "#22d3ee" :
              "#f472b6",
          }}
        />
      )}

      {/* Label */}
      <p className="font-mono text-[9px] tracking-widest uppercase text-[#3d5166] mb-2">
        {label}
      </p>

      {/* Value */}
      <div className="flex items-end justify-between gap-2">
        <p className={clsx("font-mono text-2xl font-bold tabular-nums leading-none", valueColor)}>
          {value}
        </p>
        {trend && (
          <span className={clsx("font-mono text-[10px] mb-0.5", TREND_ICON[trend].color)}>
            {TREND_ICON[trend].symbol}
          </span>
        )}
      </div>

      {/* Sub label */}
      {subLabel && (
        <p className="font-mono text-[9px] text-[#3d5166] tracking-wider mt-1.5">
          {subLabel}
        </p>
      )}
    </div>
  );
}