import React from "react";
import {
  ShieldCheck,
  CheckCircle2,
  AlertTriangle,
  FileCheck2,
  Building,
  Award,
  ArrowRight,
} from "lucide-react";
import { TabPlaceholderCard } from "./TabPlaceholderCard";
import { TenderV2 } from "../../types";

interface EligibilityGatesTabV2Props {
  tender: TenderV2;
  onNextTab?: () => void;
}

export const EligibilityGatesTabV2: React.FC<EligibilityGatesTabV2Props> = ({
  tender,
  onNextTab,
}) => {
  return (
    <TabPlaceholderCard
      stepNumber={2}
      title="Eligibility & Qualification Gates"
      subtitle="Scorecard & Rules"
      description="Auditing bidder credentials against mandatory RFP qualifying thresholds (Turnover, Certifications, Experience, and Debarment checks)."
      icon={ShieldCheck}
      badgeText="Go / No-Go Audit"
    >
      {/* 1. Qualification Gates Status Summary */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-3.5">
        <div className="bg-white p-4 rounded-xl border border-emerald-200/80 bg-emerald-50/20 shadow-2xs">
          <div className="flex items-center justify-between">
            <span className="text-[10px] uppercase font-bold text-slate-400">
              Financial Gate
            </span>
            <CheckCircle2 size={16} className="text-emerald-600" />
          </div>
          <strong className="text-sm font-bold text-slate-900 block mt-1">
            Turnover Match: PASS
          </strong>
          <span className="text-[11px] text-slate-500 block mt-0.5">
            Required: {tender.turnoverRequired} · Company: {tender.companyTurnover}
          </span>
        </div>

        <div className="bg-white p-4 rounded-xl border border-emerald-200/80 bg-emerald-50/20 shadow-2xs">
          <div className="flex items-center justify-between">
            <span className="text-[10px] uppercase font-bold text-slate-400">
              Statutory Gate
            </span>
            <CheckCircle2 size={16} className="text-emerald-600" />
          </div>
          <strong className="text-sm font-bold text-slate-900 block mt-1">
            PAN &amp; GSTIN: PASS
          </strong>
          <span className="text-[11px] text-slate-500 block mt-0.5">
            Verified Active in Company Vault
          </span>
        </div>

        <div className="bg-white p-4 rounded-xl border border-amber-200/80 bg-amber-50/20 shadow-2xs">
          <div className="flex items-center justify-between">
            <span className="text-[10px] uppercase font-bold text-slate-400">
              Technical Gate
            </span>
            <AlertTriangle size={16} className="text-amber-600" />
          </div>
          <strong className="text-sm font-bold text-slate-900 block mt-1">
            ISO / CMMI: REVIEW NEEDED
          </strong>
          <span className="text-[11px] text-slate-500 block mt-0.5">
            ISO 27001 certificate renewal in progress
          </span>
        </div>
      </div>

      {/* 2. Detailed Verification Checklist Container */}
      <div className="bg-white p-5 md:p-6 rounded-2xl border border-slate-200/90 shadow-2xs space-y-4">
        <div className="flex items-center justify-between border-b border-slate-100 pb-3">
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-lg bg-emerald-50 text-emerald-700 flex items-center justify-center font-bold">
              <FileCheck2 size={15} />
            </div>
            <div>
              <h4 className="text-sm font-bold text-slate-900">
                Company Vault Auto-Match Matrix
              </h4>
              <p className="text-[11px] text-slate-500">
                Cross-referenced against registered corporate documents
              </p>
            </div>
          </div>
          <span className="text-xs font-semibold text-slate-500">
            3 of 4 Gates Passed (75%)
          </span>
        </div>

        <div className="space-y-2 text-xs">
          <div className="flex items-start justify-between p-3 rounded-xl bg-slate-50/80 border border-slate-200/60">
            <div className="flex items-start gap-2.5">
              <Building size={16} className="text-slate-400 mt-0.5" />
              <div>
                <strong className="text-slate-900 block font-semibold">
                  Entity Incorporation &amp; Blacklist Status
                </strong>
                <p className="text-slate-500 text-[11px]">
                  Bidder must be a registered entity in India and not debarred by any Central/State Govt.
                </p>
              </div>
            </div>
            <span className="text-[11px] font-bold text-emerald-700 bg-emerald-100/70 px-2 py-0.5 rounded-full shrink-0">
              Verified (Clear)
            </span>
          </div>

          <div className="flex items-start justify-between p-3 rounded-xl bg-slate-50/80 border border-slate-200/60">
            <div className="flex items-start gap-2.5">
              <Award size={16} className="text-slate-400 mt-0.5" />
              <div>
                <strong className="text-slate-900 block font-semibold">
                  Prior Experience with Government Portals
                </strong>
                <p className="text-slate-500 text-[11px]">
                  Must have executed at least 2 similar web &amp; mobile app development contracts.
                </p>
              </div>
            </div>
            <span className="text-[11px] font-bold text-emerald-700 bg-emerald-100/70 px-2 py-0.5 rounded-full shrink-0">
              Matched (3 Projects)
            </span>
          </div>
        </div>
      </div>

      {/* Next Step Action Bar */}
      {onNextTab && (
        <div className="flex justify-end pt-2">
          <button
            type="button"
            onClick={onNextTab}
            className="px-5 py-2.5 bg-[#173C40] hover:bg-slate-800 text-white rounded-xl text-xs font-bold flex items-center gap-2 shadow-xs transition-colors cursor-pointer"
          >
            <span>Proceed to Step 3: Payment Proof</span>
            <ArrowRight size={14} />
          </button>
        </div>
      )}
    </TabPlaceholderCard>
  );
};
