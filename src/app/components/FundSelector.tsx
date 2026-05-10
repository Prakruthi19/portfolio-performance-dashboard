"use client";

import clsx from "clsx";
import type { Fund } from "../types";

interface FundSelectorProps {
  funds: Fund[];
  selectedFundId: string;
  onSelect: (id: string) => void;
}

const FUND_TYPE_COLORS: Record<string, string> = {
  "Private Equity": "text-[#f5a623]",
  "Venture Capital": "text-[#22d3ee]",
  "Growth Equity":  "text-[#4ade80]",
};

export default function FundSelector({
  funds,
  selectedFundId,
  onSelect,
}: FundSelectorProps) {
  return (
    <div className="w-full border-b border-[#1e2a38] bg-[#0d1117]">
      <div className="max-w-screen-2xl mx-auto px-6">
        <div className="flex items-end gap-1 overflow-x-auto scrollbar-none">
          {funds.map((fund) => {
            const isActive = fund.id === selectedFundId;
            const typeColor = FUND_TYPE_COLORS[fund.type] ?? "text-[#7a8fa8]";

            return (
              <button
                key={fund.id}
                onClick={() => onSelect(fund.id)}
                className={clsx(
                  "group relative flex flex-col gap-0.5 px-5 py-3 min-w-[200px]",
                  "border-t border-x border-transparent",
                  "transition-all duration-150 cursor-pointer outline-none",
                  "focus-visible:ring-1 focus-visible:ring-[#f5a623]",
                  isActive
                    ? "bg-[#111823] border-[#1e2a38] border-b-[#111823] -mb-px z-10"
                    : "hover:bg-[#0f1520]"
                )}
              >
                {/* Active indicator bar */}
                {isActive && (
                  <span className="absolute top-0 left-0 right-0 h-[2px] bg-[#f5a623] rounded-t-sm" />
                )}

                {/* Fund name */}
                <span
                  className={clsx(
                    "font-mono text-[11px] font-semibold tracking-wide truncate",
                    isActive ? "text-[#e8f0fe]" : "text-[#7a8fa8] group-hover:text-[#a8b8cc]"
                  )}
                >
                  {fund.name}
                </span>

                {/* Fund type + vintage */}
                <span className="flex items-center gap-2">
                  <span
                    className={clsx(
                      "font-mono text-[9px] tracking-widest uppercase",
                      isActive ? typeColor : "text-[#3d5166]"
                    )}
                  >
                    {fund.type}
                  </span>
                  <span className="text-[#1e2a38] text-[9px]">·</span>
                  <span className="font-mono text-[9px] text-[#3d5166] tracking-wider">
                    {fund.vintage}
                  </span>
                </span>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}