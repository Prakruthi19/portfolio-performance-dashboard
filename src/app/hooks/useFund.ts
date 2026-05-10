"use client";

import { useState, useMemo } from "react";
import fundsData from "../data/funds.json";
import type {
  Fund,
  PortfolioCompany,
  SortState,
  CompanySortKey,
  FundsData,
} from "../types";

const data = fundsData as FundsData;

// ─────────────────────────────────────────────
// useFund — central hook for dashboard state
// ─────────────────────────────────────────────
export function useFund() {
  const funds: Fund[] = data.funds;

  // Selected fund (defaults to first)
  const [selectedFundId, setSelectedFundId] = useState<string>(funds[0].id);

  // Multi-fund overlay toggle (fund ids that are visible on chart)
  const [overlayFundIds, setOverlayFundIds] = useState<string[]>([]);

  // Table sort state
  const [sortState, setSortState] = useState<SortState>({
    key: "name",
    direction: "asc",
  });

  // ── Derived: selected fund object ──
  const selectedFund = useMemo(
    () => funds.find((f) => f.id === selectedFundId) ?? funds[0],
    [selectedFundId, funds]
  );

  // ── Derived: sorted portfolio companies ──
  const sortedCompanies = useMemo(() => {
    const companies = [...selectedFund.portfolioCompanies];
    return companies.sort((a, b) => {
      const key = sortState.key as CompanySortKey;
      const aVal = a[key];
      const bVal = b[key];

      if (typeof aVal === "number" && typeof bVal === "number") {
        return sortState.direction === "asc" ? aVal - bVal : bVal - aVal;
      }

      const aStr = String(aVal).toLowerCase();
      const bStr = String(bVal).toLowerCase();
      if (aStr < bStr) return sortState.direction === "asc" ? -1 : 1;
      if (aStr > bStr) return sortState.direction === "asc" ? 1 : -1;
      return 0;
    });
  }, [selectedFund, sortState]);

  // ── Derived: companies with negative EBITDA margin ──
  const atRiskCompanies = useMemo(
    () =>
      selectedFund.portfolioCompanies.filter((c) => c.ebitdaMargin < 0),
    [selectedFund]
  );

  const hasNegativeEbitda = atRiskCompanies.length > 0;

  // ── Derived: overlay funds for chart comparison ──
  const overlayFunds = useMemo(
    () => funds.filter((f) => overlayFundIds.includes(f.id)),
    [overlayFundIds, funds]
  );

  // ── Actions ──
  function selectFund(id: string) {
    setSelectedFundId(id);
    // Remove newly selected fund from overlay list if it was there
    setOverlayFundIds((prev) => prev.filter((oid) => oid !== id));
    // Reset sort when switching funds
    setSortState({ key: "name", direction: "asc" });
  }

  function toggleOverlay(fundId: string) {
    setOverlayFundIds((prev) =>
      prev.includes(fundId)
        ? prev.filter((id) => id !== fundId)
        : [...prev, fundId]
    );
  }

  function handleSort(key: CompanySortKey) {
    setSortState((prev) => ({
      key,
      direction:
        prev.key === key && prev.direction === "asc" ? "desc" : "asc",
    }));
  }

  return {
    // Data
    funds,
    selectedFund,
    sortedCompanies,
    overlayFunds,
    atRiskCompanies,
    hasNegativeEbitda,

    // State
    selectedFundId,
    overlayFundIds,
    sortState,

    // Actions
    selectFund,
    toggleOverlay,
    handleSort,
  };
}