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
  Stamp,
  ExternalLink,
  Calendar,
  Lock,
} from "lucide-react";
import { toast } from "sonner";
import { TenderV2 } from "../types";

export type PaymentModalType = "EXEMPTION_LETTER" | "FEE_RECEIPT" | "BG_PREVIEW";

interface PaymentProofModalProps {
  isOpen: boolean;
  onClose: () => void;
  type: PaymentModalType;
  tender: TenderV2;
}

export const PaymentProofModal: React.FC<PaymentProofModalProps> = ({
  isOpen,
  onClose,
  type,
  tender,
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
    toast.success("Document downloaded successfully!", {
      description:
        type === "EXEMPTION_LETTER"
          ? "MSME_Rule_170_Exemption_Declaration.pdf saved to downloads."
          : "Tender_Fee_Payment_Receipt_Challan.pdf saved to downloads.",
    });
  };

  const handlePrint = () => {
    toast.info("Preparing document for print...", {
      description: "Standard A4 layout with high-resolution digital signature stamp.",
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
              {type === "EXEMPTION_LETTER" ? (
                <FileBadge2 size={18} className="text-emerald-300" />
              ) : (
                <Receipt size={18} className="text-emerald-300" />
              )}
            </div>
            <div>
              <h3 className="text-sm md:text-base font-bold text-white tracking-tight">
                {type === "EXEMPTION_LETTER"
                  ? "Rule 170 MSME Bid Security Exemption Letter"
                  : "Tender Processing Fee Online Payment Receipt"}
              </h3>
              <p className="text-[11px] text-emerald-100/80">
                Official statutory attachment for Cover-1 submission · Tender Ref:{" "}
                <strong className="font-mono text-white">{tender.tenderNumber}</strong>
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
          {type === "EXEMPTION_LETTER" ? (
            /* OFFICIAL RULE 170 DECLARATION LETTER PAPER PREVIEW */
            <div className="bg-white p-8 md:p-10 rounded-xl shadow-md border border-slate-200/90 text-slate-800 space-y-6 max-w-2xl mx-auto font-sans text-xs leading-relaxed">
              {/* Letterhead */}
              <div className="border-b-2 border-slate-900 pb-4 flex items-start justify-between gap-4">
                <div>
                  <h2 className="text-base font-extrabold text-slate-900 tracking-tight uppercase">
                    {signatory.companyName}
                  </h2>
                  <p className="text-[10.5px] text-slate-500 mt-0.5">
                    {signatory.hqLocation} · CIN: {signatory.cin}
                  </p>
                  <p className="text-[10.5px] text-slate-500">
                    PAN: {signatory.pan} · GSTIN: {signatory.gstin} · MSME UDYAM:{" "}
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
                <p className="font-bold text-slate-900">The Tendering Authority / Evaluation Committee,</p>
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
                  In accordance with <strong>Rule 170 of General Financial Rules (GFR), 2017</strong> and the Public Procurement Policy for Micro and Small Enterprises (MSEs) Order, 2012 issued by the Ministry of Micro, Small and Medium Enterprises (MoMSME), Government of India, <strong>Micro and Small Enterprises (MSEs) registered with Udyam Registration are exempted from payment of Earnest Money Deposit (EMD) / Bid Security</strong>.
                </p>
                <p>
                  We hereby confirm that our enterprise is registered as a <strong>Small Enterprise</strong> under Udyam Registration with Certificate Number:{" "}
                  <strong className="font-mono text-emerald-800 bg-emerald-50 px-1 py-0.5 rounded border border-emerald-200">
                    {signatory.udyamRegistration || "UDYAM-MH-19-0048291"}
                  </strong>
                  . An authentic and certified copy of our active Udyam Registration Certificate is enclosed herewith for your verification in Cover-1.
                </p>
                <p>
                  We further declare that in the event we withdraw or modify our bid during the validity period, or fail to submit the Performance Security within the prescribed deadline after award of contract, we understand and accept that we shall be suspended from bidding in tenders of {tender.organization} as per tender rules.
                </p>
              </div>

              {/* Signatory & Digital Stamp Box */}
              <div className="pt-4 border-t border-slate-200 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                <div className="space-y-1">
                  <p className="text-slate-500 text-[11px]">Yours faithfully,</p>
                  <strong className="text-slate-900 text-xs block font-bold">
                    For {signatory.companyName}
                  </strong>
                  <div className="pt-2">
                    <p className="font-bold text-slate-900">{signatory.signatoryName}</p>
                    <p className="text-slate-500 text-[11px]">{signatory.signatoryTitle}</p>
                    <p className="text-slate-500 text-[10.5px]">Email: {signatory.signatoryEmail}</p>
                  </div>
                </div>

                {/* Digital Stamp Certificate Badge */}
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
                  <span className="text-[9.5px] text-emerald-700 block">
                    Verified SHA-256 PKI Hash
                  </span>
                </div>
              </div>
            </div>
          ) : (
            /* OFFICIAL TENDER FEE PAYMENT CHALLAN RECEIPT */
            <div className="bg-white p-8 rounded-xl shadow-md border border-slate-200/90 text-slate-800 space-y-5 max-w-xl mx-auto text-xs">
              {/* Receipt Header */}
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

              {/* Receipt Details Table */}
              <div className="space-y-2 bg-slate-50 p-4 rounded-xl border border-slate-200/80 text-xs">
                <div className="flex justify-between py-1 border-b border-slate-200/60">
                  <span className="text-slate-500">Tender Reference No:</span>
                  <strong className="font-mono text-slate-900">{tender.tenderNumber}</strong>
                </div>
                <div className="flex justify-between py-1 border-b border-slate-200/60">
                  <span className="text-slate-500">Tendering Authority:</span>
                  <strong className="text-slate-900 text-right max-w-[240px] truncate">{tender.organization}</strong>
                </div>
                <div className="flex justify-between py-1 border-b border-slate-200/60">
                  <span className="text-slate-500">Bank Transaction Ref (UTR):</span>
                  <strong className="font-mono text-emerald-800">SBIN20260310928371</strong>
                </div>
                <div className="flex justify-between py-1 border-b border-slate-200/60">
                  <span className="text-slate-500">Payment Date &amp; Time:</span>
                  <strong className="text-slate-800">10 Mar 2026, 02:45 PM IST</strong>
                </div>
                <div className="flex justify-between py-1 border-b border-slate-200/60">
                  <span className="text-slate-500">Payment Mode:</span>
                  <strong className="text-slate-800">Internet Banking (SBI Corporate Gateway)</strong>
                </div>
                <div className="flex justify-between py-1 border-b border-slate-200/60">
                  <span className="text-slate-500">Remitted By:</span>
                  <strong className="text-slate-800">{signatory.companyName} (PAN: {signatory.pan})</strong>
                </div>
                <div className="flex justify-between py-1.5 pt-2 text-sm">
                  <span className="font-bold text-slate-900">Total Amount Paid:</span>
                  <strong className="font-extrabold text-emerald-700 text-base">₹5,900.00</strong>
                </div>
                <p className="text-[10px] text-slate-400 text-right">
                  (Fee: ₹5,000.00 + 18% CGST/SGST: ₹900.00)
                </p>
              </div>

              {/* QR & Security Footer */}
              <div className="pt-2 text-center text-[10.5px] text-slate-400 space-y-1">
                <p>This is a computer-generated statutory e-Receipt verified with CCA PKI digital signature.</p>
                <p className="font-mono text-slate-500">Verification Hash: 8f9b2c3a10d9e482b8817a92c019482f</p>
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
