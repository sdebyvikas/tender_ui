export type DecisionStatus = "GO" | "CONDITIONAL GO" | "NO-GO" | "IN REVIEW";
export type EMDStatus = "Verified" | "Exempt (MSME)" | "Pending Payment";

export interface KeyDateItem {
  label: string;
  date: string;
  isPassed?: boolean;
}

export type RequirementCategory =
  | "financial"
  | "experience"
  | "manpower"
  | "vintage"
  | "certifications"
  | "legal";

export interface TenderRequirement {
  id: string;
  category: RequirementCategory;
  categoryLabel: string;
  title: string;
  ruleDescription: string;
  mandatory: boolean;
  proofRequired: string;
  thresholdValue?: string;
  iconName?: string;
}

export interface TenderV2 {
  id: string;
  tenderNumber: string;
  title: string;
  organization: string;
  department?: string;
  location?: string;
  publishDate: string;
  submissionDeadline: string;
  technicalOpeningDate: string;
  estimatedValueDisplay: string;
  tenderFeeDisplay: string;
  emdDisplay: string;
  emdStatus: EMDStatus;
  readinessScore: number;
  winProbability: number;
  decision: DecisionStatus;
  status: string;
  submissionMode: string;
  turnoverRequired: string;
  companyTurnover: string;
  scopeSummary: string;
  keyDates: KeyDateItem[];
  tags: string[];
  requirements: TenderRequirement[];
}

export type TabKeyV2 = "overview" | "eligibility" | "payment" | "proposal" | "binder";

export interface TabItemV2 {
  id: TabKeyV2;
  stepNumber: number;
  label: string;
  subtitle: string;
  iconName: string;
}
