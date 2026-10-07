import React, { useState, useRef } from "react";
import {
  CreditCard,
  Receipt,
  FileBadge2,
  CheckCircle2,
  UploadCloud,
  ArrowRight,
  ShieldCheck,
  Download,
  Eye,
  RefreshCw,
  Copy,
  Landmark,
  Check,
  FileCheck2,
  Calendar,
  Building,
  Hash,
  Sparkles,
  Paperclip,
  Trash2,
} from "lucide-react";
import { toast } from "sonner";
import { TenderV2 } from "../../types";
import {
  PaymentProofModal,
  PaymentModalType,
  CustomDocPreviewData,
} from "../PaymentProofModal";

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
    customData?: CustomDocPreviewData;
  }>({
    isOpen: false,
    type: "FEE_RECEIPT",
  });

  // Hidden file input refs
  const feeFileInputRef = useRef<HTMLInputElement>(null);
  const emdFileInputRef = useRef<HTMLInputElement>(null);

  // Normalized Signatory
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

  // ================= 1. TENDER FEE FORM STATE =================
  const [feeMode, setFeeMode] = useState<"DD" | "ONLINE">("ONLINE");

  const [feeData, setFeeData] = useState({
    // DD fields
    ddNumber: "591028",
    ddBankName: "State Bank of India",
    ddBranch: "Main Branch, Ranchi",
    ddIssueDate: "2026-03-10",
    ddDrawnInFavor: `Executive Engineer, ${tender.organization}`,
    ddPayableAt: "Ranchi",
    ddAmount: "₹5,900.00",
    ddFileName: "DD_Tender_Fee_Scan_SAJHA.pdf",
    ddFileSize: "245 KB",

    // Online UTR fields
    utrNumber: "SBIN20260310928371",
    gatewayMode: "SBI Corporate e-Pay Gateway",
    paymentDate: "10 Mar 2026, 02:45 PM IST",
    onlineFileName: "SBI_Payment_Challan_SAJHA69.pdf",
    onlineFileSize: "184 KB",

    isAttached: true,
  });

  // ================= 2. EMD / BID SECURITY FORM STATE =================
  const [emdMode, setEmdMode] = useState<
    "MSME_EXEMPTION" | "DD" | "BANK_GUARANTEE" | "RTGS_NEFT"
  >("MSME_EXEMPTION");

  const [emdData, setEmdData] = useState({
    // MSME fields
    udyamNumber: signatory.udyamRegistration || "UDYAM-MH-19-0048291",
    exemptionFileName: "MSME_Rule_170_Self_Declaration_SAJHA69.pdf",
    exemptionFileSize: "312 KB",

    // DD / FDR fields
    ddNumber: "918273",
    ddBankName: "Punjab National Bank",
    ddBranch: "Commercial Branch, Mumbai",
    ddIssueDate: "2026-03-10",
    ddDrawnInFavor: `Executive Engineer, ${tender.organization}`,
    ddPayableAt: "Ranchi",
    ddAmount: tender.emdDisplay || "₹5,00,000",
    ddFileName: "EMD_Demand_Draft_5Lakh_SAJHA.pdf",
    ddFileSize: "340 KB",

    // BG fields
    bgNumber: "BG-9920-2026-MUM",
    bgBankName: "State Bank of India",
    bgValidUntil: "2026-09-07",
    bgClaimPeriod: "60 Days Beyond Validity",
    bgAmount: tender.emdDisplay || "₹5,00,000",
    bgFileName: "SBI_Bank_Guarantee_Scanned_SAJHA69.pdf",
    bgFileSize: "410 KB",

    // RTGS fields
    rtgsUtr: "HDFC20260310009281",
    rtgsDate: "10 Mar 2026",
    rtgsBank: "HDFC Bank Corporate Banking",
    rtgsFileName: "RTGS_Remittance_Slip_SAJHA69.pdf",
    rtgsFileSize: "198 KB",

    isAttached: true,
  });

  // UI helpers
  const [copiedUtr, setCopiedUtr] = useState(false);
  const [isRegenerating, setIsRegenerating] = useState(false);

  const handleCopyUtr = (utr: string) => {
    navigator.clipboard.writeText(utr);
    setCopiedUtr(true);
    toast.success("UTR copied to clipboard", { description: utr });
    setTimeout(() => setCopiedUtr(false), 2000);
  };

  const handleFeeFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const sizeStr = `${(file.size / 1024).toFixed(0)} KB`;
      if (feeMode === "DD") {
        setFeeData((prev) => ({
          ...prev,
          ddFileName: file.name,
          ddFileSize: sizeStr,
          isAttached: true,
        }));
      } else {
        setFeeData((prev) => ({
          ...prev,
          onlineFileName: file.name,
          onlineFileSize: sizeStr,
          isAttached: true,
        }));
      }
      toast.success(`Attached Tender Fee slip: ${file.name}`);
    }
  };

  const handleEmdFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const sizeStr = `${(file.size / 1024).toFixed(0)} KB`;
      if (emdMode === "DD") {
        setEmdData((prev) => ({
          ...prev,
          ddFileName: file.name,
          ddFileSize: sizeStr,
          isAttached: true,
        }));
      } else if (emdMode === "BANK_GUARANTEE") {
        setEmdData((prev) => ({
          ...prev,
          bgFileName: file.name,
          bgFileSize: sizeStr,
          isAttached: true,
        }));
      } else if (emdMode === "RTGS_NEFT") {
        setEmdData((prev) => ({
          ...prev,
          rtgsFileName: file.name,
          rtgsFileSize: sizeStr,
          isAttached: true,
        }));
      }
      toast.success(`Attached EMD document: ${file.name}`);
    }
  };

  const handleRegenerateDeclaration = () => {
    setIsRegenerating(true);
    toast.loading(
      "Generating Rule 170 Exemption Declaration with Digital Stamp...",
      {
        id: "regen-decl",
      },
    );
    setTimeout(() => {
      setIsRegenerating(false);
      toast.success("Declaration Generated & Digitally Signed", {
        id: "regen-decl",
        description: `Linked with ${signatory.signatoryName}'s Class-3 DSC.`,
      });
    }, 1000);
  };

  const openFeePreview = () => {
    if (feeMode === "DD") {
      setModalState({
        isOpen: true,
        type: "DD_PREVIEW",
        customData: {
          title: "Tender Processing Fee Demand Draft (DD)",
          instrumentNumber: feeData.ddNumber,
          bankName: feeData.ddBankName,
          branchName: feeData.ddBranch,
          issueDate: feeData.ddIssueDate,
          amountDisplay: "₹ 5,900.00",
          amountInWords: "Five Thousand Nine Hundred Rupees Only",
          drawnInFavor: feeData.ddDrawnInFavor,
          payableAt: feeData.ddPayableAt,
          fileName: feeData.ddFileName,
        },
      });
    } else {
      setModalState({
        isOpen: true,
        type: "FEE_RECEIPT",
      });
    }
  };

  const openEmdPreview = () => {
    if (emdMode === "MSME_EXEMPTION") {
      setModalState({
        isOpen: true,
        type: "EXEMPTION_LETTER",
      });
    } else if (emdMode === "DD") {
      setModalState({
        isOpen: true,
        type: "DD_PREVIEW",
        customData: {
          title: "Earnest Money Deposit (EMD) Demand Draft (DD)",
          instrumentNumber: emdData.ddNumber,
          bankName: emdData.ddBankName,
          branchName: emdData.ddBranch,
          issueDate: emdData.ddIssueDate,
          amountDisplay: tender.emdDisplay || "₹ 5,00,000.00",
          amountInWords: "Five Lakh Rupees Only",
          drawnInFavor: emdData.ddDrawnInFavor,
          payableAt: emdData.ddPayableAt,
          fileName: emdData.ddFileName,
        },
      });
    } else if (emdMode === "BANK_GUARANTEE") {
      setModalState({
        isOpen: true,
        type: "BG_PREVIEW",
        customData: {
          instrumentNumber: emdData.bgNumber,
          bankName: emdData.bgBankName,
          validUntil: emdData.bgValidUntil,
          amountDisplay: tender.emdDisplay || "₹ 5,00,000/-",
          fileName: emdData.bgFileName,
        },
      });
    } else {
      toast.info("Opening RTGS Transfer Advice Slip", {
        description: `Ref UTR: ${emdData.rtgsUtr}`,
      });
    }
  };

  return (
    <div className="space-y-5 animate-in fade-in duration-200">
      {/* Hidden file inputs for real upload simulation */}

      <input
        type="file"
        ref={feeFileInputRef}
        onChange={handleFeeFileUpload}
        className="hidden"
        accept=".pdf,.png,.jpg,.jpeg"
      />

      <input
        type="file"
        ref={emdFileInputRef}
        onChange={handleEmdFileUpload}
        className="hidden"
        accept=".pdf,.png,.jpg,.jpeg"
      />

      {/* 1. TOP SUMMARY PILLS */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
        {/* Stat 1: Tender Fee */}
        <div className="bg-white px-4 py-3 rounded-xl border border-slate-200/90 shadow-2xs flex items-center justify-between">
          <div>
            <span className="text-[10px] uppercase font-bold text-slate-400 block tracking-wider">
              Tender Document Fee
            </span>
            <div className="flex items-baseline gap-1.5 mt-0.5">
              <strong className="text-base font-bold text-slate-900 font-mono">
                ₹5,900.00
              </strong>
              <span className="text-[10.5px] text-slate-500">
                (incl. 18% GST)
              </span>
            </div>
          </div>
          <span className="text-[11px] font-bold text-emerald-800 bg-emerald-100/80 px-2.5 py-1 rounded-lg flex items-center gap-1">
            <CheckCircle2 size={13} className="text-emerald-700" /> Attached
          </span>
        </div>

        {/* Stat 2: EMD Security */}
        <div className="bg-white px-4 py-3 rounded-xl border border-slate-200/90 shadow-2xs flex items-center justify-between">
          <div>
            <span className="text-[10px] uppercase font-bold text-slate-400 block tracking-wider">
              EMD / Bid Security
            </span>
            <div className="flex items-baseline gap-1.5 mt-0.5">
              <strong className="text-base font-bold text-slate-900 font-mono">
                {tender.emdDisplay || "₹5,00,000"}
              </strong>
              <span className="text-[10.5px] text-emerald-700 font-medium">
                (
                {emdMode === "MSME_EXEMPTION"
                  ? "₹0 Payable"
                  : "Instrument Linked"}
                )
              </span>
            </div>
          </div>
          <span className="text-[11px] font-bold text-emerald-800 bg-emerald-100/80 px-2.5 py-1 rounded-lg flex items-center gap-1">
            <ShieldCheck size={13} className="text-emerald-700" />
            {emdMode === "MSME_EXEMPTION" ? "100% Exempt" : "Covered"}
          </span>
        </div>

        {/* Stat 3: PBG Post-Award */}
        <div className="bg-white px-4 py-3 rounded-xl border border-slate-200/90 shadow-2xs flex items-center justify-between">
          <div>
            <span className="text-[10px] uppercase font-bold text-slate-400 block tracking-wider">
              Performance Security (PBG)
            </span>
            <div className="flex items-baseline gap-1.5 mt-0.5">
              <strong className="text-base font-bold text-slate-900 font-mono">
                5% (₹7.50 Lakhs)
              </strong>
            </div>
          </div>
          <span className="text-[10.5px] font-medium text-slate-600 bg-slate-100 px-2 py-1 rounded-lg">
            Post-Award (15 Days)
          </span>
        </div>
      </div>

      {/* 2. TWO INTERACTIVE ENTRY & UPLOAD CARDS */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
        {/* ================= LEFT CARD: TENDER PROCESSING FEE DESK ================= */}
        <div className="bg-white rounded-2xl border border-slate-200/90 shadow-2xs p-5 flex flex-col justify-between space-y-4">
          <div className="space-y-4">
            {/* Header */}
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-xl bg-emerald-50 text-emerald-700 border border-emerald-200 flex items-center justify-center font-bold">
                  <Receipt size={16} />
                </div>
                <div>
                  <h3 className="text-sm font-bold text-slate-900">
                    Tender Processing Fee ({tender.tenderFeeDisplay || "₹5,900"}
                    )
                  </h3>
                  <p className="text-[11px] text-slate-500">
                    Select payment method and upload proof slip / screenshot
                  </p>
                </div>
              </div>

              <span className="text-[11px] font-bold text-emerald-800 bg-emerald-100 px-2.5 py-0.5 rounded-full flex items-center gap-1">
                <CheckCircle2 size={12} /> Ready in Cover-1
              </span>
            </div>

            {/* Clean 2-Column Controls (Dropdown + UTR/Ref) */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
              <div>
                <label className="text-[10.5px] font-bold uppercase text-slate-500 block mb-1">
                  Payment Method
                </label>
                <select
                  value={feeMode === "DD" ? "DD" : "ONLINE"}
                  onChange={(e) =>
                    setFeeMode(e.target.value === "DD" ? "DD" : "ONLINE")
                  }
                  className="w-full bg-slate-50 border border-slate-200 focus:border-emerald-500 rounded-lg px-2.5 py-2 text-xs text-slate-900 font-semibold focus:outline-hidden cursor-pointer"
                >
                  <option value="ONLINE">
                    ⚡ Online (NetBanking / UPI / QR)
                  </option>
                  <option value="GATEWAY">
                    💳 Payment Gateway (SBI e-Pay / Razorpay)
                  </option>
                  <option value="NEFT">🌐 NEFT / RTGS Transfer</option>
                  <option value="DD">🏛️ Demand Draft (DD)</option>
                  <option value="CHALLAN">
                    📄 Bank Challan / Cash Deposit
                  </option>
                  <option value="EXEMPT">🛡️ Exempt (Zero Tender Fee)</option>
                </select>
              </div>

              <div>
                <label className="text-[10.5px] font-bold uppercase text-slate-500 block mb-1">
                  {feeMode === "DD"
                    ? "Demand Draft (DD) No."
                    : "Transaction UTR / Ref No."}
                </label>
                <div className="flex items-center gap-1.5">
                  <input
                    type="text"
                    value={
                      feeMode === "DD" ? feeData.ddNumber : feeData.utrNumber
                    }
                    onChange={(e) =>
                      feeMode === "DD"
                        ? setFeeData({ ...feeData, ddNumber: e.target.value })
                        : setFeeData({ ...feeData, utrNumber: e.target.value })
                    }
                    className="w-full bg-slate-50 border border-slate-200 focus:border-emerald-500 rounded-lg px-2.5 py-2 font-mono font-bold text-xs text-slate-900 focus:outline-hidden"
                    placeholder="e.g. SBIN20260310928371"
                  />
                  <button
                    type="button"
                    onClick={() =>
                      handleCopyUtr(
                        feeMode === "DD" ? feeData.ddNumber : feeData.utrNumber,
                      )
                    }
                    title="Copy UTR"
                    className="p-2 rounded-lg bg-slate-50 hover:bg-slate-100 text-slate-500 border border-slate-200 cursor-pointer"
                  >
                    {copiedUtr ? (
                      <Check size={13} className="text-emerald-600" />
                    ) : (
                      <Copy size={13} />
                    )}
                  </button>
                </div>
              </div>
            </div>

            {/* Uploaded Payment Proof Screenshot / Slip Box */}
            <div className="p-3 bg-emerald-50/40 rounded-xl border border-emerald-200/90 flex items-center justify-between gap-3">
              <div className="flex items-center gap-2.5 min-w-0">
                <div className="w-8 h-8 rounded-lg bg-emerald-100 text-emerald-800 flex items-center justify-center shrink-0">
                  <FileCheck2 size={16} />
                </div>
                <div className="min-w-0">
                  <strong
                    className="text-xs font-bold text-slate-900 block truncate"
                    title={
                      feeMode === "DD"
                        ? feeData.ddFileName
                        : feeData.onlineFileName
                    }
                  >
                    {feeMode === "DD"
                      ? feeData.ddFileName
                      : feeData.onlineFileName}
                  </strong>
                  <span className="text-[10.5px] text-slate-500 block">
                    {feeMode === "DD"
                      ? feeData.ddFileSize
                      : feeData.onlineFileSize}{" "}
                    &bull; Screenshot / Slip Attached
                  </span>
                </div>
              </div>

              <div className="flex items-center gap-1.5 shrink-0">
                <button
                  type="button"
                  onClick={openFeePreview}
                  className="px-3 py-1.5 bg-emerald-700 hover:bg-emerald-800 text-white rounded-lg text-xs font-bold transition-colors cursor-pointer flex items-center gap-1 shadow-2xs"
                >
                  <Eye size={12} />
                  <span>View Proof</span>
                </button>
                <button
                  type="button"
                  onClick={() => feeFileInputRef.current?.click()}
                  className="px-2.5 py-1.5 bg-white hover:bg-slate-100 text-slate-700 border border-slate-300 rounded-lg text-xs font-bold transition-colors cursor-pointer flex items-center gap-1"
                  title="Upload / Replace Screenshot"
                >
                  <UploadCloud size={12} />
                  <span>Upload</span>
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* ================= RIGHT CARD: EMD / BID SECURITY DESK ================= */}
        <div className="bg-white rounded-2xl border border-slate-200/90 shadow-2xs p-5 flex flex-col justify-between space-y-4">
          <div className="space-y-4">
            {/* Header */}
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-xl bg-purple-50 text-purple-700 border border-purple-200 flex items-center justify-center font-bold">
                  <FileBadge2 size={16} />
                </div>
                <div>
                  <h3 className="text-sm font-bold text-slate-900">
                    EMD / Bid Security ({tender.emdDisplay || "₹5,00,000"})
                  </h3>
                  <p className="text-[11px] text-slate-500">
                    Select exemption or instrument &amp; upload proof
                  </p>
                </div>
              </div>

              <span className="text-[11px] font-bold text-emerald-800 bg-emerald-100 px-2.5 py-0.5 rounded-full flex items-center gap-1">
                <ShieldCheck size={12} />
                {emdMode === "MSME_EXEMPTION"
                  ? "100% Exempt"
                  : emdMode === "DD"
                    ? "DD Linked"
                    : emdMode === "BANK_GUARANTEE"
                      ? "BG Linked"
                      : "RTGS Linked"}
              </span>
            </div>

            {/* Clean 2-Column Controls (Dropdown + UTR/Ref) */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
              <div>
                <label className="text-[10.5px] font-bold uppercase text-slate-500 block mb-1">
                  EMD Security Mode
                </label>
                <select
                  value={emdMode}
                  onChange={(e) =>
                    setEmdMode(
                      e.target.value as
                        | "MSME_EXEMPTION"
                        | "DD"
                        | "BANK_GUARANTEE"
                        | "RTGS_NEFT",
                    )
                  }
                  className="w-full bg-slate-50 border border-slate-200 focus:border-purple-500 rounded-lg px-2.5 py-2 text-xs text-slate-900 font-semibold focus:outline-hidden cursor-pointer"
                >
                  <option value="MSME_EXEMPTION">
                    🛡️ MSME / Startup Exemption (Rule 170)
                  </option>
                  <option value="RTGS_NEFT">
                    🌐 Online RTGS / NEFT Transfer
                  </option>
                  <option value="DD">🏛️ Demand Draft (DD)</option>
                  <option value="BANK_GUARANTEE">📜 Bank Guarantee (BG)</option>
                  <option value="FDR">🏦 Fixed Deposit Receipt (FDR)</option>
                </select>
              </div>

              <div>
                <label className="text-[10.5px] font-bold uppercase text-slate-500 block mb-1">
                  {emdMode === "MSME_EXEMPTION"
                    ? "Udyam Registration No."
                    : emdMode === "DD"
                      ? "Demand Draft (DD) No."
                      : emdMode === "BANK_GUARANTEE"
                        ? "BG Instrument No."
                        : "Transfer UTR Number"}
                </label>
                <input
                  type="text"
                  value={
                    emdMode === "MSME_EXEMPTION"
                      ? emdData.udyamNumber
                      : emdMode === "DD"
                        ? emdData.ddNumber
                        : emdMode === "BANK_GUARANTEE"
                          ? emdData.bgNumber
                          : emdData.rtgsUtr
                  }
                  onChange={(e) => {
                    const val = e.target.value;
                    if (emdMode === "MSME_EXEMPTION")
                      setEmdData({ ...emdData, udyamNumber: val });
                    else if (emdMode === "DD")
                      setEmdData({ ...emdData, ddNumber: val });
                    else if (emdMode === "BANK_GUARANTEE")
                      setEmdData({ ...emdData, bgNumber: val });
                    else setEmdData({ ...emdData, rtgsUtr: val });
                  }}
                  className="w-full bg-slate-50 border border-slate-200 focus:border-purple-500 rounded-lg px-2.5 py-2 font-mono font-bold text-xs text-slate-900 focus:outline-hidden"
                />
              </div>
            </div>

            {/* Uploaded EMD Proof / Letter Card */}
            <div className="p-3 bg-purple-50/40 rounded-xl border border-purple-200/90 flex items-center justify-between gap-3">
              <div className="flex items-center gap-2.5 min-w-0">
                <div className="w-8 h-8 rounded-lg bg-purple-100 text-purple-800 flex items-center justify-center shrink-0">
                  <FileBadge2 size={16} />
                </div>
                <div className="min-w-0">
                  <strong
                    className="text-xs font-bold text-slate-900 block truncate"
                    title={
                      emdMode === "MSME_EXEMPTION"
                        ? emdData.exemptionFileName
                        : emdMode === "DD"
                          ? emdData.ddFileName
                          : emdMode === "BANK_GUARANTEE"
                            ? emdData.bgFileName
                            : emdData.rtgsFileName
                    }
                  >
                    {emdMode === "MSME_EXEMPTION"
                      ? emdData.exemptionFileName
                      : emdMode === "DD"
                        ? emdData.ddFileName
                        : emdMode === "BANK_GUARANTEE"
                          ? emdData.bgFileName
                          : emdData.rtgsFileName}
                  </strong>
                  <span className="text-[10.5px] text-slate-500 block">
                    {emdMode === "MSME_EXEMPTION"
                      ? `${emdData.exemptionFileSize} · Digitally Signed Declaration`
                      : "Screenshot / Proof Attached to Cover-1"}
                  </span>
                </div>
              </div>

              <div className="flex items-center gap-1.5 shrink-0">
                <button
                  type="button"
                  onClick={openEmdPreview}
                  className="px-3 py-1.5 bg-purple-700 hover:bg-purple-800 text-white rounded-lg text-xs font-bold transition-colors cursor-pointer flex items-center gap-1 shadow-2xs"
                >
                  <Eye size={12} />
                  <span>View Proof</span>
                </button>
                {emdMode === "MSME_EXEMPTION" ? (
                  <button
                    type="button"
                    onClick={handleRegenerateDeclaration}
                    disabled={isRegenerating}
                    className="p-1.5 bg-white hover:bg-slate-100 text-slate-700 border border-slate-300 rounded-lg text-xs font-bold transition-colors cursor-pointer"
                    title="Re-Generate Signed Declaration"
                  >
                    <RefreshCw
                      size={13}
                      className={
                        isRegenerating ? "animate-spin text-purple-700" : ""
                      }
                    />
                  </button>
                ) : (
                  <button
                    type="button"
                    onClick={() => emdFileInputRef.current?.click()}
                    className="px-2.5 py-1.5 bg-white hover:bg-slate-100 text-slate-700 border border-slate-300 rounded-lg text-xs font-bold transition-colors cursor-pointer flex items-center gap-1"
                    title="Upload / Replace Proof Screenshot"
                  >
                    <UploadCloud size={12} />
                    <span>Upload</span>
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 3. CLEAN BOTTOM BAR: AUDIT STATUS & STEP 4 BRIDGE */}
      <div className="bg-white p-4 md:p-5 rounded-2xl border border-slate-200/90 shadow-2xs flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-full bg-emerald-100 text-emerald-800 flex items-center justify-center shrink-0 font-bold">
            <Check size={16} />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <strong className="text-xs md:text-sm font-bold text-slate-900">
                Cover-1 Payment &amp; Statutory Envelope Verified
              </strong>
              <span className="text-[10px] font-bold bg-emerald-100 text-emerald-800 px-2 py-0.5 rounded-full">
                Ready for Submission
              </span>
            </div>
            <p className="text-[11px] text-slate-500">
              {feeMode === "DD"
                ? `Fee DD #${feeData.ddNumber}`
                : `Fee UTR ${feeData.utrNumber}`}{" "}
              &bull;{" "}
              {emdMode === "MSME_EXEMPTION"
                ? "Rule 170 MSME Exemption"
                : emdMode === "DD"
                  ? `EMD DD #${emdData.ddNumber}`
                  : emdMode === "BANK_GUARANTEE"
                    ? `BG #${emdData.bgNumber}`
                    : `RTGS UTR ${emdData.rtgsUtr}`}{" "}
              &bull; Attached &amp; Linked to Cover-1
            </p>
          </div>
        </div>

        {onNextTab && (
          <button
            type="button"
            onClick={onNextTab}
            className="px-5 py-2.5 bg-[#173C40] hover:bg-slate-800 text-white font-bold rounded-xl text-xs flex items-center justify-center gap-2 shadow-xs transition-all cursor-pointer shrink-0 w-full sm:w-auto"
          >
            <span>Proceed to Step 4: Proposal Desk</span>
            <ArrowRight size={14} />
          </button>
        )}
      </div>

      {/* Dynamic Payment Proof Modal */}
      <PaymentProofModal
        isOpen={modalState.isOpen}
        type={modalState.type}
        customData={modalState.customData}
        onClose={() => setModalState({ ...modalState, isOpen: false })}
        tender={tender}
      />
    </div>
  );
};
