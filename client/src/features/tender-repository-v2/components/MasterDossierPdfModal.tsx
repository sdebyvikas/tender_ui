import React, { useState } from "react";
import { createPortal } from "react-dom";
import {
  X,
  Download,
  Printer,
  CheckCircle2,
  FileText,
  Building2,
  ShieldCheck,
  ChevronLeft,
  ChevronRight,
  ZoomIn,
  ZoomOut,
  Maximize2,
  Layers,
  Sparkles,
  Award,
  Cpu,
  UserCheck,
  ScrollText,
  FolderArchive,
  CreditCard,
  FileCheck2,
} from "lucide-react";
import { toast } from "sonner";
import { TenderV2 } from "../types";

interface MasterDossierPdfModalProps {
  isOpen: boolean;
  onClose: () => void;
  tender: TenderV2;
}

export const MasterDossierPdfModal: React.FC<MasterDossierPdfModalProps> = ({
  isOpen,
  onClose,
  tender,
}) => {
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [zoomLevel, setZoomLevel] = useState<number>(100);
  const totalPages = 7;

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

  const handleDownloadMaster = () => {
    toast.success("Downloading Master Tender Dossier PDF", {
      description: `Master_Bid_Package_${tender.tenderNumber.replace("/", "_")}_Compiled.pdf (48 Pages · 14.2 MB)`,
    });
  };

  const handlePrint = () => {
    toast.info("Preparing High-Res A4 Print Layout...", {
      description: "Compiling 48-page Master Bid Package with Class-3 DSC stamps.",
    });
  };

  return createPortal(
    <div
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
      className="fixed inset-0 z-50 bg-slate-900/80 backdrop-blur-xs flex items-center justify-center p-3 sm:p-5 animate-in fade-in duration-200"
    >
      <div className="bg-slate-900 text-white w-full max-w-5xl h-[92vh] rounded-2xl shadow-2xl flex flex-col border border-slate-700/80 overflow-hidden">
        {/* Top Dark Bar / PDF Controls */}
        <div className="px-5 py-3.5 bg-slate-950 border-b border-slate-800 flex items-center justify-between gap-3 shrink-0">
          <div className="flex items-center gap-3 min-w-0">
            <div className="w-8 h-8 rounded-lg bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 flex items-center justify-center shrink-0">
              <FolderArchive size={18} />
            </div>
            <div className="min-w-0">
              <div className="flex items-center gap-2">
                <h3 className="text-sm font-bold text-slate-100 truncate">
                  Master Bid Dossier &amp; Compiled Package
                </h3>
                <span className="text-[10px] bg-emerald-500/20 text-emerald-300 px-2 py-0.5 rounded font-mono font-bold border border-emerald-500/30 shrink-0">
                  48 Pages · 10 Documents Merged
                </span>
              </div>
              <p className="text-[11px] text-slate-400 truncate">
                RFP: {tender.tenderNumber} · {tender.organization}
              </p>
            </div>
          </div>

          {/* Zoom & Page Navigation */}
          <div className="flex items-center gap-3">
            <div className="hidden md:flex items-center gap-1.5 bg-slate-800/90 px-2.5 py-1 rounded-lg border border-slate-700 text-xs">
              <button
                type="button"
                onClick={() => setZoomLevel((prev) => Math.max(80, prev - 10))}
                className="p-1 hover:text-white text-slate-400 cursor-pointer"
                title="Zoom Out"
              >
                <ZoomOut size={13} />
              </button>
              <span className="font-mono text-[11px] font-bold text-slate-300 w-10 text-center">
                {zoomLevel}%
              </span>
              <button
                type="button"
                onClick={() => setZoomLevel((prev) => Math.min(130, prev + 10))}
                className="p-1 hover:text-white text-slate-400 cursor-pointer"
                title="Zoom In"
              >
                <ZoomIn size={13} />
              </button>
            </div>

            <div className="flex items-center gap-1 bg-slate-800/90 px-2 py-1 rounded-lg border border-slate-700 text-xs">
              <button
                type="button"
                disabled={currentPage === 1}
                onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                className="p-1 text-slate-300 hover:text-white disabled:text-slate-600 cursor-pointer disabled:cursor-not-allowed"
              >
                <ChevronLeft size={14} />
              </button>
              <span className="text-[11px] font-mono px-1 font-bold text-slate-200">
                Page {currentPage} of {totalPages}
              </span>
              <button
                type="button"
                disabled={currentPage === totalPages}
                onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
                className="p-1 text-slate-300 hover:text-white disabled:text-slate-600 cursor-pointer disabled:cursor-not-allowed"
              >
                <ChevronRight size={14} />
              </button>
            </div>

            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={handleDownloadMaster}
                className="px-3 py-1.5 bg-emerald-600 hover:bg-emerald-500 text-white rounded-lg text-xs font-bold flex items-center gap-1.5 transition-colors cursor-pointer shadow-xs"
              >
                <Download size={13} />
                <span className="hidden sm:inline">Export Master PDF</span>
              </button>
              <button
                type="button"
                onClick={handlePrint}
                className="p-1.5 bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white rounded-lg border border-slate-700 cursor-pointer"
                title="Print Preview"
              >
                <Printer size={15} />
              </button>
              <button
                type="button"
                onClick={onClose}
                className="p-1.5 bg-slate-800 hover:bg-rose-900/40 text-slate-400 hover:text-rose-300 rounded-lg border border-slate-700 cursor-pointer transition-colors"
                title="Close"
              >
                <X size={15} />
              </button>
            </div>
          </div>
        </div>

        {/* PDF Body Canvas Container */}
        <div className="flex-1 bg-slate-900/90 overflow-y-auto p-4 sm:p-8 flex justify-center custom-scrollbar">
          {/* Simulated A4 Page Container */}
          <div
            style={{ transform: `scale(${zoomLevel / 100})`, transformOrigin: "top center" }}
            className="w-full max-w-[780px] bg-white text-slate-900 shadow-2xl rounded-sm p-8 sm:p-12 min-h-[1050px] flex flex-col justify-between border border-slate-300 transition-transform duration-150 relative select-text"
          >
            {/* Watermark */}
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-[0.03] select-none">
              <span className="text-8xl font-black rotate-[-35deg] tracking-widest text-slate-900 uppercase">
                {tender.organization.slice(0, 15)}
              </span>
            </div>

            {/* PAGE 1: MASTER BID COVER PAGE */}
            {currentPage === 1 && (
              <div className="space-y-8 flex-1 flex flex-col justify-between">
                <div>
                  {/* Formal Header */}
                  <div className="flex items-start justify-between border-b-2 border-emerald-900/80 pb-4">
                    <div className="flex items-center gap-2">
                      <div className="w-9 h-9 rounded-lg bg-emerald-900 text-white flex items-center justify-center font-bold text-sm">
                        TS
                      </div>
                      <div>
                        <h2 className="text-base font-extrabold text-slate-900 uppercase tracking-tight">
                          {signatory.companyName}
                        </h2>
                        <p className="text-[10px] text-slate-500 font-medium">
                          CIN: {signatory.cin} · GSTIN: {signatory.gstin}
                        </p>
                      </div>
                    </div>
                    <div className="text-right text-[10.5px] text-slate-600">
                      <strong className="block text-slate-900 font-bold uppercase">
                        Master Bid Dossier (Cover 1 &amp; 2)
                      </strong>
                      <span>Date: 28 Mar 2026</span>
                    </div>
                  </div>

                  {/* Title Block */}
                  <div className="my-12 text-center space-y-3">
                    <span className="inline-block px-3 py-1 bg-emerald-100 text-emerald-900 text-xs font-bold rounded-full uppercase tracking-wider border border-emerald-200">
                      Comprehensive Bid Submission Package
                    </span>
                    <h1 className="text-2xl sm:text-3xl font-black text-slate-900 leading-tight max-w-xl mx-auto">
                      {tender.title}
                    </h1>
                    <div className="text-sm text-slate-600 font-mono">
                      RFP No: <span className="font-bold text-emerald-900">{tender.tenderNumber}</span>
                    </div>
                  </div>

                  {/* Authority & Bidder Box */}
                  <div className="grid grid-cols-2 gap-4 bg-slate-50 p-5 rounded-xl border border-slate-200 text-xs">
                    <div>
                      <span className="text-[10px] uppercase font-bold text-slate-400 block mb-1">
                        Procuring Entity / Authority:
                      </span>
                      <strong className="text-slate-900 block font-bold">
                        {tender.organization}
                      </strong>
                      <span className="text-slate-600 block">{tender.department || "Sports & Youth Affairs"}</span>
                      <span className="text-slate-500 block">{tender.location || "Ranchi, Jharkhand"}</span>
                    </div>
                    <div>
                      <span className="text-[10px] uppercase font-bold text-slate-400 block mb-1">
                        Bidding Enterprise:
                      </span>
                      <strong className="text-slate-900 block font-bold">
                        {signatory.companyName}
                      </strong>
                      <span className="text-slate-600 block">Lead Sole Bidder</span>
                      <span className="text-slate-500 block">
                        Signatory: {signatory.signatoryName} ({signatory.signatoryTitle})
                      </span>
                    </div>
                  </div>
                </div>

                {/* Bottom Seal */}
                <div className="pt-6 border-t border-slate-200 flex items-end justify-between">
                  <div className="text-[10.5px] text-slate-500">
                    <p>Digitally Signed &amp; Compiled under IT Act 2000</p>
                    <p className="font-mono text-emerald-800 font-bold">
                      DSC Serial: {signatory.dscSerial}
                    </p>
                  </div>
                  <div className="text-right text-xs">
                    <strong className="block text-slate-900 font-bold">
                      {signatory.signatoryName}
                    </strong>
                    <span className="text-[11px] text-slate-600">
                      Authorized Signatory &amp; Director
                    </span>
                  </div>
                </div>
              </div>
            )}

            {/* PAGE 2: MASTER TABLE OF CONTENTS */}
            {currentPage === 2 && (
              <div className="space-y-6 flex-1 flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between border-b border-slate-200 pb-3 mb-6">
                    <span className="text-xs font-bold text-emerald-900 uppercase tracking-wider">
                      Master Bid Pack · Complete Index
                    </span>
                    <span className="text-xs font-mono text-slate-400">Page 2 / 48</span>
                  </div>

                  <h3 className="text-lg font-black text-slate-900 mb-4 flex items-center gap-2">
                    <Layers size={18} className="text-emerald-700" />
                    Master Table of Contents (Sequential Order)
                  </h3>

                  <div className="space-y-2 text-xs text-slate-800">
                    {[
                      { section: "Vol 1", title: "Master Bid Cover Page & Power of Attorney", pages: "Pages 1 - 3" },
                      { section: "Vol 1", title: "Annexure-1: Technical Bid Covering Letter", pages: "Pages 4 - 5" },
                      { section: "Vol 1", title: "Cover-1: Tender Processing Fee Receipt & EMD Exemption", pages: "Pages 6 - 8" },
                      { section: "Vol 1", title: "Statutory Legal Vault (GST, CIN, CA Turnover, ISO)", pages: "Pages 9 - 18" },
                      { section: "Vol 2", title: "Cover-2: Technical Proposal (Chapters 1 to 5)", pages: "Pages 19 - 34" },
                      { section: "Vol 2", title: "Clause-by-Clause Compliance Matrix (28 Clauses)", pages: "Pages 35 - 38" },
                      { section: "Vol 2", title: "Key Personnel & Signed Resumes (CTO, Head, SME)", pages: "Pages 39 - 44" },
                      { section: "Vol 2", title: "Annexure-2 (Non-Blacklisting) & Annexure-4 (MSME)", pages: "Pages 45 - 48" },
                    ].map((item, idx) => (
                      <div
                        key={idx}
                        className="flex items-center justify-between p-2.5 rounded-lg bg-slate-50 border border-slate-200/80 hover:bg-slate-100/80 transition-colors"
                      >
                        <div className="flex items-center gap-3">
                          <span className="font-mono font-bold text-emerald-800 text-[10.5px] bg-emerald-100/80 px-2 py-0.5 rounded">
                            {item.section}
                          </span>
                          <span className="font-semibold text-slate-800">
                            {item.title}
                          </span>
                        </div>
                        <span className="font-mono text-slate-500 font-bold">
                          {item.pages}
                        </span>
                      </div>
                    ))}
                  </div>

                  <div className="mt-6 p-3.5 bg-emerald-50/70 rounded-xl border border-emerald-200 text-xs flex items-center justify-between">
                    <span className="font-bold text-emerald-900">
                      ✓ Total Merged Pages: 48 Pages · Sealed with Class-3 DSC Token
                    </span>
                    <span className="font-mono text-emerald-800 text-[11px] font-bold">
                      100% Compliant
                    </span>
                  </div>
                </div>

                <div className="text-[10px] text-slate-400 border-t border-slate-200 pt-3 flex justify-between">
                  <span>{signatory.companyName} · Master Dossier</span>
                  <span>Confidential · SAJHA/69 Submission</span>
                </div>
              </div>
            )}

            {/* PAGE 3: COVER-1 STATUTORY & PAYMENT SLIPS */}
            {currentPage === 3 && (
              <div className="space-y-6 flex-1 flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between border-b border-slate-200 pb-3 mb-6">
                    <span className="text-xs font-bold text-emerald-900 uppercase tracking-wider">
                      Volume 1 · Cover-1 Statutory &amp; Fee Envelopes
                    </span>
                    <span className="text-xs font-mono text-slate-400">Page 6 / 48</span>
                  </div>

                  <h3 className="text-lg font-black text-slate-900 mb-3 flex items-center gap-2">
                    <CreditCard size={18} className="text-emerald-700" />
                    Cover-1 Statutory Fee &amp; EMD Security Receipts
                  </h3>

                  <div className="grid grid-cols-2 gap-4 my-4 text-xs">
                    <div className="p-4 bg-slate-50 rounded-xl border border-slate-200 space-y-2">
                      <strong className="text-slate-900 block font-bold">Tender Fee Payment Challan</strong>
                      <p className="text-slate-600 text-[11px]">UTR: SBIN20260310928371</p>
                      <p className="text-slate-600 text-[11px]">Amount: ₹5,900.00 (incl. GST)</p>
                      <span className="inline-block px-2 py-0.5 rounded bg-emerald-100 text-emerald-900 font-bold text-[10px]">
                        ✓ Paid &amp; Verified
                      </span>
                    </div>

                    <div className="p-4 bg-slate-50 rounded-xl border border-slate-200 space-y-2">
                      <strong className="text-slate-900 block font-bold">EMD Bid Security Exemption</strong>
                      <p className="text-slate-600 text-[11px]">Udyam: {signatory.udyamRegistration}</p>
                      <p className="text-slate-600 text-[11px]">Rule: 170 of GFR 2017 (MSE Waiver)</p>
                      <span className="inline-block px-2 py-0.5 rounded bg-emerald-100 text-emerald-900 font-bold text-[10px]">
                        ✓ 100% Exempt (₹0 Paid)
                      </span>
                    </div>
                  </div>

                  <div className="p-4 bg-slate-50 rounded-xl border border-slate-200 text-xs space-y-2">
                    <strong className="text-slate-900 font-bold block">Company Legal Credentials Mapped:</strong>
                    <div className="grid grid-cols-2 gap-2 text-[11px] text-slate-700">
                      <div>PAN: <strong>{signatory.pan}</strong></div>
                      <div>GSTIN: <strong>{signatory.gstin}</strong></div>
                      <div>ISO 27001: <strong>Certified (Valid 2027)</strong></div>
                      <div>CMMI Level 3: <strong>Appraised (DEV/SVC)</strong></div>
                    </div>
                  </div>
                </div>

                <div className="text-[10px] text-slate-400 border-t border-slate-200 pt-3 flex justify-between">
                  <span>{signatory.companyName} · Cover-1 Receipts</span>
                  <span>Confidential · SAJHA/69 Submission</span>
                </div>
              </div>
            )}

            {/* PAGE 4: TECHNICAL PROPOSAL SUMMARY */}
            {currentPage === 4 && (
              <div className="space-y-6 flex-1 flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between border-b border-slate-200 pb-3 mb-6">
                    <span className="text-xs font-bold text-emerald-900 uppercase tracking-wider">
                      Volume 2 · Cover-2 Technical Proposal
                    </span>
                    <span className="text-xs font-mono text-slate-400">Page 19 / 48</span>
                  </div>

                  <h3 className="text-lg font-black text-slate-900 mb-2">
                    Executive Scope &amp; Cloud-Native Architecture
                  </h3>
                  <p className="text-xs text-slate-600 mb-4 leading-relaxed">
                    Designed for 100,000+ peak concurrent users with Next.js 15, Node.js microservices, Flutter cross-platform mobile apps, and Tier-3 MeitY / State Data Centre (SDC) hosting.
                  </p>

                  <div className="p-4 bg-slate-900 text-white rounded-xl space-y-2 text-xs font-mono">
                    <div className="text-center text-emerald-400 font-bold pb-1 border-b border-slate-800">
                      [ CLIENT LAYER: SAJHA Web Portal / iOS App / Android App / Admin Portal ]
                    </div>
                    <div className="text-center text-sky-400 text-[11px]">
                      ⬇ Cloudflare WAF + DDoS Protection &amp; SSL Termination
                    </div>
                    <div className="p-2 bg-slate-800 rounded text-center text-amber-300 text-[11px]">
                      API Gateway (OAuth2.0 / JWT Auth &amp; Rate Limiting)
                    </div>
                    <div className="grid grid-cols-3 gap-1.5 text-center text-[10px]">
                      <div className="p-1.5 bg-slate-800 rounded">Athlete Service</div>
                      <div className="p-1.5 bg-slate-800 rounded">Tournaments &amp; Scoring</div>
                      <div className="p-1.5 bg-slate-800 rounded">Payment Gateway</div>
                    </div>
                  </div>
                </div>

                <div className="text-[10px] text-slate-400 border-t border-slate-200 pt-3 flex justify-between">
                  <span>{signatory.companyName} · Technical Proposal</span>
                  <span>Confidential · SAJHA/69 Submission</span>
                </div>
              </div>
            )}

            {/* PAGE 5: COMPLIANCE MATRIX SUMMARY */}
            {currentPage === 5 && (
              <div className="space-y-6 flex-1 flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between border-b border-slate-200 pb-3 mb-6">
                    <span className="text-xs font-bold text-emerald-900 uppercase tracking-wider">
                      Volume 2 · Compliance Matrix Statement
                    </span>
                    <span className="text-xs font-mono text-slate-400">Page 35 / 48</span>
                  </div>

                  <div className="flex items-center justify-between mb-3">
                    <h3 className="text-lg font-black text-slate-900">
                      Clause-by-Clause Compliance Matrix (28 Clauses)
                    </h3>
                    <span className="text-xs font-bold text-emerald-800 bg-emerald-100 px-2.5 py-1 rounded-full flex items-center gap-1">
                      <CheckCircle2 size={13} /> 28/28 Complied (100%)
                    </span>
                  </div>

                  <table className="w-full text-left text-xs border border-slate-200 rounded-lg overflow-hidden">
                    <thead className="bg-slate-100 text-slate-700 font-bold text-[11px]">
                      <tr>
                        <th className="p-2 border-b w-16">Clause</th>
                        <th className="p-2 border-b">RFP Requirement</th>
                        <th className="p-2 border-b w-24 text-center">Status</th>
                        <th className="p-2 border-b">Proposed Justification</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100 text-slate-700 text-[10.5px]">
                      <tr>
                        <td className="p-2 font-mono font-bold text-slate-900">TC-01</td>
                        <td className="p-2">Online Athlete Registration Portal with Aadhaar KYC</td>
                        <td className="p-2 text-center text-emerald-700 font-bold">COMPLIED</td>
                        <td className="p-2">Integrated with DigiLocker sandbox with OTP e-KYC.</td>
                      </tr>
                      <tr>
                        <td className="p-2 font-mono font-bold text-slate-900">TC-02</td>
                        <td className="p-2">Live Tournament Scoring Engine &amp; Leaderboards</td>
                        <td className="p-2 text-center text-emerald-700 font-bold">EXCEEDED</td>
                        <td className="p-2">Sub-second WebSockets sync for 50k concurrent users.</td>
                      </tr>
                      <tr>
                        <td className="p-2 font-mono font-bold text-slate-900">TC-03</td>
                        <td className="p-2">CERT-In Security Audit &amp; Safe-to-Host Clearance</td>
                        <td className="p-2 text-center text-emerald-700 font-bold">COMPLIED</td>
                        <td className="p-2">Empaneled auditor included in Phase 3 timeline.</td>
                      </tr>
                    </tbody>
                  </table>
                </div>

                <div className="text-[10px] text-slate-400 border-t border-slate-200 pt-3 flex justify-between">
                  <span>{signatory.companyName} · Compliance Statement</span>
                  <span>Confidential · SAJHA/69 Submission</span>
                </div>
              </div>
            )}

            {/* PAGE 6: PROJECT TEAM CVS */}
            {currentPage === 6 && (
              <div className="space-y-6 flex-1 flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between border-b border-slate-200 pb-3 mb-6">
                    <span className="text-xs font-bold text-emerald-900 uppercase tracking-wider">
                      Volume 2 · Key Personnel (RFP Page 20 Marking)
                    </span>
                    <span className="text-xs font-mono text-slate-400">Page 39 / 48</span>
                  </div>

                  <h3 className="text-lg font-black text-slate-900 mb-3">
                    Project Key Personnel &amp; Qualification Scoring (20 / 20 Marks)
                  </h3>

                  <div className="grid grid-cols-2 gap-3 mb-4 text-xs">
                    <div className="p-3 bg-slate-50 rounded-xl border border-slate-200">
                      <strong className="block text-slate-900 font-bold">Vikas Kumar</strong>
                      <span className="text-emerald-800 font-semibold block text-[11px]">Project Head (10 Marks)</span>
                      <span className="text-slate-500 block text-[10.5px]">15+ Years Exp · B.Tech, PMP Certified</span>
                    </div>
                    <div className="p-3 bg-slate-50 rounded-xl border border-slate-200">
                      <strong className="block text-slate-900 font-bold">Arindam Roy</strong>
                      <span className="text-emerald-800 font-semibold block text-[11px]">Chief Technology Officer (5 Marks)</span>
                      <span className="text-slate-500 block text-[10.5px]">16+ Years Exp · AWS Solutions Architect Pro</span>
                    </div>
                  </div>
                </div>

                <div className="text-[10px] text-slate-400 border-t border-slate-200 pt-3 flex justify-between">
                  <span>{signatory.companyName} · Key Personnel</span>
                  <span>Confidential · SAJHA/69 Submission</span>
                </div>
              </div>
            )}

            {/* PAGE 7: STATUTORY ANNEXURES & DSC DIGITAL SEAL */}
            {currentPage === 7 && (
              <div className="space-y-6 flex-1 flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between border-b border-slate-200 pb-3 mb-4">
                    <span className="text-xs font-bold text-emerald-900 uppercase tracking-wider">
                      Volume 2 · Final Statutory Annexures &amp; Seal
                    </span>
                    <span className="text-xs font-mono text-slate-400">Page 48 / 48</span>
                  </div>

                  <h3 className="text-lg font-black text-slate-900 mb-3 flex items-center gap-2">
                    <ScrollText size={18} className="text-emerald-700" />
                    Mandatory Legal Declarations &amp; Digital Seal
                  </h3>

                  <div className="grid grid-cols-2 gap-2 mb-4 text-xs">
                    <div className="p-2.5 bg-slate-50 rounded-lg border border-slate-200">
                      <span className="font-bold text-slate-900 block text-[11px]">Annexure - 1</span>
                      <span className="text-slate-600 block text-[10.5px]">Technical Bid Covering Letter (Attached)</span>
                    </div>
                    <div className="p-2.5 bg-slate-50 rounded-lg border border-slate-200">
                      <span className="font-bold text-slate-900 block text-[11px]">Annexure - 2</span>
                      <span className="text-slate-600 block text-[10.5px]">Non-Blacklisting Declaration (Notarized)</span>
                    </div>
                    <div className="p-2.5 bg-slate-50 rounded-lg border border-slate-200">
                      <span className="font-bold text-slate-900 block text-[11px]">Annexure - 3</span>
                      <span className="text-slate-600 block text-[10.5px]">Power of Attorney (₹100 Stamp Paper)</span>
                    </div>
                    <div className="p-2.5 bg-slate-50 rounded-lg border border-slate-200">
                      <span className="font-bold text-slate-900 block text-[11px]">Annexure - 4</span>
                      <span className="text-slate-600 block text-[10.5px]">MSE &amp; Startup Exemption Certificate</span>
                    </div>
                  </div>

                  {/* Digital Signature Official Box */}
                  <div className="p-4 bg-emerald-50/50 rounded-2xl border-2 border-dashed border-emerald-300 space-y-2.5">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <div className="w-8 h-8 rounded-full bg-emerald-600 text-white flex items-center justify-center font-bold">
                          <ShieldCheck size={18} />
                        </div>
                        <div>
                          <strong className="text-xs font-bold text-slate-900 block">
                            Digitally Signed with Class-3 DSC Token
                          </strong>
                          <span className="text-[10.5px] text-emerald-800">
                            CCA India Certified · e-Mudhra Cryptographic Token
                          </span>
                        </div>
                      </div>
                      <span className="text-[10.5px] font-mono font-bold bg-emerald-100 text-emerald-900 px-2 py-0.5 rounded">
                        VALID SEAL
                      </span>
                    </div>

                    <div className="grid grid-cols-2 gap-2 text-[10.5px] text-slate-700 bg-white p-2.5 rounded-xl border border-emerald-100">
                      <div>
                        <span className="text-slate-400 block text-[10px]">Signatory:</span>
                        <strong>{signatory.signatoryName}</strong>
                      </div>
                      <div>
                        <span className="text-slate-400 block text-[10px]">DSC Serial:</span>
                        <strong className="font-mono text-emerald-800">{signatory.dscSerial}</strong>
                      </div>
                      <div>
                        <span className="text-slate-400 block text-[10px]">Issuer:</span>
                        <span>e-Mudhra CA Sub-CA 2024</span>
                      </div>
                      <div>
                        <span className="text-slate-400 block text-[10px]">Timestamp:</span>
                        <span>28-03-2026 14:32:10 IST</span>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="text-[10px] text-slate-400 border-t border-slate-200 pt-3 flex justify-between">
                  <span>{signatory.companyName} · Master Bid Dossier Sealed</span>
                  <span>End of Master Volume · Page 48 / 48</span>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>,
    document.body
  );
};
