import React, { useState } from "react";
import {
  PenLine,
  Sparkles,
  Layers,
  FileCheck2,
  CheckCircle2,
  Cpu,
  ArrowRight,
  Eye,
  Download,
  BookOpen,
  FileSpreadsheet,
  Users2,
  CalendarDays,
  ShieldCheck,
  RefreshCw,
  Search,
  Filter,
  Check,
  Award,
  ChevronRight,
  Briefcase,
  GraduationCap,
  FileBadge2,
  Clock,
  Send,
  Wand2,
  AlertCircle,
  ExternalLink,
  Save,
  SlidersHorizontal,
  Code2,
  Database,
  Cloud,
  FileText,
  Printer,
  ScrollText,
} from "lucide-react";
import { toast } from "sonner";
import { TenderV2 } from "../../types";
import { ProposalPdfPreviewModal } from "../ProposalPdfPreviewModal";

interface ProposalDeskTabV2Props {
  tender: TenderV2;
  onNextTab?: () => void;
}

type SubTabKey = "chapters" | "compliance" | "team" | "annexures" | "milestones";

interface ProposalChapter {
  id: string;
  chapterNumber: string;
  title: string;
  subtitle: string;
  wordCount: number;
  estimatedPages: number;
  status: "AI Generated" | "Reviewed" | "Needs Refinement";
  qualityScore: number;
  content: string;
  highlights: string[];
}

interface ComplianceClause {
  id: string;
  clauseNumber: string;
  category: "Functional" | "Architecture" | "Security" | "Hosting" | "SLA";
  requirement: string;
  complianceStatus: "COMPLIED" | "EXCEEDED" | "CLARIFICATION";
  bidderResponse: string;
  proposalPageRef: string;
  isCustom?: boolean;
}

interface KeyPersonnel {
  id: string;
  name: string;
  designation: string;
  proposedRole: string;
  experienceYears: number;
  qualification: string;
  certifications: string[];
  rfpMatchScore: number;
  cvFileName: string;
  cvFileSize: string;
  signedConsent: boolean;
}

interface StatutoryAnnexure {
  id: string;
  annexureNumber: string;
  title: string;
  formatType: "Letterhead" | "₹100 Stamp Paper" | "Notarized Affidavit" | "Govt Certificate";
  status: "Digitally Sealed (DSC)" | "Verified & Ready" | "Auto-Drafted";
  pageInRfp: string;
  summary: string;
}

export const ProposalDeskTabV2: React.FC<ProposalDeskTabV2Props> = ({
  tender,
  onNextTab,
}) => {
  const [activeSubTab, setActiveSubTab] = useState<SubTabKey>("chapters");
  const [isPdfModalOpen, setIsPdfModalOpen] = useState(false);
  const [isAiPolishingAll, setIsAiPolishingAll] = useState(false);
  const [lastSavedTime, setLastSavedTime] = useState("Just now");

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

  // ================= 1. CHAPTERS STATE =================
  const [chapters, setChapters] = useState<ProposalChapter[]>([
    {
      id: "ch-1",
      chapterNumber: "Chapter 1",
      title: "Letter of Transmittal & Executive Summary",
      subtitle: "Formal transmittal letter signed by authorized director (RFP Annexure 1)",
      wordCount: 850,
      estimatedPages: 2,
      status: "Reviewed",
      qualityScore: 99,
      content: `We, ${signatory.companyName}, submit our comprehensive Technical Proposal for "${tender.title}" (RFP: ${tender.tenderNumber}). We confirm unconditional compliance with all RFP terms, scope, SLA requirements, and CERT-In security protocols without any exceptions. Our bid is backed by an experienced technical deployment team with over 5+ successful state government sports portals delivered on time.`,
      highlights: [
        "Unconditional statutory compliance declaration",
        "Authorized signatory power of attorney certified",
        "Class-3 DSC token cryptographic binding",
      ],
    },
    {
      id: "ch-2",
      chapterNumber: "Chapter 2",
      title: "Understanding of Scope & 19 Functional Modules",
      subtitle: "Detailed breakdown of Athlete Lifecycle Management, Tournaments & Venue workflows",
      wordCount: 1650,
      estimatedPages: 5,
      status: "Reviewed",
      qualityScore: 98,
      content: `${tender.organization} requires an integrated, high-concurrency web portal and native iOS & Android mobile applications. The platform serves as the single digital window for athlete enrollment, Aadhaar-based KYC verification, tournament schedule publication, live scoring dissemination, and direct benefit transfer (DBT) incentive disbursements. Our solution architecture is specifically engineered to handle peak tournament traffic of 100,000+ simultaneous users without performance degradation.`,
      highlights: [
        "Integrated Athlete Lifecycle Management (ALM)",
        "Real-time Tournament & Leaderboard Engine with sub-second sync",
        "Aadhaar & DigiLocker direct sandbox integration",
        "Bilingual Hindi & English Interface with WCAG 2.1 AA accessibility",
      ],
    },
    {
      id: "ch-3",
      chapterNumber: "Chapter 3",
      title: "System Architecture, Cloud Hosting & Tech Stack",
      subtitle: "Microservices-based cloud architecture on MeitY / State Data Centre (SDC) cloud",
      wordCount: 2950,
      estimatedPages: 8,
      status: "Reviewed",
      qualityScore: 97,
      content: `Our proposed technical stack leverages a decoupled microservices architecture with Next.js 15 frontend, Node.js / NestJS API services, Flutter cross-platform mobile apps, and PostgreSQL managed cluster with Redis caching. The entire application is hosted inside MeitY-empaneled Tier-3 datacenter with 99.9% uptime SLA, multi-zone automated failover, and Cloudflare Enterprise WAF DDoS protection.`,
      highlights: [
        "Decoupled Microservices with Docker & Kubernetes (K8s)",
        "MeitY Empaneled Tier-3 Cloud / SDC Infrastructure",
        "Native Flutter Mobile App (iOS & Android) with offline match sync",
        "PostgreSQL 16 High-Availability Replica Cluster",
      ],
    },
    {
      id: "ch-4",
      chapterNumber: "Chapter 4",
      title: "Implementation Methodology, 150-Day Delivery & Milestones",
      subtitle: "Phased Agile execution roadmap ensuring timely Go-Live as per RFP Page 6",
      wordCount: 2350,
      estimatedPages: 6,
      status: "Reviewed",
      qualityScore: 96,
      content: `We follow an Agile Scrum methodology divided into 4 core phases: Phase 1 (SRS & UI/UX wireframes), Phase 2 (Core platform build & API integrations), Phase 3 (UAT, CERT-In audit & staging dry run), and Phase 4 (Production rollout & sports academy onboarding within 150 days). Bi-weekly sprint reviews will be conducted with SAJHA project monitoring unit.`,
      highlights: [
        "Strict 150-Day Delivery Roadmap for Phase-1",
        "Bi-weekly sprint demos with stakeholder feedback",
        "Automated CI/CD pipeline with GitHub Actions",
        "Comprehensive User Manuals & Admin Training",
      ],
    },
    {
      id: "ch-5",
      chapterNumber: "Chapter 5",
      title: "Information Security, CERT-In Safe-to-Host & 3-Year SLA",
      subtitle: "ISO 27001 certified security practices, VAPT clearance, and 24x7 helpdesk",
      wordCount: 2100,
      estimatedPages: 5,
      status: "Reviewed",
      qualityScore: 98,
      content: `In accordance with Government of India cybersecurity guidelines, the system will undergo rigorous vulnerability assessment and penetration testing (VAPT) by a CERT-In empaneled security agency prior to go-live. We offer a dedicated 24x7 L1/L2/L3 support helpdesk with a maximum 15-minute response time for Critical Priority incidents across the 3-year contract period.`,
      highlights: [
        "CERT-In empaneled Safe-to-Host audit before launch",
        "AES-256 encryption at rest and TLS 1.3 in transit",
        "15-Minute Response Time for Severity-1 Incidents",
        "36 Months comprehensive O&M and warranty support",
      ],
    },
  ]);

  const [selectedChapterId, setSelectedChapterId] = useState<string>("ch-2");
  const currentChapter =
    chapters.find((c) => c.id === selectedChapterId) || chapters[0];

  // ================= 2. COMPLIANCE MATRIX STATE =================
  const [complianceCategory, setComplianceCategory] = useState<string>("ALL");
  const [complianceSearch, setComplianceSearch] = useState<string>("");

  const [complianceClauses] = useState<ComplianceClause[]>([
    {
      id: "cl-1",
      clauseNumber: "TC-01",
      category: "Functional",
      requirement: "Online Athlete & Coach Registration Portal with DigiLocker / Aadhaar OTP verification.",
      complianceStatus: "COMPLIED",
      bidderResponse: "Fully compliant. Integrated with MeriPehchan & DigiLocker sandbox with Aadhaar e-KYC support.",
      proposalPageRef: "Ch 2, Page 6",
    },
    {
      id: "cl-2",
      clauseNumber: "TC-02",
      category: "Functional",
      requirement: "Tournament Bracket Generation & Real-time Live Scoring Engine with Sub-second updates.",
      complianceStatus: "EXCEEDED",
      bidderResponse: "Exceeded. Built with WebSockets & Redis Pub/Sub capable of 50,000 concurrent live score stream connections.",
      proposalPageRef: "Ch 3, Page 14",
    },
    {
      id: "cl-3",
      category: "Architecture",
      clauseNumber: "TC-03",
      requirement: "High-Availability Cloud Architecture with 99.9% uptime and zero data loss disaster recovery.",
      complianceStatus: "COMPLIED",
      bidderResponse: "Complied. Multi-zone active-standby cloud architecture on MeitY empaneled cloud with automated RPO < 5 mins.",
      proposalPageRef: "Ch 3, Page 12",
    },
    {
      id: "cl-4",
      category: "Security",
      clauseNumber: "TC-04",
      requirement: "CERT-In Safe-to-Host Security Certification before production go-live.",
      complianceStatus: "COMPLIED",
      bidderResponse: "Complied. Full CERT-In VAPT audit by empanelled auditor is factored into Phase 3 timeline and budget.",
      proposalPageRef: "Ch 5, Page 36",
    },
    {
      id: "cl-5",
      category: "Functional",
      clauseNumber: "TC-05",
      requirement: "Multi-bank payment gateway integration for tournament entry fees with automated reconciliation.",
      complianceStatus: "COMPLIED",
      bidderResponse: "Complied. Ready integration with SBI ePay, Billdesk & Razorpay with T+1 settlement reconciliation dashboard.",
      proposalPageRef: "Ch 2, Page 8",
    },
    {
      id: "cl-6",
      category: "Hosting",
      clauseNumber: "TC-06",
      requirement: "Data Sovereignty: All database servers, backups, and user logs must reside within Indian borders.",
      complianceStatus: "COMPLIED",
      bidderResponse: "Complied. Servers located in Mumbai & Hyderabad Tier-3 data centers with Indian data residency guarantee.",
      proposalPageRef: "Ch 3, Page 15",
    },
    {
      id: "cl-7",
      category: "SLA",
      clauseNumber: "TC-07",
      requirement: "36 Months post-launch comprehensive Operations & Maintenance (O&M) with dedicated helpdesk.",
      complianceStatus: "COMPLIED",
      bidderResponse: "Complied. 24x7 L1/L2/L3 support with 15-minute response time and dedicated on-site support engineers in Ranchi.",
      proposalPageRef: "Ch 5, Page 37",
    },
    {
      id: "cl-8",
      category: "Functional",
      clauseNumber: "TC-08",
      requirement: "Mobile App support for both iOS (App Store) and Android (Google Play Store) with offline sync.",
      complianceStatus: "EXCEEDED",
      bidderResponse: "Exceeded. Native Flutter build with SQLite offline match data capture and automated sync when back online.",
      proposalPageRef: "Ch 3, Page 16",
    },
  ]);

  // ================= 3. KEY PERSONNEL STATE (RFP Page 20 Marking) =================
  const [teamMembers] = useState<KeyPersonnel[]>([
    {
      id: "tm-1",
      name: signatory.signatoryName || "Vikas Kumar",
      designation: "Project Head & Delivery Lead (10 Marks in QCBS)",
      proposedRole: "Overall Project Governance & Delivery Lead",
      experienceYears: 15,
      qualification: "B.Tech (Computer Science), MBA",
      certifications: ["PMP Certified (PMI)", "ITIL v4 Expert", "Scrum Master (CSM)"],
      rfpMatchScore: 100,
      cvFileName: "CV_Vikas_Kumar_Project_Head_Signed.pdf",
      cvFileSize: "340 KB",
      signedConsent: true,
    },
    {
      id: "tm-2",
      name: "Arindam Roy",
      designation: "Chief Technology Officer (CTO) (5 Marks in QCBS)",
      proposedRole: "Cloud Architecture, Microservices & DB Design",
      experienceYears: 16,
      qualification: "M.Tech (Software Engineering, IIT Roorkee)",
      certifications: ["AWS Certified Solutions Architect Pro", "Cisco CCNA", "TOGAF 9.2"],
      rfpMatchScore: 100,
      cvFileName: "CV_Arindam_Roy_CTO_Signed.pdf",
      cvFileSize: "410 KB",
      signedConsent: true,
    },
    {
      id: "tm-3",
      name: "Siddharth Verma",
      designation: "Sports Automation & Digitization SME (5 Marks in QCBS)",
      proposedRole: "Sports Tech, Tournament Workflows & Live Scoring",
      experienceYears: 12,
      qualification: "B.E. (Information Technology), PGD Sports Analytics",
      certifications: ["Certified Scrum Product Owner (CSPO)", "Flutter Certified"],
      rfpMatchScore: 100,
      cvFileName: "CV_Siddharth_Verma_Sports_SME_Signed.pdf",
      cvFileSize: "290 KB",
      signedConsent: true,
    },
    {
      id: "tm-4",
      name: "Neha Kapoor",
      designation: "Principal Cybersecurity & CERT-In Auditor",
      proposedRole: "VAPT, OWASP Top 10, Data Privacy & ISO 27001",
      experienceYears: 11,
      qualification: "M.S. in Information Security",
      certifications: ["CISSP (Certified Info Systems Security)", "CISA", "CEH v12"],
      rfpMatchScore: 100,
      cvFileName: "CV_Neha_Kapoor_Security_Lead_Signed.pdf",
      cvFileSize: "320 KB",
      signedConsent: true,
    },
  ]);

  // ================= 4. STATUTORY ANNEXURES STATE =================
  const [annexures] = useState<StatutoryAnnexure[]>([
    {
      id: "ann-1",
      annexureNumber: "Annexure - 1",
      title: "Technical Bid Covering Letter for Agency",
      formatType: "Letterhead",
      status: "Digitally Sealed (DSC)",
      pageInRfp: "RFP Page 27-28",
      summary: "Official submission letter expressing unconditional acceptance of all RFP terms, scope, and validity for 180 days.",
    },
    {
      id: "ann-2",
      annexureNumber: "Annexure - 2",
      title: "Self-Declaration of Non-Blacklisting & Integrity",
      formatType: "Notarized Affidavit",
      status: "Verified & Ready",
      pageInRfp: "RFP Page 29",
      summary: "Solemn affirmation confirming bidder has not been debarred/blacklisted by Central or State Govt / PSUs in the last 3 years.",
    },
    {
      id: "ann-3",
      annexureNumber: "Annexure - 3",
      title: "Power of Attorney (PoA) for Signing of Proposal",
      formatType: "₹100 Stamp Paper",
      status: "Verified & Ready",
      pageInRfp: "RFP Page 30-31",
      summary: "Legal authority granted to Vikas Kumar (Director) on non-judicial stamp paper with notarization.",
    },
    {
      id: "ann-4",
      annexureNumber: "Annexure - 4",
      title: "Provisions & Declaration for MSEs / Startup Companies",
      formatType: "Govt Certificate",
      status: "Digitally Sealed (DSC)",
      pageInRfp: "RFP Page 44",
      summary: "Udyam registration declaration claiming 100% EMD exemption under Rule 170 of GFR 2017.",
    },
  ]);

  // ================= 5. AI ACTIONS =================
  const handleAiPolishChapter = (actionType: string) => {
    toast.loading(`AI Copilot: ${actionType}...`, { id: "ai-polish" });
    setTimeout(() => {
      setChapters((prev) =>
        prev.map((ch) =>
          ch.id === selectedChapterId
            ? {
                ...ch,
                content:
                  ch.content +
                  "\n\n[AI ENHANCED]: Our battle-tested solution framework guarantees zero-latency synchronization, stringent data privacy under DPDP Act 2023, and full conformity with NIC / MeitY Tier-3 cloud standards.",
                qualityScore: 99,
                status: "Reviewed",
                wordCount: ch.wordCount + 38,
              }
            : ch
        )
      );
      setLastSavedTime("Just now");
      toast.success(`Chapter refined by AI Copilot!`, {
        id: "ai-polish",
        description: `Quality Score raised to 99% · Auto-saved to Technical Master Draft.`,
      });
    }, 1000);
  };

  const handleAiAutoFillAll = () => {
    setIsAiPolishingAll(true);
    toast.loading("AI Copilot: Optimizing all Technical Chapters & Compliance Statements...", {
      id: "ai-fill-all",
    });
    setTimeout(() => {
      setIsAiPolishingAll(false);
      setChapters((prev) =>
        prev.map((ch) => ({
          ...ch,
          status: "Reviewed",
          qualityScore: 99,
        }))
      );
      setLastSavedTime("Just now");
      toast.success("All Chapters & Compliance Statements Optimized!", {
        id: "ai-fill-all",
        description: "Technical Score estimated at 78.5 / 80 Marks. Ready for Master Cover-2 compilation.",
      });
    }, 1200);
  };

  const handleDownloadDraft = () => {
    toast.success("Downloading Technical Proposal Master Pack", {
      description: `Technical_Proposal_Cover2_${tender.tenderNumber.replace("/", "_")}.pdf (38 Pages)`,
    });
  };

  // Filtered compliance clauses
  const filteredClauses = complianceClauses.filter((clause) => {
    const matchesCat =
      complianceCategory === "ALL" || clause.category === complianceCategory;
    const matchesSearch =
      clause.requirement.toLowerCase().includes(complianceSearch.toLowerCase()) ||
      clause.clauseNumber.toLowerCase().includes(complianceSearch.toLowerCase()) ||
      clause.bidderResponse.toLowerCase().includes(complianceSearch.toLowerCase());
    return matchesCat && matchesSearch;
  });

  return (
    <div className="space-y-6 animate-in fade-in duration-200">
      {/* 1. TOP METRICS & READINESS HERO BAR */}
      <div className="bg-white rounded-2xl border border-slate-200/90 shadow-2xs p-5 md:p-6 space-y-4">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 border-b border-slate-100 pb-4">
          <div className="flex items-start gap-3.5">
            <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-[#173C40] to-emerald-900 text-white flex items-center justify-center shrink-0 shadow-xs">
              <PenLine size={22} className="text-emerald-300" />
            </div>
            <div>
              <div className="flex items-center gap-2 flex-wrap">
                <span className="text-[10.5px] font-mono font-bold uppercase tracking-wider bg-emerald-100 text-emerald-900 px-2 py-0.5 rounded-md border border-emerald-200">
                  Step 4 of 5
                </span>
                <span className="text-xs font-bold text-slate-500">
                  Cover-2: Technical Proposal Studio
                </span>
                <span className="text-[11px] bg-slate-100 text-slate-700 px-2 py-0.5 rounded-md font-mono">
                  RFP: {tender.tenderNumber}
                </span>
              </div>
              <h2 className="text-lg md:text-xl font-black text-slate-900 tracking-tight mt-0.5">
                Technical Proposal &amp; Compliance Authoring Desk
              </h2>
              <p className="text-xs text-slate-600 mt-0.5">
                AI-powered technical drafting, clause compliance matrix, team CV verification, and statutory annexures compiler.
              </p>
            </div>
          </div>

          {/* Quick Action Buttons */}
          <div className="flex items-center gap-2 flex-wrap sm:flex-nowrap">
            <button
              type="button"
              onClick={handleAiAutoFillAll}
              disabled={isAiPolishingAll}
              className="px-3.5 py-2 bg-emerald-50 hover:bg-emerald-100/80 text-emerald-900 border border-emerald-300/80 rounded-xl text-xs font-bold flex items-center gap-1.5 transition-colors cursor-pointer disabled:opacity-50"
            >
              <Sparkles size={14} className="text-emerald-700" />
              <span>{isAiPolishingAll ? "AI Optimizing..." : "AI Auto-Refine All"}</span>
            </button>

            <button
              type="button"
              onClick={() => setIsPdfModalOpen(true)}
              className="px-3.5 py-2 bg-slate-900 hover:bg-slate-800 text-white rounded-xl text-xs font-bold flex items-center gap-1.5 shadow-xs transition-colors cursor-pointer"
            >
              <Eye size={14} className="text-emerald-400" />
              <span>Preview Proposal PDF</span>
            </button>

            <button
              type="button"
              onClick={handleDownloadDraft}
              className="px-3 py-2 bg-white hover:bg-slate-50 text-slate-700 border border-slate-300 rounded-xl text-xs font-bold flex items-center gap-1.5 transition-colors cursor-pointer shadow-2xs"
              title="Download Draft PDF"
            >
              <Download size={14} />
              <span className="hidden sm:inline">Export</span>
            </button>
          </div>
        </div>

        {/* 4 Key Performance Indicators */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 pt-1">
          <div className="bg-slate-50/90 p-3.5 rounded-xl border border-slate-200/80">
            <div className="flex items-center justify-between text-slate-500 mb-1">
              <span className="text-[10px] font-bold uppercase tracking-wider">
                Technical Score
              </span>
              <ShieldCheck size={14} className="text-emerald-700" />
            </div>
            <div className="flex items-baseline gap-1.5">
              <strong className="text-xl font-black text-slate-900 font-mono">
                96%
              </strong>
              <span className="text-[11px] text-emerald-800 font-bold bg-emerald-100/90 px-1.5 py-0.2 rounded">
                Ready
              </span>
            </div>
            <div className="w-full bg-slate-200 h-1.5 rounded-full mt-2 overflow-hidden">
              <div
                className="bg-emerald-600 h-full rounded-full transition-all duration-500"
                style={{ width: "96%" }}
              />
            </div>
          </div>

          <div className="bg-slate-50/90 p-3.5 rounded-xl border border-slate-200/80">
            <div className="flex items-center justify-between text-slate-500 mb-1">
              <span className="text-[10px] font-bold uppercase tracking-wider">
                Compliance Matrix
              </span>
              <CheckCircle2 size={14} className="text-emerald-700" />
            </div>
            <div className="flex items-baseline gap-1.5">
              <strong className="text-xl font-black text-slate-900 font-mono">
                28 / 28
              </strong>
              <span className="text-[11px] text-emerald-700 font-medium">
                (100% Complied)
              </span>
            </div>
            <span className="text-[10.5px] text-slate-500 block mt-1 truncate">
              0 Deviations · Zero Exceptions
            </span>
          </div>

          <div className="bg-slate-50/90 p-3.5 rounded-xl border border-slate-200/80">
            <div className="flex items-center justify-between text-slate-500 mb-1">
              <span className="text-[10px] font-bold uppercase tracking-wider">
                QCBS Technical Marks
              </span>
              <Award size={14} className="text-amber-700" />
            </div>
            <div className="flex items-baseline gap-1.5">
              <strong className="text-xl font-black text-slate-900 font-mono">
                78.5
              </strong>
              <span className="text-[11px] text-slate-500">/ 80.0 Max</span>
            </div>
            <span className="text-[10.5px] text-emerald-700 font-bold block mt-1">
              ★ High Win Probability
            </span>
          </div>

          <div className="bg-slate-50/90 p-3.5 rounded-xl border border-slate-200/80">
            <div className="flex items-center justify-between text-slate-500 mb-1">
              <span className="text-[10px] font-bold uppercase tracking-wider">
                Document Volume
              </span>
              <BookOpen size={14} className="text-indigo-700" />
            </div>
            <div className="flex items-baseline gap-1.5">
              <strong className="text-xl font-black text-slate-900 font-mono">
                38 Pages
              </strong>
              <span className="text-[11px] text-slate-500">· 5 Chapters</span>
            </div>
            <span className="text-[10.5px] text-slate-500 block mt-1">
              ~14,250 Words · A4 Layout
            </span>
          </div>
        </div>
      </div>

      {/* 2. SUB-NAVIGATION TABS (4 Universal Modules) */}
      <div className="bg-white rounded-2xl border border-slate-200/90 shadow-2xs overflow-hidden">
        <div className="flex items-center border-b border-slate-200 overflow-x-auto bg-slate-50/60 p-1.5 gap-1.5">
          <button
            type="button"
            onClick={() => setActiveSubTab("chapters")}
            className={`px-4 py-2.5 rounded-xl text-xs font-bold transition-all flex items-center gap-2 cursor-pointer shrink-0 ${
              activeSubTab === "chapters"
                ? "bg-white text-[#173C40] shadow-2xs border border-slate-200"
                : "text-slate-600 hover:text-slate-900 hover:bg-white/50"
            }`}
          >
            <BookOpen size={15} className={activeSubTab === "chapters" ? "text-emerald-700" : ""} />
            <span>1. Solution Chapters &amp; AI Editor</span>
            <span className="px-1.5 py-0.2 rounded bg-emerald-100 text-emerald-900 font-mono text-[10px]">
              5 Ch
            </span>
          </button>

          <button
            type="button"
            onClick={() => setActiveSubTab("compliance")}
            className={`px-4 py-2.5 rounded-xl text-xs font-bold transition-all flex items-center gap-2 cursor-pointer shrink-0 ${
              activeSubTab === "compliance"
                ? "bg-white text-[#173C40] shadow-2xs border border-slate-200"
                : "text-slate-600 hover:text-slate-900 hover:bg-white/50"
            }`}
          >
            <FileSpreadsheet size={15} className={activeSubTab === "compliance" ? "text-emerald-700" : ""} />
            <span>2. Clause Compliance Matrix</span>
            <span className="px-1.5 py-0.2 rounded bg-slate-200 text-slate-800 font-mono text-[10px]">
              28 / 28
            </span>
          </button>

          <button
            type="button"
            onClick={() => setActiveSubTab("team")}
            className={`px-4 py-2.5 rounded-xl text-xs font-bold transition-all flex items-center gap-2 cursor-pointer shrink-0 ${
              activeSubTab === "team"
                ? "bg-white text-[#173C40] shadow-2xs border border-slate-200"
                : "text-slate-600 hover:text-slate-900 hover:bg-white/50"
            }`}
          >
            <Users2 size={15} className={activeSubTab === "team" ? "text-emerald-700" : ""} />
            <span>3. Key Personnel (CTO, Head, SME)</span>
            <span className="px-1.5 py-0.2 rounded bg-emerald-100 text-emerald-900 font-mono text-[10px]">
              4 CVs
            </span>
          </button>

          <button
            type="button"
            onClick={() => setActiveSubTab("annexures")}
            className={`px-4 py-2.5 rounded-xl text-xs font-bold transition-all flex items-center gap-2 cursor-pointer shrink-0 ${
              activeSubTab === "annexures"
                ? "bg-white text-[#173C40] shadow-2xs border border-slate-200"
                : "text-slate-600 hover:text-slate-900 hover:bg-white/50"
            }`}
          >
            <ScrollText size={15} className={activeSubTab === "annexures" ? "text-emerald-700" : ""} />
            <span>4. Statutory Annexures &amp; Forms</span>
            <span className="px-1.5 py-0.2 rounded bg-emerald-100 text-emerald-900 font-mono text-[10px]">
              4 Forms
            </span>
          </button>

          <button
            type="button"
            onClick={() => setActiveSubTab("milestones")}
            className={`px-4 py-2.5 rounded-xl text-xs font-bold transition-all flex items-center gap-2 cursor-pointer shrink-0 ${
              activeSubTab === "milestones"
                ? "bg-white text-[#173C40] shadow-2xs border border-slate-200"
                : "text-slate-600 hover:text-slate-900 hover:bg-white/50"
            }`}
          >
            <CalendarDays size={15} className={activeSubTab === "milestones" ? "text-emerald-700" : ""} />
            <span>5. 150-Day Delivery Roadmap</span>
            <span className="px-1.5 py-0.2 rounded bg-slate-200 text-slate-800 font-mono text-[10px]">
              4 Phases
            </span>
          </button>
        </div>

        {/* ================= VIEW 1: CHAPTERS & AI AUTHORING STUDIO ================= */}
        {activeSubTab === "chapters" && (
          <div className="p-4 sm:p-6 grid grid-cols-1 lg:grid-cols-12 gap-6 animate-in fade-in duration-150">
            {/* Left Chapters Stepper List (4 cols) */}
            <div className="lg:col-span-4 space-y-2.5">
              <div className="flex items-center justify-between pb-1">
                <span className="text-[11px] font-bold uppercase tracking-wider text-slate-500">
                  Document Chapters
                </span>
                <span className="text-[11px] text-slate-400 font-mono">
                  Total ~38 Pages
                </span>
              </div>

              {chapters.map((ch) => {
                const isSelected = ch.id === selectedChapterId;
                return (
                  <button
                    key={ch.id}
                    type="button"
                    onClick={() => setSelectedChapterId(ch.id)}
                    className={`w-full text-left p-3.5 rounded-xl border transition-all cursor-pointer flex flex-col gap-1.5 ${
                      isSelected
                        ? "bg-emerald-50/70 border-emerald-400/90 shadow-2xs ring-1 ring-emerald-500/20"
                        : "bg-white border-slate-200/90 hover:border-slate-300 hover:bg-slate-50/80"
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <span
                        className={`text-[10px] font-mono font-bold uppercase px-2 py-0.5 rounded ${
                          isSelected
                            ? "bg-emerald-200 text-emerald-900"
                            : "bg-slate-100 text-slate-600"
                        }`}
                      >
                        {ch.chapterNumber}
                      </span>
                      <span className="text-[10px] font-bold text-emerald-800 bg-emerald-100/80 px-2 py-0.5 rounded-full flex items-center gap-1">
                        <Check size={11} /> {ch.qualityScore}% Score
                      </span>
                    </div>

                    <strong
                      className={`text-xs font-bold line-clamp-1 ${
                        isSelected ? "text-slate-900" : "text-slate-800"
                      }`}
                    >
                      {ch.title}
                    </strong>

                    <div className="flex items-center justify-between text-[10.5px] text-slate-500 pt-0.5">
                      <span>~{ch.estimatedPages} Pages</span>
                      <span>{ch.wordCount} Words</span>
                    </div>
                  </button>
                );
              })}

              <div className="p-3 bg-slate-50 rounded-xl border border-slate-200 text-xs space-y-1.5 mt-4">
                <div className="flex items-center gap-2 text-slate-800 font-bold">
                  <Wand2 size={14} className="text-emerald-700" />
                  <span>AI Copilot Active</span>
                </div>
                <p className="text-[11px] text-slate-600 leading-relaxed">
                  Chapters are auto-drafted from RFP requirements, your company credentials, and winning state government templates.
                </p>
              </div>
            </div>

            {/* Right Live Chapter Editor & AI Studio (8 cols) */}
            <div className="lg:col-span-8 space-y-4">
              <div className="bg-slate-50/80 p-4 rounded-xl border border-slate-200/90 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-mono font-bold text-emerald-900 bg-emerald-100 px-2 py-0.5 rounded">
                      {currentChapter.chapterNumber}
                    </span>
                    <span className="text-[11px] text-slate-500">
                      ~{currentChapter.estimatedPages} Pages · {currentChapter.wordCount} Words
                    </span>
                  </div>
                  <h3 className="text-base font-black text-slate-900 mt-1">
                    {currentChapter.title}
                  </h3>
                  <p className="text-xs text-slate-600 mt-0.5">
                    {currentChapter.subtitle}
                  </p>
                </div>

                <div className="flex items-center gap-2 self-end sm:self-auto">
                  <button
                    type="button"
                    onClick={() => {
                      setLastSavedTime("Just now");
                      toast.success(`Saved draft for ${currentChapter.chapterNumber}`);
                    }}
                    className="px-3 py-1.5 bg-white hover:bg-slate-100 text-slate-700 border border-slate-300 rounded-lg text-xs font-bold flex items-center gap-1.5 cursor-pointer shadow-2xs"
                  >
                    <Save size={13} />
                    <span>Save Draft</span>
                  </button>
                </div>
              </div>

              {/* AI Copilot Action Strip */}
              <div className="p-3 bg-gradient-to-r from-emerald-50 via-teal-50 to-slate-50 rounded-xl border border-emerald-200/80 flex items-center justify-between gap-3 flex-wrap">
                <div className="flex items-center gap-2 text-xs font-bold text-emerald-950">
                  <Sparkles size={15} className="text-emerald-700 shrink-0" />
                  <span>AI Copilot Quick Refinement:</span>
                </div>
                <div className="flex items-center gap-2 flex-wrap">
                  <button
                    type="button"
                    onClick={() => handleAiPolishChapter("Enhancing Executive Tone")}
                    className="px-2.5 py-1 bg-white hover:bg-emerald-50 text-emerald-900 border border-emerald-300/80 rounded-lg text-xs font-medium cursor-pointer shadow-2xs transition-colors"
                  >
                    ✨ Elevate Tone
                  </button>
                  <button
                    type="button"
                    onClick={() => handleAiPolishChapter("Inserting CERT-In Security Clause")}
                    className="px-2.5 py-1 bg-white hover:bg-emerald-50 text-emerald-900 border border-emerald-300/80 rounded-lg text-xs font-medium cursor-pointer shadow-2xs transition-colors"
                  >
                    🛡️ Add Security Clause
                  </button>
                </div>
              </div>

              {/* Live Editable Textarea */}
              <div className="space-y-2">
                <div className="flex items-center justify-between text-xs text-slate-500">
                  <span className="font-bold uppercase tracking-wider text-[10.5px]">
                    Draft Content &amp; Methodology Statements
                  </span>
                  <span className="font-mono text-[10.5px]">
                    Saved: {lastSavedTime}
                  </span>
                </div>
                <textarea
                  rows={8}
                  value={currentChapter.content}
                  onChange={(e) => {
                    const newText = e.target.value;
                    setChapters((prev) =>
                      prev.map((c) =>
                        c.id === selectedChapterId
                          ? { ...c, content: newText, wordCount: newText.split(/\s+/).length }
                          : c
                      )
                    );
                  }}
                  className="w-full bg-white border border-slate-300 focus:border-emerald-600 rounded-xl p-4 text-xs md:text-sm text-slate-800 leading-relaxed font-sans focus:outline-hidden focus:ring-2 focus:ring-emerald-500/20 shadow-2xs custom-scrollbar"
                  placeholder="Draft content for this chapter..."
                />
              </div>

              {/* Chapter Key Highlights Cards */}
              <div className="p-4 bg-slate-50/90 rounded-xl border border-slate-200 space-y-2">
                <span className="text-[10.5px] font-bold uppercase tracking-wider text-slate-500 block">
                  Key Scope Mappings &amp; Deliverables in this Chapter:
                </span>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {currentChapter.highlights.map((h, i) => (
                    <div
                      key={i}
                      className="p-2 bg-white rounded-lg border border-slate-200/80 text-xs text-slate-700 flex items-center gap-2"
                    >
                      <CheckCircle2 size={13} className="text-emerald-600 shrink-0" />
                      <span className="truncate">{h}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ================= VIEW 2: CLAUSE-BY-CLAUSE COMPLIANCE MATRIX ================= */}
        {activeSubTab === "compliance" && (
          <div className="p-4 sm:p-6 space-y-4 animate-in fade-in duration-150">
            {/* Filter & Search Header */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div className="flex items-center gap-2 flex-wrap">
                <span className="text-xs font-bold text-slate-500 flex items-center gap-1">
                  <Filter size={13} /> Filter:
                </span>
                {["ALL", "Functional", "Architecture", "Security", "Hosting", "SLA"].map(
                  (cat) => (
                    <button
                      key={cat}
                      type="button"
                      onClick={() => setComplianceCategory(cat)}
                      className={`px-3 py-1 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                        complianceCategory === cat
                          ? "bg-[#173C40] text-white"
                          : "bg-slate-100 text-slate-600 hover:bg-slate-200"
                      }`}
                    >
                      {cat}
                    </button>
                  )
                )}
              </div>

              <div className="relative w-full sm:w-64">
                <Search
                  size={14}
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
                />
                <input
                  type="text"
                  value={complianceSearch}
                  onChange={(e) => setComplianceSearch(e.target.value)}
                  placeholder="Search 28 clauses..."
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl pl-8 pr-3 py-1.5 text-xs text-slate-900 focus:outline-hidden focus:border-emerald-500"
                />
              </div>
            </div>

            {/* Compliance Matrix Table */}
            <div className="border border-slate-200 rounded-xl overflow-hidden shadow-2xs">
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs">
                  <thead className="bg-slate-100/90 text-slate-700 font-bold border-b border-slate-200">
                    <tr>
                      <th className="p-3 w-20">Clause #</th>
                      <th className="p-3 w-28">Category</th>
                      <th className="p-3">RFP Requirement Statement</th>
                      <th className="p-3 w-28 text-center">Compliance</th>
                      <th className="p-3">Proposed Solution &amp; Technical Justification</th>
                      <th className="p-3 w-28 text-right">Page Ref</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 bg-white">
                    {filteredClauses.map((clause) => (
                      <tr key={clause.id} className="hover:bg-slate-50/80 transition-colors">
                        <td className="p-3 font-mono font-bold text-slate-900">
                          {clause.clauseNumber}
                        </td>
                        <td className="p-3">
                          <span className="px-2 py-0.5 rounded bg-slate-100 text-slate-700 font-medium text-[10.5px]">
                            {clause.category}
                          </span>
                        </td>
                        <td className="p-3 text-slate-800 font-medium max-w-xs">
                          {clause.requirement}
                        </td>
                        <td className="p-3 text-center">
                          <span
                            className={`px-2.5 py-1 rounded-full text-[10.5px] font-bold inline-flex items-center gap-1 ${
                              clause.complianceStatus === "COMPLIED"
                                ? "bg-emerald-100 text-emerald-900"
                                : "bg-indigo-100 text-indigo-900"
                            }`}
                          >
                            <CheckCircle2 size={12} className="text-emerald-700" />
                            {clause.complianceStatus}
                          </span>
                        </td>
                        <td className="p-3 text-slate-600 leading-relaxed max-w-sm">
                          {clause.bidderResponse}
                        </td>
                        <td className="p-3 text-right font-mono font-bold text-emerald-800 text-[11px]">
                          {clause.proposalPageRef}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            <div className="p-3 bg-emerald-50/60 rounded-xl border border-emerald-200 flex items-center justify-between text-xs text-emerald-950">
              <div className="flex items-center gap-2">
                <CheckCircle2 size={16} className="text-emerald-700" />
                <span className="font-bold">
                  Zero Technical Deviations: All 28 RFP clauses unconditionally complied.
                </span>
              </div>
              <button
                type="button"
                onClick={() => {
                  toast.success("Compliance Matrix Excel Sheet Exported", {
                    description: "Compliance_Matrix_SAJHA_69.xlsx with digital signoff stamp.",
                  });
                }}
                className="px-3 py-1 bg-white hover:bg-emerald-100 text-emerald-900 border border-emerald-300 rounded-lg font-bold text-xs cursor-pointer shadow-2xs"
              >
                Export Excel Sheet
              </button>
            </div>
          </div>
        )}

        {/* ================= VIEW 3: KEY PERSONNEL & CV MATRIX (RFP Page 20 Marking) ================= */}
        {activeSubTab === "team" && (
          <div className="p-4 sm:p-6 space-y-4 animate-in fade-in duration-150">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-100 pb-3">
              <div>
                <h3 className="text-sm font-bold text-slate-900">
                  Project Key Personnel &amp; Manpower Deployment (RFP Page 20 Criteria)
                </h3>
                <p className="text-xs text-slate-500">
                  Pre-mapped to RFP Technical Scoring (CTO: 5 Marks, Project Head: 10 Marks, Sports SME: 5 Marks).
                </p>
              </div>
              <span className="text-xs font-bold text-emerald-800 bg-emerald-100 px-3 py-1 rounded-full flex items-center gap-1 self-start sm:self-auto">
                <Award size={13} /> 20 / 20 Manpower Score (100% Match)
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {teamMembers.map((member) => (
                <div
                  key={member.id}
                  className="bg-white p-4 rounded-xl border border-slate-200/90 shadow-2xs space-y-3"
                >
                  <div className="flex items-start justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-xl bg-slate-900 text-white flex items-center justify-center font-bold text-sm">
                        {member.name.slice(0, 2).toUpperCase()}
                      </div>
                      <div>
                        <strong className="text-sm font-bold text-slate-900 block">
                          {member.name}
                        </strong>
                        <span className="text-xs text-emerald-800 font-semibold block">
                          {member.designation}
                        </span>
                      </div>
                    </div>
                    <span className="text-[10.5px] font-mono font-bold bg-emerald-100 text-emerald-900 px-2 py-0.5 rounded">
                      {member.experienceYears}+ Yrs Exp
                    </span>
                  </div>

                  <div className="space-y-1.5 text-xs text-slate-600 bg-slate-50 p-3 rounded-lg border border-slate-200/60">
                    <div className="flex items-center gap-1.5">
                      <GraduationCap size={13} className="text-slate-500 shrink-0" />
                      <span className="font-medium text-slate-800">{member.qualification}</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <Award size={13} className="text-amber-600 shrink-0" />
                      <span>{member.certifications.join(" · ")}</span>
                    </div>
                  </div>

                  <div className="flex items-center justify-between pt-1 text-xs">
                    <div className="flex items-center gap-1.5 text-emerald-800 font-medium">
                      <FileCheck2 size={14} className="text-emerald-600" />
                      <span>Signed CV Attached (Cover-2)</span>
                    </div>
                    <button
                      type="button"
                      onClick={() => {
                        toast.success(`Opening signed CV: ${member.cvFileName}`);
                      }}
                      className="text-xs text-slate-700 hover:text-slate-900 font-bold flex items-center gap-1 underline cursor-pointer"
                    >
                      <span>View CV</span>
                      <ExternalLink size={11} />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ================= VIEW 4: STATUTORY ANNEXURES & FORMS (RFP Pages 27-44) ================= */}
        {activeSubTab === "annexures" && (
          <div className="p-4 sm:p-6 space-y-4 animate-in fade-in duration-150">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-100 pb-3">
              <div>
                <h3 className="text-sm font-bold text-slate-900">
                  Mandatory Statutory Annexures &amp; Legal Declarations
                </h3>
                <p className="text-xs text-slate-500">
                  Auto-populated with company credentials and cryptographically sealed with Class-3 DSC token.
                </p>
              </div>
              <span className="text-xs font-bold text-emerald-800 bg-emerald-100 px-3 py-1 rounded-full flex items-center gap-1 self-start sm:self-auto">
                <ShieldCheck size={13} /> 4 of 4 Annexures Attached
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {annexures.map((ann) => (
                <div
                  key={ann.id}
                  className="bg-white p-4 rounded-xl border border-slate-200/90 shadow-2xs space-y-3 flex flex-col justify-between"
                >
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-mono font-bold text-emerald-900 bg-emerald-100 px-2 py-0.5 rounded">
                        {ann.annexureNumber}
                      </span>
                      <span className="text-[10px] font-bold text-slate-500 bg-slate-100 border border-slate-200 px-2 py-0.5 rounded">
                        {ann.formatType}
                      </span>
                    </div>

                    <strong className="text-sm font-bold text-slate-900 block">
                      {ann.title}
                    </strong>

                    <p className="text-xs text-slate-600 leading-relaxed">
                      {ann.summary}
                    </p>
                  </div>

                  <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-xs">
                    <span className="text-[11px] font-mono text-slate-400">
                      Ref: {ann.pageInRfp}
                    </span>
                    <button
                      type="button"
                      onClick={() => {
                        toast.success(`Opening Form: ${ann.title}`, {
                          description: `Sealed with ${signatory.signatoryName}'s Class-3 DSC.`,
                        });
                      }}
                      className="px-3 py-1 bg-emerald-50 hover:bg-emerald-100 text-emerald-900 border border-emerald-300 rounded-lg font-bold text-xs flex items-center gap-1 cursor-pointer transition-colors shadow-2xs"
                    >
                      <Eye size={12} />
                      <span>View Form</span>
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ================= VIEW 5: WORKPLAN & 150-DAY MILESTONES ================= */}
        {activeSubTab === "milestones" && (
          <div className="p-4 sm:p-6 space-y-4 animate-in fade-in duration-150">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <div>
                <h3 className="text-sm font-bold text-slate-900">
                  Phased Project Roadmap &amp; Deliverables (RFP Page 6 &amp; 23)
                </h3>
                <p className="text-xs text-slate-500">
                  150-day strict development timeline for Phase-1 followed by 36-month warranty and maintenance.
                </p>
              </div>
            </div>

            <div className="space-y-3">
              {[
                {
                  phase: "Stage 1 (Month 1-2)",
                  percentage: "30% Payment",
                  title: "Website Platform & Centralized Sports Repositories",
                  deliverables: "Centralized Athlete Repository, Venue & Academy Management, Attendance & Scholarships.",
                  status: "Ready for Kickoff",
                },
                {
                  phase: "Stage 2 (Month 3)",
                  percentage: "20% Payment",
                  title: "Android Mobile Application (Google Play Store Live)",
                  deliverables: "Native Android App build, offline match scoring sync, push notifications & web API integration.",
                  status: "Planned",
                },
                {
                  phase: "Stage 3 (Month 4)",
                  percentage: "20% Payment",
                  title: "iOS Mobile Application (Apple App Store Live)",
                  deliverables: "Native iOS App build, Apple App Store review clearance, bilingual UI sync.",
                  status: "Planned",
                },
                {
                  phase: "Stage 4 (Month 5 / Day 150)",
                  percentage: "30% Payment",
                  title: "Beta Testing, CERT-In Security Audit & Final Go-Live",
                  deliverables: "CERT-In Safe-to-Host Audit, Committee Beta Signoff, Production Handover on SDC/NIC Cloud.",
                  status: "Final Milestone",
                },
              ].map((item, idx) => (
                <div
                  key={idx}
                  className="bg-white p-4 rounded-xl border border-slate-200/90 shadow-2xs flex flex-col md:flex-row md:items-center justify-between gap-3"
                >
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-mono font-bold text-emerald-900 bg-emerald-100 px-2 py-0.5 rounded">
                        {item.phase}
                      </span>
                      <span className="text-xs font-bold text-slate-900">
                        {item.title}
                      </span>
                    </div>
                    <p className="text-xs text-slate-600 pl-0.5">
                      <strong className="text-slate-700">Deliverables:</strong> {item.deliverables}
                    </p>
                  </div>
                  <div className="text-right shrink-0">
                    <span className="text-xs font-mono font-bold text-emerald-800 bg-emerald-50 border border-emerald-200 px-2.5 py-1 rounded-lg block">
                      {item.percentage}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* 3. BOTTOM ACTION BAR (Proceed to Step 5: PDF Binder) */}
      <div className="bg-white p-4 rounded-2xl border border-slate-200/90 shadow-2xs flex flex-col sm:flex-row items-center justify-between gap-3">
        <div className="flex items-center gap-2 text-xs text-slate-600">
          <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
          <span>
            Draft auto-saved · Signed with <strong>{signatory.signatoryName}&apos;s Class-3 DSC Token</strong>
          </span>
        </div>

        {onNextTab && (
          <button
            type="button"
            onClick={onNextTab}
            className="w-full sm:w-auto px-6 py-2.5 bg-[#173C40] hover:bg-slate-800 text-white rounded-xl text-xs font-bold flex items-center justify-center gap-2 shadow-xs transition-colors cursor-pointer"
          >
            <span>Proceed to Step 5: PDF Binder &amp; Master Pack</span>
            <ArrowRight size={15} />
          </button>
        )}
      </div>

      {/* 4. PROPOSAL PDF PREVIEW MODAL */}
      <ProposalPdfPreviewModal
        isOpen={isPdfModalOpen}
        onClose={() => setIsPdfModalOpen(false)}
        tender={tender}
      />
    </div>
  );
};
