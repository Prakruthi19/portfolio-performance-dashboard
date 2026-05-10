export type FlagType = "watch" | "at-risk";

export type StatusType = "Active" | "Exited" | "Written Off";

export interface NavDataPoint {
  month: string; // "YYYY-MM"
  nav: number;   // absolute value in EUR
}

export interface FundMetrics {
  irr: number;  // percentage e.g. 18.4
  tvpi: number; // multiple e.g. 1.72
  dpi: number;  // multiple e.g. 0.48
  rvpi: number; // multiple e.g. 1.24
  nav: number;  // absolute EUR value
}

export interface PortfolioCompany {
  id: string;
  name: string;
  sector: string;
  country: string;
  revenue: number;
  ebitda: number;
  ebitdaMargin: number; // percentage
  status: StatusType;
  investmentDate: string; // "YYYY-MM-DD"
  investedCapital: number;
  currentValue: number;
  flags: FlagType[];
}

export interface Fund {
  id: string;
  name: string;
  type: "Private Equity" | "Venture Capital" | "Growth Equity";
  vintage: number;
  totalCommitments: number;
  metrics: FundMetrics;
  navHistory: NavDataPoint[];
  portfolioCompanies: PortfolioCompany[];
}

export interface FundsData {
  funds: Fund[];
}

export type SortDirection = "asc" | "desc";

export type CompanySortKey = keyof Pick<
  PortfolioCompany,
  | "name"
  | "sector"
  | "country"
  | "revenue"
  | "ebitda"
  | "ebitdaMargin"
  | "currentValue"
  | "status"
>;

export interface SortState {
  key: CompanySortKey;
  direction: SortDirection;
}