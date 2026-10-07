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
        {/* ================= LEFT CARD: TENDER FEE ENTRY DESK ================= */}
        <div className="bg-white rounded-2xl border border-slate-200/90 shadow-2xs p-5 flex flex-col justify-between space-y-4">
          {/* Header & Mode Switcher */}
          <div className="space-y-2.5 border-b border-slate-100 pb-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-xl bg-emerald-50 text-emerald-700 border border-emerald-200 flex items-center justify-center font-bold">
                  <Receipt size={16} />
                </div>
                <div>
                  <h3 className="text-sm font-bold text-slate-900">
                    Tender Processing Fee (₹5,900)
                  </h3>
                  <p className="text-[11px] text-slate-500">
                    Enter payment / DD details and attach proof slip
                  </p>
                </div>
              </div>

              <span className="text-[11px] font-bold text-emerald-800 bg-emerald-100 px-2.5 py-0.5 rounded-full flex items-center gap-1">
                <CheckCircle2 size={12} /> Ready in Cover-1
              </span>
            </div>

            {/* Mode Switch: Online vs DD */}
            <div className="flex items-center bg-slate-100 p-1 rounded-xl border border-slate-200/80">
              <button
                type="button"
                onClick={() => setFeeMode("ONLINE")}
                className={`flex-1 py-1 rounded-lg text-xs font-bold transition-all cursor-pointer flex items-center justify-center gap-1.5 ${
                  feeMode === "ONLINE"
                    ? "bg-white text-emerald-800 shadow-2xs"
                    : "text-slate-600 hover:text-slate-900"
                }`}
              >
                <Receipt size={13} className="text-emerald-700" />
                <span>Online / Internet Banking / UTR</span>
              </button>

              <button
                type="button"
                onClick={() => setFeeMode("DD")}
                className={`flex-1 py-1 rounded-lg text-xs font-bold transition-all cursor-pointer flex items-center justify-center gap-1.5 ${
                  feeMode === "DD"
                    ? "bg-white text-amber-800 shadow-2xs"
                    : "text-slate-600 hover:text-slate-900"
                }`}
              >
                <Landmark size={13} className="text-amber-700" />
                <span>Demand Draft (DD)</span>
              </button>
            </div>
          </div>

          {/* ONLINE FORM FIELDS */}
          {feeMode === "ONLINE" && (
            <div className="space-y-3 animate-in fade-in duration-150">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                <div>
                  <label className="text-[10.5px] font-bold uppercase text-slate-500 block mb-1">
                    Transaction UTR / Ref No.
                  </label>
                  <div className="flex items-center gap-1.5">
                    <input
                      type="text"
                      value={feeData.utrNumber}
                      onChange={(e) =>
                        setFeeData({ ...feeData, utrNumber: e.target.value })
                      }
                      className="w-full bg-slate-50 border border-slate-200 focus:border-emerald-500 rounded-lg px-2.5 py-1.5 font-mono font-bold text-xs text-slate-900 focus:outline-hidden"
                      placeholder="e.g. SBIN20260310..."
                    />
                    <button
                      type="button"
                      onClick={() => handleCopyUtr(feeData.utrNumber)}
                      title="Copy UTR"
                      className="p-1.5 rounded bg-white hover:bg-slate-100 text-slate-500 border border-slate-200 cursor-pointer"
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
                  <label className="text-[10.5px] font-bold uppercase text-slate-500 block mb-1">
                    Payment Gateway / Mode
                  </label>
                  <input
                    type="text"
                    value={feeData.gatewayMode}
                    onChange={(e) =>
                      setFeeData({ ...feeData, gatewayMode: e.target.value })
                    }
                    className="w-full bg-slate-50 border border-slate-200 focus:border-emerald-500 rounded-lg px-2.5 py-1.5 text-xs text-slate-900 focus:outline-hidden"
                  />
                </div>

                <div>
                  <label className="text-[10.5px] font-bold uppercase text-slate-500 block mb-1">
                    Payment Date &amp; Time
                  </label>
                  <input
                    type="text"
                    value={feeData.paymentDate}
                    onChange={(e) =>
                      setFeeData({ ...feeData, paymentDate: e.target.value })
                    }
                    className="w-full bg-slate-50 border border-slate-200 focus:border-emerald-500 rounded-lg px-2.5 py-1.5 text-xs text-slate-900 focus:outline-hidden"
                  />
                </div>

                <div>
                  <label className="text-[10.5px] font-bold uppercase text-slate-500 block mb-1">
                    Remitting Entity
                  </label>
                  <input
                    type="text"
                    readOnly
                    value={`${signatory.companyName} (PAN: ${signatory.pan})`}
                    className="w-full bg-slate-100 border border-slate-200 rounded-lg px-2.5 py-1.5 text-xs text-slate-700 cursor-not-allowed"
                  />
                </div>
              </div>

              {/* Uploaded Slip Attachment Card */}
              <div className="p-3 bg-emerald-50/40 rounded-xl border border-emerald-200/90 flex items-center justify-between gap-3">
                <div className="flex items-center gap-2.5 min-w-0">
                  <div className="w-7 h-7 rounded-lg bg-emerald-100 text-emerald-800 flex items-center justify-center shrink-0">
                    <FileCheck2 size={15} />
                  </div>
                  <div className="min-w-0">
                    <strong
                      className="text-xs font-bold text-slate-900 block truncate"
                      title={feeData.onlineFileName}
                    >
                      {feeData.onlineFileName}
                    </strong>
                    <span className="text-[10.5px] text-slate-500 block">
                      PDF &bull; {feeData.onlineFileSize} &bull; Attached
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
                    <span>View Slip</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => feeFileInputRef.current?.click()}
                    className="px-2.5 py-1.5 bg-white hover:bg-slate-100 text-slate-700 border border-slate-300 rounded-lg text-xs font-bold transition-colors cursor-pointer flex items-center gap-1"
                    title="Upload / Replace Receipt File"
                  >
                    <UploadCloud size={12} />
                    <span>Upload</span>
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* DEMAND DRAFT (DD) FORM FIELDS */}
          {feeMode === "DD" && (
            <div className="space-y-3 animate-in fade-in duration-150">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                <div>
                  <label className="text-[10.5px] font-bold uppercase text-slate-500 block mb-1">
                    Demand Draft (DD) No.
                  </label>
                  <input
                    type="text"
                    value={feeData.ddNumber}
                    onChange={(e) =>
                      setFeeData({ ...feeData, ddNumber: e.target.value })
                    }
                    className="w-full bg-slate-50 border border-slate-200 focus:border-amber-500 rounded-lg px-2.5 py-1.5 font-mono font-bold text-xs text-slate-900 focus:outline-hidden"
                    placeholder="e.g. 591028"
                  />
                </div>

                <div>
                  <label className="text-[10.5px] font-bold uppercase text-slate-500 block mb-1">
                    Issuing Bank &amp; Branch
                  </label>
                  <input
                    type="text"
                    value={feeData.ddBankName}
                    onChange={(e) =>
                      setFeeData({ ...feeData, ddBankName: e.target.value })
                    }
                    className="w-full bg-slate-50 border border-slate-200 focus:border-amber-500 rounded-lg px-2.5 py-1.5 text-xs text-slate-900 focus:outline-hidden"
                    placeholder="e.g. State Bank of India"
                  />
                </div>

                <div>
                  <label className="text-[10.5px] font-bold uppercase text-slate-500 block mb-1">
                    DD Issue Date
                  </label>
                  <input
                    type="date"
                    value={feeData.ddIssueDate}
                    onChange={(e) =>
                      setFeeData({ ...feeData, ddIssueDate: e.target.value })
                    }
                    className="w-full bg-slate-50 border border-slate-200 focus:border-amber-500 rounded-lg px-2.5 py-1.5 text-xs text-slate-900 focus:outline-hidden"
                  />
                </div>

                <div>
                  <label className="text-[10.5px] font-bold uppercase text-slate-500 block mb-1">
                    Drawn in Favor of
                  </label>
                  <input
                    type="text"
                    value={feeData.ddDrawnInFavor}
                    onChange={(e) =>
                      setFeeData({ ...feeData, ddDrawnInFavor: e.target.value })
                    }
                    className="w-full bg-slate-50 border border-slate-200 focus:border-amber-500 rounded-lg px-2.5 py-1.5 text-xs text-slate-900 focus:outline-hidden"
                  />
                </div>
              </div>

              {/* Uploaded DD File Card */}
              <div className="p-3 bg-amber-50/50 rounded-xl border border-amber-300/90 flex items-center justify-between gap-3">
                <div className="flex items-center gap-2.5 min-w-0">
                  <div className="w-7 h-7 rounded-lg bg-amber-100 text-amber-800 flex items-center justify-center shrink-0">
                    <Landmark size={15} />
                  </div>
                  <div className="min-w-0">
                    <strong
                      className="text-xs font-bold text-slate-900 block truncate"
                      title={feeData.ddFileName}
                    >
                      {feeData.ddFileName}
                    </strong>
                    <span className="text-[10.5px] text-slate-500 block">
                      PDF &bull; {feeData.ddFileSize} &bull; DD Scan Attached
                    </span>
                  </div>
                </div>

                <div className="flex items-center gap-1.5 shrink-0">
                  <button
                    type="button"
                    onClick={openFeePreview}
                    className="px-3 py-1.5 bg-amber-700 hover:bg-amber-800 text-white rounded-lg text-xs font-bold transition-colors cursor-pointer flex items-center gap-1 shadow-2xs"
                  >
                    <Eye size={12} />
                    <span>View DD</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => feeFileInputRef.current?.click()}
                    className="px-2.5 py-1.5 bg-white hover:bg-slate-100 text-slate-700 border border-slate-300 rounded-lg text-xs font-bold transition-colors cursor-pointer flex items-center gap-1"
                    title="Upload / Replace DD Scan"
                  >
                    <UploadCloud size={12} />
                    <span>Upload DD</span>
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* ================= RIGHT CARD: EMD / BID SECURITY DESK ================= */}
        <div className="bg-white rounded-2xl border border-slate-200/90 shadow-2xs p-5 flex flex-col justify-between space-y-4">
          {/* Header & Tabs */}
          <div className="space-y-2.5 border-b border-slate-100 pb-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-xl bg-purple-50 text-purple-700 border border-purple-200 flex items-center justify-center font-bold">
                  <FileBadge2 size={16} />
                </div>
                <div>
                  <h3 className="text-sm font-bold text-slate-900">
                    EMD / Bid Security ({tender.emdDisplay || "₹5,00,000"})
                  </h3>
                  <p className="text-[11px] text-slate-500">
                    Choose exemption or enter DD / BG / RTGS details
                  </p>
                </div>
              </div>

              <span className="text-[11px] font-bold text-emerald-800 bg-emerald-100 px-2.5 py-0.5 rounded-full flex items-center gap-1">
                <ShieldCheck size={12} />
                {emdMode === "MSME_EXEMPTION"
                  ? "Rule 170 Exemption"
                  : emdMode === "DD"
                    ? "DD Linked"
                    : emdMode === "BANK_GUARANTEE"
                      ? "BG Linked"
                      : "RTGS Linked"}
              </span>
            </div>

            {/* 4 Mode Tabs */}
            <div className="grid grid-cols-4 gap-1 bg-slate-100 p-1 rounded-xl border border-slate-200/80 text-[11px]">
              <button
                type="button"
                onClick={() => setEmdMode("MSME_EXEMPTION")}
                className={`py-1 rounded-lg font-bold transition-all cursor-pointer flex items-center justify-center gap-1 ${
                  emdMode === "MSME_EXEMPTION"
                    ? "bg-white text-emerald-800 shadow-2xs"
                    : "text-slate-600 hover:text-slate-900"
                }`}
              >
                <ShieldCheck size={11} className="text-emerald-700" />
                <span className="truncate">MSME Exempt</span>
              </button>

              <button
                type="button"
                onClick={() => setEmdMode("DD")}
                className={`py-1 rounded-lg font-bold transition-all cursor-pointer flex items-center justify-center gap-1 ${
                  emdMode === "DD"
                    ? "bg-white text-amber-800 shadow-2xs"
                    : "text-slate-600 hover:text-slate-900"
                }`}
              >
                <Landmark size={11} className="text-amber-700" />
                <span className="truncate">Demand Draft</span>
              </button>

              <button
                type="button"
                onClick={() => setEmdMode("BANK_GUARANTEE")}
                className={`py-1 rounded-lg font-bold transition-all cursor-pointer flex items-center justify-center gap-1 ${
                  emdMode === "BANK_GUARANTEE"
                    ? "bg-white text-purple-800 shadow-2xs"
                    : "text-slate-600 hover:text-slate-900"
                }`}
              >
                <FileBadge2 size={11} className="text-purple-700" />
                <span className="truncate">Bank Guarantee</span>
              </button>

              <button
                type="button"
                onClick={() => setEmdMode("RTGS_NEFT")}
                className={`py-1 rounded-lg font-bold transition-all cursor-pointer flex items-center justify-center gap-1 ${
                  emdMode === "RTGS_NEFT"
                    ? "bg-white text-blue-800 shadow-2xs"
                    : "text-slate-600 hover:text-slate-900"
                }`}
              >
                <Receipt size={11} className="text-blue-700" />
                <span className="truncate">RTGS / NEFT</span>
              </button>
            </div>
          </div>

          {/* MODE 1: MSME EXEMPTION FORM */}
          {emdMode === "MSME_EXEMPTION" && (
            <div className="space-y-3 animate-in fade-in duration-150">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                <div>
                  <label className="text-[10.5px] font-bold uppercase text-slate-500 block mb-1">
                    Exemption Authority Rule
                  </label>
                  <input
                    type="text"
                    readOnly
                    value="Rule 170 of GFR, 2017 (MSE Waiver)"
                    className="w-full bg-slate-100 border border-slate-200 rounded-lg px-2.5 py-1.5 text-xs text-slate-700 font-semibold cursor-not-allowed"
                  />
                </div>

                <div>
                  <label className="text-[10.5px] font-bold uppercase text-slate-500 block mb-1">
                    Udyam Certificate No.
                  </label>
                  <input
                    type="text"
                    value={emdData.udyamNumber}
                    onChange={(e) =>
                      setEmdData({ ...emdData, udyamNumber: e.target.value })
                    }
                    className="w-full bg-emerald-50/60 border border-emerald-300 focus:border-emerald-500 rounded-lg px-2.5 py-1.5 font-mono font-bold text-xs text-emerald-950 focus:outline-hidden"
                  />
                </div>

                <div className="sm:col-span-2">
                  <label className="text-[10.5px] font-bold uppercase text-slate-500 block mb-1">
                    Signatory &amp; DSC Seal Token
                  </label>
                  <input
                    type="text"
                    readOnly
                    value={`${signatory.signatoryName} (${signatory.signatoryTitle}) &bull; DSC: ${signatory.dscSerial}`}
                    className="w-full bg-slate-100 border border-slate-200 rounded-lg px-2.5 py-1.5 text-xs text-slate-700 cursor-not-allowed"
                  />
                </div>
              </div>

              {/* Generated Declaration Box */}
              <div className="p-3 bg-emerald-50/40 rounded-xl border border-emerald-200/90 flex items-center justify-between gap-3">
                <div className="flex items-center gap-2.5 min-w-0">
                  <div className="w-7 h-7 rounded-lg bg-emerald-100 text-emerald-800 flex items-center justify-center shrink-0">
                    <FileBadge2 size={15} />
                  </div>
                  <div className="min-w-0">
                    <strong
                      className="text-xs font-bold text-slate-900 block truncate"
                      title={emdData.exemptionFileName}
                    >
                      {emdData.exemptionFileName}
                    </strong>
                    <span className="text-[10.5px] text-slate-500 block">
                      Auto-generated &bull; {emdData.exemptionFileSize} &bull;
                      Digitally Signed
                    </span>
                  </div>
                </div>

                <div className="flex items-center gap-1.5 shrink-0">
                  <button
                    type="button"
                    onClick={openEmdPreview}
                    className="px-3 py-1.5 bg-emerald-700 hover:bg-emerald-800 text-white rounded-lg text-xs font-bold transition-colors cursor-pointer flex items-center gap-1 shadow-2xs"
                  >
                    <Eye size={12} />
                    <span>View Letter</span>
                  </button>
                  <button
                    type="button"
                    onClick={handleRegenerateDeclaration}
                    disabled={isRegenerating}
                    className="p-1.5 bg-white hover:bg-slate-100 text-slate-700 border border-slate-300 rounded-lg text-xs font-bold transition-colors cursor-pointer"
                    title="Re-Generate Declaration"
                  >
                    <RefreshCw
                      size={13}
                      className={
                        isRegenerating ? "animate-spin text-emerald-700" : ""
                      }
                    />
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* MODE 2: EMD DEMAND DRAFT (DD) FORM */}
          {emdMode === "DD" && (
            <div className="space-y-3 animate-in fade-in duration-150">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                <div>
                  <label className="text-[10.5px] font-bold uppercase text-slate-500 block mb-1">
                    EMD DD Number
                  </label>
                  <input
                    type="text"
                    value={emdData.ddNumber}
                    onChange={(e) =>
                      setEmdData({ ...emdData, ddNumber: e.target.value })
                    }
                    className="w-full bg-slate-50 border border-slate-200 focus:border-amber-500 rounded-lg px-2.5 py-1.5 font-mono font-bold text-xs text-slate-900 focus:outline-hidden"
                    placeholder="e.g. 918273"
                  />
                </div>

                <div>
                  <label className="text-[10.5px] font-bold uppercase text-slate-500 block mb-1">
                    Issuing Bank
                  </label>
                  <input
                    type="text"
                    value={emdData.ddBankName}
                    onChange={(e) =>
                      setEmdData({ ...emdData, ddBankName: e.target.value })
                    }
                    className="w-full bg-slate-50 border border-slate-200 focus:border-amber-500 rounded-lg px-2.5 py-1.5 text-xs text-slate-900 focus:outline-hidden"
                    placeholder="e.g. Punjab National Bank"
                  />
                </div>

                <div>
                  <label className="text-[10.5px] font-bold uppercase text-slate-500 block mb-1">
                    DD Issue Date
                  </label>
                  <input
                    type="date"
                    value={emdData.ddIssueDate}
                    onChange={(e) =>
                      setEmdData({ ...emdData, ddIssueDate: e.target.value })
                    }
                    className="w-full bg-slate-50 border border-slate-200 focus:border-amber-500 rounded-lg px-2.5 py-1.5 text-xs text-slate-900 focus:outline-hidden"
                  />
                </div>

                <div>
                  <label className="text-[10.5px] font-bold uppercase text-slate-500 block mb-1">
                    DD Amount
                  </label>
                  <input
                    type="text"
                    value={emdData.ddAmount}
                    onChange={(e) =>
                      setEmdData({ ...emdData, ddAmount: e.target.value })
                    }
                    className="w-full bg-slate-50 border border-slate-200 focus:border-amber-500 rounded-lg px-2.5 py-1.5 font-bold font-mono text-xs text-slate-900 focus:outline-hidden"
                  />
                </div>
              </div>

              {/* Uploaded EMD DD Card */}
              <div className="p-3 bg-amber-50/50 rounded-xl border border-amber-300/90 flex items-center justify-between gap-3">
                <div className="flex items-center gap-2.5 min-w-0">
                  <div className="w-7 h-7 rounded-lg bg-amber-100 text-amber-800 flex items-center justify-center shrink-0">
                    <Landmark size={15} />
                  </div>
                  <div className="min-w-0">
                    <strong
                      className="text-xs font-bold text-slate-900 block truncate"
                      title={emdData.ddFileName}
                    >
                      {emdData.ddFileName}
                    </strong>
                    <span className="text-[10.5px] text-slate-500 block">
                      PDF &bull; {emdData.ddFileSize} &bull; Attached to Cover-1
                    </span>
                  </div>
                </div>

                <div className="flex items-center gap-1.5 shrink-0">
                  <button
                    type="button"
                    onClick={openEmdPreview}
                    className="px-3 py-1.5 bg-amber-700 hover:bg-amber-800 text-white rounded-lg text-xs font-bold transition-colors cursor-pointer flex items-center gap-1 shadow-2xs"
                  >
                    <Eye size={12} />
                    <span>View DD</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => emdFileInputRef.current?.click()}
                    className="px-2.5 py-1.5 bg-white hover:bg-slate-100 text-slate-700 border border-slate-300 rounded-lg text-xs font-bold transition-colors cursor-pointer flex items-center gap-1"
                    title="Upload EMD DD Scan"
                  >
                    <UploadCloud size={12} />
                    <span>Upload DD</span>
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* MODE 3: BANK GUARANTEE (BG) FORM */}
          {emdMode === "BANK_GUARANTEE" && (
            <div className="space-y-3 animate-in fade-in duration-150">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                <div>
                  <label className="text-[10.5px] font-bold uppercase text-slate-500 block mb-1">
                    BG Instrument Number
                  </label>
                  <input
                    type="text"
                    value={emdData.bgNumber}
                    onChange={(e) =>
                      setEmdData({ ...emdData, bgNumber: e.target.value })
                    }
                    className="w-full bg-slate-50 border border-slate-200 focus:border-purple-500 rounded-lg px-2.5 py-1.5 font-mono font-bold text-xs text-purple-950 focus:outline-hidden"
                    placeholder="e.g. BG-9920-2026-MUM"
                  />
                </div>

                <div>
                  <label className="text-[10.5px] font-bold uppercase text-slate-500 block mb-1">
                    Issuing Bank
                  </label>
                  <input
                    type="text"
                    value={emdData.bgBankName}
                    onChange={(e) =>
                      setEmdData({ ...emdData, bgBankName: e.target.value })
                    }
                    className="w-full bg-slate-50 border border-slate-200 focus:border-purple-500 rounded-lg px-2.5 py-1.5 text-xs text-slate-900 focus:outline-hidden"
                  />
                </div>

                <div>
                  <label className="text-[10.5px] font-bold uppercase text-slate-500 block mb-1">
                    Valid Until (180 Days)
                  </label>
                  <input
                    type="date"
                    value={emdData.bgValidUntil}
                    onChange={(e) =>
                      setEmdData({ ...emdData, bgValidUntil: e.target.value })
                    }
                    className="w-full bg-slate-50 border border-slate-200 focus:border-purple-500 rounded-lg px-2.5 py-1.5 text-xs text-slate-900 focus:outline-hidden"
                  />
                </div>

                <div>
                  <label className="text-[10.5px] font-bold uppercase text-slate-500 block mb-1">
                    Claim Period
                  </label>
                  <input
                    type="text"
                    value={emdData.bgClaimPeriod}
                    onChange={(e) =>
                      setEmdData({ ...emdData, bgClaimPeriod: e.target.value })
                    }
                    className="w-full bg-slate-50 border border-slate-200 focus:border-purple-500 rounded-lg px-2.5 py-1.5 text-xs text-slate-900 focus:outline-hidden"
                  />
                </div>
              </div>

              {/* Uploaded BG File Card */}
              <div className="p-3 bg-purple-50/50 rounded-xl border border-purple-300/90 flex items-center justify-between gap-3">
                <div className="flex items-center gap-2.5 min-w-0">
                  <div className="w-7 h-7 rounded-lg bg-purple-100 text-purple-800 flex items-center justify-center shrink-0">
                    <FileBadge2 size={15} />
                  </div>
                  <div className="min-w-0">
                    <strong
                      className="text-xs font-bold text-slate-900 block truncate"
                      title={emdData.bgFileName}
                    >
                      {emdData.bgFileName}
                    </strong>
                    <span className="text-[10.5px] text-slate-500 block">
                      PDF &bull; {emdData.bgFileSize} &bull; SFMS Stamped
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
                    <span>View BG</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => emdFileInputRef.current?.click()}
                    className="px-2.5 py-1.5 bg-white hover:bg-slate-100 text-slate-700 border border-slate-300 rounded-lg text-xs font-bold transition-colors cursor-pointer flex items-center gap-1"
                    title="Upload Scanned BG"
                  >
                    <UploadCloud size={12} />
                    <span>Upload BG</span>
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* MODE 4: DIRECT RTGS / NEFT FORM */}
          {emdMode === "RTGS_NEFT" && (
            <div className="space-y-3 animate-in fade-in duration-150">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                <div>
                  <label className="text-[10.5px] font-bold uppercase text-slate-500 block mb-1">
                    Authority Escrow Account
                  </label>
                  <input
                    type="text"
                    readOnly
                    value="A/C: 38291048291 · IFSC: SBIN0001234"
                    className="w-full bg-slate-100 border border-slate-200 rounded-lg px-2.5 py-1.5 text-xs text-slate-700 font-mono cursor-not-allowed"
                  />
                </div>

                <div>
                  <label className="text-[10.5px] font-bold uppercase text-slate-500 block mb-1">
                    Transfer UTR No.
                  </label>
                  <input
                    type="text"
                    value={emdData.rtgsUtr}
                    onChange={(e) =>
                      setEmdData({ ...emdData, rtgsUtr: e.target.value })
                    }
                    className="w-full bg-slate-50 border border-slate-200 focus:border-blue-500 rounded-lg px-2.5 py-1.5 font-mono font-bold text-xs text-blue-950 focus:outline-hidden"
                  />
                </div>

                <div>
                  <label className="text-[10.5px] font-bold uppercase text-slate-500 block mb-1">
                    Remitter Bank
                  </label>
                  <input
                    type="text"
                    value={emdData.rtgsBank}
                    onChange={(e) =>
                      setEmdData({ ...emdData, rtgsBank: e.target.value })
                    }
                    className="w-full bg-slate-50 border border-slate-200 focus:border-blue-500 rounded-lg px-2.5 py-1.5 text-xs text-slate-900 focus:outline-hidden"
                  />
                </div>

                <div>
                  <label className="text-[10.5px] font-bold uppercase text-slate-500 block mb-1">
                    Transfer Date
                  </label>
                  <input
                    type="text"
                    value={emdData.rtgsDate}
                    onChange={(e) =>
                      setEmdData({ ...emdData, rtgsDate: e.target.value })
                    }
                    className="w-full bg-slate-50 border border-slate-200 focus:border-blue-500 rounded-lg px-2.5 py-1.5 text-xs text-slate-900 focus:outline-hidden"
                  />
                </div>
              </div>

              {/* Uploaded RTGS Advice Card */}
              <div className="p-3 bg-blue-50/50 rounded-xl border border-blue-300/90 flex items-center justify-between gap-3">
                <div className="flex items-center gap-2.5 min-w-0">
                  <div className="w-7 h-7 rounded-lg bg-blue-100 text-blue-800 flex items-center justify-center shrink-0">
                    <Receipt size={15} />
                  </div>
                  <div className="min-w-0">
                    <strong
                      className="text-xs font-bold text-slate-900 block truncate"
                      title={emdData.rtgsFileName}
                    >
                      {emdData.rtgsFileName}
                    </strong>
                    <span className="text-[10.5px] text-slate-500 block">
                      PDF &bull; {emdData.rtgsFileSize} &bull; Attached to
                      Cover-1
                    </span>
                  </div>
                </div>

                <div className="flex items-center gap-1.5 shrink-0">
                  <button
                    type="button"
                    onClick={openEmdPreview}
                    className="px-3 py-1.5 bg-blue-700 hover:bg-blue-800 text-white rounded-lg text-xs font-bold transition-colors cursor-pointer flex items-center gap-1 shadow-2xs"
                  >
                    <Eye size={12} />
                    <span>View Slip</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => emdFileInputRef.current?.click()}
                    className="px-2.5 py-1.5 bg-white hover:bg-slate-100 text-slate-700 border border-slate-300 rounded-lg text-xs font-bold transition-colors cursor-pointer flex items-center gap-1"
                    title="Upload RTGS Transfer Slip"
                  >
                    <UploadCloud size={12} />
                    <span>Upload</span>
                  </button>
                </div>
              </div>
            </div>
          )}
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
