import React, { useState } from "react";
import {
  Info,
  Sparkles,
  Building2,
  CheckCircle2,
  ShieldAlert,
  FileText,
  DollarSign,
  Receipt,
  FileCheck2,
} from "lucide-react";
import { TenderV2, TabKeyV2 } from "../types";

interface TenderVerdictHeroV2Props {
  tender: TenderV2;
  activeTab?: TabKeyV2;
}

export const TenderVerdictHeroV2: React.FC<TenderVerdictHeroV2Props> = ({
  tender,
  activeTab = "overview",
}) => {
  const [showScoreBreakdown, setShowScoreBreakdown] = useState(false);

  const isPreEvaluationStep = activeTab === "overview";

  return (
    <div className="bg-gradient-to-r from-[#082924] via-[#0C3B34] to-[#134942] text-white p-5 md:p-6 rounded-2xl shadow-lg border border-emerald-500/30 transition-all">
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-5">
        {/* Left: Tender Title, Status & Authority */}
        <div className="flex items-start gap-4 max-w-4xl">
          <div className="space-y-2">
            <div className="flex items-center gap-2 flex-wrap">
              {isPreEvaluationStep ? (
                <span className="text-[11px] font-extrabold uppercase bg-slate-900/80 text-emerald-300 border border-emerald-500/40 px-3 py-1 rounded-full tracking-wider shadow-sm flex items-center gap-1.5">
                  <FileText size={12} className="text-emerald-400" />
                  RFP PARSED · SCOPE &amp; RULES EXTRACTED
                </span>
              ) : (
                <span className="text-[11px] font-extrabold uppercase bg-emerald-400 text-emerald-950 px-3 py-1 rounded-full tracking-wider shadow-sm flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-emerald-950 animate-ping" />
                  VERDICT: {tender.decision}
                </span>
              )}

              <span className="text-xs bg-white/10 px-2.5 py-0.5 rounded-full border border-white/15 text-emerald-200 flex items-center gap-1">
                <Building2 size={12} /> {tender.organization}
              </span>

              {tender.department && (
                <span className="text-[11px] text-emerald-300/80 hidden sm:inline-block">
                  • {tender.department}
                </span>
              )}
            </div>

            {/* Tender Title */}
            <h2 className="text-lg md:text-xl font-bold text-white tracking-tight leading-snug">
              {tender.title}
            </h2>

            {/* Context Notice */}
            {isPreEvaluationStep ? (
              <p className="text-xs text-emerald-100/85 leading-relaxed">
                Tender Ref: <strong className="text-white">{tender.tenderNumber}</strong> · Extracted{" "}
                <strong className="text-emerald-300 font-semibold">{tender.requirements?.length || 7} Mandatory Rules</strong> from RFP.{" "}
                <em>Capability and Fit Score will be evaluated in Step 2 against your Company Vault.</em>
              </p>
            ) : (
              <p className="text-xs text-emerald-100/85 leading-relaxed">
                Evaluating Bidder:{" "}
                <strong className="text-white font-semibold">Tech Solutions Pvt Ltd</strong>{" "}
                against verified <strong>Company Vault</strong>. Turnover, technical manpower, prior experience &amp; statutory compliance evaluated.
              </p>
            )}
          </div>
        </div>

        {/* Right: Metric Stats */}
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 shrink-0">
          <div className="flex items-center gap-2 bg-white/10 p-2.5 rounded-xl border border-white/15 backdrop-blur-xs relative">
            {isPreEvaluationStep ? (
              /* STEP 1: PURE TENDER FINANCIALS (NO PREMATURE FIT SCORE) */
              <>
                {/* 1. Estimated Value */}
                <div className="text-center px-3 border-r border-white/15">
                  <span className="text-[9.5px] uppercase font-bold text-emerald-200 block">
                    Estimated Budget
                  </span>
                  <strong className="text-base font-extrabold text-white block">
                    {tender.estimatedValueDisplay.split(" ")[0]}
                  </strong>
                  <small className="text-[9.5px] text-emerald-300 block">
                    Total Contract Value
                  </small>
                </div>

                {/* 2. EMD Required */}
                <div className="text-center px-3 border-r border-white/15">
                  <span className="text-[9.5px] uppercase font-bold text-emerald-200 block">
                    EMD Security
                  </span>
                  <strong className="text-base font-extrabold text-white block">
                    {tender.emdDisplay}
                  </strong>
                  <small className="text-[9.5px] text-emerald-300 block">
                    Bid Security
                  </small>
                </div>

                {/* 3. Tender Processing Fee */}
                <div className="text-center px-3">
                  <span className="text-[9.5px] uppercase font-bold text-emerald-200 block">
                    Tender Fee
                  </span>
                  <strong className="text-base font-extrabold text-white block">
                    {tender.tenderFeeDisplay.split(" ")[0]}
                  </strong>
                  <small className="text-[9.5px] text-emerald-300 block">
                    Doc Processing Cost
                  </small>
                </div>
              </>
            ) : (
              /* STEP 2+: FIT SCORE & COMPANY CAPABILITY REVEALED */
              <>
                {/* Fit Score with Popover */}
                <div
                  className="text-center px-3 border-r border-white/15 cursor-pointer group hover:bg-white/10 rounded-lg py-1 transition-colors relative"
                  onClick={() => setShowScoreBreakdown(!showScoreBreakdown)}
                  title="Click to view score calculation details"
                >
                  <span className="text-[9.5px] uppercase font-bold text-emerald-200 flex items-center justify-center gap-1">
                    Fit Score <Info size={11} className="text-emerald-300" />
                  </span>
                  <strong className="text-base font-extrabold text-emerald-300 block">
                    {tender.readinessScore} / 100
                  </strong>
                  <small className="text-[9.5px] text-emerald-100 font-medium">
                    {tender.winProbability}% Win Fit
                  </small>

                  {/* Popover */}
                  {showScoreBreakdown && (
                    <div className="absolute right-0 top-full mt-2 w-64 p-3 bg-slate-900 text-slate-100 rounded-xl shadow-2xl border border-emerald-500/40 text-left z-50 text-xs">
                      <div className="font-bold text-emerald-400 mb-1.5 flex items-center gap-1">
                        <Sparkles size={13} /> Score Calculation Formula
                      </div>
                      <div className="space-y-1.5 text-[11px]">
                        <div className="flex justify-between">
                          <span className="text-slate-300">Eligibility Criteria:</span>
                          <strong className="text-white">35 / 40</strong>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-slate-300">Financial Strength:</span>
                          <strong className="text-emerald-400">20 / 20</strong>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-slate-300">Technical Experience:</span>
                          <strong className="text-amber-300">12 / 25</strong>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-slate-300">Vault Documents:</span>
                          <strong className="text-slate-300">10 / 15</strong>
                        </div>
                        <div className="pt-1.5 mt-1.5 border-t border-slate-700 flex justify-between font-bold text-emerald-300">
                          <span>Total Fit Score:</span>
                          <span>{tender.readinessScore} / 100</span>
                        </div>
                      </div>
                    </div>
                  )}
                </div>

                {/* Turnover Comparison */}
                <div className="text-center px-3 border-r border-white/15">
                  <span className="text-[9.5px] uppercase font-bold text-emerald-200 block">
                    Company Turnover
                  </span>
                  <strong className="text-base font-extrabold text-white block">
                    {tender.companyTurnover}
                  </strong>
                  <small className="text-[9.5px] text-emerald-300 block">
                    Req: {tender.turnoverRequired}
                  </small>
                </div>

                {/* EMD Security */}
                <div className="text-center px-3">
                  <span className="text-[9.5px] uppercase font-bold text-emerald-200 block">
                    EMD Security
                  </span>
                  <strong className="text-base font-extrabold text-white block">
                    {tender.emdDisplay}
                  </strong>
                  <small className="text-[9.5px] text-emerald-300 flex items-center justify-center gap-0.5">
                    {tender.emdStatus === "Verified" ? (
                      <>
                        <CheckCircle2 size={11} /> Verified
                      </>
                    ) : tender.emdStatus === "Exempt (MSME)" ? (
                      <>
                        <CheckCircle2 size={11} /> MSME Exempt
                      </>
                    ) : (
                      <>
                        <ShieldAlert size={11} className="text-amber-300" /> Pending
                      </>
                    )}
                  </small>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
