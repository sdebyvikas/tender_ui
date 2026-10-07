import React from "react";
import {
  PenLine,
  Sparkles,
  Layers,
  FileCheck,
  CheckCircle2,
  Cpu,
  ArrowRight,
} from "lucide-react";
import { TabPlaceholderCard } from "./TabPlaceholderCard";
import { TenderV2 } from "../../types";

interface ProposalDeskTabV2Props {
  tender: TenderV2;
  onNextTab?: () => void;
}

export const ProposalDeskTabV2: React.FC<ProposalDeskTabV2Props> = ({
  tender,
  onNextTab,
}) => {
  return (
    <TabPlaceholderCard
      stepNumber={4}
      title="Technical Proposal & Compliance Authoring Desk"
      subtitle="AI Technical Drafts"
      description="Draft technical methodology, scope compliance statements, resource allocation matrices, and statutory tender annexures."
      icon={PenLine}
      badgeText="Technical Proposal Studio"
    >
      {/* 1. Proposal Draft Sections Status */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-3.5">
        <div className="bg-white p-4 rounded-xl border border-slate-200/90 shadow-2xs">
          <div className="flex items-center justify-between mb-1">
            <span className="text-[10px] uppercase font-bold text-slate-400">
              Section 1
            </span>
            <CheckCircle2 size={15} className="text-emerald-600" />
          </div>
          <strong className="text-sm font-bold text-slate-900 block">
            Executive Summary &amp; Understanding
          </strong>
          <span className="text-[11px] text-slate-500 block mt-0.5">
            Auto-drafted · 980 words
          </span>
        </div>

        <div className="bg-white p-4 rounded-xl border border-slate-200/90 shadow-2xs">
          <div className="flex items-center justify-between mb-1">
            <span className="text-[10px] uppercase font-bold text-slate-400">
              Section 2
            </span>
            <CheckCircle2 size={15} className="text-emerald-600" />
          </div>
          <strong className="text-sm font-bold text-slate-900 block">
            Technical Architecture &amp; Methodology
          </strong>
          <span className="text-[11px] text-slate-500 block mt-0.5">
            Cloud native &amp; mobile app stack
          </span>
        </div>

        <div className="bg-white p-4 rounded-xl border border-slate-200/90 shadow-2xs">
          <div className="flex items-center justify-between mb-1">
            <span className="text-[10px] uppercase font-bold text-slate-400">
              Section 3
            </span>
            <CheckCircle2 size={15} className="text-emerald-600" />
          </div>
          <strong className="text-sm font-bold text-slate-900 block">
            Clause-by-Clause Compliance Matrix
          </strong>
          <span className="text-[11px] text-emerald-700 block mt-0.5 font-medium">
            28 / 28 Clauses Complied
          </span>
        </div>
      </div>

      {/* 2. Proposal Sections Builder Preview Box */}
      <div className="bg-white p-5 md:p-6 rounded-2xl border border-slate-200/90 shadow-2xs space-y-4">
        <div className="flex items-center justify-between border-b border-slate-100 pb-3">
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-lg bg-emerald-50 text-emerald-700 flex items-center justify-center font-bold">
              <Sparkles size={15} />
            </div>
            <div>
              <h4 className="text-sm font-bold text-slate-900">
                AI Document Composer
              </h4>
              <p className="text-[11px] text-slate-500">
                Generate and edit tailored proposal chapters
              </p>
            </div>
          </div>
          <button
            type="button"
            className="text-xs font-bold text-emerald-800 bg-emerald-50 hover:bg-emerald-100 px-3 py-1.5 rounded-lg border border-emerald-200 transition-colors flex items-center gap-1.5 cursor-pointer"
          >
            <Cpu size={13} /> Regenerate with AI Copilot
          </button>
        </div>

        <div className="p-4 rounded-xl bg-slate-50/80 border border-slate-200/60 space-y-2">
          <div className="flex items-center gap-2">
            <Layers size={15} className="text-slate-500" />
            <strong className="text-xs text-slate-800 font-bold">
              Active Draft: Technical Approach &amp; Implementation Plan
            </strong>
          </div>
          <p className="text-xs text-slate-600 leading-relaxed font-serif bg-white p-4 rounded-lg border border-slate-200/80 shadow-2xs">
            &quot;Our proposed solution delivers a high-concurrency, microservices-based web portal and mobile app for {tender.organization}. The platform ensures 99.9% uptime, end-to-end encryption for athlete records, and low-latency live score streaming during tournaments...&quot;
          </p>
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
            <span>Proceed to Step 5: PDF Binder &amp; Master Pack</span>
            <ArrowRight size={14} />
          </button>
        </div>
      )}
    </TabPlaceholderCard>
  );
};
