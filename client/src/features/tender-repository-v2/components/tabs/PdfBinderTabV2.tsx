import React, { useState } from "react";
import {
  Library,
  FileDown,
  FileCheck,
  CheckCircle2,
  FolderArchive,
  Download,
  Printer,
  Sparkles,
  ArrowRight,
  Eye,
  ShieldCheck,
  RefreshCw,
  MoveUp,
  MoveDown,
  Check,
  FileText,
  Lock,
  Layers,
  Archive,
  Clock,
  ExternalLink,
  Award,
  ScrollText,
  BadgeCheck,
  FileSpreadsheet,
  BookOpen,
} from "lucide-react";
import { toast } from "sonner";
import { TenderV2 } from "../../types";
import { MasterDossierPdfModal } from "../MasterDossierPdfModal";

interface PdfBinderTabV2Props {
  tender: TenderV2;
  onFinish?: () => void;
}

interface BinderItem {
  id: string;
  sequence: number;
  title: string;
  sourceStep: "Step 1" | "Step 2" | "Step 3" | "Step 4" | "Auto-Gen";
  category: "Cover-1 Fee" | "Cover-1 Eligibility" | "Cover-2 Technical" | "Cover-2 Annexures";
  pageCount: number;
  status: "Ready" | "Verified" | "Sealed";
  included: boolean;
  docFileName: string;
}

export const PdfBinderTabV2: React.FC<PdfBinderTabV2Props> = ({
  tender,
  onFinish,
}) => {
  const [isPdfModalOpen, setIsPdfModalOpen] = useState(false);
  const [isCompiling, setIsCompiling] = useState(false);
  const [isDscVerifying, setIsDscVerifying] = useState(false);

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

  // 10 Sequential Documents for the Master Dossier
  const [binderItems, setBinderItems] = useState<BinderItem[]>([
    {
      id: "b-1",
      sequence: 1,
      title: "Master Bid Cover Page & Power of Attorney",
      sourceStep: "Auto-Gen",
      category: "Cover-1 Fee",
      pageCount: 3,
      status: "Ready",
      included: true,
      docFileName: "Master_Bid_Cover_Page.pdf",
    },
    {
      id: "b-2",
      sequence: 2,
      title: "Annexure-1: Technical Bid Covering Letter",
      sourceStep: "Step 4",
      category: "Cover-2 Annexures",
      pageCount: 2,
      status: "Sealed",
      included: true,
      docFileName: "Annexure_1_Covering_Letter_Signed.pdf",
    },
    {
      id: "b-3",
      sequence: 3,
      title: "Cover-1: Tender Processing Fee Challan Receipt",
      sourceStep: "Step 3",
      category: "Cover-1 Fee",
      pageCount: 2,
      status: "Verified",
      included: true,
      docFileName: "SBI_Payment_Challan_SAJHA69.pdf",
    },
    {
      id: "b-4",
      sequence: 4,
      title: "Cover-1: EMD Exemption Declaration (Rule 170 GFR)",
      sourceStep: "Step 3",
      category: "Cover-1 Fee",
      pageCount: 2,
      status: "Sealed",
      included: true,
      docFileName: "MSME_Rule_170_Self_Declaration.pdf",
    },
    {
      id: "b-5",
      sequence: 5,
      title: "Statutory Vault: GST, PAN & CA Certified Turnover",
      sourceStep: "Step 2",
      category: "Cover-1 Eligibility",
      pageCount: 8,
      status: "Verified",
      included: true,
      docFileName: "CA_Turnover_Audited_Balance_Sheets.pdf",
    },
    {
      id: "b-6",
      sequence: 6,
      title: "Quality Certifications: CMMI Level 3 & ISO 27001",
      sourceStep: "Step 2",
      category: "Cover-1 Eligibility",
      pageCount: 5,
      status: "Verified",
      included: true,
      docFileName: "CMMI_ISO_27001_Certificates.pdf",
    },
    {
      id: "b-7",
      sequence: 7,
      title: "Technical Proposal: Chapters 1 to 5 & Cloud Architecture",
      sourceStep: "Step 4",
      category: "Cover-2 Technical",
      pageCount: 16,
      status: "Sealed",
      included: true,
      docFileName: "Technical_Proposal_Chapters_Architecture.pdf",
    },
    {
      id: "b-8",
      sequence: 8,
      title: "Clause-by-Clause Technical Compliance Matrix (28 Clauses)",
      sourceStep: "Step 4",
      category: "Cover-2 Technical",
      pageCount: 4,
      status: "Ready",
      included: true,
      docFileName: "Compliance_Matrix_28_Clauses.pdf",
    },
    {
      id: "b-9",
      sequence: 9,
      title: "Key Personnel: Signed Resumes (CTO, Head, Sports SME)",
      sourceStep: "Step 4",
      category: "Cover-2 Technical",
      pageCount: 4,
      status: "Sealed",
      included: true,
      docFileName: "Key_Personnel_CVs_Signed.pdf",
    },
    {
      id: "b-10",
      sequence: 10,
      title: "Annexure-2: Non-Blacklisting Notarized Affidavit",
      sourceStep: "Step 4",
      category: "Cover-2 Annexures",
      pageCount: 2,
      status: "Verified",
      included: true,
      docFileName: "Annexure_2_Non_Blacklisting_Affidavit.pdf",
    },
  ]);

  // Reorder Handler
  const handleMove = (index: number, direction: "up" | "down") => {
    const newItems = [...binderItems];
    const targetIndex = direction === "up" ? index - 1 : index + 1;
    if (targetIndex < 0 || targetIndex >= newItems.length) return;

    const temp = newItems[index];
    newItems[index] = newItems[targetIndex];
    newItems[targetIndex] = temp;

    // update sequence numbers
    const updated = newItems.map((item, idx) => ({
      ...item,
      sequence: idx + 1,
    }));
    setBinderItems(updated);
    toast.success("Dossier sequence updated");
  };

  // Toggle Included Handler
  const handleToggleInclude = (id: string) => {
    setBinderItems((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, included: !item.included } : item
      )
    );
  };

  // Stats calculation
  const includedItems = binderItems.filter((item) => item.included);
  const totalPages = includedItems.reduce((acc, item) => acc + item.pageCount, 0);

  const handleCompileMasterPdf = () => {
    setIsCompiling(true);
    toast.loading("Compiling & Merging Master Bid Dossier (PDF)...", {
      id: "compile-master",
    });
    setTimeout(() => {
      setIsCompiling(false);
      toast.success("Master Bid Dossier Compiled Successfully!", {
        id: "compile-master",
        description: `Master_Bid_Package_${tender.tenderNumber.replace("/", "_")}_Compiled.pdf (${totalPages} Pages · 14.2 MB) saved to downloads.`,
      });
    }, 1500);
  };

  const handleExportZipBundle = () => {
    toast.success("Downloading e-Procurement Portal ZIP Bundle", {
      description: "Includes Cover-1.pdf, Cover-2.pdf, and Financial BOQ.xlsx ready for portal upload.",
    });
  };

  const handleVerifyDsc = () => {
    setIsDscVerifying(true);
    toast.loading("Verifying Hardware USB Token & DSC Certificate Chain...", {
      id: "verify-dsc",
    });
    setTimeout(() => {
      setIsDscVerifying(false);
      toast.success("Class-3 DSC Token Verified & Active!", {
        id: "verify-dsc",
        description: `Serial: ${signatory.dscSerial} · Issued by e-Mudhra Sub-CA 2024. Valid till ${signatory.dscExpiry}.`,
      });
    }, 1000);
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-200">
      {/* 1. TOP METRICS & MASTER BINDER HERO BAR */}
      <div className="bg-white rounded-2xl border border-slate-200/90 shadow-2xs p-5 md:p-6 space-y-4">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 border-b border-slate-100 pb-4">
          <div className="flex items-start gap-3.5">
            <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-[#173C40] to-emerald-900 text-white flex items-center justify-center shrink-0 shadow-xs">
              <Library size={22} className="text-emerald-300" />
            </div>
            <div>
              <div className="flex items-center gap-2 flex-wrap">
                <span className="text-[10.5px] font-mono font-bold uppercase tracking-wider bg-emerald-100 text-emerald-900 px-2 py-0.5 rounded-md border border-emerald-200">
                  Step 5 of 5
                </span>
                <span className="text-xs font-bold text-slate-500">
                  Final Submission &amp; PDF Binder
                </span>
                <span className="text-[11px] bg-slate-100 text-slate-700 px-2 py-0.5 rounded-md font-mono">
                  RFP: {tender.tenderNumber}
                </span>
              </div>
              <h2 className="text-lg md:text-xl font-black text-slate-900 tracking-tight mt-0.5">
                Master Bid Dossier &amp; PDF Binder Studio
              </h2>
              <p className="text-xs text-slate-600 mt-0.5">
                Sequentially merge, paginate, index, and digitally bind all bid components into a compliant master tender package.
              </p>
            </div>
          </div>

          {/* Master Action Buttons */}
          <div className="flex items-center gap-2 flex-wrap sm:flex-nowrap">
            <button
              type="button"
              onClick={handleCompileMasterPdf}
              disabled={isCompiling}
              className="px-4 py-2 bg-[#173C40] hover:bg-slate-800 text-white rounded-xl text-xs font-bold flex items-center gap-1.5 shadow-xs transition-colors cursor-pointer disabled:opacity-50"
            >
              <Download size={14} />
              <span>{isCompiling ? "Merging PDF..." : "Export Master PDF"}</span>
            </button>

            <button
              type="button"
              onClick={() => setIsPdfModalOpen(true)}
              className="px-3.5 py-2 bg-slate-900 hover:bg-slate-800 text-white rounded-xl text-xs font-bold flex items-center gap-1.5 shadow-xs transition-colors cursor-pointer"
            >
              <Eye size={14} className="text-emerald-400" />
              <span>Preview Master Dossier</span>
            </button>

            <button
              type="button"
              onClick={handleExportZipBundle}
              className="px-3 py-2 bg-white hover:bg-slate-50 text-slate-700 border border-slate-300 rounded-xl text-xs font-bold flex items-center gap-1.5 transition-colors cursor-pointer shadow-2xs"
              title="Download Portal ZIP Package"
            >
              <FolderArchive size={14} />
              <span className="hidden sm:inline">Portal ZIP</span>
            </button>
          </div>
        </div>

        {/* 4 Performance Indicators */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 pt-1">
          <div className="bg-slate-50/90 p-3.5 rounded-xl border border-slate-200/80">
            <div className="flex items-center justify-between text-slate-500 mb-1">
              <span className="text-[10px] font-bold uppercase tracking-wider">
                Total Dossier Size
              </span>
              <BookOpen size={14} className="text-emerald-700" />
            </div>
            <div className="flex items-baseline gap-1.5">
              <strong className="text-xl font-black text-slate-900 font-mono">
                {totalPages} Pages
              </strong>
              <span className="text-[11px] text-emerald-800 font-bold bg-emerald-100/90 px-1.5 py-0.2 rounded">
                Merged
              </span>
            </div>
            <span className="text-[10.5px] text-slate-500 block mt-1">
              ~14.2 MB · Continuous Header/Footer
            </span>
          </div>

          <div className="bg-slate-50/90 p-3.5 rounded-xl border border-slate-200/80">
            <div className="flex items-center justify-between text-slate-500 mb-1">
              <span className="text-[10px] font-bold uppercase tracking-wider">
                Document Integration
              </span>
              <CheckCircle2 size={14} className="text-emerald-700" />
            </div>
            <div className="flex items-baseline gap-1.5">
              <strong className="text-xl font-black text-slate-900 font-mono">
                {includedItems.length} / {binderItems.length}
              </strong>
              <span className="text-[11px] text-emerald-700 font-medium">
                (100% Bound)
              </span>
            </div>
            <span className="text-[10.5px] text-slate-500 block mt-1 truncate">
              Cover-1 &amp; Cover-2 Envelopes Ready
            </span>
          </div>

          <div className="bg-slate-50/90 p-3.5 rounded-xl border border-slate-200/80">
            <div className="flex items-center justify-between text-slate-500 mb-1">
              <span className="text-[10px] font-bold uppercase tracking-wider">
                Digital Signatory Token
              </span>
              <ShieldCheck size={14} className="text-emerald-700" />
            </div>
            <div className="flex items-baseline gap-1.5">
              <strong className="text-sm font-bold text-slate-900 truncate">
                {signatory.signatoryName}
              </strong>
            </div>
            <span className="text-[10.5px] font-mono text-emerald-800 font-bold block mt-1 truncate">
              Class-3 DSC Token Active
            </span>
          </div>

          <div className="bg-slate-50/90 p-3.5 rounded-xl border border-slate-200/80">
            <div className="flex items-center justify-between text-slate-500 mb-1">
              <span className="text-[10px] font-bold uppercase tracking-wider">
                Submission Due Date
              </span>
              <Clock size={14} className="text-amber-700" />
            </div>
            <div className="flex items-baseline gap-1.5">
              <strong className="text-sm font-bold text-slate-900">
                {tender.submissionDeadline.split(",")[0]}
              </strong>
            </div>
            <span className="text-[10.5px] text-amber-700 font-bold block mt-1">
              {tender.submissionDeadline.split(",")[1] || "11:00 AM"}
            </span>
          </div>
        </div>
      </div>

      {/* 2. SEQUENTIAL DOCUMENT STITCHER & REORDER LIST */}
      <div className="bg-white rounded-2xl border border-slate-200/90 shadow-2xs p-5 md:p-6 space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-100 pb-3">
          <div>
            <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2">
              <Layers size={16} className="text-emerald-700" />
              <span>Master Document Stitcher Sequence (10 Items)</span>
            </h3>
            <p className="text-xs text-slate-500">
              Drag, reorder, or toggle individual document inclusions into the master PDF package.
            </p>
          </div>

          <span className="text-xs font-bold text-emerald-800 bg-emerald-100 px-3 py-1 rounded-full flex items-center gap-1 self-start sm:self-auto">
            <BadgeCheck size={14} /> Auto-Paginated Table of Contents
          </span>
        </div>

        {/* List of 10 Sequential Documents */}
        <div className="space-y-2">
          {binderItems.map((item, idx) => (
            <div
              key={item.id}
              className={`p-3.5 rounded-xl border transition-all flex flex-col sm:flex-row sm:items-center justify-between gap-3 ${
                item.included
                  ? "bg-slate-50/80 border-slate-200 hover:bg-slate-100/70"
                  : "bg-slate-100/40 border-slate-200/50 opacity-60"
              }`}
            >
              {/* Left Details */}
              <div className="flex items-center gap-3 min-w-0">
                <input
                  type="checkbox"
                  checked={item.included}
                  onChange={() => handleToggleInclude(item.id)}
                  className="w-4 h-4 rounded text-emerald-700 focus:ring-emerald-500 cursor-pointer"
                  title="Include in Master Pack"
                />

                <span className="w-6 h-6 rounded-lg bg-slate-200 text-slate-700 flex items-center justify-center font-bold text-[11px] shrink-0">
                  {String(item.sequence).padStart(2, "0")}
                </span>

                <div className="min-w-0">
                  <div className="flex items-center gap-2 flex-wrap">
                    <strong className="text-xs font-bold text-slate-900 truncate">
                      {item.title}
                    </strong>
                    <span
                      className={`text-[9.5px] font-bold px-2 py-0.2 rounded-full uppercase tracking-wider ${
                        item.category.includes("Cover-1")
                          ? "bg-blue-100 text-blue-800"
                          : "bg-purple-100 text-purple-800"
                      }`}
                    >
                      {item.category}
                    </span>
                    <span className="text-[10px] font-mono text-slate-400 bg-slate-100 px-1.5 py-0.2 rounded">
                      {item.sourceStep}
                    </span>
                  </div>
                  <span className="text-[11px] text-slate-500 font-mono block mt-0.5 truncate">
                    {item.docFileName} · {item.pageCount} Pages
                  </span>
                </div>
              </div>

              {/* Right Controls (Move Up / Down & Actions) */}
              <div className="flex items-center gap-2 shrink-0 self-end sm:self-auto">
                <span className="text-[11px] font-bold text-emerald-800 bg-emerald-100/80 px-2 py-0.5 rounded-md flex items-center gap-1">
                  <Check size={11} /> {item.status}
                </span>

                <div className="flex items-center bg-white border border-slate-200 rounded-lg p-0.5 shadow-2xs">
                  <button
                    type="button"
                    disabled={idx === 0}
                    onClick={() => handleMove(idx, "up")}
                    className="p-1 hover:bg-slate-100 text-slate-500 hover:text-slate-900 disabled:opacity-30 cursor-pointer disabled:cursor-not-allowed"
                    title="Move Up"
                  >
                    <MoveUp size={13} />
                  </button>
                  <button
                    type="button"
                    disabled={idx === binderItems.length - 1}
                    onClick={() => handleMove(idx, "down")}
                    className="p-1 hover:bg-slate-100 text-slate-500 hover:text-slate-900 disabled:opacity-30 cursor-pointer disabled:cursor-not-allowed"
                    title="Move Down"
                  >
                    <MoveDown size={13} />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 3. DIGITAL SIGNATURE SEAL & SUBMISSION BRIDGE */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {/* Box A: DSC Cryptographic Seal Info */}
        <div className="bg-white p-5 rounded-2xl border border-slate-200/90 shadow-2xs space-y-3.5 flex flex-col justify-between">
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-xl bg-emerald-100 text-emerald-800 flex items-center justify-center font-bold">
                  <ShieldCheck size={16} />
                </div>
                <div>
                  <h4 className="text-xs font-bold text-slate-900">
                    Class-3 DSC Token Stamping
                  </h4>
                  <p className="text-[11px] text-slate-500">
                    CCA India Certified Cryptographic Signature
                  </p>
                </div>
              </div>
              <span className="text-[10.5px] font-mono font-bold bg-emerald-100 text-emerald-900 px-2 py-0.5 rounded">
                CONNECTED
              </span>
            </div>

            <div className="bg-slate-50 p-3 rounded-xl border border-slate-200 text-xs text-slate-700 space-y-1">
              <div className="flex justify-between">
                <span className="text-slate-400">Signatory:</span>
                <strong>{signatory.signatoryName}</strong>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">Designation:</span>
                <span>{signatory.signatoryTitle}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">DSC Serial:</span>
                <span className="font-mono text-emerald-800 font-bold">{signatory.dscSerial}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">Expiry Date:</span>
                <span>{signatory.dscExpiry}</span>
              </div>
            </div>
          </div>

          <button
            type="button"
            onClick={handleVerifyDsc}
            disabled={isDscVerifying}
            className="w-full py-2 bg-emerald-50 hover:bg-emerald-100 text-emerald-900 border border-emerald-300 rounded-xl text-xs font-bold transition-colors flex items-center justify-center gap-1.5 cursor-pointer disabled:opacity-50"
          >
            <RefreshCw size={13} className={isDscVerifying ? "animate-spin" : ""} />
            <span>{isDscVerifying ? "Verifying Token..." : "Re-Verify DSC Token Connection"}</span>
          </button>
        </div>

        {/* Box B: Portal Upload Separate Packs (Cover 1 & 2) */}
        <div className="bg-white p-5 rounded-2xl border border-slate-200/90 shadow-2xs space-y-3.5 flex flex-col justify-between">
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-xl bg-purple-100 text-purple-800 flex items-center justify-center font-bold">
                <FolderArchive size={16} />
              </div>
              <div>
                <h4 className="text-xs font-bold text-slate-900">
                  Two-Cover Portal Upload Packages
                </h4>
                <p className="text-[11px] text-slate-500">
                  Separate downloads for e-Procurement / GeM Portal
                </p>
              </div>
            </div>

            <div className="space-y-2 text-xs">
              <div className="p-2.5 rounded-lg bg-slate-50 border border-slate-200 flex items-center justify-between">
                <div>
                  <strong className="text-slate-900 block font-semibold">
                    Cover-1: Fee &amp; Statutory Envelope
                  </strong>
                  <span className="text-[10.5px] text-slate-500">18 Pages · Challan, MSME &amp; Vault Docs</span>
                </div>
                <button
                  type="button"
                  onClick={() => toast.success("Downloaded Cover-1_Fee_Statutory.pdf")}
                  className="px-2.5 py-1 bg-white hover:bg-slate-100 text-slate-700 border border-slate-300 rounded-lg text-xs font-bold cursor-pointer shadow-2xs"
                >
                  Download
                </button>
              </div>

              <div className="p-2.5 rounded-lg bg-slate-50 border border-slate-200 flex items-center justify-between">
                <div>
                  <strong className="text-slate-900 block font-semibold">
                    Cover-2: Technical Proposal Envelope
                  </strong>
                  <span className="text-[10.5px] text-slate-500">30 Pages · Proposal Chapters, CVs &amp; Annexures</span>
                </div>
                <button
                  type="button"
                  onClick={() => toast.success("Downloaded Cover-2_Technical_Proposal.pdf")}
                  className="px-2.5 py-1 bg-white hover:bg-slate-100 text-slate-700 border border-slate-300 rounded-lg text-xs font-bold cursor-pointer shadow-2xs"
                >
                  Download
                </button>
              </div>
            </div>
          </div>

          <button
            type="button"
            onClick={onFinish || (() => toast.success("Tender marked as fully compiled and ready for submission!"))}
            className="w-full py-2 bg-[#173C40] hover:bg-slate-800 text-white rounded-xl text-xs font-bold transition-colors flex items-center justify-center gap-1.5 cursor-pointer shadow-xs"
          >
            <CheckCircle2 size={14} className="text-emerald-400" />
            <span>Mark Tender Ready for Portal Submission</span>
          </button>
        </div>
      </div>

      {/* Master Dossier Full Preview Modal */}
      <MasterDossierPdfModal
        isOpen={isPdfModalOpen}
        onClose={() => setIsPdfModalOpen(false)}
        tender={tender}
      />
    </div>
  );
};
