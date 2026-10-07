import React from "react";
import {
  Library,
  FileDown,
  FileCheck,
  CheckCircle2,
  FolderArchive,
  Download,
  Printer,
  Sparkles,
} from "lucide-react";
import { toast } from "sonner";
import { TabPlaceholderCard } from "./TabPlaceholderCard";
import { TenderV2 } from "../../types";

interface PdfBinderTabV2Props {
  tender: TenderV2;
  onFinish?: () => void;
}

export const PdfBinderTabV2: React.FC<PdfBinderTabV2Props> = ({
  tender,
  onFinish,
}) => {
  return (
    <TabPlaceholderCard
      stepNumber={5}
      title="Master Bid Dossier & PDF Binder"
      subtitle="Master Pack & Export"
      description="Sequentially merge, paginate, index, and digitally bind all bid components into a compliant master tender dossier (PDF & Word)."
      icon={Library}
      badgeText="Master Pack Compiler"
    >
      {/* 1. Binder Pack Readiness Status */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-3.5">
        <div className="bg-white p-4 rounded-xl border border-emerald-200/90 bg-emerald-50/20 shadow-2xs">
          <div className="flex items-center justify-between mb-1">
            <span className="text-[10px] uppercase font-bold text-slate-400">
              Compilation Status
            </span>
            <CheckCircle2 size={15} className="text-emerald-600" />
          </div>
          <strong className="text-sm font-bold text-emerald-800 block">
            Ready to Bind &amp; Export
          </strong>
          <span className="text-[11px] text-slate-500 block mt-0.5">
            5 Mandatory Annexures Attached
          </span>
        </div>

        <div className="bg-white p-4 rounded-xl border border-slate-200/90 shadow-2xs">
          <div className="flex items-center justify-between mb-1">
            <span className="text-[10px] uppercase font-bold text-slate-400">
              Signatory Binding
            </span>
            <CheckCircle2 size={15} className="text-emerald-600" />
          </div>
          <strong className="text-sm font-bold text-slate-900 block">
            Authorized Director (DIN Mapped)
          </strong>
          <span className="text-[11px] text-slate-500 block mt-0.5">
            Digital signature stamps ready
          </span>
        </div>

        <div className="bg-white p-4 rounded-xl border border-slate-200/90 shadow-2xs">
          <div className="flex items-center justify-between mb-1">
            <span className="text-[10px] uppercase font-bold text-slate-400">
              Dossier Size
            </span>
            <FolderArchive size={15} className="text-slate-400" />
          </div>
          <strong className="text-sm font-bold text-slate-900 block">
            Estimated 48 Pages (8.4 MB)
          </strong>
          <span className="text-[11px] text-slate-500 block mt-0.5">
            Auto Table of Contents (TOC) included
          </span>
        </div>
      </div>

      {/* 2. Dossier Sequence & Table of Contents Preview */}
      <div className="bg-white p-5 md:p-6 rounded-2xl border border-slate-200/90 shadow-2xs space-y-4">
        <div className="flex items-center justify-between border-b border-slate-100 pb-3">
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-lg bg-emerald-50 text-emerald-700 flex items-center justify-center font-bold">
              <FileCheck size={15} />
            </div>
            <div>
              <h4 className="text-sm font-bold text-slate-900">
                Master Bid Pack Sequence
              </h4>
              <p className="text-[11px] text-slate-500">
                Documents arranged per procurement guidelines
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() =>
                toast.success("Downloading Master Bid Package (PDF)...")
              }
              className="px-3 py-1.5 bg-[#173C40] hover:bg-slate-800 text-white rounded-lg text-xs font-bold flex items-center gap-1.5 shadow-2xs cursor-pointer transition-colors"
            >
              <Download size={13} /> Export Master PDF
            </button>
            <button
              type="button"
              onClick={() =>
                toast.info("Word document (.docx) generation started")
              }
              className="px-3 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-800 rounded-lg text-xs font-bold flex items-center gap-1.5 border border-slate-300 cursor-pointer transition-colors"
            >
              <FileDown size={13} /> Export Word (.docx)
            </button>
          </div>
        </div>

        <div className="space-y-2 text-xs">
          {[
            { num: "01", title: "Master Bid Cover Page & Power of Attorney", pages: "Pages 1-3", status: "Ready" },
            { num: "02", title: "Section 1: Fee & EMD Exemption Proof (Cover-1)", pages: "Pages 4-7", status: "Ready" },
            { num: "03", title: "Section 2: Company Vault Statutory Certifications & Balance Sheets", pages: "Pages 8-22", status: "Ready" },
            { num: "04", title: "Section 3: Technical Approach, Architecture & Compliance Matrix", pages: "Pages 23-40", status: "Ready" },
            { num: "05", title: "Section 4: Mandatory Declarations & Annexure Slips", pages: "Pages 41-48", status: "Ready" },
          ].map((item) => (
            <div
              key={item.num}
              className="flex items-center justify-between p-3 rounded-xl bg-slate-50/80 border border-slate-200/60"
            >
              <div className="flex items-center gap-3">
                <span className="w-6 h-6 rounded-lg bg-slate-200/80 text-slate-700 flex items-center justify-center font-bold text-[11px]">
                  {item.num}
                </span>
                <div>
                  <strong className="text-slate-900 block font-semibold">
                    {item.title}
                  </strong>
                  <span className="text-slate-500 text-[11px]">{item.pages}</span>
                </div>
              </div>
              <span className="text-[11px] font-bold text-emerald-800 bg-emerald-100 px-2.5 py-0.5 rounded-full">
                {item.status}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Finish Action Bar */}
      {onFinish && (
        <div className="flex justify-end pt-2">
          <button
            type="button"
            onClick={onFinish}
            className="px-5 py-2.5 bg-emerald-700 hover:bg-emerald-800 text-white rounded-xl text-xs font-bold flex items-center gap-2 shadow-xs transition-colors cursor-pointer"
          >
            <Sparkles size={14} />
            <span>Complete &amp; Return to Repository</span>
          </button>
        </div>
      )}
    </TabPlaceholderCard>
  );
};
