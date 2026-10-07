import React, { useState } from "react";
import {
  ArrowLeft,
  ChevronLeft,
  ChevronRight,
  Layers,
  CheckCircle2,
} from "lucide-react";
import { toast } from "sonner";
import { TenderTabsV2 } from "./TenderTabsV2";
import { TenderVerdictHeroV2 } from "./TenderVerdictHeroV2";
import { OverviewScopeTabV2 } from "./tabs/OverviewScopeTabV2";
import { EligibilityGatesTabV2 } from "./tabs/EligibilityGatesTabV2";
import { PaymentProofTabV2 } from "./tabs/PaymentProofTabV2";
import { ProposalDeskTabV2 } from "./tabs/ProposalDeskTabV2";
import { PdfBinderTabV2 } from "./tabs/PdfBinderTabV2";
import { TenderV2, TabKeyV2 } from "../types";
import { TABS_V2 } from "../mockData";

interface TenderDetailsV2Props {
  tender: TenderV2;
  allTendersCount: number;
  onBackToRepository: () => void;
}

export const TenderDetailsV2: React.FC<TenderDetailsV2Props> = ({
  tender,
  allTendersCount,
  onBackToRepository,
}) => {
  const [activeTab, setActiveTab] = useState<TabKeyV2>("overview");

  const currentTabObj = TABS_V2.find((t) => t.id === activeTab) || TABS_V2[0];
  const currentStepIndex = TABS_V2.findIndex((t) => t.id === activeTab);

  const handleNextTab = () => {
    if (currentStepIndex < TABS_V2.length - 1) {
      const nextTab = TABS_V2[currentStepIndex + 1].id;
      setActiveTab(nextTab);
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  const handlePrevTab = () => {
    if (currentStepIndex > 0) {
      const prevTab = TABS_V2[currentStepIndex - 1].id;
      setActiveTab(prevTab);
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  return (
    <div className="space-y-6 fade-up">
      {/* 1. Header & Breadcrumb */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-1.5 text-xs text-slate-500 mb-1 font-medium flex-wrap">
            <button
              type="button"
              onClick={onBackToRepository}
              className="hover:text-slate-800 transition-colors cursor-pointer"
            >
              Bid workspace
            </button>
            <span>&rsaquo;</span>
            <button
              type="button"
              onClick={onBackToRepository}
              className="hover:text-slate-800 transition-colors cursor-pointer"
            >
              Tenders Repository v2
            </button>
            <span>&rsaquo;</span>
            <span className="font-mono text-slate-700">
              {tender.tenderNumber}
            </span>
            <span>&rsaquo;</span>
            <span className="text-[#173C40] font-bold">
              {currentTabObj.stepNumber}. {currentTabObj.label}
            </span>
          </div>

          <div className="flex items-center gap-3">
            <h1 className="text-2xl md:text-3xl font-extrabold text-slate-900 tracking-tight">
              Tender Details &amp; Operations
            </h1>
            <span className="text-[11px] font-bold bg-slate-100 text-slate-700 px-2.5 py-0.5 rounded-full border border-slate-200">
              v2 Modular UI
            </span>
          </div>
        </div>

        <div className="flex items-center gap-2.5">
          <button
            type="button"
            onClick={onBackToRepository}
            className="px-3.5 py-2 bg-white hover:bg-slate-50 text-slate-700 border border-slate-300 rounded-xl text-xs font-bold flex items-center gap-1.5 shadow-2xs transition-colors cursor-pointer"
          >
            <ArrowLeft size={14} />
            <span>All Tenders ({allTendersCount})</span>
          </button>
        </div>
      </div>

      {/* 2. Top Tabs Stepper */}
      <TenderTabsV2
        activeTab={activeTab}
        onTabChange={(tabId) => {
          setActiveTab(tabId);
          window.scrollTo({ top: 0, behavior: "smooth" });
        }}
      />

      {/* 3. Tender Verdict & Evaluation Hero Banner */}
      <TenderVerdictHeroV2 tender={tender} activeTab={activeTab} />

      {/* 4. Dynamic Tab Content View */}
      <div className="transition-opacity duration-200">
        {activeTab === "overview" && (
          <OverviewScopeTabV2 tender={tender} onNextTab={handleNextTab} />
        )}

        {activeTab === "eligibility" && (
          <EligibilityGatesTabV2 tender={tender} onNextTab={handleNextTab} />
        )}

        {activeTab === "payment" && (
          <PaymentProofTabV2 tender={tender} onNextTab={handleNextTab} />
        )}

        {activeTab === "proposal" && (
          <ProposalDeskTabV2 tender={tender} onNextTab={handleNextTab} />
        )}

        {activeTab === "binder" && (
          <PdfBinderTabV2
            tender={tender}
            onFinish={() => {
              toast.success("Workflow completed for this tender!");
              onBackToRepository();
            }}
          />
        )}
      </div>

      {/* 5. Bottom Stepper Navigation Footer */}
      <div className="bg-white p-4 rounded-2xl border border-slate-200/90 shadow-2xs flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <button
          type="button"
          disabled={currentStepIndex === 0}
          onClick={handlePrevTab}
          className={`px-4 py-2 rounded-xl text-xs font-bold flex items-center gap-1.5 transition-colors cursor-pointer ${
            currentStepIndex === 0
              ? "opacity-40 cursor-not-allowed bg-slate-100 text-slate-400"
              : "bg-slate-100 hover:bg-slate-200 text-slate-700"
          }`}
        >
          <ChevronLeft size={14} />
          <span>Previous Step</span>
        </button>

        <div className="text-xs text-slate-500 font-medium text-center">
          Step {currentTabObj.stepNumber} of {TABS_V2.length}:{" "}
          <strong className="text-slate-800">{currentTabObj.label}</strong>
        </div>

        {currentStepIndex < TABS_V2.length - 1 ? (
          <button
            type="button"
            onClick={handleNextTab}
            className="px-4 py-2 bg-[#173C40] hover:bg-slate-800 text-white rounded-xl text-xs font-bold flex items-center gap-1.5 shadow-xs transition-colors cursor-pointer"
          >
            <span>Next: {TABS_V2[currentStepIndex + 1].label}</span>
            <ChevronRight size={14} />
          </button>
        ) : (
          <button
            type="button"
            onClick={() => {
              toast.success("Master Bid Dossier finalized!");
              onBackToRepository();
            }}
            className="px-4 py-2 bg-emerald-700 hover:bg-emerald-800 text-white rounded-xl text-xs font-bold flex items-center gap-1.5 shadow-xs transition-colors cursor-pointer"
          >
            <CheckCircle2 size={14} />
            <span>Finish Workflow</span>
          </button>
        )}
      </div>
    </div>
  );
};
