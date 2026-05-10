"use client";

import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";
import type { Fund, NavDataPoint } from "../types";
import { formatCurrency, formatCurrencyFull, formatMonth } from "../lib/formatter";
import clsx from "clsx";

interface NavChartProps {
  selectedFund: Fund;
  overlayFunds: Fund[];
  overlayFundIds: string[];
  allFunds: Fund[];
  onToggleOverlay: (fundId: string) => void;
}

// One color per fund slot — amber for selected, others for overlays
const FUND_COLORS = ["#f5a623", "#22d3ee", "#4ade80", "#f472b6"];

// Merge navHistory from multiple funds into one array keyed by month
function mergeNavData(
  selectedFund: Fund,
  overlayFunds: Fund[]
): Record<string, number | string>[] {
  const allFunds = [selectedFund, ...overlayFunds];
  const months = selectedFund.navHistory.map((d) => d.month);

  return months.map((month) => {
    const row: Record<string, number | string> = {
      month,
      label: formatMonth(month),
    };
    allFunds.forEach((fund) => {
      const point = fund.navHistory.find((d) => d.month === month);
      row[fund.id] = point ? point.nav : 0;
    });
    return row;
  });
}

// Custom tooltip
function CustomTooltip({
  active,
  payload,
  label,
}: {
  active?: boolean;
  payload?: { name: string; value: number; color: string }[];
  label?: string;
}) {
  if (!active || !payload?.length) return null;

  return (
    <div className="bg-[#111823] border border-[#1e2a38] rounded-sm px-3 py-2 shadow-xl min-w-[260px]">
      <p className="font-mono text-[9px] text-[#3d5166] tracking-widest uppercase mb-2">
        {label}
      </p>
      {payload.map((entry) => (
        <div key={entry.name} className="flex items-center gap-2 mb-1">
          <span
            className="w-2 h-2 rounded-full inline-block"
            style={{ backgroundColor: entry.color }}
          />
          <span className="font-mono text-[10px] text-[#7a8fa8]">
            {entry.name}
          </span>
          <span className="font-mono text-[11px] font-bold text-[#e8f0fe] ml-auto pl-3">
            {formatCurrencyFull(entry.value)}
          </span>
        </div>
      ))}
    </div>
  );
}

export default function NavChart({
  selectedFund,
  overlayFunds,
  overlayFundIds,
  allFunds,
  onToggleOverlay,
}: NavChartProps) {
  // Deduplicate: if selected fund was previously an overlay, remove it to avoid duplicate keys
  const dedupedOverlays = overlayFunds.filter((f) => f.id !== selectedFund.id);
  const chartData = mergeNavData(selectedFund, dedupedOverlays);
  const activeFunds = [selectedFund, ...dedupedOverlays];

  // Y-axis formatter
  const formatYAxis = (value: number) => formatCurrency(value);

  return (
    <div className="bg-[#111823] border border-[#1e2a38] rounded-sm p-4">

      {/* Header */}
      <div className="flex items-center justify-between mb-4 flex-wrap gap-3">
        <div>
          <p className="font-mono text-[9px] tracking-widest uppercase text-[#3d5166]">
            NAV Performance
          </p>
          <p className="font-mono text-xs text-[#7a8fa8] mt-0.5">
            12-Month Net Asset Value · Jan – Dec 2024
          </p>
        </div>

        {/* Overlay toggles */}
        <div className="flex items-center gap-2 flex-wrap">
          <span className="font-mono text-[9px] text-[#3d5166] tracking-widest uppercase mr-1">
            Overlay:
          </span>
          {allFunds
            .filter((f) => f.id !== selectedFund.id)
            .map((fund, i) => {
              const isActive = overlayFundIds.includes(fund.id);
              // color index: selected is 0 (amber), overlays start at 1
              const colorIndex = allFunds.findIndex((f) => f.id === fund.id);
              const color = FUND_COLORS[colorIndex] ?? FUND_COLORS[1];

              return (
                <button
                  key={fund.id}
                  onClick={() => onToggleOverlay(fund.id)}
                  className={clsx(
                    "font-mono text-[9px] tracking-wider px-2.5 py-1 rounded-sm border transition-all duration-150",
                    isActive
                      ? "border-current"
                      : "border-[#1e2a38] text-[#3d5166] hover:text-[#7a8fa8] hover:border-[#243452]"
                  )}
                  style={isActive ? { color, borderColor: color, backgroundColor: `${color}15` } : {}}
                >
                  {fund.name.split(" ").slice(-2).join(" ")}
                </button>
              );
            })}
        </div>
      </div>

      {/* Chart */}
      <div className="h-[260px] w-full">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={chartData} margin={{ top: 4, right: 8, left: 8, bottom: 0 }}>
            <CartesianGrid
              strokeDasharray="2 4"
              stroke="#1e2a38"
              vertical={false}
            />
            <XAxis
              dataKey="label"
              tick={{ fontFamily: "var(--font-geist-mono)", fontSize: 9, fill: "#3d5166" }}
              axisLine={{ stroke: "#1e2a38" }}
              tickLine={false}
              dy={6}
            />
            <YAxis
              tickFormatter={formatYAxis}
              tick={{ fontFamily: "var(--font-geist-mono)", fontSize: 9, fill: "#3d5166" }}
              axisLine={false}
              tickLine={false}
              width={52}
            />
            <Tooltip
              content={<CustomTooltip />}
              cursor={{ stroke: "#243452", strokeWidth: 1, strokeDasharray: "3 3" }}
            />
            {activeFunds.map((fund, i) => (
              <Line
                key={fund.id}
                type="monotone"
                dataKey={fund.id}
                name={fund.name}
                stroke={FUND_COLORS[i] ?? FUND_COLORS[0]}
                strokeWidth={i === 0 ? 2 : 1.5}
                dot={false}
                activeDot={{
                  r: 3,
                  fill: FUND_COLORS[i] ?? FUND_COLORS[0],
                  stroke: "#111823",
                  strokeWidth: 2,
                }}
              />
            ))}
          </LineChart>
        </ResponsiveContainer>
      </div>

      {/* Legend */}
      <div className="flex items-center gap-4 mt-3 flex-wrap">
        {activeFunds.map((fund, i) => (
          <div key={fund.id} className="flex items-center gap-1.5">
            <span
              className="w-4 h-[2px] inline-block rounded"
              style={{ backgroundColor: FUND_COLORS[i] ?? FUND_COLORS[0] }}
            />
            <span className="font-mono text-[9px] text-[#3d5166]">{fund.name}</span>
          </div>
        ))}
      </div>
    </div>
  );
}