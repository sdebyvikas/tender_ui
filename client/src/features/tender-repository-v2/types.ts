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

export interface PaymentMilestoneItem {
  phase: string;
  percentage: string;
  milestoneTitle: string;
  description: string;
}

export interface SourceDocumentItem {
  id: string;
  name: string;
  size: string;
  pages: number;
  type: "RFP" | "Corrigendum" | "Addendum" | "Clarification";
  date: string;
}

export interface CommercialTerms {
  contractDuration: string;
  performanceSecurityPBG: string;
  bidValidity: string;
  penaltyClause: string;
  coversCount: string;
  consortiumRule: string;
  msmePolicy: string;
}

export type GateStatus = "PASS" | "ACTION_REQUIRED" | "FAIL";

export interface DisqualificationGate {
  id: string;
  category: string;
  title: string;
  requiredValue: string;
  companyValue: string;
  status: GateStatus;
  note: string;
  proofDocumentName: string;
  iconName?: string;
}

export type VaultAuditStatus = "verified" | "action_needed" | "missing";

export interface VaultDocumentAudit {
  id: string;
  name: string;
  category: string;
  status: VaultAuditStatus;
  expiryDate?: string;
  issueDate?: string;
  fileSize?: string;
  message?: string;
}

export interface QCBSScoreItem {
  parameter: string;
  maxMarks: number;
  earnedMarks: number;
  evaluationBasis: string;
}

export interface RiskRadarItem {
  id: string;
  severity: "high" | "medium" | "low";
  title: string;
  riskDescription: string;
  mitigationStrategy: string;
}

export interface SignatoryDetails {
  companyName: string;
  hqLocation: string;
  pan: string;
  gstin: string;
  cin: string;
  udyamRegistration?: string;
  signatoryName: string;
  signatoryTitle: string;
  signatoryEmail: string;
  signatoryPhone?: string;
  poaStatus: "Verified" | "PoA Pending";
  signatureReady: boolean;
  dscSerial?: string;
  dscExpiry?: string;
  bidLeadName: string;
  technicalReviewer: string;
  financialReviewer: string;
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
  commercialTerms?: CommercialTerms;
  paymentMilestones?: PaymentMilestoneItem[];
  sourceDocuments?: SourceDocumentItem[];
  requirements: TenderRequirement[];
  disqualificationGates?: DisqualificationGate[];
  vaultAuditDocuments?: VaultDocumentAudit[];
  qcbsScores?: QCBSScoreItem[];
  riskRadarItems?: RiskRadarItem[];
  signatoryDetails?: SignatoryDetails;
}

export type TabKeyV2 = "overview" | "eligibility" | "payment" | "proposal" | "binder";

export interface TabItemV2 {
  id: TabKeyV2;
  stepNumber: number;
  label: string;
  subtitle: string;
  iconName: string;
}
