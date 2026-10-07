import React, { useState } from "react";
import {
  CreditCard,
  Receipt,
  FileBadge2,
  CheckCircle2,
  UploadCloud,
  ArrowRight,
  ShieldCheck,
  FileText,
  Building2,
  Download,
  Eye,
  RefreshCw,
  Copy,
  Landmark,
  Sparkles,
  Check,
  CheckCheck,
  BadgePercent,
  Hash,
  AlertCircle,
  FileCheck2,
  Send,
  Calendar,
  Layers,
} from "lucide-react";
import { toast } from "sonner";
import { TabPlaceholderCard } from "./TabPlaceholderCard";
import { TenderV2 } from "../../types";
import { PaymentProofModal, PaymentModalType } from "../PaymentProofModal";

interface PaymentProofTabV2Props {
  tender: TenderV2;
  onNextTab?: () => void;
}

export const PaymentProofTabV2: React.FC<PaymentProofTabV2Props> = ({
  tender,
  onNextTab,
}) => {
  // Modal Preview State
  const [modalState, setModalState] = useState<{
    isOpen: boolean;
    type: PaymentModalType;
  }>({
    isOpen: false,
    type: "EXEMPTION_LETTER",
  });

  // Active EMD Mode Tab: MSME Exemption (Default) vs Bank Guarantee vs RTGS
  const [activeEmdMode, setActiveEmdMode] = useState<
    "MSME_EXEMPTION" | "BANK_GUARANTEE" | "RTGS_NEFT"
  >(tender.emdComplianceDetails?.activeMode || "MSME_EXEMPTION");

  // State for interactive actions
  const [isRegenerating, setIsRegenerating] = useState(false);
  const [copiedUtr, setCopiedUtr] = useState(false);

  // Fallback / Normalized Data
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

  const tenderFee = tender.tenderFeeDetails || {
    amountDisplay: tender.tenderFeeDisplay || "₹5,000 + 18% GST (₹5,900)",
    status: "Paid & Verified" as const,
    paymentMode: "Internet Banking (SBI Corporate e-Pay Gateway)",
    transactionRef: "SBIN20260310928371",
    paymentDate: "10 Mar 2026, 02:45 PM IST",
    receiptDocName: "SBI_Payment_Challan_SAJHA69.pdf",
  };

  const emdDetails = tender.emdComplianceDetails || {
    amountDisplay: tender.emdDisplay || "₹5,00,000",
    requiredPercentage: "3.33% of Contract Value",
    activeMode: "MSME_EXEMPTION" as const,
    msmeEligible: true,
    msmeUdyamNumber: signatory.udyamRegistration || "UDYAM-MH-19-0048291",
    exemptionDocName: "MSME_Rule_170_Self_Declaration_SAJHA69.pdf",
    bgBankName: "State Bank of India (Commercial Branch)",
    bgNumber: "BG-9920-2026-MUM",
    bgValidUntil: "07 Sep 2026",
    bgDocName: "SBI_Bank_Guarantee_Scanned_SAJHA69.pdf",
    rtgsUtr: "HDFC20260310009281",
    rtgsDate: "10 Mar 2026",
    rtgsDocName: "RTGS_Remittance_Slip_SAJHA69.pdf",
  };

  const handleCopyUtr = (utr: string) => {
    navigator.clipboard.writeText(utr);
    setCopiedUtr(true);
    toast.success("Transaction UTR copied to clipboard", {
      description: utr,
    });
    setTimeout(() => setCopiedUtr(false), 2000);
  };

  const handleRegenerateDeclaration = () => {
    setIsRegenerating(true);
    toast.loading("Generating updated Rule 170 Exemption Declaration...", {
      id: "regen-decl",
    });
    setTimeout(() => {
      setIsRegenerating(false);
      toast.success("Rule 170 Declaration Re-Generated & Digitally Signed", {
        id: "regen-decl",
        description: `Verified with ${signatory.signatoryName}'s Class-3 DSC Token.`,
      });
    }, 1200);
  };

  const handleDownloadDoc = (docName: string) => {
    toast.success("Document downloaded successfully", {
      description: `${docName} saved to your local downloads.`,
    });
  };

  const handleUploadNewSlip = () => {
    toast.info("Upload Payment Slip / Challan", {
      description: "Select PDF/JPG payment receipt up to 10MB to attach.",
    });
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      {/* Top Header Card */}
      <TabPlaceholderCard
        stepNumber={3}
        title="Financial Security & Payment Proof Desk"
        subtitle="EMD & Cover-1 Financial Slip Desk"
        description="Statutory compliance desk for Earnest Money Deposit (EMD), Tender Document Processing Fee, MSME / Udyam exemptions under Rule 170 of GFR 2017, and Bank Guarantee attachments."
        icon={CreditCard}
        badgeText="Cover-1 Financial Pack"
      >
        {/* 1. FINANCIAL METRICS 4-COLUMN SUMMARY CARDS */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3.5">
          {/* 1. Tender Fee Card */}
          <div className="bg-white p-4 rounded-xl border border-slate-200/90 shadow-2xs hover:border-slate-300 transition-all">
            <div className="flex items-center justify-between mb-1.5">
              <span className="text-[10px] uppercase font-bold text-slate-400">
                Tender Document Fee
              </span>
              <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-100 text-emerald-800 flex items-center gap-1">
                <CheckCircle2 size={11} /> Paid
              </span>
            </div>
            <strong className="text-base font-bold text-slate-900 block font-mono">
              ₹5,900.00
            </strong>
            <span className="text-[11px] text-slate-500 block mt-0.5">
              ₹5,000 + 18% GST (Non-Refundable)
            </span>
          </div>

          {/* 2. EMD Required */}
          <div className="bg-white p-4 rounded-xl border border-slate-200/90 shadow-2xs hover:border-slate-300 transition-all">
            <div className="flex items-center justify-between mb-1.5">
              <span className="text-[10px] uppercase font-bold text-slate-400">
                EMD / Bid Security
              </span>
              <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-purple-100 text-purple-800">
                3.33% of Value
              </span>
            </div>
            <strong className="text-base font-bold text-slate-900 block font-mono">
              {tender.emdDisplay || "₹5,00,000"}
            </strong>
            <span className="text-[11px] text-emerald-700 block mt-0.5 font-semibold">
              Exemption Claimed (₹0 Payable)
            </span>
          </div>

          {/* 3. MSME Exemption Benefit */}
          <div className="bg-emerald-50/40 p-4 rounded-xl border border-emerald-300/80 shadow-2xs hover:border-emerald-400 transition-all">
            <div className="flex items-center justify-between mb-1.5">
              <span className="text-[10px] uppercase font-bold text-emerald-700">
                Statutory Benefit
              </span>
              <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-700 text-white flex items-center gap-1">
                <ShieldCheck size={11} /> Rule 170
              </span>
            </div>
            <strong className="text-sm font-bold text-emerald-900 block flex items-center gap-1.5">
              100% EMD Waiver Eligible
            </strong>
            <span className="text-[11px] text-emerald-700 font-mono block mt-0.5">
              Udyam: {signatory.udyamRegistration || "UDYAM-MH-19-0048291"}
            </span>
          </div>

          {/* 4. PBG Post-Award Terms */}
          <div className="bg-white p-4 rounded-xl border border-slate-200/90 shadow-2xs hover:border-slate-300 transition-all">
            <div className="flex items-center justify-between mb-1.5">
              <span className="text-[10px] uppercase font-bold text-slate-400">
                Performance PBG
              </span>
              <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-slate-100 text-slate-600">
                Post-Award
              </span>
            </div>
            <strong className="text-base font-bold text-slate-900 block font-mono">
              5% of Value (₹7.50L)
            </strong>
            <span className="text-[11px] text-slate-500 block mt-0.5">
              Within 15 days of LoA issuance
            </span>
          </div>
        </div>

        {/* 2. SECTION: TENDER PROCESSING FEE DESK */}
        <div className="bg-white p-5 md:p-6 rounded-2xl border border-slate-200/90 shadow-2xs space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-100 pb-3">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-xl bg-emerald-50 text-emerald-700 border border-emerald-200 flex items-center justify-center font-bold">
                <Receipt size={16} />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <span className="text-xs font-bold uppercase tracking-wider bg-emerald-950 text-emerald-100 px-2.5 py-0.5 rounded-md">
                    Cover-1 Mandatory
                  </span>
                  <h3 className="text-sm md:text-base font-bold text-slate-900">
                    Tender Processing Fee Remittance Desk
                  </h3>
                </div>
                <p className="text-xs text-slate-500 mt-0.5">
                  Statutory proof of online payment required for technical bid admission
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2 self-start sm:self-auto">
              <button
                type="button"
                onClick={handleUploadNewSlip}
                className="text-xs font-bold text-slate-700 hover:text-slate-900 bg-slate-100 hover:bg-slate-200 px-3 py-1.5 rounded-lg border border-slate-300 transition-colors flex items-center gap-1.5 cursor-pointer shadow-2xs"
              >
                <UploadCloud size={13} />
                <span>Replace / Upload Receipt</span>
              </button>
            </div>
          </div>

          {/* Payment Details Container */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
            {/* Left Col: Transaction Breakdown (2 Columns) */}
            <div className="lg:col-span-2 bg-slate-50/80 rounded-xl p-4 border border-slate-200/70 space-y-3">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 text-xs">
                <div>
                  <span className="text-[10.5px] uppercase font-bold text-slate-400 block">
                    Payment Gateway Mode
                  </span>
                  <strong className="text-slate-900 font-semibold block mt-0.5">
                    {tenderFee.paymentMode}
                  </strong>
                  <span className="text-[11px] text-slate-500">
                    Merchant: State Procurement Portal / e-Nivida
                  </span>
                </div>

                <div>
                  <span className="text-[10.5px] uppercase font-bold text-slate-400 block">
                    Transaction UTR / Ref No.
                  </span>
                  <div className="flex items-center gap-2 mt-0.5">
                    <strong className="text-emerald-900 font-mono font-bold bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200 text-xs">
                      {tenderFee.transactionRef}
                    </strong>
                    <button
                      type="button"
                      onClick={() => handleCopyUtr(tenderFee.transactionRef)}
                      title="Copy UTR"
                      className="p-1 rounded bg-white hover:bg-slate-100 text-slate-500 border border-slate-200 cursor-pointer transition-colors"
                    >
                      {copiedUtr ? (
                        <Check size={13} className="text-emerald-600" />
                      ) : (
                        <Copy size={13} />
                      )}
                    </button>
                  </div>
                </div>

                <div>
                  <span className="text-[10.5px] uppercase font-bold text-slate-400 block">
                    Payment Date &amp; Timestamp
                  </span>
                  <strong className="text-slate-800 font-medium block mt-0.5">
                    {tenderFee.paymentDate}
                  </strong>
                </div>

                <div>
                  <span className="text-[10.5px] uppercase font-bold text-slate-400 block">
                    Remitting Entity &amp; PAN
                  </span>
                  <strong className="text-slate-800 font-medium block mt-0.5">
                    {signatory.companyName} (PAN: {signatory.pan})
                  </strong>
                </div>
              </div>
            </div>

            {/* Right Col: Attached Receipt Card */}
            <div className="bg-emerald-50/30 rounded-xl p-4 border border-emerald-200/90 flex flex-col justify-between space-y-3">
              <div className="flex items-start gap-2.5">
                <div className="w-8 h-8 rounded-lg bg-emerald-100 text-emerald-800 flex items-center justify-center shrink-0">
                  <FileCheck2 size={16} />
                </div>
                <div className="min-w-0">
                  <span className="text-[10px] font-bold text-emerald-800 uppercase tracking-wider block">
                    Attached Document
                  </span>
                  <strong className="text-xs font-bold text-slate-900 block truncate" title={tenderFee.receiptDocName}>
                    {tenderFee.receiptDocName}
                  </strong>
                  <span className="text-[10.5px] text-slate-500 block">
                    PDF · 184 KB · Digitally Signed
                  </span>
                </div>
              </div>

              <div className="flex items-center gap-2 pt-2 border-t border-emerald-100">
                <button
                  type="button"
                  onClick={() =>
                    setModalState({ isOpen: true, type: "FEE_RECEIPT" })
                  }
                  className="flex-1 py-1.5 px-2.5 bg-emerald-700 hover:bg-emerald-800 text-white rounded-lg text-xs font-bold transition-colors cursor-pointer flex items-center justify-center gap-1.5 shadow-2xs"
                >
                  <Eye size={13} />
                  <span>View Challan</span>
                </button>
                <button
                  type="button"
                  onClick={() => handleDownloadDoc(tenderFee.receiptDocName)}
                  className="py-1.5 px-2.5 bg-white hover:bg-slate-100 text-slate-700 border border-slate-300 rounded-lg text-xs font-bold transition-colors cursor-pointer flex items-center justify-center gap-1 shadow-2xs"
                  title="Download Receipt"
                >
                  <Download size={13} />
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* 3. SECTION: EMD / BID SECURITY COMPLIANCE DESK */}
        <div className="bg-white p-5 md:p-6 rounded-2xl border border-slate-200/90 shadow-2xs space-y-5">
          {/* Header & Interactive Mode Selector */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-100 pb-3">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-xl bg-purple-50 text-purple-700 border border-purple-200 flex items-center justify-center font-bold">
                <FileBadge2 size={16} />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <span className="text-xs font-bold uppercase tracking-wider bg-purple-950 text-purple-100 px-2.5 py-0.5 rounded-md">
                    Bid Security (EMD)
                  </span>
                  <h3 className="text-sm md:text-base font-bold text-slate-900">
                    EMD Compliance &amp; Exemption Configuration Desk
                  </h3>
                </div>
                <p className="text-xs text-slate-500 mt-0.5">
                  Select bid security compliance mode: GFR Rule 170 Exemption, Bank Guarantee (BG), or Direct RTGS Remittance
                </p>
              </div>
            </div>

            {/* Mode Switcher Tabs */}
            <div className="flex items-center bg-slate-100 p-1 rounded-xl border border-slate-200 shrink-0">
              <button
                type="button"
                onClick={() => setActiveEmdMode("MSME_EXEMPTION")}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer flex items-center gap-1.5 ${
                  activeEmdMode === "MSME_EXEMPTION"
                    ? "bg-white text-emerald-800 shadow-xs"
                    : "text-slate-600 hover:text-slate-900"
                }`}
              >
                <ShieldCheck size={13} className="text-emerald-700" />
                <span>MSME Exemption</span>
                <span className="text-[10px] bg-emerald-100 text-emerald-800 px-1.5 py-0.2 rounded font-mono">
                  GFR 170
                </span>
              </button>

              <button
                type="button"
                onClick={() => setActiveEmdMode("BANK_GUARANTEE")}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer flex items-center gap-1.5 ${
                  activeEmdMode === "BANK_GUARANTEE"
                    ? "bg-white text-purple-800 shadow-xs"
                    : "text-slate-600 hover:text-slate-900"
                }`}
              >
                <Landmark size={13} className="text-purple-700" />
                <span>Bank Guarantee (BG)</span>
              </button>

              <button
                type="button"
                onClick={() => setActiveEmdMode("RTGS_NEFT")}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer flex items-center gap-1.5 ${
                  activeEmdMode === "RTGS_NEFT"
                    ? "bg-white text-blue-800 shadow-xs"
                    : "text-slate-600 hover:text-slate-900"
                }`}
              >
                <Receipt size={13} className="text-blue-700" />
                <span>Direct RTGS / NEFT</span>
              </button>
            </div>
          </div>

          {/* MODE CONTENT 1: MSME / UDYAM RULE 170 EXEMPTION */}
          {activeEmdMode === "MSME_EXEMPTION" && (
            <div className="space-y-4 animate-in fade-in duration-200">
              {/* Exemption Authority Banner */}
              <div className="bg-emerald-50/50 border border-emerald-200/90 rounded-xl p-4 flex flex-col md:flex-row md:items-center justify-between gap-3">
                <div className="flex items-start gap-3">
                  <div className="w-9 h-9 rounded-xl bg-emerald-600 text-white flex items-center justify-center shrink-0 shadow-xs">
                    <ShieldCheck size={18} />
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <strong className="text-xs md:text-sm font-bold text-emerald-950">
                        Exemption Claimed Under Rule 170 of General Financial Rules (GFR), 2017
                      </strong>
                      <span className="text-[10.5px] font-bold bg-emerald-200/80 text-emerald-900 px-2 py-0.5 rounded-md">
                        100% Fee Waived
                      </span>
                    </div>
                    <p className="text-xs text-emerald-800/90 mt-0.5 leading-relaxed">
                      As a registered Micro &amp; Small Enterprise (MSE) under Ministry of MSME, the bidder is entitled to 100% EMD waiver for software services. Self-declaration with Class-3 DSC token generated.
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-2 shrink-0">
                  <button
                    type="button"
                    onClick={handleRegenerateDeclaration}
                    disabled={isRegenerating}
                    className="px-3 py-1.5 bg-white hover:bg-emerald-50 text-emerald-900 border border-emerald-300 rounded-lg text-xs font-bold transition-all cursor-pointer flex items-center gap-1.5 shadow-2xs"
                  >
                    <RefreshCw
                      size={12}
                      className={isRegenerating ? "animate-spin text-emerald-700" : "text-emerald-700"}
                    />
                    <span>{isRegenerating ? "Generating..." : "Re-Generate"}</span>
                  </button>
                </div>
              </div>

              {/* Exemption Document & Details Grid */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
                {/* 1. Udyam Registration Verification */}
                <div className="bg-slate-50/80 p-4 rounded-xl border border-slate-200/70 space-y-2">
                  <span className="text-[10px] uppercase font-bold text-slate-400 block">
                    1. Udyam Enterprise Verification
                  </span>
                  <div>
                    <strong className="text-slate-900 block font-bold text-xs">
                      {signatory.companyName}
                    </strong>
                    <span className="text-emerald-800 font-mono font-bold block mt-0.5">
                      {signatory.udyamRegistration || "UDYAM-MH-19-0048291"}
                    </span>
                    <span className="text-slate-500 text-[11px] block mt-0.5">
                      Category: Small Enterprise · NIC 62011 &amp; 62020
                    </span>
                  </div>
                  <div className="pt-2 border-t border-slate-200 flex items-center gap-1 text-[11px] text-emerald-700 font-semibold">
                    <CheckCircle2 size={13} /> Active &amp; Verified in Company Vault
                  </div>
                </div>

                {/* 2. Signatory & Digital Stamp */}
                <div className="bg-slate-50/80 p-4 rounded-xl border border-slate-200/70 space-y-2">
                  <span className="text-[10px] uppercase font-bold text-slate-400 block">
                    2. Signing Authority
                  </span>
                  <div>
                    <strong className="text-slate-900 block font-bold text-xs">
                      {signatory.signatoryName}
                    </strong>
                    <span className="text-slate-600 text-[11px] block">
                      {signatory.signatoryTitle}
                    </span>
                    <span className="text-slate-500 font-mono text-[10.5px] block mt-0.5">
                      DSC: {signatory.dscSerial}
                    </span>
                  </div>
                  <div className="pt-2 border-t border-slate-200 flex items-center gap-1 text-[11px] text-emerald-700 font-semibold">
                    <CheckCircle2 size={13} /> Class-3 PKI Signature Attached
                  </div>
                </div>

                {/* 3. Generated Exemption Letter Document Card */}
                <div className="bg-emerald-50/30 p-4 rounded-xl border border-emerald-300/80 flex flex-col justify-between space-y-3">
                  <div className="space-y-1.5">
                    <div className="flex items-center justify-between">
                      <span className="text-[10px] font-bold text-emerald-800 uppercase tracking-wider">
                        Generated Letter
                      </span>
                      <span className="text-[10px] font-bold bg-emerald-100 text-emerald-800 px-1.5 py-0.2 rounded font-mono">
                        Ready
                      </span>
                    </div>
                    <strong className="text-xs font-bold text-slate-900 block truncate" title={emdDetails.exemptionDocName}>
                      {emdDetails.exemptionDocName}
                    </strong>
                    <p className="text-[10.5px] text-slate-500">
                      Standard GFR-170 undertaking citing tender ref {tender.tenderNumber}
                    </p>
                  </div>

                  <div className="flex items-center gap-2 pt-2 border-t border-emerald-100">
                    <button
                      type="button"
                      onClick={() =>
                        setModalState({ isOpen: true, type: "EXEMPTION_LETTER" })
                      }
                      className="flex-1 py-1.5 px-2 bg-emerald-700 hover:bg-emerald-800 text-white rounded-lg text-xs font-bold transition-colors cursor-pointer flex items-center justify-center gap-1.5 shadow-2xs"
                    >
                      <Eye size={13} />
                      <span>View Letter</span>
                    </button>
                    <button
                      type="button"
                      onClick={() => handleDownloadDoc(emdDetails.exemptionDocName)}
                      className="py-1.5 px-2.5 bg-white hover:bg-slate-100 text-slate-700 border border-slate-300 rounded-lg text-xs font-bold transition-colors cursor-pointer flex items-center justify-center gap-1 shadow-2xs"
                      title="Download PDF"
                    >
                      <Download size={13} />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* MODE CONTENT 2: BANK GUARANTEE (BG) */}
          {activeEmdMode === "BANK_GUARANTEE" && (
            <div className="space-y-4 animate-in fade-in duration-200">
              <div className="bg-purple-50/50 border border-purple-200/90 rounded-xl p-4 flex flex-col md:flex-row md:items-center justify-between gap-3">
                <div className="flex items-start gap-3">
                  <div className="w-9 h-9 rounded-xl bg-purple-700 text-white flex items-center justify-center shrink-0 shadow-xs">
                    <Landmark size={18} />
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <strong className="text-xs md:text-sm font-bold text-purple-950">
                        Bank Guarantee (BG) / e-BG Security
                      </strong>
                      <span className="text-[10.5px] font-bold bg-purple-200/80 text-purple-900 px-2 py-0.5 rounded-md">
                        SFMS Verified
                      </span>
                    </div>
                    <p className="text-xs text-purple-800/90 mt-0.5 leading-relaxed">
                      Submit an unconditional and irrevocable Bank Guarantee from any Scheduled Commercial Bank in India, valid for 180 days with SFMS confirmation.
                    </p>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={handleUploadNewSlip}
                  className="px-3.5 py-1.5 bg-purple-700 hover:bg-purple-800 text-white rounded-lg text-xs font-bold transition-colors cursor-pointer flex items-center gap-1.5 shadow-2xs shrink-0 self-start md:self-auto"
                >
                  <UploadCloud size={13} />
                  <span>Upload Scanned BG</span>
                </button>
              </div>

              {/* BG Fields Grid */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs bg-slate-50/80 p-4 rounded-xl border border-slate-200/80">
                <div>
                  <span className="text-[10px] uppercase font-bold text-slate-400 block">
                    Issuing Bank &amp; Branch
                  </span>
                  <strong className="text-slate-900 block font-bold mt-0.5">
                    {emdDetails.bgBankName || "State Bank of India (Commercial Branch, Nariman Point)"}
                  </strong>
                  <span className="text-slate-500 text-[11px]">IFSC: SBIN0000300</span>
                </div>

                <div>
                  <span className="text-[10px] uppercase font-bold text-slate-400 block">
                    BG Instrument Number &amp; Value
                  </span>
                  <strong className="text-purple-900 font-mono font-bold block mt-0.5">
                    {emdDetails.bgNumber || "BG-9920-2026-MUM"}
                  </strong>
                  <span className="text-slate-600 text-[11px]">
                    Value: ₹5,00,000 (Five Lakhs Only)
                  </span>
                </div>

                <div>
                  <span className="text-[10px] uppercase font-bold text-slate-400 block">
                    Validity &amp; Claim Period
                  </span>
                  <strong className="text-slate-900 block font-semibold mt-0.5">
                    Valid Till: {emdDetails.bgValidUntil || "07 Sep 2026"} (180 Days)
                  </strong>
                  <span className="text-emerald-700 text-[11px] font-medium">
                    + 60 Days Claim Period Included
                  </span>
                </div>
              </div>
            </div>
          )}

          {/* MODE CONTENT 3: DIRECT RTGS / NEFT REMITTANCE */}
          {activeEmdMode === "RTGS_NEFT" && (
            <div className="space-y-4 animate-in fade-in duration-200">
              <div className="bg-blue-50/50 border border-blue-200/90 rounded-xl p-4 flex flex-col md:flex-row md:items-center justify-between gap-3">
                <div className="flex items-start gap-3">
                  <div className="w-9 h-9 rounded-xl bg-blue-700 text-white flex items-center justify-center shrink-0 shadow-xs">
                    <Receipt size={18} />
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <strong className="text-xs md:text-sm font-bold text-blue-950">
                        Direct RTGS / NEFT EMD Remittance
                      </strong>
                      <span className="text-[10.5px] font-bold bg-blue-200/80 text-blue-900 px-2 py-0.5 rounded-md">
                        Direct Bank Transfer
                      </span>
                    </div>
                    <p className="text-xs text-blue-800/90 mt-0.5 leading-relaxed">
                      Remit the exact EMD amount directly to the Tendering Authority’s designated escrow bank account and record the bank UTR confirmation.
                    </p>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={handleUploadNewSlip}
                  className="px-3.5 py-1.5 bg-blue-700 hover:bg-blue-800 text-white rounded-lg text-xs font-bold transition-colors cursor-pointer flex items-center gap-1.5 shadow-2xs shrink-0 self-start md:self-auto"
                >
                  <UploadCloud size={13} />
                  <span>Upload RTGS Advice</span>
                </button>
              </div>

              {/* Beneficiary & Remittance Grid */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs bg-slate-50/80 p-4 rounded-xl border border-slate-200/80">
                <div>
                  <span className="text-[10px] uppercase font-bold text-slate-400 block">
                    Authority Beneficiary Account
                  </span>
                  <strong className="text-slate-900 block font-bold mt-0.5">
                    Executive Engineer, {tender.organization}
                  </strong>
                  <span className="text-slate-600 font-mono text-[11px]">
                    A/C: 38291048291 · IFSC: SBIN0001234
                  </span>
                </div>

                <div>
                  <span className="text-[10px] uppercase font-bold text-slate-400 block">
                    Remittance UTR Reference
                  </span>
                  <strong className="text-blue-900 font-mono font-bold block mt-0.5">
                    {emdDetails.rtgsUtr || "HDFC20260310009281"}
                  </strong>
                  <span className="text-slate-500 text-[11px]">
                    Paid on {emdDetails.rtgsDate || "10 Mar 2026"}
                  </span>
                </div>

                <div>
                  <span className="text-[10px] uppercase font-bold text-slate-400 block">
                    Attached Transfer Challan
                  </span>
                  <strong className="text-slate-900 block font-semibold mt-0.5 truncate">
                    {emdDetails.rtgsDocName || "RTGS_Remittance_Slip_SAJHA69.pdf"}
                  </strong>
                  <span className="text-emerald-700 text-[11px] font-medium">
                    Verified with Bank Statement
                  </span>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* 4. SECTION: COVER-1 STATUTORY AUDIT & READINESS CHECKLIST */}
        <div className="bg-white p-5 md:p-6 rounded-2xl border border-slate-200/90 shadow-2xs space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-100 pb-3">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-xl bg-slate-100 text-slate-800 border border-slate-300 flex items-center justify-center font-bold">
                <Layers size={16} />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <span className="text-xs font-bold uppercase tracking-wider bg-slate-900 text-white px-2.5 py-0.5 rounded-md">
                    Cover-1 Master Audit
                  </span>
                  <h3 className="text-sm md:text-base font-bold text-slate-900">
                    Statutory Fee &amp; Financial Envelope Readiness
                  </h3>
                </div>
                <p className="text-xs text-slate-500 mt-0.5">
                  Pre-submission verification for Packet 1 (Fee &amp; Technical Eligibility Envelope)
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <span className="text-xs font-bold text-emerald-800 bg-emerald-100 border border-emerald-300 px-3 py-1 rounded-lg flex items-center gap-1.5">
                <CheckCheck size={14} className="text-emerald-700" />
                <span>100% Ready for Submission</span>
              </span>
            </div>
          </div>

          {/* 4 Checklist Items */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs">
            <div className="flex items-start gap-3 p-3.5 rounded-xl bg-slate-50/80 border border-slate-200/70">
              <div className="w-6 h-6 rounded-full bg-emerald-100 text-emerald-800 flex items-center justify-center shrink-0 mt-0.5 font-bold">
                <Check size={13} />
              </div>
              <div>
                <strong className="text-slate-900 block font-semibold">
                  Tender Document Fee Paid &amp; Attached
                </strong>
                <p className="text-slate-500 text-[11px] mt-0.5">
                  ₹5,900 paid via SBI e-Pay. Challan UTR <span className="font-mono text-slate-700">SBIN20260310928371</span> linked to Cover-1 pack.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3 p-3.5 rounded-xl bg-slate-50/80 border border-slate-200/70">
              <div className="w-6 h-6 rounded-full bg-emerald-100 text-emerald-800 flex items-center justify-center shrink-0 mt-0.5 font-bold">
                <Check size={13} />
              </div>
              <div>
                <strong className="text-slate-900 block font-semibold">
                  EMD Compliance Satisfied (Rule 170)
                </strong>
                <p className="text-slate-500 text-[11px] mt-0.5">
                  Exemption claimed on registered MSME Small Enterprise status with valid Udyam certificate.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3 p-3.5 rounded-xl bg-slate-50/80 border border-slate-200/70">
              <div className="w-6 h-6 rounded-full bg-emerald-100 text-emerald-800 flex items-center justify-center shrink-0 mt-0.5 font-bold">
                <Check size={13} />
              </div>
              <div>
                <strong className="text-slate-900 block font-semibold">
                  Corporate Identity &amp; Tax Documents Verified
                </strong>
                <p className="text-slate-500 text-[11px] mt-0.5">
                  PAN <span className="font-mono text-slate-700">{signatory.pan}</span>, GSTIN <span className="font-mono text-slate-700">{signatory.gstin}</span>, and MCA CIN verified from Vault.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3 p-3.5 rounded-xl bg-slate-50/80 border border-slate-200/70">
              <div className="w-6 h-6 rounded-full bg-emerald-100 text-emerald-800 flex items-center justify-center shrink-0 mt-0.5 font-bold">
                <Check size={13} />
              </div>
              <div>
                <strong className="text-slate-900 block font-semibold">
                  Authorized Signatory Class-3 DSC Bound
                </strong>
                <p className="text-slate-500 text-[11px] mt-0.5">
                  {signatory.signatoryName} ({signatory.signatoryTitle}) with active token expiring {signatory.dscExpiry || "12 Oct 2027"}.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* 5. BRIDGE TO STEP 4: PROPOSAL DESK */}
        <div className="bg-gradient-to-r from-emerald-900 via-[#173C40] to-slate-900 text-white p-5 md:p-6 rounded-2xl shadow-md flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <span className="text-[10px] font-extrabold uppercase tracking-wider bg-emerald-500/30 text-emerald-200 border border-emerald-400/40 px-2 py-0.5 rounded">
                Step 3 Completed
              </span>
              <h4 className="text-sm md:text-base font-bold text-white">
                Cover-1 Financial &amp; Statutory Pack Locked
              </h4>
            </div>
            <p className="text-xs text-emerald-100/80 max-w-xl">
              All payment receipts, Udyam certificates, and Rule 170 declarations are verified. Proceed to <strong>Step 4 (Proposal Desk)</strong> to generate AI Technical Drafts, Work Plan &amp; Compliance Matrix.
            </p>
          </div>

          {onNextTab && (
            <button
              type="button"
              onClick={onNextTab}
              className="px-5 py-2.5 bg-emerald-500 hover:bg-emerald-400 text-emerald-950 font-bold rounded-xl text-xs flex items-center justify-center gap-2 shadow-sm transition-all cursor-pointer shrink-0 self-start md:self-auto hover:translate-x-0.5"
            >
              <span>Proceed to Step 4: Proposal Desk</span>
              <ArrowRight size={14} />
            </button>
          )}
        </div>
      </TabPlaceholderCard>

      {/* Payment Proof Modal for Live Inspection */}
      <PaymentProofModal
        isOpen={modalState.isOpen}
        type={modalState.type}
        onClose={() => setModalState({ ...modalState, isOpen: false })}
        tender={tender}
      />
    </div>
  );
};
