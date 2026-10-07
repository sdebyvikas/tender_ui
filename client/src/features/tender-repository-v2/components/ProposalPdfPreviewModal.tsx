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
} from "lucide-react";
import { toast } from "sonner";
import { TenderV2 } from "../types";

interface ProposalPdfPreviewModalProps {
  isOpen: boolean;
  onClose: () => void;
  tender: TenderV2;
}

export const ProposalPdfPreviewModal: React.FC<ProposalPdfPreviewModalProps> = ({
  isOpen,
  onClose,
  tender,
}) => {
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [zoomLevel, setZoomLevel] = useState<number>(100);
  const totalPages = 6;

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
    toast.success("Downloading Technical Proposal Document", {
      description: `Technical_Proposal_${tender.tenderNumber.replace("/", "_")}_Master_Cover2.pdf (${tender.readinessScore}% Score)`,
    });
  };

  const handlePrint = () => {
    toast.info("Preparing High-Res A4 Print Layout...", {
      description: "Compiling 38-page Technical Response with digital DSC signatures.",
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
              <FileText size={18} />
            </div>
            <div className="min-w-0">
              <div className="flex items-center gap-2">
                <h3 className="text-sm font-bold text-slate-100 truncate">
                  Technical Proposal &amp; Compliance Submission (Cover-2)
                </h3>
                <span className="text-[10px] bg-emerald-500/20 text-emerald-300 px-2 py-0.5 rounded font-mono font-bold border border-emerald-500/30 shrink-0">
                  A4 · 38 Pages
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
                onClick={handleDownload}
                className="px-3 py-1.5 bg-emerald-600 hover:bg-emerald-500 text-white rounded-lg text-xs font-bold flex items-center gap-1.5 transition-colors cursor-pointer shadow-xs"
              >
                <Download size={13} />
                <span className="hidden sm:inline">Export PDF</span>
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

            {/* PAGE 1: COVER PAGE & LETTER OF TRANSMITTAL */}
            {currentPage === 1 && (
              <div className="space-y-8 flex-1 flex flex-col justify-between">
                <div>
                  {/* Formal Header */}
                  <div className="flex items-start justify-between border-b-2 border-emerald-900/80 pb-4">
                    <div>
                      <div className="flex items-center gap-2">
                        <div className="w-8 h-8 rounded bg-emerald-900 text-white flex items-center justify-center font-bold text-sm">
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
                    </div>
                    <div className="text-right text-[10.5px] text-slate-600">
                      <strong className="block text-slate-900 font-bold uppercase">
                        Cover-2: Technical Bid
                      </strong>
                      <span>Date: 28 Mar 2026</span>
                    </div>
                  </div>

                  {/* Document Title Block */}
                  <div className="my-10 text-center space-y-3">
                    <span className="inline-block px-3 py-1 bg-emerald-50 text-emerald-800 text-xs font-bold rounded-full uppercase tracking-wider border border-emerald-200">
                      Official Technical Proposal
                    </span>
                    <h1 className="text-2xl sm:text-3xl font-black text-slate-900 leading-tight max-w-xl mx-auto">
                      {tender.title}
                    </h1>
                    <div className="text-sm text-slate-600 font-mono">
                      RFP Reference: <span className="font-bold text-emerald-900">{tender.tenderNumber}</span>
                    </div>
                  </div>

                  {/* Submission To / By Box */}
                  <div className="grid grid-cols-2 gap-4 bg-slate-50 p-5 rounded-xl border border-slate-200 text-xs">
                    <div>
                      <span className="text-[10px] uppercase font-bold text-slate-400 block mb-1">
                        Submitted To:
                      </span>
                      <strong className="text-slate-900 block font-bold">
                        The Executive Director / Authorized Officer
                      </strong>
                      <span className="text-slate-600 block">{tender.organization}</span>
                      <span className="text-slate-500 block">{tender.location || "Jharkhand, India"}</span>
                    </div>
                    <div>
                      <span className="text-[10px] uppercase font-bold text-slate-400 block mb-1">
                        Submitted By:
                      </span>
                      <strong className="text-slate-900 block font-bold">
                        {signatory.companyName}
                      </strong>
                      <span className="text-slate-600 block">
                        Lead Bidder (Sole Entity)
                      </span>
                      <span className="text-slate-500 block">
                        Rep: {signatory.signatoryName} ({signatory.signatoryTitle})
                      </span>
                    </div>
                  </div>

                  {/* Executive Transmittal Summary */}
                  <div className="mt-8 space-y-3 text-xs leading-relaxed text-slate-700">
                    <p className="font-bold text-slate-900">
                      Dear Evaluation Committee,
                    </p>
                    <p>
                      We, <strong>{signatory.companyName}</strong>, hereby submit our complete Technical Proposal in response to RFP No. <strong>{tender.tenderNumber}</strong> for &quot;{tender.title}&quot;.
                    </p>
                    <p>
                      Our proposed solution is architected on high-availability, microservices-driven cloud infrastructure delivering 99.9% uptime, native iOS and Android mobile applications, automated athlete tournament registration, and full compliance with CERT-In safe-to-host guidelines.
                    </p>
                  </div>
                </div>

                {/* Bottom Signature Area */}
                <div className="pt-6 border-t border-slate-200 flex items-end justify-between">
                  <div className="text-[10.5px] text-slate-500">
                    <p>Verified through Class-3 DSC Token</p>
                    <p className="font-mono text-emerald-800 font-bold">
                      Serial: {signatory.dscSerial}
                    </p>
                  </div>
                  <div className="text-right text-xs">
                    <div className="w-40 border-b border-slate-400 mb-1"></div>
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

            {/* PAGE 2: TABLE OF CONTENTS & EXECUTIVE SUMMARY */}
            {currentPage === 2 && (
              <div className="space-y-6 flex-1 flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between border-b border-slate-200 pb-3 mb-6">
                    <span className="text-xs font-bold text-emerald-900 uppercase tracking-wider">
                      Technical Proposal · Section Index
                    </span>
                    <span className="text-xs font-mono text-slate-400">Page 2 / 38</span>
                  </div>

                  <h3 className="text-lg font-black text-slate-900 mb-4 flex items-center gap-2">
                    <Layers size={18} className="text-emerald-700" />
                    Table of Contents (Technical Volume)
                  </h3>

                  <div className="space-y-2.5 text-xs text-slate-800">
                    {[
                      { num: "Ch 1", title: "Letter of Transmittal & Executive Summary (Annexure 1)", page: "03" },
                      { num: "Ch 2", title: "Understanding of Scope & 19 Core Modules", page: "06" },
                      { num: "Ch 3", title: "System Architecture, Cloud Hosting & Tech Stack", page: "12" },
                      { num: "Ch 4", title: "Implementation Methodology & 150-Day Delivery Roadmap", page: "20" },
                      { num: "Ch 5", title: "Clause-by-Clause Compliance Matrix (28 Clauses)", page: "26" },
                      { num: "Ch 6", title: "Key Personnel, Resource Allocation & Signed CVs", page: "32" },
                      { num: "Ch 7", title: "Statutory Annexures (Annexure 1, 2, 3, 4)", page: "36" },
                    ].map((item, idx) => (
                      <div
                        key={idx}
                        className="flex items-center justify-between p-2 rounded-lg bg-slate-50 border border-slate-200/80 hover:bg-slate-100/80 transition-colors"
                      >
                        <div className="flex items-center gap-3">
                          <span className="font-mono font-bold text-emerald-800 w-10">
                            {item.num}
                          </span>
                          <span className="font-semibold text-slate-800">
                            {item.title}
                          </span>
                        </div>
                        <span className="font-mono text-slate-500 font-bold">
                          Page {item.page}
                        </span>
                      </div>
                    ))}
                  </div>

                  <div className="mt-8 p-4 bg-emerald-50/70 rounded-xl border border-emerald-200 text-xs space-y-2">
                    <strong className="text-emerald-900 font-bold flex items-center gap-1.5">
                      <Sparkles size={14} /> Bidder Value Proposition &amp; Highlights:
                    </strong>
                    <ul className="list-disc list-inside text-slate-700 space-y-1">
                      <li>100% compliance with zero deviation across all RFP technical criteria.</li>
                      <li>State-of-the-art React / Node / Next.js microservices stack hosted on Tier-3 MeitY empaneled cloud.</li>
                      <li>Proven track record with 5+ State Government and Sports Portal implementations.</li>
                    </ul>
                  </div>
                </div>

                <div className="text-[10px] text-slate-400 border-t border-slate-200 pt-3 flex justify-between">
                  <span>{signatory.companyName} · Technical Bid</span>
                  <span>Confidential · SAJHA RFP Response</span>
                </div>
              </div>
            )}

            {/* PAGE 3: SYSTEM ARCHITECTURE & TECH STACK */}
            {currentPage === 3 && (
              <div className="space-y-6 flex-1 flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between border-b border-slate-200 pb-3 mb-6">
                    <span className="text-xs font-bold text-emerald-900 uppercase tracking-wider">
                      Chapter 3 · System Architecture
                    </span>
                    <span className="text-xs font-mono text-slate-400">Page 12 / 38</span>
                  </div>

                  <h3 className="text-lg font-black text-slate-900 mb-2">
                    Cloud-Native Microservices Architecture
                  </h3>
                  <p className="text-xs text-slate-600 mb-4 leading-relaxed">
                    Designed for 100,000+ peak concurrent users during tournament registrations, with automated horizontal auto-scaling and multi-zone failover redundancy.
                  </p>

                  {/* Architecture Diagram Simulation */}
                  <div className="p-4 bg-slate-900 text-white rounded-xl space-y-3 text-xs font-mono">
                    <div className="text-center text-emerald-400 font-bold border-b border-slate-800 pb-2">
                      [ CLIENT LAYER: Web Portal / iOS App / Android App / Admin Portal ]
                    </div>
                    <div className="text-center text-sky-400">
                      ⬇ Cloudflare WAF + DDoS Protection &amp; SSL Termination
                    </div>
                    <div className="p-2.5 bg-slate-800/80 rounded border border-slate-700 text-center text-amber-300">
                      API Gateway (OAuth2.0 / JWT Auth &amp; Rate Limiting)
                    </div>
                    <div className="grid grid-cols-3 gap-2 text-center text-[10.5px]">
                      <div className="p-2 bg-slate-800 rounded border border-slate-700">
                        Athlete Service (CRUD)
                      </div>
                      <div className="p-2 bg-slate-800 rounded border border-slate-700">
                        Tournament &amp; Scoring
                      </div>
                      <div className="p-2 bg-slate-800 rounded border border-slate-700">
                        Payment &amp; Certificates
                      </div>
                    </div>
                    <div className="text-center text-emerald-400 border-t border-slate-800 pt-2 text-[10.5px]">
                      [ DATA LAYER: PostgreSQL Managed Cluster + Redis Cache + S3 Vault ]
                    </div>
                  </div>

                  {/* Stack Specs Table */}
                  <div className="mt-5">
                    <table className="w-full text-left text-xs border border-slate-200 rounded-lg overflow-hidden">
                      <thead className="bg-slate-100 text-slate-700 font-bold">
                        <tr>
                          <th className="p-2 border-b">Component</th>
                          <th className="p-2 border-b">Technology Selected</th>
                          <th className="p-2 border-b">Standard Compliance</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-slate-100 text-slate-700">
                        <tr>
                          <td className="p-2 font-medium">Frontend Framework</td>
                          <td className="p-2">Next.js 15 (React 19) + TailwindCSS</td>
                          <td className="p-2 text-emerald-700 font-bold">WCAG 2.1 AA (GIGW 3.0)</td>
                        </tr>
                        <tr>
                          <td className="p-2 font-medium">Mobile Application</td>
                          <td className="p-2">Flutter Cross-Platform (iOS &amp; Android)</td>
                          <td className="p-2 text-emerald-700 font-bold">Native 60 FPS Performance</td>
                        </tr>
                        <tr>
                          <td className="p-2 font-medium">Cloud Infrastructure</td>
                          <td className="p-2">NIC Cloud / AWS India (MeitY Empaneled)</td>
                          <td className="p-2 text-emerald-700 font-bold">ISO 27001 &amp; Tier-3 DC</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>

                <div className="text-[10px] text-slate-400 border-t border-slate-200 pt-3 flex justify-between">
                  <span>{signatory.companyName} · Technical Architecture</span>
                  <span>Confidential · SAJHA RFP Response</span>
                </div>
              </div>
            )}

            {/* PAGE 4: CLAUSE-BY-CLAUSE COMPLIANCE MATRIX SUMMARY */}
            {currentPage === 4 && (
              <div className="space-y-6 flex-1 flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between border-b border-slate-200 pb-3 mb-6">
                    <span className="text-xs font-bold text-emerald-900 uppercase tracking-wider">
                      Chapter 5 · Compliance Matrix
                    </span>
                    <span className="text-xs font-mono text-slate-400">Page 26 / 38</span>
                  </div>

                  <div className="flex items-center justify-between mb-3">
                    <h3 className="text-lg font-black text-slate-900">
                      RFP Clause-by-Clause Compliance Statement
                    </h3>
                    <span className="text-xs font-bold text-emerald-800 bg-emerald-100 px-2.5 py-1 rounded-full flex items-center gap-1">
                      <CheckCircle2 size={13} /> 28/28 Complied (100%)
                    </span>
                  </div>

                  <table className="w-full text-left text-xs border border-slate-200 rounded-lg overflow-hidden">
                    <thead className="bg-slate-100 text-slate-700 font-bold">
                      <tr>
                        <th className="p-2 border-b w-16">Clause</th>
                        <th className="p-2 border-b">RFP Requirement</th>
                        <th className="p-2 border-b w-24">Status</th>
                        <th className="p-2 border-b">Bidder Proposal Justification</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100 text-slate-700 text-[11px]">
                      <tr>
                        <td className="p-2 font-mono font-bold text-slate-900">TC-01</td>
                        <td className="p-2 font-medium">Athlete Registration &amp; Aadhaar/DigiLocker KYC</td>
                        <td className="p-2 text-emerald-700 font-bold">COMPLIED</td>
                        <td className="p-2">Integrated with MeriPehchan &amp; DigiLocker sandbox with OTP KYC.</td>
                      </tr>
                      <tr>
                        <td className="p-2 font-mono font-bold text-slate-900">TC-02</td>
                        <td className="p-2 font-medium">Live Tournament Scoring &amp; Leaderboards</td>
                        <td className="p-2 text-emerald-700 font-bold">COMPLIED</td>
                        <td className="p-2">WebSockets sub-second score dissemination with offline sync.</td>
                      </tr>
                      <tr>
                        <td className="p-2 font-mono font-bold text-slate-900">TC-03</td>
                        <td className="p-2 font-medium">CERT-In Security Audit &amp; Safe-to-Host</td>
                        <td className="p-2 text-emerald-700 font-bold">COMPLIED</td>
                        <td className="p-2">Empaneled CERT-In auditor included in Phase 3 deployment milestone.</td>
                      </tr>
                      <tr>
                        <td className="p-2 font-mono font-bold text-slate-900">TC-04</td>
                        <td className="p-2 font-medium">Payment Gateway for Registration Fees</td>
                        <td className="p-2 text-emerald-700 font-bold">COMPLIED</td>
                        <td className="p-2">Multi-bank gateway (SBI ePay, Razorpay, Billdesk) with auto reconciliation.</td>
                      </tr>
                    </tbody>
                  </table>

                  <div className="mt-6 p-3 bg-slate-50 border border-slate-200 rounded-lg text-xs text-slate-600">
                    <strong>Statutory Note:</strong> Bidder confirms unconditional compliance with all RFP terms without any commercial or technical deviations.
                  </div>
                </div>

                <div className="text-[10px] text-slate-400 border-t border-slate-200 pt-3 flex justify-between">
                  <span>{signatory.companyName} · Technical Compliance</span>
                  <span>Confidential · SAJHA RFP Response</span>
                </div>
              </div>
            )}

            {/* PAGE 5: TEAM & KEY PERSONNEL CVs */}
            {currentPage === 5 && (
              <div className="space-y-6 flex-1 flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between border-b border-slate-200 pb-3 mb-6">
                    <span className="text-xs font-bold text-emerald-900 uppercase tracking-wider">
                      Chapter 6 · Resource Team (RFP Page 20 Marking)
                    </span>
                    <span className="text-xs font-mono text-slate-400">Page 32 / 38</span>
                  </div>

                  <h3 className="text-lg font-black text-slate-900 mb-3">
                    Project Key Personnel &amp; Qualification Scoring (20 / 20 Marks)
                  </h3>

                  <div className="grid grid-cols-2 gap-3 mb-6 text-xs">
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
                    <div className="p-3 bg-slate-50 rounded-xl border border-slate-200">
                      <strong className="block text-slate-900 font-bold">Siddharth Verma</strong>
                      <span className="text-emerald-800 font-semibold block text-[11px]">Sports Digitization SME (5 Marks)</span>
                      <span className="text-slate-500 block text-[10.5px]">12+ Years Exp · Certified Scrum Product Owner</span>
                    </div>
                    <div className="p-3 bg-slate-50 rounded-xl border border-slate-200">
                      <strong className="block text-slate-900 font-bold">Neha Kapoor</strong>
                      <span className="text-emerald-800 font-semibold block text-[11px]">Principal Cybersecurity Lead</span>
                      <span className="text-slate-500 block text-[10.5px]">11+ Years Exp · CISSP, CISA Certified</span>
                    </div>
                  </div>
                </div>

                <div className="text-[10px] text-slate-400 border-t border-slate-200 pt-3 flex justify-between">
                  <span>{signatory.companyName} · Technical Resources</span>
                  <span>Confidential · SAJHA RFP Response</span>
                </div>
              </div>
            )}

            {/* PAGE 6: STATUTORY ANNEXURES & DSC SIGNATURE SEAL */}
            {currentPage === 6 && (
              <div className="space-y-6 flex-1 flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between border-b border-slate-200 pb-3 mb-4">
                    <span className="text-xs font-bold text-emerald-900 uppercase tracking-wider">
                      Chapter 7 · Statutory Annexures (Pages 27-44)
                    </span>
                    <span className="text-xs font-mono text-slate-400">Page 38 / 38</span>
                  </div>

                  <h3 className="text-lg font-black text-slate-900 mb-3 flex items-center gap-2">
                    <ScrollText size={18} className="text-emerald-700" />
                    Mandatory Legal Declarations &amp; Digital Seal
                  </h3>

                  <div className="grid grid-cols-2 gap-2.5 mb-4 text-xs">
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
                  <span>{signatory.companyName} · Technical Bid Sealed</span>
                  <span>End of Technical Volume · Page 38 / 38</span>
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
