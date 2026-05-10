"use client";

import clsx from "clsx";
import { ChevronUp, ChevronDown, ChevronsUpDown, AlertTriangle } from "lucide-react";
import type { PortfolioCompany, SortState, CompanySortKey } from "../types";
import { formatCurrency, formatPercent } from "../lib/formatter";

interface PortfolioTableProps {
  companies: PortfolioCompany[];
  sortState: SortState;
  onSort: (key: CompanySortKey) => void;
}

const COLUMNS: { label: string; key: CompanySortKey; align: "left" | "right" }[] = [
  { label: "Company",       key: "name",          align: "left"  },
  { label: "Sector",        key: "sector",        align: "left"  },
  { label: "Country",       key: "country",       align: "left"  },
  { label: "Revenue",       key: "revenue",       align: "right" },
  { label: "EBITDA",        key: "ebitda",        align: "right" },
  { label: "EBITDA Margin", key: "ebitdaMargin",  align: "right" },
  { label: "Current Value", key: "currentValue",  align: "right" },
  { label: "Status",        key: "status",        align: "left"  },
];

function SortIcon({ colKey, sortState }: { colKey: CompanySortKey; sortState: SortState }) {
  if (sortState.key !== colKey) {
    return <ChevronsUpDown size={10} className="text-[#3d5166]" />;
  }
  return sortState.direction === "asc"
    ? <ChevronUp size={10} className="text-[#f5a623]" />
    : <ChevronDown size={10} className="text-[#f5a623]" />;
}

function StatusBadge({ company }: { company: PortfolioCompany }) {
  const isAtRisk = company.flags.includes("at-risk");
  const isWatch  = company.flags.includes("watch");

  if (isAtRisk) {
    return (
      <span className="inline-flex items-center gap-1 font-mono text-[9px] font-bold tracking-widest px-2 py-0.5 rounded-sm bg-[#3d0000] text-[#f87171] border border-[#f87171]">
        <AlertTriangle size={8} /> AT RISK
      </span>
    );
  }
  if (isWatch) {
    return (
      <span className="inline-flex items-center gap-1 font-mono text-[9px] font-bold tracking-widest px-2 py-0.5 rounded-sm bg-[#3a2e00] text-[#facc15] border border-[#facc15]">
        ⚠ WATCH
      </span>
    );
  }
  return (
    <span className="inline-flex items-center gap-1 font-mono text-[9px] font-bold tracking-widest px-2 py-0.5 rounded-sm bg-[#002d0e] text-[#4ade80] border border-[#4ade80]">
      ● ACTIVE
    </span>
  );
}

function NegativeEbitdaBanner({ companies }: { companies: PortfolioCompany[] }) {
  const flagged = companies.filter((c) => c.ebitdaMargin < 0);
  if (flagged.length === 0) return null;

  return (
    <div className="flex items-start gap-3 bg-[#3d1a00] border border-[#fb923c] rounded-sm px-4 py-3 mb-4">
      <AlertTriangle size={14} className="text-[#fb923c] mt-0.5 shrink-0" />
      <div>
        <p className="font-mono text-[10px] font-bold text-[#fb923c] tracking-widest uppercase">
          Negative EBITDA Margin Detected
        </p>
        <p className="font-mono text-[10px] text-[#7a8fa8] mt-0.5">
          {flagged.map((c) => c.name).join(", ")} —{" "}
          {flagged.length === 1 ? "this company requires" : "these companies require"} immediate attention
        </p>
      </div>
    </div>
  );
}

export default function PortfolioTable({ companies, sortState, onSort }: PortfolioTableProps) {
  return (
    <div>
      {/* Alert banner */}
      <NegativeEbitdaBanner companies={companies} />

      <div className="bg-[#111823] border border-[#1e2a38] rounded-sm overflow-hidden">

        {/* Section header */}
        <div className="px-4 py-3 border-b border-[#1e2a38] flex items-center justify-between">
          <p className="font-mono text-[9px] tracking-widest uppercase text-[#3d5166]">
            Portfolio Companies
          </p>
          <p className="font-mono text-[9px] text-[#3d5166]">
            {companies.length} {companies.length === 1 ? "company" : "companies"}
          </p>
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="w-full min-w-[900px]">

            {/* Header */}
            <thead>
              <tr className="border-b border-[#1e2a38]">
                {COLUMNS.map((col) => (
                  <th
                    key={col.key}
                    onClick={() => onSort(col.key)}
                    className={clsx(
                      "px-4 py-2.5 cursor-pointer select-none group",
                      "font-mono text-[9px] tracking-widest uppercase",
                      "text-[#3d5166] hover:text-[#7a8fa8] transition-colors duration-100",
                      col.align === "right" ? "text-right" : "text-left"
                    )}
                  >
                    <span className="inline-flex items-center gap-1">
                      {col.align === "right" && (
                        <SortIcon colKey={col.key} sortState={sortState} />
                      )}
                      {col.label}
                      {col.align === "left" && (
                        <SortIcon colKey={col.key} sortState={sortState} />
                      )}
                    </span>
                  </th>
                ))}
              </tr>
            </thead>

            {/* Body */}
            <tbody>
              {companies.map((company, idx) => {
                const isAtRisk = company.flags.includes("at-risk");
                const isWatch  = company.flags.includes("watch");
                const isNegativeEbitda = company.ebitdaMargin < 0;

                return (
                  <tr
                    key={company.id}
                    className={clsx(
                      "border-b border-[#0f1924] transition-colors duration-100",
                      isAtRisk
                        ? "bg-[#1a0a0a] hover:bg-[#220d0d]"
                        : isWatch
                        ? "bg-[#161200] hover:bg-[#1e1800]"
                        : idx % 2 === 0
                        ? "bg-[#111823] hover:bg-[#141f2e]"
                        : "bg-[#0d1117] hover:bg-[#111823]"
                    )}
                  >
                    {/* Company name */}
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-2">
                        {isAtRisk && (
                          <span className="w-1 h-full absolute left-0 top-0 bg-[#f87171]" />
                        )}
                        <span className="font-mono text-[11px] font-semibold text-[#e8f0fe]">
                          {company.name}
                        </span>
                      </div>
                    </td>

                    {/* Sector */}
                    <td className="px-4 py-3 font-mono text-[10px] text-[#7a8fa8]">
                      {company.sector}
                    </td>

                    {/* Country */}
                    <td className="px-4 py-3 font-mono text-[10px] text-[#7a8fa8]">
                      {company.country}
                    </td>

                    {/* Revenue */}
                    <td className="px-4 py-3 font-mono text-[11px] text-[#e8f0fe] text-right tabular-nums">
                      {formatCurrency(company.revenue)}
                    </td>

                    {/* EBITDA */}
                    <td className={clsx(
                      "px-4 py-3 font-mono text-[11px] text-right tabular-nums",
                      company.ebitda < 0 ? "text-[#f87171]" : "text-[#e8f0fe]"
                    )}>
                      {formatCurrency(company.ebitda)}
                    </td>

                    {/* EBITDA Margin */}
                    <td className={clsx(
                      "px-4 py-3 font-mono text-[11px] text-right tabular-nums font-semibold",
                      isNegativeEbitda
                        ? "text-[#f87171]"
                        : company.ebitdaMargin >= 20
                        ? "text-[#4ade80]"
                        : company.ebitdaMargin >= 10
                        ? "text-[#facc15]"
                        : "text-[#e8f0fe]"
                    )}>
                      {formatPercent(company.ebitdaMargin)}
                    </td>

                    {/* Current Value */}
                    <td className="px-4 py-3 font-mono text-[11px] text-[#f5a623] text-right tabular-nums font-semibold">
                      {formatCurrency(company.currentValue)}
                    </td>

                    {/* Status badge */}
                    <td className="px-4 py-3">
                      <StatusBadge company={company} />
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}