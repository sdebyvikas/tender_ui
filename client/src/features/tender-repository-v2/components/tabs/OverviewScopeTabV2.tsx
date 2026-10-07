import React, { useState } from "react";
import {
  FileText,
  Calendar,
  Building2,
  MapPin,
  Sparkles,
  CheckCircle,
  TrendingUp,
  FolderGit2,
  Users,
  Award,
  ShieldAlert,
  FileCheck2,
  ArrowRight,
  Receipt,
  AlertCircle,
  Clock,
  Filter,
  LucideIcon,
  IndianRupee,
  ShieldCheck,
  Briefcase,
  Layers,
  FileDown,
  Eye,
  Percent,
  Timer,
  AlertOctagon,
  Users2,
} from "lucide-react";
import { toast } from "sonner";
import { TenderV2, TenderRequirement, RequirementCategory } from "../../types";

const REQ_ICON_MAP: Record<string, LucideIcon> = {
  TrendingUp,
  FolderGit2,
  Building2,
  Users,
  Award,
  ShieldAlert,
  FileCheck2,
};

const CATEGORY_COLORS: Record<
  RequirementCategory,
  { bg: string; text: string; border: string }
> = {
  financial: {
    bg: "bg-emerald-50",
    text: "text-emerald-800",
    border: "border-emerald-200",
  },
  experience: {
    bg: "bg-blue-50",
    text: "text-blue-800",
    border: "border-blue-200",
  },
  manpower: {
    bg: "bg-purple-50",
    text: "text-purple-800",
    border: "border-purple-200",
  },
  vintage: {
    bg: "bg-amber-50",
    text: "text-amber-800",
    border: "border-amber-200",
  },
  certifications: {
    bg: "bg-teal-50",
    text: "text-teal-800",
    border: "border-teal-200",
  },
  legal: {
    bg: "bg-slate-100",
    text: "text-slate-800",
    border: "border-slate-300",
  },
};

interface OverviewScopeTabV2Props {
  tender: TenderV2;
  onNextTab?: () => void;
}

export const OverviewScopeTabV2: React.FC<OverviewScopeTabV2Props> = ({
  tender,
  onNextTab,
}) => {
  const [selectedCategory, setSelectedCategory] = useState<string>("All");

  const requirements = tender.requirements || [];
  const commercial = tender.commercialTerms;
  const milestones = tender.paymentMilestones || [];
  const sourceDocs = tender.sourceDocuments || [];

  const filteredRequirements =
    selectedCategory === "All"
      ? requirements
      : requirements.filter((r) => r.category === selectedCategory);

  const categories = [
    "All",
    ...Array.from(new Set(requirements.map((r) => r.category))),
  ];

  return (
    <div className="space-y-6 fade-up">
      {/* 1. TOP KEY PARAMETERS GRID (AUTHORITY, FEES, DATES, LOCATION) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3.5">
        {/* Card 1: Authority */}
        <div className="bg-white p-4 rounded-2xl border border-slate-200/90 shadow-2xs hover:border-slate-300 transition-colors">
          <span className="text-[10px] uppercase font-bold text-slate-400 block mb-1 flex items-center gap-1.5 tracking-wider">
            <Building2 size={13} className="text-slate-500" /> Authority / Org
          </span>
          <strong className="text-sm font-bold text-slate-900 block truncate">
            {tender.organization}
          </strong>
          <span className="text-xs text-slate-500 block mt-0.5 truncate">
            {tender.department || "Procurement Department"}
          </span>
        </div>

        {/* Card 2: Estimated Value & Fees */}
        <div className="bg-white p-4 rounded-2xl border border-slate-200/90 shadow-2xs hover:border-slate-300 transition-colors">
          <span className="text-[10px] uppercase font-bold text-slate-400 block mb-1 flex items-center gap-1.5 tracking-wider">
            <IndianRupee size={13} className="text-emerald-700" /> Estimated
            Value &amp; Fees
          </span>
          <strong className="text-sm font-bold text-emerald-800 block">
            {tender.estimatedValueDisplay}
          </strong>
          <div className="flex items-center gap-2 mt-0.5 text-xs text-slate-500 flex-wrap">
            <span>
              EMD:{" "}
              <strong className="text-slate-700">{tender.emdDisplay}</strong>
            </span>
            <span>•</span>
            <span>
              Fee:{" "}
              <strong className="text-slate-700">
                {tender.tenderFeeDisplay || "₹5,000"}
              </strong>
            </span>
          </div>
        </div>

        {/* Card 3: Key Submission Dates */}
        <div className="bg-white p-4 rounded-2xl border border-slate-200/90 shadow-2xs hover:border-slate-300 transition-colors">
          <span className="text-[10px] uppercase font-bold text-slate-400 block mb-1 flex items-center gap-1.5 tracking-wider">
            <Calendar size={13} className="text-blue-600" /> Submission Deadline
          </span>
          <strong className="text-sm font-bold text-slate-900 block">
            {tender.submissionDeadline}
          </strong>
          <div className="text-xs text-emerald-700 font-medium mt-0.5 flex items-center gap-1">
            <Clock size={11} /> Published: {tender.publishDate || "02 Mar 2026"}
          </div>
        </div>

        {/* Card 4: Location & Mode */}
        <div className="bg-white p-4 rounded-2xl border border-slate-200/90 shadow-2xs hover:border-slate-300 transition-colors">
          <span className="text-[10px] uppercase font-bold text-slate-400 block mb-1 flex items-center gap-1.5 tracking-wider">
            <MapPin size={13} className="text-slate-500" /> Location &amp; Mode
          </span>
          <strong className="text-sm font-bold text-slate-900 block truncate">
            {tender.location || "India"}
          </strong>
          <span className="text-xs text-slate-500 block mt-0.5 truncate">
            {tender.submissionMode}
          </span>
        </div>
      </div>

      {/* 2. "WHAT IS THIS TENDER?" (EXECUTIVE OVERVIEW & SCOPE) */}
      <div className="bg-white p-5 md:p-6 rounded-2xl border border-slate-200/90 shadow-2xs space-y-3.5">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-100 pb-3">
          <div className="flex items-center gap-2.5">
            <div>
              <h3 className="text-sm font-bold text-slate-900">
                What is this Tender? (Overview &amp; Scope Summary)
              </h3>
              <p className="text-[11px] text-slate-500">
                High-level objective, purpose, and work scope extracted from the
                ingested RFP
              </p>
            </div>
          </div>
          <span className="text-xs font-bold bg-emerald-100/80 text-emerald-900 px-3 py-1 rounded-full border border-emerald-200 self-start sm:self-auto">
            RFP Scope Extracted
          </span>
        </div>

        <div className="text-xs text-slate-700 leading-relaxed bg-slate-50/90 p-4 rounded-xl border border-slate-200/70">
          <strong className="text-slate-900 block mb-1 font-semibold text-xs">
            Project Scope &amp; Deliverables Description:
          </strong>
          <p>{tender.scopeSummary}</p>
        </div>

        {/* Tags */}
        {tender.tags && tender.tags.length > 0 && (
          <div className="flex items-center gap-1.5 flex-wrap pt-1">
            <span className="text-[11px] font-semibold text-slate-400 mr-1">
              Category Tags:
            </span>
            {tender.tags.map((tag) => (
              <span
                key={tag}
                className="text-[11px] font-medium bg-slate-100 text-slate-700 px-2.5 py-0.5 rounded-md border border-slate-200/70"
              >
                {tag}
              </span>
            ))}
          </div>
        )}
      </div>

      {/* 5. CRITICAL BID MILESTONES & DATES BAR */}
      <div className="bg-white p-5 rounded-2xl border border-slate-200/90 shadow-2xs space-y-3">
        <h4 className="text-[11px] font-extrabold uppercase tracking-wider text-slate-400">
          Critical Bid Milestones &amp; Dates
        </h4>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3">
          {tender.keyDates.map((item, idx) => (
            <div
              key={idx}
              className={`p-3.5 rounded-xl border text-xs transition-all ${
                item.isPassed
                  ? "bg-slate-50/80 border-slate-200 text-slate-600"
                  : "bg-emerald-50/50 border-emerald-200 text-slate-900 font-medium"
              }`}
            >
              <div className="flex items-center justify-between mb-1">
                <span className="text-[10px] uppercase font-bold text-slate-400 tracking-wider">
                  {item.label}
                </span>
                {item.isPassed && (
                  <CheckCircle size={13} className="text-emerald-600" />
                )}
              </div>
              <div className="font-bold text-slate-900 text-xs mt-0.5">
                {item.date}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 6. "REQUIREMENTS OF THIS TENDER" (EXTRACTED RFP RULES & CRITERIA) */}
      <div className="bg-white p-5 md:p-6 rounded-2xl border border-slate-200/90 shadow-2xs space-y-4">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-3 border-b border-slate-100 pb-4">
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold uppercase tracking-wider bg-slate-900 text-white px-2.5 py-0.5 rounded-md">
                Tender Rules
              </span>
              <h3 className="text-base font-bold text-slate-900">
                Requirements of this Tender
              </h3>
            </div>
            <p className="text-xs text-slate-500 mt-1 max-w-2xl">
              These are the official eligibility rules and minimum thresholds
              demanded by the procuring authority in the RFP.
            </p>
          </div>

          <div className="flex items-center gap-2 self-start md:self-auto">
            <span className="text-xs font-bold bg-slate-100 text-slate-700 px-3 py-1.5 rounded-xl border border-slate-200">
              {requirements.length} Mandatory Rules Extracted
            </span>
          </div>
        </div>

        {/* Category Filter Pills */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 text-xs">
          <span className="text-slate-400 text-xs font-semibold flex items-center gap-1 mr-1 shrink-0">
            <Filter size={12} /> Filter Rules:
          </span>
          {categories.map((cat) => (
            <button
              key={cat}
              type="button"
              onClick={() => setSelectedCategory(cat)}
              className={`px-3 py-1 rounded-lg font-semibold capitalize transition-all shrink-0 cursor-pointer ${
                selectedCategory === cat
                  ? "bg-[#173C40] text-white shadow-2xs"
                  : "bg-slate-100 text-slate-600 hover:bg-slate-200"
              }`}
            >
              {cat === "All" ? "All Requirements" : cat}
            </button>
          ))}
        </div>

        {/* Requirements Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5 pt-1">
          {filteredRequirements.map((req, idx) => {
            const IconComp = REQ_ICON_MAP[req.iconName || ""] || FileText;
            const style =
              CATEGORY_COLORS[req.category] || CATEGORY_COLORS.legal;

            return (
              <div
                key={req.id || idx}
                className="bg-slate-50/70 hover:bg-slate-50 p-4 rounded-xl border border-slate-200/80 hover:border-slate-300 transition-all flex flex-col justify-between space-y-3"
              >
                {/* Top Row: Category + Mandatory */}
                <div>
                  <div className="flex items-center justify-between gap-2 mb-2">
                    <span
                      className={`text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-md border ${style.bg} ${style.text} ${style.border}`}
                    >
                      {req.categoryLabel}
                    </span>
                    {req.mandatory && (
                      <span className="text-[10px] font-bold text-red-700 bg-red-50 border border-red-200 px-2 py-0.5 rounded-md">
                        Mandatory
                      </span>
                    )}
                  </div>

                  {/* Title & Description */}
                  <div className="flex items-start gap-2.5">
                    <div className="w-7 h-7 rounded-lg bg-white border border-slate-200 flex items-center justify-center shrink-0 mt-0.5 text-slate-700">
                      <IconComp size={15} />
                    </div>
                    <div>
                      <h4 className="text-xs font-bold text-slate-900 leading-snug">
                        {req.title}
                      </h4>
                      <p className="text-[11.5px] text-slate-600 mt-1 leading-relaxed">
                        {req.ruleDescription}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Bottom Row: Threshold & Proof */}
                <div className="pt-2.5 border-t border-slate-200/70 space-y-1 text-[11px]">
                  {req.thresholdValue && (
                    <div className="flex items-center justify-between text-slate-700">
                      <span className="text-slate-400 font-medium">
                        Required Threshold:
                      </span>
                      <strong className="text-slate-900 font-bold">
                        {req.thresholdValue}
                      </strong>
                    </div>
                  )}
                  <div className="flex items-start justify-between gap-2 text-slate-600">
                    <span className="text-slate-400 font-medium shrink-0">
                      Proof Required:
                    </span>
                    <span
                      className="text-right text-slate-700 font-medium truncate"
                      title={req.proofRequired}
                    >
                      {req.proofRequired}
                    </span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* 3. KEY CONTRACT & COMMERCIAL TERMS (GUARDRAILS) */}
      {commercial && (
        <div className="bg-white p-5 md:p-6 rounded-2xl border border-slate-200/90 shadow-2xs space-y-4">
          <div className="flex items-center justify-between border-b border-slate-100 pb-3">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-xl bg-blue-50 text-blue-700 border border-blue-200 flex items-center justify-center font-bold">
                <Briefcase size={16} />
              </div>
              <div>
                <h3 className="text-sm font-bold text-slate-900">
                  Key Contract &amp; Commercial Terms
                </h3>
                <p className="text-[11px] text-slate-500">
                  Execution timelines, security deposit, covers, and consortium
                  rules
                </p>
              </div>
            </div>
            <span className="text-xs font-semibold text-slate-500 hidden sm:inline-block">
              Contract Terms
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 text-xs">
            {/* Contract Duration */}
            <div className="p-3.5 rounded-xl bg-slate-50/80 border border-slate-200/70 space-y-1">
              <span className="text-[10px] uppercase font-bold text-slate-400 flex items-center gap-1">
                <Timer size={12} /> Contract Period / Duration
              </span>
              <strong className="text-xs font-bold text-slate-900 block">
                {commercial.contractDuration}
              </strong>
            </div>

            {/* Performance Security */}
            <div className="p-3.5 rounded-xl bg-slate-50/80 border border-slate-200/70 space-y-1">
              <span className="text-[10px] uppercase font-bold text-slate-400 flex items-center gap-1">
                <ShieldCheck size={12} className="text-emerald-600" />{" "}
                Performance Security (PBG)
              </span>
              <strong className="text-xs font-bold text-slate-900 block">
                {commercial.performanceSecurityPBG}
              </strong>
            </div>

            {/* Bid Validity */}
            <div className="p-3.5 rounded-xl bg-slate-50/80 border border-slate-200/70 space-y-1">
              <span className="text-[10px] uppercase font-bold text-slate-400 flex items-center gap-1">
                <Calendar size={12} /> Bid Validity Period
              </span>
              <strong className="text-xs font-bold text-slate-900 block">
                {commercial.bidValidity}
              </strong>
            </div>

            {/* Covers System */}
            <div className="p-3.5 rounded-xl bg-slate-50/80 border border-slate-200/70 space-y-1">
              <span className="text-[10px] uppercase font-bold text-slate-400 flex items-center gap-1">
                <Layers size={12} /> Number of Covers
              </span>
              <strong className="text-xs font-bold text-slate-900 block">
                {commercial.coversCount}
              </strong>
            </div>

            {/* Consortium Rule */}
            <div className="p-3.5 rounded-xl bg-slate-50/80 border border-slate-200/70 space-y-1">
              <span className="text-[10px] uppercase font-bold text-slate-400 flex items-center gap-1">
                <Users2 size={12} /> Consortium / Subcontracting
              </span>
              <strong className="text-xs font-bold text-slate-900 block">
                {commercial.consortiumRule}
              </strong>
            </div>

            {/* Penalty / LD Clause */}
            <div className="p-3.5 rounded-xl bg-slate-50/80 border border-slate-200/70 space-y-1">
              <span className="text-[10px] uppercase font-bold text-slate-400 flex items-center gap-1">
                <AlertOctagon size={12} className="text-amber-600" /> Liquidated
                Damages (LD)
              </span>
              <strong className="text-xs font-bold text-slate-900 block">
                {commercial.penaltyClause}
              </strong>
            </div>
          </div>

          {/* MSME Policy Banner */}
          {commercial.msmePolicy && (
            <div className="p-3 rounded-xl bg-emerald-50/70 border border-emerald-200/70 text-xs text-emerald-900 flex items-center justify-between gap-3">
              <div className="flex items-center gap-2">
                <CheckCircle size={15} className="text-emerald-700 shrink-0" />
                <span>
                  <strong>MSME / Startup Exemption Policy:</strong>{" "}
                  {commercial.msmePolicy}
                </span>
              </div>
            </div>
          )}
        </div>
      )}

      {/* 4. PAYMENT TERMS & MILESTONES PREVIEW */}
      {milestones.length > 0 && (
        <div className="bg-white p-5 md:p-6 rounded-2xl border border-slate-200/90 shadow-2xs space-y-4">
          <div className="flex items-center justify-between border-b border-slate-100 pb-3">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-xl bg-purple-50 text-purple-700 border border-purple-200 flex items-center justify-center font-bold">
                <Percent size={16} />
              </div>
              <div>
                <h3 className="text-sm font-bold text-slate-900">
                  Payment Milestones &amp; Disbursement Schedule
                </h3>
                <p className="text-[11px] text-slate-500">
                  Tranche-based payment terms defined in the RFP document
                </p>
              </div>
            </div>
            <span className="text-xs font-bold text-slate-700 bg-slate-100 px-2.5 py-1 rounded-full border border-slate-200">
              {milestones.length} Payment Stages
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
            {milestones.map((m, idx) => (
              <div
                key={idx}
                className="p-3.5 rounded-xl bg-slate-50/80 border border-slate-200/70 space-y-1.5 flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-[10px] uppercase font-bold text-purple-700 bg-purple-100/70 px-2 py-0.5 rounded-md">
                      {m.phase}
                    </span>
                    <strong className="text-sm font-extrabold text-emerald-800">
                      {m.percentage}
                    </strong>
                  </div>
                  <h4 className="text-xs font-bold text-slate-900 leading-snug">
                    {m.milestoneTitle}
                  </h4>
                </div>
                <p className="text-[11px] text-slate-500 leading-relaxed pt-1 border-t border-slate-200/60">
                  {m.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* 7. INGESTED RFP SOURCE DOCUMENTS & AMENDMENTS */}
      {sourceDocs.length > 0 && (
        <div className="bg-white p-5 md:p-6 rounded-2xl border border-slate-200/90 shadow-2xs space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-100 pb-3">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-xl bg-slate-100 text-slate-700 border border-slate-200 flex items-center justify-center font-bold">
                <FileText size={16} />
              </div>
              <div>
                <h3 className="text-sm font-bold text-slate-900">
                  Ingested RFP Source Documents &amp; Amendments
                </h3>
                <p className="text-[11px] text-slate-500">
                  Primary tender document parsed by the AI engine (
                  {sourceDocs.length} file attached)
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2 self-start sm:self-auto">
              <button
                type="button"
                onClick={() =>
                  toast.info("Upload Corrigendum / Amendment", {
                    description:
                      "Upload official corrigendum PDF to auto-update dates & revised rules.",
                  })
                }
                className="px-3 py-1.5 bg-slate-100 hover:bg-slate-200 text-[#173C40] rounded-lg text-xs font-bold flex items-center gap-1.5 border border-slate-300 transition-colors cursor-pointer"
              >
                <span>+ Upload Corrigendum</span>
              </button>
            </div>
          </div>

          <div className="space-y-2.5">
            {sourceDocs.map((doc) => (
              <div
                key={doc.id}
                className="p-3.5 rounded-xl bg-slate-50/80 border border-slate-200/70 flex flex-col sm:flex-row sm:items-center justify-between gap-3"
              >
                <div className="flex items-center gap-3 min-w-0">
                  <div className="w-9 h-9 rounded-xl bg-white border border-slate-200 flex items-center justify-center text-slate-700 font-bold text-xs shrink-0 shadow-2xs">
                    {doc.type === "RFP"
                      ? "PDF"
                      : doc.type === "Corrigendum"
                        ? "COR"
                        : "XLS"}
                  </div>
                  <div className="min-w-0">
                    <div className="flex items-center gap-2 flex-wrap">
                      <strong className="text-xs font-bold text-slate-900 truncate">
                        {doc.name}
                      </strong>
                      <span
                        className={`text-[9.5px] font-bold px-2 py-0.2 rounded-md ${
                          doc.type === "RFP"
                            ? "bg-blue-100 text-blue-800"
                            : doc.type === "Corrigendum"
                              ? "bg-amber-100 text-amber-800"
                              : "bg-emerald-100 text-emerald-800"
                        }`}
                      >
                        {doc.type} (Primary)
                      </span>
                    </div>
                    <p className="text-[11px] text-slate-500 font-mono mt-0.5">
                      {doc.pages} Pages · {doc.size} · Uploaded on {doc.date}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-2 shrink-0 self-end sm:self-auto">
                  <button
                    type="button"
                    onClick={() =>
                      toast.info(`Opening preview for ${doc.name}...`)
                    }
                    className="px-3 py-1.5 bg-white hover:bg-slate-100 text-slate-700 border border-slate-200 rounded-lg text-xs font-semibold flex items-center gap-1.5 shadow-2xs cursor-pointer transition-colors"
                  >
                    <Eye size={13} />
                    <span>View PDF</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => toast.success(`Downloading ${doc.name}...`)}
                    className="p-1.5 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-lg border border-slate-200 cursor-pointer transition-colors"
                    title="Download Source File"
                  >
                    <FileDown size={14} />
                  </button>
                </div>
              </div>
            ))}
          </div>

          <p className="text-[11px] text-slate-400 italic">
            * Note: If the procuring authority issues pre-bid answers or extends
            deadlines, attach the Corrigendum PDF above to auto-sync tender
            parameters.
          </p>
        </div>
      )}

      {/* 8. BRIDGE TO STEP 2: ELIGIBILITY & CAPABILITY CHECK */}
      <div className="bg-gradient-to-r from-emerald-900 via-[#0C3B34] to-[#134942] text-white p-5 rounded-2xl shadow-md border border-emerald-500/40 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <span className="text-[10px] uppercase font-bold bg-emerald-400 text-emerald-950 px-2 py-0.5 rounded-md tracking-wider">
              Next Step in Pipeline
            </span>
            <strong className="text-sm font-bold text-white">
              Step 2: Check Our Capability &amp; Eligibility
            </strong>
          </div>
          <p className="text-xs text-emerald-100/80 max-w-2xl leading-relaxed">
            In the next step, our system audits your{" "}
            <strong>Company Vault</strong> against all {requirements.length}{" "}
            mandatory rules to determine if your company is capable and eligible
            to bid (Pass / Fail analysis).
          </p>
        </div>

        {onNextTab && (
          <button
            type="button"
            onClick={onNextTab}
            className="px-5 py-2.5 bg-emerald-400 hover:bg-emerald-300 text-emerald-950 rounded-xl text-xs font-extrabold flex items-center gap-2 shadow-sm transition-all shrink-0 cursor-pointer"
          >
            <span>Proceed to Step 2: Eligibility &amp; Gates</span>
            <ArrowRight size={14} />
          </button>
        )}
      </div>
    </div>
  );
};
