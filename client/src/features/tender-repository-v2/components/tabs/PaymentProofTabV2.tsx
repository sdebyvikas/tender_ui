import React from "react";
import {
  CreditCard,
  Receipt,
  FileBadge2,
  CheckCircle2,
  UploadCloud,
  ArrowRight,
} from "lucide-react";
import { TabPlaceholderCard } from "./TabPlaceholderCard";
import { TenderV2 } from "../../types";

interface PaymentProofTabV2Props {
  tender: TenderV2;
  onNextTab?: () => void;
}

export const PaymentProofTabV2: React.FC<PaymentProofTabV2Props> = ({
  tender,
  onNextTab,
}) => {
  return (
    <TabPlaceholderCard
      stepNumber={3}
      title="Financial Security & Payment Proof Desk"
      subtitle="EMD & Cover-1 Slip"
      description="Manage Earnest Money Deposit (EMD), Tender Document Processing Fee, MSME / Udyam exemptions (GFR Rule 170), and Bank Guarantee attachments."
      icon={CreditCard}
      badgeText="Cover-1 Financial Desk"
    >
      {/* 1. EMD & Tender Fee Metrics Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-3.5">
        <div className="bg-white p-4 rounded-xl border border-slate-200/90 shadow-2xs">
          <span className="text-[10px] uppercase font-bold text-slate-400 block mb-1">
            EMD Amount Required
          </span>
          <strong className="text-sm font-bold text-slate-900 block">
            {tender.emdDisplay}
          </strong>
          <span className="text-[11px] text-emerald-700 block mt-0.5 font-medium">
            Status: {tender.emdStatus}
          </span>
        </div>

        <div className="bg-white p-4 rounded-xl border border-slate-200/90 shadow-2xs">
          <span className="text-[10px] uppercase font-bold text-slate-400 block mb-1">
            Tender Document Fee
          </span>
          <strong className="text-sm font-bold text-slate-900 block">
            ₹5,000 + 18% GST (₹5,900)
          </strong>
          <span className="text-[11px] text-slate-500 block mt-0.5">
            Non-refundable processing fee
          </span>
        </div>

        <div className="bg-white p-4 rounded-xl border border-emerald-200/90 bg-emerald-50/20 shadow-2xs">
          <span className="text-[10px] uppercase font-bold text-slate-400 block mb-1">
            MSME / Udyam Benefit
          </span>
          <strong className="text-sm font-bold text-emerald-800 block flex items-center gap-1">
            <CheckCircle2 size={14} /> 100% EMD Exemption Eligible
          </strong>
          <span className="text-[11px] text-slate-500 block mt-0.5">
            Udyam Reg: UDYAM-MH-01-0029148
          </span>
        </div>
      </div>

      {/* 2. Payment Slips & Exemption Declaration Container */}
      <div className="bg-white p-5 md:p-6 rounded-2xl border border-slate-200/90 shadow-2xs space-y-4">
        <div className="flex items-center justify-between border-b border-slate-100 pb-3">
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-lg bg-emerald-50 text-emerald-700 flex items-center justify-center font-bold">
              <FileBadge2 size={15} />
            </div>
            <div>
              <h4 className="text-sm font-bold text-slate-900">
                Payment Proofs &amp; Statutory Cover-1 Documents
              </h4>
              <p className="text-[11px] text-slate-500">
                Attached receipts and certificates linked for bid submission
              </p>
            </div>
          </div>
          <button
            type="button"
            className="text-xs font-bold text-[#173C40] hover:text-slate-800 bg-slate-100 hover:bg-slate-200 px-3 py-1.5 rounded-lg border border-slate-300 transition-colors flex items-center gap-1 cursor-pointer"
          >
            <UploadCloud size={13} /> Upload Challan / UTR
          </button>
        </div>

        <div className="space-y-2 text-xs">
          <div className="flex items-center justify-between p-3.5 rounded-xl bg-slate-50/80 border border-slate-200/60">
            <div className="flex items-center gap-3">
              <Receipt size={17} className="text-emerald-700" />
              <div>
                <strong className="text-slate-900 block font-semibold">
                  Tender Fee Online Payment Challan (SBI e-Pay)
                </strong>
                <span className="text-slate-500 text-[11px]">
                  Ref / UTR: SBIN20260310928371 · ₹5,900 Paid on 10 Mar 2026
                </span>
              </div>
            </div>
            <span className="text-[11px] font-bold text-emerald-800 bg-emerald-100 px-2.5 py-0.5 rounded-full">
              Attached &amp; Verified
            </span>
          </div>

          <div className="flex items-center justify-between p-3.5 rounded-xl bg-slate-50/80 border border-slate-200/60">
            <div className="flex items-center gap-3">
              <FileBadge2 size={17} className="text-emerald-700" />
              <div>
                <strong className="text-slate-900 block font-semibold">
                  Udyam MSME Exemption Certificate &amp; Self-Declaration
                </strong>
                <span className="text-slate-500 text-[11px]">
                  Under Rule 170 of GFR 2017 · Auto-populated with Director Signature
                </span>
              </div>
            </div>
            <span className="text-[11px] font-bold text-emerald-800 bg-emerald-100 px-2.5 py-0.5 rounded-full">
              Auto-Generated
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
            <span>Proceed to Step 4: Proposal Desk</span>
            <ArrowRight size={14} />
          </button>
        </div>
      )}
    </TabPlaceholderCard>
  );
};
