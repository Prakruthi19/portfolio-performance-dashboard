"use client";

import { useFund } from "../app/hooks/useFund";
import FundSelector from "../app/components/FundSelector";
import KpiGrid from "../app/components/KpiGrid";
import NavChart from "../app/components/NavChart";
import PortfolioTable from "../app/components/PortfolioTable";

export default function DashboardPage() {
  const {
    funds,
    selectedFund,
    selectedFundId,
    selectFund,
    overlayFunds,
    overlayFundIds,
    toggleOverlay,
    sortedCompanies,
    sortState,
    handleSort,
  } = useFund();

  return (
    <main className="min-h-screen bg-[#0d1117] text-[#e8f0fe]">

      {/* Top bar */}
      <header className="w-full border-b border-[#1e2a38] bg-[#070c14]">
        <div className="max-w-screen-2xl mx-auto px-6 h-11 flex items-center gap-4">
          <span className="font-mono text-xs font-bold tracking-widest text-[#f5a623] uppercase">
            Portfolio Dashboard
          </span>
          <span className="text-[#1e2a38]">|</span>
          <span className="font-mono text-[10px] text-[#3d5166] tracking-wider uppercase">
            Fund Performance Monitor
          </span>
          <div className="ml-auto flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-[#4ade80] animate-pulse" />
            <span className="font-mono text-[10px] text-[#3d5166] tracking-wider">LIVE</span>
          </div>
        </div>
      </header>

      {/* Fund Selector tabs */}
      <FundSelector
        funds={funds}
        selectedFundId={selectedFundId}
        onSelect={selectFund}
      />

      {/* Dashboard body */}
      <div className="max-w-screen-2xl mx-auto px-6 py-6 space-y-6">

        {/* Fund title row */}
        <div className="flex items-baseline gap-3">
          <h1 className="font-mono text-base font-bold text-[#e8f0fe] tracking-wide">
            {selectedFund.name}
          </h1>
          <span className="font-mono text-[10px] text-[#3d5166] tracking-widest uppercase">
            {selectedFund.type} · Vintage {selectedFund.vintage}
          </span>
        </div>

        {/* KPI Cards */}
        <KpiGrid
          metrics={selectedFund.metrics}
          totalCommitments={selectedFund.totalCommitments}
        />

        {/* NAV Chart */}
        <NavChart
          selectedFund={selectedFund}
          overlayFunds={overlayFunds}
          overlayFundIds={overlayFundIds}
          allFunds={funds}
          onToggleOverlay={toggleOverlay}
        />

        {/* Portfolio Table */}
        <PortfolioTable
          companies={sortedCompanies}
          sortState={sortState}
          onSort={handleSort}
        />

      </div>
    </main>
  );
}