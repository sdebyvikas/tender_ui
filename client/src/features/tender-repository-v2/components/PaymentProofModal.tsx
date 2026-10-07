import React from "react";
import { createPortal } from "react-dom";
import {
  X,
  FileBadge2,
  Receipt,
  Download,
  Printer,
  CheckCircle2,
  Building2,
  ShieldCheck,
  Landmark,
  FileText,
} from "lucide-react";
import { toast } from "sonner";
import { TenderV2 } from "../types";

export type PaymentModalType =
  | "EXEMPTION_LETTER"
  | "FEE_RECEIPT"
  | "DD_PREVIEW"
  | "BG_PREVIEW";

export interface CustomDocPreviewData {
  title?: string;
  instrumentNumber?: string;
  bankName?: string;
  branchName?: string;
  issueDate?: string;
  amountDisplay?: string;
  amountInWords?: string;
  drawnInFavor?: string;
  payableAt?: string;
  validUntil?: string;
  fileName?: string;
}

interface PaymentProofModalProps {
  isOpen: boolean;
  onClose: () => void;
  type: PaymentModalType;
  tender: TenderV2;
  customData?: CustomDocPreviewData;
}

export const PaymentProofModal: React.FC<PaymentProofModalProps> = ({
  isOpen,
  onClose,
  type,
  tender,
  customData,
}) => {
  if (!isOpen) return null;

  const signatory = tender.signatoryDetails || {
    companyName: "Tech Solutions Pvt Ltd",
    hqLocation: "Tech Park, GS Road, Guwahati & Andheri East, Mumbai",
    pan: "AABCT8291M",
    gstin: "27AABCT8291M1Z8",
    cin: "U72900MH2019PTC328491",
    udyamRegistration: "UDYAM-MH-19-0048291",
    signatoryName: "Vikas Kumar",
    signatoryTitle: "Director & Authorized Bid Representative",
    signatoryEmail: "vikasfrontenddeveloper007@gmail.com",
    signatoryPhone: "+91 98765 43210",
    poaStatus: "Verified" as const,
    signatureReady: true,
    dscSerial: "DSC-8839-IN-CLASS3-2027",
    dscExpiry: "12 Oct 2027",
    bidLeadName: "Vikas Kumar (Lead Bid Strategist)",
    technicalReviewer: "Arindam Roy (Chief Solution Architect)",
    financialReviewer: "Priya Sharma (Finance Controller)",
  };

  const handleDownload = () => {
    const filename =
      type === "EXEMPTION_LETTER"
        ? "MSME_Rule_170_Exemption_Declaration.pdf"
        : type === "DD_PREVIEW"
        ? (customData?.fileName || "Scanned_Demand_Draft.pdf")
        : type === "BG_PREVIEW"
        ? "Scanned_Bank_Guarantee.pdf"
        : "Tender_Fee_Payment_Receipt_Challan.pdf";

    toast.success("Document downloaded successfully!", {
      description: `${filename} saved to downloads.`,
    });
  };

  const handlePrint = () => {
    toast.info("Preparing document for print...", {
      description: "Standard statutory layout with bank & digital verification stamps.",
    });
  };

  return createPortal(
    <div
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
      className="fixed inset-0 z-[9999] flex items-center justify-center p-4 bg-slate-950/75 backdrop-blur-xs animate-in fade-in duration-200"
    >
      <div className="bg-white rounded-2xl max-w-3xl w-full shadow-2xl border border-slate-200 overflow-hidden flex flex-col max-h-[90vh] my-auto">
        {/* Top Header Bar */}
        <div className="bg-gradient-to-r from-[#082924] via-[#0C3B34] to-[#134942] text-white px-6 py-4 flex items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-white/10 border border-white/20 flex items-center justify-center font-bold">
              {type === "EXEMPTION_LETTER" && (
                <FileBadge2 size={18} className="text-emerald-300" />
              )}
              {type === "FEE_RECEIPT" && (
                <Receipt size={18} className="text-emerald-300" />
              )}
              {type === "DD_PREVIEW" && (
                <Landmark size={18} className="text-amber-300" />
              )}
              {type === "BG_PREVIEW" && (
                <ShieldCheck size={18} className="text-purple-300" />
              )}
            </div>
            <div>
              <h3 className="text-sm md:text-base font-bold text-white tracking-tight">
                {type === "EXEMPTION_LETTER" &&
                  "Rule 170 MSME Bid Security Exemption Declaration"}
                {type === "FEE_RECEIPT" &&
                  "Tender Processing Fee Online Payment Receipt (SBI e-Pay)"}
                {type === "DD_PREVIEW" &&
                  (customData?.title || "Scanned Demand Draft (DD) Instrument")}
                {type === "BG_PREVIEW" &&
                  "Bank Guarantee (BG) Irrevocable Instrument Copy"}
              </h3>
              <p className="text-[11px] text-emerald-100/80">
                Official statutory attachment for Cover-1 submission &bull; Tender Ref:{" "}
                <strong className="font-mono text-white">
                  {tender.tenderNumber}
                </strong>
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="p-1.5 rounded-lg bg-white/10 hover:bg-white/20 text-white transition-colors cursor-pointer shrink-0"
          >
            <X size={18} />
          </button>
        </div>

        {/* Modal Document Body */}
        <div className="p-6 overflow-y-auto bg-slate-100/80 space-y-4">
          {/* ================= 1. DEMAND DRAFT (DD) PREVIEW ================= */}
          {type === "DD_PREVIEW" && (
            <div className="bg-gradient-to-r from-amber-50 via-white to-amber-50/50 p-6 md:p-8 rounded-xl shadow-md border-2 border-amber-300/80 text-slate-800 space-y-4 max-w-2xl mx-auto font-sans relative overflow-hidden">
              {/* Watermark */}
              <div className="absolute inset-0 flex items-center justify-center opacity-5 pointer-events-none select-none text-slate-900 font-extrabold text-5xl rotate-[-15deg]">
                BANK DEMAND DRAFT
              </div>

              {/* DD Bank Header */}
              <div className="flex items-start justify-between border-b-2 border-amber-800/20 pb-3 gap-3">
                <div className="flex items-center gap-2.5">
                  <div className="w-10 h-10 rounded-lg bg-amber-600 text-white flex items-center justify-center font-bold">
                    <Landmark size={22} />
                  </div>
                  <div>
                    <h2 className="text-sm font-extrabold text-slate-900 uppercase tracking-tight">
                      {customData?.bankName || "State Bank of India"}
                    </h2>
                    <p className="text-[11px] text-slate-600 font-medium">
                      Branch: {customData?.branchName || "Main Branch, Ranchi (IFSC: SBIN0000167)"}
                    </p>
                  </div>
                </div>

                <div className="text-right">
                  <span className="text-[10px] uppercase font-bold text-amber-900 block">
                    DEMAND DRAFT
                  </span>
                  <div className="border border-slate-300 bg-white px-2.5 py-1 rounded text-[11px] font-mono font-bold text-slate-800 inline-block mt-0.5">
                    DATE: {customData?.issueDate || "10/03/2026"}
                  </div>
                </div>
              </div>

              {/* DD Body Details */}
              <div className="space-y-3 text-xs pt-1">
                <div className="flex flex-col sm:flex-row sm:items-baseline gap-2 border-b border-dashed border-amber-200 pb-2">
                  <span className="text-slate-500 font-semibold shrink-0">
                    PAY ON DEMAND TO:
                  </span>
                  <strong className="text-slate-900 font-bold uppercase tracking-wide">
                    {customData?.drawnInFavor || `Executive Engineer, ${tender.organization}`}
                  </strong>
                </div>

                <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-2 border-b border-dashed border-amber-200 pb-2">
                  <div className="flex items-baseline gap-2">
                    <span className="text-slate-500 font-semibold shrink-0">
                      RUPEES IN WORDS:
                    </span>
                    <strong className="text-slate-800 font-semibold">
                      {customData?.amountInWords || "Five Thousand Nine Hundred Rupees Only"}
                    </strong>
                  </div>

                  <div className="bg-amber-100/80 border-2 border-amber-400 px-3 py-1 rounded-md text-right shrink-0">
                    <span className="text-[10px] text-amber-900 font-bold block">AMOUNT</span>
                    <strong className="text-sm font-black font-mono text-slate-900">
                      {customData?.amountDisplay || "₹ 5,900.00"}
                    </strong>
                  </div>
                </div>

                <div className="flex items-center justify-between text-[11px] text-slate-600 pt-1">
                  <span>
                    Payable at: <strong>{customData?.payableAt || "Ranchi / Local Clearing"}</strong>
                  </span>
                  <span className="font-mono text-slate-500">
                    Issued on A/C of: {signatory.companyName}
                  </span>
                </div>
              </div>

              {/* DD Bottom Signatures & MICR */}
              <div className="pt-4 border-t border-amber-800/20 flex flex-col sm:flex-row items-center justify-between gap-4">
                {/* MICR Code Strip */}
                <div className="font-mono text-xs tracking-widest text-slate-700 bg-amber-100/50 px-3 py-1.5 rounded border border-amber-200/80">
                  ⑈ {customData?.instrumentNumber || "591028"} ⑈ 834002011 ⑆ 003921 ⑈ 16
                </div>

                {/* Bank Officer Sign Stamp */}
                <div className="text-right border-l-2 border-amber-300 pl-4 space-y-0.5">
                  <div className="text-[10px] text-emerald-800 font-bold flex items-center justify-end gap-1">
                    <CheckCircle2 size={12} /> Bank Seal Verified
                  </div>
                  <strong className="text-xs font-bold text-slate-900 block font-mono">
                    For {customData?.bankName || "State Bank of India"}
                  </strong>
                  <span className="text-[10px] text-slate-500 block">
                    Authorised Officer &bull; Branch Code 0167
                  </span>
                </div>
              </div>
            </div>
          )}

          {/* ================= 2. BANK GUARANTEE (BG) PREVIEW ================= */}
          {type === "BG_PREVIEW" && (
            <div className="bg-white p-8 rounded-xl shadow-md border border-slate-200/90 text-slate-800 space-y-5 max-w-2xl mx-auto font-sans text-xs">
              {/* e-Stamp Header */}
              <div className="border-2 border-purple-300 bg-purple-50/40 p-4 rounded-xl flex items-center justify-between">
                <div>
                  <span className="text-[10px] font-extrabold uppercase tracking-wider text-purple-900 block">
                    GOVERNMENT OF INDIA &bull; NON-JUDICIAL e-STAMP CERTIFICATE
                  </span>
                  <strong className="text-xs font-bold text-slate-900 font-mono">
                    IN-MH82910482918239U (Duty Paid: ₹500)
                  </strong>
                </div>
                <div className="w-8 h-8 rounded-lg bg-purple-700 text-white flex items-center justify-center font-bold">
                  <ShieldCheck size={18} />
                </div>
              </div>

              {/* Instrument Title */}
              <div className="text-center space-y-1">
                <h3 className="text-sm font-extrabold text-slate-900 uppercase">
                  Bank Guarantee for Earnest Money Deposit (EMD)
                </h3>
                <p className="text-[11px] text-slate-500 font-mono">
                  BG Reference: {customData?.instrumentNumber || "BG-9920-2026-MUM"} &bull; Value: {customData?.amountDisplay || "₹ 5,00,000/-"}
                </p>
              </div>

              {/* BG Body */}
              <div className="space-y-2 text-justify text-slate-700 leading-relaxed text-[11.5px]">
                <p>
                  WHEREAS <strong>{signatory.companyName}</strong> (hereinafter called &ldquo;the Bidder&rdquo;) has submitted its bid dated 10-03-2026 for the execution of <em>{tender.title}</em> in response to Tender No: <strong>{tender.tenderNumber}</strong>.
                </p>
                <p>
                  KNOW ALL MEN by these presents that WE, <strong>{customData?.bankName || "State Bank of India"}</strong>, having our registered office at Nariman Point, Mumbai, bind ourselves to pay to <strong>{tender.organization}</strong> the sum of <strong>₹5,00,000 (Rupees Five Lakhs Only)</strong>.
                </p>
                <p>
                  This guarantee shall remain in force up to and including <strong>{customData?.validUntil || "07 September 2026"} (180 days)</strong> plus a claim period of 60 days. SFMS confirmation advice dispatched via structured financial messaging system.
                </p>
              </div>

              {/* Signatures */}
              <div className="pt-3 border-t border-slate-200 flex items-center justify-between text-xs">
                <div>
                  <span className="text-slate-500 text-[10.5px]">SFMS Advice Code:</span>
                  <strong className="font-mono text-purple-900 block">SFMS-IN-SBI-2026-03-10-8921</strong>
                </div>
                <div className="text-right">
                  <strong className="text-slate-900 block font-bold">For {customData?.bankName || "State Bank of India"}</strong>
                  <span className="text-[10px] text-slate-500">Chief Manager &amp; Signatory (Seal Affixed)</span>
                </div>
              </div>
            </div>
          )}

          {/* ================= 3. RULE 170 EXEMPTION LETTER PREVIEW ================= */}
          {type === "EXEMPTION_LETTER" && (
            <div className="bg-white p-8 md:p-10 rounded-xl shadow-md border border-slate-200/90 text-slate-800 space-y-6 max-w-2xl mx-auto font-sans text-xs leading-relaxed">
              {/* Letterhead */}
              <div className="border-b-2 border-slate-900 pb-4 flex items-start justify-between gap-4">
                <div>
                  <h2 className="text-base font-extrabold text-slate-900 tracking-tight uppercase">
                    {signatory.companyName}
                  </h2>
                  <p className="text-[10.5px] text-slate-500 mt-0.5">
                    {signatory.hqLocation} &bull; CIN: {signatory.cin}
                  </p>
                  <p className="text-[10.5px] text-slate-500">
                    PAN: {signatory.pan} &bull; GSTIN: {signatory.gstin} &bull; MSME UDYAM:{" "}
                    <strong className="text-emerald-800 font-mono">
                      {signatory.udyamRegistration || "UDYAM-MH-19-0048291"}
                    </strong>
                  </p>
                </div>
                <div className="text-right shrink-0">
                  <span className="text-[10px] uppercase font-bold text-slate-400 block">
                    Document Ref:
                  </span>
                  <strong className="text-slate-900 font-mono text-[11px] block">
                    TSPL/TND/2026/EMD-EX-01
                  </strong>
                  <span className="text-[10.5px] text-slate-500 block mt-0.5">
                    Date: 10 March 2026
                  </span>
                </div>
              </div>

              {/* Addressee */}
              <div className="space-y-0.5 text-xs text-slate-700">
                <p className="font-semibold">To,</p>
                <p className="font-bold text-slate-900">
                  The Tendering Authority / Evaluation Committee,
                </p>
                <p>{tender.organization}</p>
                {tender.department && <p>{tender.department}</p>}
                <p>{tender.location || "India"}</p>
              </div>

              {/* Subject */}
              <div className="bg-slate-50 p-3 rounded-lg border border-slate-200">
                <strong className="text-slate-900 block font-bold text-xs">
                  SUBJECT: Claim for Exemption from Submission of Earnest Money Deposit (EMD) / Bid Security under Rule 170 of General Financial Rules (GFR), 2017.
                </strong>
                <p className="text-[11px] text-slate-600 mt-1">
                  <strong>Tender Reference No:</strong> {tender.tenderNumber} &mdash;{" "}
                  <em>{tender.title}</em>
                </p>
              </div>

              {/* Letter Body */}
              <div className="space-y-2.5 text-xs text-slate-700 text-justify">
                <p>Dear Sir / Madam,</p>
                <p>
                  We, <strong>{signatory.companyName}</strong>, having registered corporate office at{" "}
                  {signatory.hqLocation}, hereby submit our technical and commercial bid in response to the subject tender.
                </p>
                <p>
                  In accordance with <strong>Rule 170 of General Financial Rules (GFR), 2017</strong> and the Public Procurement Policy for Micro and Small Enterprises (MSEs) Order, 2012, <strong>Micro and Small Enterprises (MSEs) registered with Udyam Registration are exempted from payment of Earnest Money Deposit (EMD) / Bid Security</strong>.
                </p>
                <p>
                  We hereby confirm that our enterprise is registered as a <strong>Small Enterprise</strong> under Udyam Registration with Certificate Number:{" "}
                  <strong className="font-mono text-emerald-800 bg-emerald-50 px-1 py-0.5 rounded border border-emerald-200">
                    {signatory.udyamRegistration || "UDYAM-MH-19-0048291"}
                  </strong>
                  . An authentic copy of our active Udyam Registration Certificate is enclosed in Cover-1.
                </p>
              </div>

              {/* Signatory & Digital Stamp */}
              <div className="pt-4 border-t border-slate-200 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                <div className="space-y-1">
                  <p className="text-slate-500 text-[11px]">Yours faithfully,</p>
                  <strong className="text-slate-900 text-xs block font-bold">
                    For {signatory.companyName}
                  </strong>
                  <div className="pt-1.5">
                    <p className="font-bold text-slate-900">{signatory.signatoryName}</p>
                    <p className="text-slate-500 text-[11px]">{signatory.signatoryTitle}</p>
                  </div>
                </div>

                <div className="p-3 bg-emerald-50 rounded-xl border border-emerald-300 text-emerald-950 space-y-1 text-center shrink-0 w-full sm:w-auto">
                  <div className="flex items-center justify-center gap-1 text-[11px] font-extrabold text-emerald-800 uppercase tracking-wider">
                    <ShieldCheck size={14} className="text-emerald-700" />
                    <span>Digitally Signed &amp; Sealed</span>
                  </div>
                  <strong className="text-xs font-bold text-slate-900 block font-mono">
                    {signatory.signatoryName}
                  </strong>
                  <span className="text-[10px] text-slate-600 block font-mono">
                    DSC: {signatory.dscSerial}
                  </span>
                </div>
              </div>
            </div>
          )}

          {/* ================= 4. ONLINE PAYMENT RECEIPT PREVIEW ================= */}
          {type === "FEE_RECEIPT" && (
            <div className="bg-white p-8 rounded-xl shadow-md border border-slate-200/90 text-slate-800 space-y-5 max-w-xl mx-auto text-xs">
              <div className="text-center pb-3 border-b border-slate-200 space-y-1">
                <div className="w-10 h-10 rounded-full bg-emerald-100 text-emerald-800 mx-auto flex items-center justify-center mb-1">
                  <CheckCircle2 size={22} className="text-emerald-700" />
                </div>
                <h3 className="text-base font-extrabold text-slate-900 uppercase tracking-tight">
                  Payment Confirmation Receipt
                </h3>
                <p className="text-xs text-slate-500">
                  Government e-Procurement Portal Payment Gateway (SBI e-Pay)
                </p>
                <span className="inline-block px-2.5 py-0.5 bg-emerald-100 text-emerald-800 font-bold rounded-full text-[10px] border border-emerald-300 mt-1">
                  TRANSACTION STATUS: SUCCESS / SETTLED
                </span>
              </div>

              <div className="space-y-2 bg-slate-50 p-4 rounded-xl border border-slate-200/80 text-xs">
                <div className="flex justify-between py-1 border-b border-slate-200/60">
                  <span className="text-slate-500">Tender Ref:</span>
                  <strong className="font-mono text-slate-900">{tender.tenderNumber}</strong>
                </div>
                <div className="flex justify-between py-1 border-b border-slate-200/60">
                  <span className="text-slate-500">Bank Ref (UTR):</span>
                  <strong className="font-mono text-emerald-800">SBIN20260310928371</strong>
                </div>
                <div className="flex justify-between py-1 border-b border-slate-200/60">
                  <span className="text-slate-500">Payment Date:</span>
                  <strong className="text-slate-800">10 Mar 2026, 02:45 PM IST</strong>
                </div>
                <div className="flex justify-between py-1.5 pt-2 text-sm">
                  <span className="font-bold text-slate-900">Total Amount Paid:</span>
                  <strong className="font-extrabold text-emerald-700 text-base">₹5,900.00</strong>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Modal Footer Actions */}
        <div className="bg-slate-50 px-6 py-4 border-t border-slate-200 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div className="text-xs text-slate-500">
            Status: <strong className="text-emerald-700 font-bold">Attached to Master Dossier (Cover 1)</strong>
          </div>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={handlePrint}
              className="px-3.5 py-2 bg-white hover:bg-slate-100 text-slate-700 border border-slate-300 rounded-xl text-xs font-bold transition-colors cursor-pointer flex items-center gap-1.5 shadow-2xs"
            >
              <Printer size={13} />
              <span>Print</span>
            </button>

            <button
              type="button"
              onClick={handleDownload}
              className="px-4 py-2 bg-[#173C40] hover:bg-slate-800 text-white rounded-xl text-xs font-bold transition-colors shadow-2xs cursor-pointer flex items-center gap-1.5"
            >
              <Download size={13} />
              <span>Download PDF</span>
            </button>
          </div>
        </div>
      </div>
    </div>,
    document.body,
  );
};
