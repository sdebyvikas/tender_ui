import React, { useState, useMemo, useRef } from "react";
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
  FileDown,
  Maximize2,
  Minimize2,
  ZoomIn,
  ZoomOut,
  Bold,
  Italic,
  Underline,
  Heading1,
  Heading2,
  List,
  ListOrdered,
  AlignLeft,
  AlignCenter,
  AlignRight,
  AlignJustify,
  Crown,
  Stamp,
  Landmark,
  PlusCircle,
  ChevronDown,
  Copy,
} from "lucide-react";
import { toast } from "sonner";
import { TenderV2 } from "../../types";
import { ProposalPdfPreviewModal } from "../ProposalPdfPreviewModal";

interface ProposalDeskTabV2Props {
  tender: TenderV2;
  onNextTab?: () => void;
}

export const ProposalDeskTabV2: React.FC<ProposalDeskTabV2Props> = ({
  tender,
  onNextTab,
}) => {
  const [zoomLevel, setZoomLevel] = useState<number>(100);
  const [isFocusMode, setIsFocusMode] = useState<boolean>(false);
  const [activeSectionNav, setActiveSectionNav] = useState<string>("sec-cover");
  const [aiPromptInput, setAiPromptInput] = useState<string>("");
  const [isAiProcessing, setIsAiProcessing] = useState<boolean>(false);
  const [isPdfModalOpen, setIsPdfModalOpen] = useState<boolean>(false);
  const [showCompanySeal, setShowCompanySeal] = useState<boolean>(true);
  const [showDscSignature, setShowDscSignature] = useState<boolean>(true);

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

  // ================= 1. CHAPTERS & DOCUMENT SECTIONS STATE =================
  const [chapters, setChapters] = useState([
    {
      id: "ch-1",
      sectionKey: "sec-ch1",
      chapterNumber: "Chapter 1",
      title: "Letter of Transmittal & Executive Summary",
      subtitle:
        "Formal transmittal letter signed by authorized director (RFP Annexure 1)",
      pageNumber: 3,
      content: `We, ${signatory.companyName}, submit our comprehensive Technical Proposal for "${tender.title}" (RFP: ${tender.tenderNumber}). We confirm unconditional compliance with all RFP terms, scope, SLA requirements, and CERT-In security protocols without any exceptions. Our bid is backed by an experienced technical deployment team with over 5+ successful state government sports portals delivered on time.

Key Bidder Undertakings:
1. Unconditional acceptance of all 28 technical clauses and general conditions of contract.
2. Complete data residency guarantee within Indian MeitY-empaneled Tier-3 datacenters.
3. Deployment of certified key personnel (CTO, Delivery Head, Security Lead) with 100% QCBS marks.
4. Bid validity commitment of 180 days from the submission deadline with fixed price guarantee.`,
    },
    {
      id: "ch-2",
      sectionKey: "sec-ch2",
      chapterNumber: "Chapter 2",
      title: "Understanding of Scope & 19 Functional Modules",
      subtitle:
        "Detailed breakdown of Athlete Lifecycle Management, Tournaments & Venue workflows",
      pageNumber: 4,
      content: `${tender.organization} requires an integrated, high-concurrency web portal and native iOS & Android mobile applications. The platform serves as the single digital window for athlete enrollment, Aadhaar-based KYC verification, tournament schedule publication, live scoring dissemination, and direct benefit transfer (DBT) incentive disbursements.

Scope Architecture Deliverables:
• Module 1-4: Centralized Athlete Repository, Biometric / DigiLocker Verification, Digital Pass & QR ID.
• Module 5-9: Multi-Sport Tournament Engine, Fixture Generation, Real-Time Live Scoring with sub-second sync.
• Module 10-14: Sports Academies Management, Coach Empanelment, Equipment Inventory & Venue Booking.
• Module 15-19: DBT Financial Disbursements, Merit Scholarships, Helpdesk & Grievance Redressal System.`,
    },
    {
      id: "ch-3",
      sectionKey: "sec-ch3",
      chapterNumber: "Chapter 3",
      title: "System Architecture, Cloud Hosting & Tech Stack",
      subtitle:
        "Microservices-based cloud architecture on MeitY / State Data Centre (SDC) cloud",
      pageNumber: 5,
      content: `Our proposed technical stack leverages a decoupled microservices architecture with Next.js 15 frontend, Node.js / NestJS API services, Flutter cross-platform mobile apps, and PostgreSQL managed cluster with Redis caching. The entire application is hosted inside MeitY-empaneled Tier-3 datacenter with 99.9% uptime SLA, multi-zone automated failover, and Cloudflare Enterprise WAF DDoS protection.

Technical Architecture Highlights:
• Frontend: Next.js 15, Tailwind CSS, TypeScript with WCAG 2.1 AA bilingual accessibility (Hindi & English).
• Backend Services: Containerized Docker microservices orchestrated via Kubernetes (K8s).
• Database: High-availability PostgreSQL 16 cluster with synchronous standby replication (RPO < 5 mins, RTO < 15 mins).
• Mobile Apps: Native Flutter build with SQLite offline match data capture and automated sync.`,
    },
    {
      id: "ch-4",
      sectionKey: "sec-ch4",
      chapterNumber: "Chapter 4",
      title: "Implementation Methodology, 150-Day Delivery & Milestones",
      subtitle:
        "Phased Agile execution roadmap ensuring timely Go-Live as per RFP Page 6",
      pageNumber: 6,
      content: `We follow an Agile Scrum methodology divided into 4 core phases ensuring complete delivery within 150 days:

• Stage 1 (Month 1-2 • 30% Payment): System Requirements Specification (SRS), UI/UX wireframes, Centralized Athlete Repository & Venue Management.
• Stage 2 (Month 3 • 20% Payment): Native Android Mobile Application live on Google Play Store with offline scoring engine.
• Stage 3 (Month 4 • 20% Payment): Native iOS Mobile Application live on Apple App Store & direct payment gateway integration.
• Stage 4 (Month 5 / Day 150 • 30% Payment): CERT-In Safe-to-Host security clearance, staging dry-run, and final production handover on State Data Centre.`,
    },
    {
      id: "ch-5",
      sectionKey: "sec-ch5",
      chapterNumber: "Chapter 5",
      title: "Information Security, CERT-In Safe-to-Host & 3-Year SLA",
      subtitle:
        "ISO 27001 certified security practices, VAPT clearance, and 24x7 helpdesk",
      pageNumber: 7,
      content: `In accordance with Government of India cybersecurity guidelines, the system will undergo rigorous vulnerability assessment and penetration testing (VAPT) by a CERT-In empaneled security agency prior to go-live. 

Cybersecurity & Operations Commitment:
• AES-256 bit encryption at rest and TLS 1.3 cryptographic protocols in transit.
• Strict compliance with Digital Personal Data Protection (DPDP) Act 2023.
• 24x7 L1/L2/L3 dedicated technical support helpdesk with a maximum 15-minute response time for Critical Priority incidents.
• 36 Months comprehensive on-site warranty, corrective maintenance, and zero-downtime security patches.`,
    },
  ]);

  // ================= 2. COMPLIANCE CLAUSES =================
  const [complianceClauses, setComplianceClauses] = useState([
    {
      id: "cl-1",
      clauseNumber: "TC-01",
      category: "Functional",
      requirement:
        "Online Athlete & Coach Registration Portal with DigiLocker / Aadhaar OTP verification.",
      complianceStatus: "COMPLIED",
      bidderResponse:
        "Fully compliant. Integrated with MeriPehchan & DigiLocker sandbox with Aadhaar e-KYC support.",
      proposalPageRef: "Ch 2, Page 4",
    },
    {
      id: "cl-2",
      clauseNumber: "TC-02",
      category: "Functional",
      requirement:
        "Tournament Bracket Generation & Real-time Live Scoring Engine with Sub-second updates.",
      complianceStatus: "EXCEEDED",
      bidderResponse:
        "Exceeded. Built with WebSockets & Redis Pub/Sub capable of 50,000 concurrent live score stream connections.",
      proposalPageRef: "Ch 3, Page 5",
    },
    {
      id: "cl-3",
      category: "Architecture",
      clauseNumber: "TC-03",
      requirement:
        "High-Availability Cloud Architecture with 99.9% uptime and zero data loss disaster recovery.",
      complianceStatus: "COMPLIED",
      bidderResponse:
        "Complied. Multi-zone active-standby cloud architecture on MeitY empaneled cloud with automated RPO < 5 mins.",
      proposalPageRef: "Ch 3, Page 5",
    },
    {
      id: "cl-4",
      category: "Security",
      clauseNumber: "TC-04",
      requirement:
        "CERT-In Safe-to-Host Security Certification before production go-live.",
      complianceStatus: "COMPLIED",
      bidderResponse:
        "Complied. Full CERT-In VAPT audit by empanelled auditor is factored into Phase 3 timeline and budget.",
      proposalPageRef: "Ch 5, Page 7",
    },
    {
      id: "cl-5",
      category: "Hosting",
      clauseNumber: "TC-05",
      requirement:
        "Data Sovereignty: All database servers, backups, and user logs must reside within Indian borders.",
      complianceStatus: "COMPLIED",
      bidderResponse:
        "Complied. Servers located in Mumbai & Hyderabad Tier-3 data centers with Indian data residency guarantee.",
      proposalPageRef: "Ch 3, Page 5",
    },
    {
      id: "cl-6",
      category: "SLA",
      clauseNumber: "TC-06",
      requirement:
        "36 Months post-launch comprehensive Operations & Maintenance (O&M) with dedicated helpdesk.",
      complianceStatus: "COMPLIED",
      bidderResponse:
        "Complied. 24x7 L1/L2/L3 support with 15-minute response time and dedicated on-site support engineers.",
      proposalPageRef: "Ch 5, Page 7",
    },
  ]);

  // ================= 3. KEY PERSONNEL =================
  const [teamMembers] = useState([
    {
      id: "tm-1",
      name: signatory.signatoryName || "Vikas Kumar",
      designation: "Project Head & Delivery Lead (10 Marks in QCBS)",
      proposedRole: "Overall Project Governance & Delivery Lead",
      experienceYears: 15,
      qualification: "B.Tech (Computer Science), MBA",
      certifications: [
        "PMP Certified (PMI)",
        "ITIL v4 Expert",
        "Scrum Master (CSM)",
      ],
      rfpMatchScore: 100,
    },
    {
      id: "tm-2",
      name: "Arindam Roy",
      designation: "Chief Technology Officer (CTO) (5 Marks in QCBS)",
      proposedRole: "Cloud Architecture, Microservices & DB Design",
      experienceYears: 16,
      qualification: "M.Tech (Software Engineering, IIT Roorkee)",
      certifications: ["AWS Certified Solutions Architect Pro", "TOGAF 9.2"],
      rfpMatchScore: 100,
    },
    {
      id: "tm-3",
      name: "Siddharth Verma",
      designation: "Sports Automation & Digitization SME (5 Marks in QCBS)",
      proposedRole: "Sports Tech, Tournament Workflows & Live Scoring",
      experienceYears: 12,
      qualification: "B.E. (Information Technology), PGD Sports Analytics",
      certifications: [
        "Certified Scrum Product Owner (CSPO)",
        "Flutter Certified",
      ],
      rfpMatchScore: 100,
    },
    {
      id: "tm-4",
      name: "Neha Kapoor",
      designation: "Principal Cybersecurity & CERT-In Auditor",
      proposedRole: "VAPT, OWASP Top 10, Data Privacy & ISO 27001",
      experienceYears: 11,
      qualification: "M.S. in Information Security",
      certifications: ["CISSP", "CISA", "CEH v12"],
      rfpMatchScore: 100,
    },
  ]);

  // ================= 4. STATUTORY ANNEXURES =================
  const [annexures] = useState([
    {
      id: "ann-1",
      annexureNumber: "Annexure - 1",
      title: "Technical Bid Covering Letter for Agency",
      formatType: "Company Letterhead",
      summary: `To The Executive Director, ${tender.organization}. We hereby submit our Technical Proposal in response to RFP No: ${tender.tenderNumber}. We confirm unconditional compliance and offer 180 days bid validity.`,
    },
    {
      id: "ann-2",
      annexureNumber: "Annexure - 2",
      title: "Self-Declaration of Non-Blacklisting & Integrity Pact",
      formatType: "₹100 Stamp Paper / Affidavit",
      summary: `Solemnly affirmed that ${signatory.companyName} has never been blacklisted or debarred by any Central/State Govt department or PSU in India during the last 3 financial years.`,
    },
    {
      id: "ann-3",
      annexureNumber: "Annexure - 3",
      title: "Power of Attorney (PoA) for Authorized Signatory",
      formatType: "₹100 Stamp Paper",
      summary: `Board Resolution dated 15 Jan 2026 granting full legal power of attorney to ${signatory.signatoryName} (${signatory.signatoryTitle}) to execute all tender submissions and contractual obligations.`,
    },
    {
      id: "ann-4",
      annexureNumber: "Annexure - 4",
      title: "MSE / Startup Exemption & Udyam Declaration",
      formatType: "Udyam Certificate / Rule 170 GFR",
      summary: `Claiming 100% EMD Exemption under Rule 170 of GFR 2017 with valid UDYAM Registration: ${signatory.udyamRegistration}.`,
    },
  ]);

  // Total pages calculation
  const totalDocumentPages = 10;

  // Format Helper for Text
  const handleFormatText = (
    command: string,
    value: string | undefined = undefined,
  ) => {
    document.execCommand(command, false, value);
  };

  // Quick AI Prompt Handler
  const handleExecuteAiPolish = (promptText: string) => {
    if (!promptText.trim()) return;
    setIsAiProcessing(true);
    toast.loading(`AI Copilot: Enhancing proposal document...`, {
      id: "ai-copilot-proc",
    });

    setTimeout(() => {
      setIsAiProcessing(false);
      setChapters((prev) =>
        prev.map((ch, idx) => {
          if (idx === 0) {
            return {
              ...ch,
              content:
                ch.content +
                `\n\n[AI ENHANCED CLAUSE - ${new Date().toLocaleDateString()}]:\nOur solution guarantees stringent compliance with the Digital Personal Data Protection (DPDP) Act 2023, zero data leakage SLA, and automated failover across MeitY Tier-3 datacenter zones.`,
            };
          }
          return ch;
        }),
      );
      toast.success("Document updated successfully with AI Copilot!", {
        id: "ai-copilot-proc",
        description: `Refinements applied to Chapter 1 & Master Technical Dossier.`,
      });
      setAiPromptInput("");
    }, 900);
  };

  // Jump to Section
  const handleScrollToSection = (sectionId: string) => {
    setActiveSectionNav(sectionId);
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  // REAL WORD (.doc / .docx) EXPORT GENERATOR
  const handleDownloadWordDoc = () => {
    const docTitle = `Technical_Proposal_${tender.tenderNumber.replace(/[^a-zA-Z0-9]/g, "_")}_Cover2`;

    let bodyHTML = `
      <!-- COVER PAGE -->
      <div class="WordSection">
        <div style="border: 3pt double #0f172a; padding: 24pt; min-height: 700pt; box-sizing: border-box; font-family: 'Calibri', Arial, sans-serif;">
          <div style="text-align: center; border-bottom: 2pt solid #0f172a; padding-bottom: 12pt; margin-bottom: 16pt;">
            <p style="font-size: 11pt; font-weight: bold; letter-spacing: 2pt; color: #475569; margin: 0;">GOVERNMENT OF JHARKHAND</p>
            <p style="font-size: 15pt; font-weight: bold; color: #0f172a; margin: 4pt 0 0 0;">${tender.organization.toUpperCase()}</p>
          </div>

          <div style="background-color: #0f172a; color: #ffffff; padding: 12pt; text-align: center; margin-bottom: 16pt;">
            <p style="font-size: 14pt; font-weight: bold; color: #38bdf8; margin: 0; text-transform: uppercase;">TECHNICAL & COMMERCIAL BID SUBMISSION DOSSIER</p>
            <p style="font-size: 10pt; color: #e2e8f0; margin: 4pt 0 0 0;">Tender Notice Reference: ${tender.tenderNumber} • GeM Portal</p>
          </div>

          <div style="border-left: 4pt solid #0284c7; background: #f8fafc; padding: 10pt; margin-bottom: 16pt;">
            <p style="font-size: 9pt; font-weight: bold; color: #64748b; margin: 0; text-transform: uppercase;">NAME OF WORK / PROJECT SCOPE:</p>
            <p style="font-size: 11pt; font-weight: bold; color: #0f172a; margin: 4pt 0 0 0;">"${tender.title}"</p>
          </div>

          <table style="width: 100%; border-collapse: collapse; margin-bottom: 20pt;">
            <tr>
              <td style="width: 50%; vertical-align: top; border: 1pt solid #cbd5e1; padding: 10pt; background: #ffffff;">
                <p style="font-size: 10pt; font-weight: bold; color: #0f172a; border-bottom: 1pt solid #0f172a; padding-bottom: 3pt; margin: 0 0 6pt 0;">SUBMITTED BY (BIDDER):</p>
                <p style="font-size: 10pt; color: #1e293b; margin: 2pt 0;"><strong>${signatory.companyName}</strong></p>
                <p style="font-size: 8.5pt; color: #475569; margin: 2pt 0;">CIN: ${signatory.cin}</p>
                <p style="font-size: 8.5pt; color: #475569; margin: 2pt 0;">GSTIN: ${signatory.gstin} | PAN: ${signatory.pan}</p>
                <p style="font-size: 8.5pt; color: #475569; margin: 2pt 0;">${signatory.hqLocation}</p>
              </td>
              <td style="width: 50%; vertical-align: top; border: 1pt solid #cbd5e1; padding: 10pt; background: #ffffff;">
                <p style="font-size: 10pt; font-weight: bold; color: #0f172a; border-bottom: 1pt solid #0f172a; padding-bottom: 3pt; margin: 0 0 6pt 0;">SUBMITTED TO (AUTHORITY):</p>
                <p style="font-size: 10pt; color: #1e293b; margin: 2pt 0;"><strong>The Executive Director</strong></p>
                <p style="font-size: 8.5pt; color: #475569; margin: 2pt 0;">${tender.organization}</p>
                <p style="font-size: 8.5pt; color: #059669; font-weight: bold; margin: 4pt 0 0 0;">Submission Date: ${new Date().toLocaleDateString("en-IN", { day: "2-digit", month: "long", year: "numeric" })}</p>
              </td>
            </tr>
          </table>

          <div style="border-top: 2pt solid #0f172a; padding-top: 12pt;">
            <p style="font-size: 9pt; color: #64748b; margin: 0;">Bid Validity: 180 Days from Deadline • 100% GFR 2017 Compliant</p>
            <p style="font-size: 10pt; font-weight: bold; color: #0284c7; margin: 6pt 0 0 0;">Digitally Signed with Class-3 DSC: ${signatory.signatoryName} (${signatory.signatoryTitle})</p>
          </div>
        </div>
      </div>
      <br clear="all" style="mso-special-character:line-break;page-break-before:always" />

      <!-- TABLE OF CONTENTS -->
      <div class="WordSection">
        <div style="border-bottom: 1pt solid #94a3b8; padding-bottom: 6pt; margin-bottom: 18pt; font-size: 8.5pt; color: #64748b; display: flex; justify-content: space-between;">
          <span>CONFIDENTIAL • BID REF: ${tender.tenderNumber}</span>
          <span style="float: right;">${signatory.companyName}</span>
        </div>

        <h2 style="font-size: 14pt; font-weight: bold; color: #0f172a; text-transform: uppercase; border-bottom: 2pt solid #0f172a; padding-bottom: 6pt; margin-bottom: 14pt; text-align: center;">
          TABLE OF CONTENTS / INDEX OF BID DOSSIER
        </h2>

        <table style="width: 100%; border-collapse: collapse; margin-bottom: 20pt;">
          <thead>
            <tr style="background-color: #0f172a; color: #ffffff;">
              <th style="padding: 6pt; font-size: 9pt; width: 10%;">S.No</th>
              <th style="padding: 6pt; font-size: 9pt; width: 60%; text-align: left;">Section / Document Title</th>
              <th style="padding: 6pt; font-size: 9pt; width: 15%; text-align: left;">Type</th>
              <th style="padding: 6pt; font-size: 9pt; width: 15%; text-align: right;">Page Ref</th>
            </tr>
          </thead>
          <tbody>
            <tr style="border-bottom: 1pt solid #e2e8f0;"><td style="padding: 6pt; text-align: center;">1</td><td style="padding: 6pt; font-weight: bold;">Master Cover Page &amp; Submission Dossier</td><td style="padding: 6pt;">Cover</td><td style="padding: 6pt; text-align: right; color: #0284c7; font-weight: bold;">Page 1</td></tr>
            <tr style="border-bottom: 1pt solid #e2e8f0;"><td style="padding: 6pt; text-align: center;">2</td><td style="padding: 6pt; font-weight: bold;">Table of Contents &amp; Sequential Index</td><td style="padding: 6pt;">Index</td><td style="padding: 6pt; text-align: right; color: #0284c7; font-weight: bold;">Page 2</td></tr>
            ${chapters
              .map(
                (ch, i) => `
              <tr style="border-bottom: 1pt solid #e2e8f0;">
                <td style="padding: 6pt; text-align: center;">${i + 3}</td>
                <td style="padding: 6pt; font-weight: bold;">${ch.chapterNumber}: ${ch.title}</td>
                <td style="padding: 6pt;">Technical</td>
                <td style="padding: 6pt; text-align: right; color: #0284c7; font-weight: bold;">Page ${ch.pageNumber}</td>
              </tr>
            `,
              )
              .join("")}
            <tr style="border-bottom: 1pt solid #e2e8f0;"><td style="padding: 6pt; text-align: center;">8</td><td style="padding: 6pt; font-weight: bold;">Clause-by-Clause Compliance Matrix (28 Clauses)</td><td style="padding: 6pt;">Matrix</td><td style="padding: 6pt; text-align: right; color: #0284c7; font-weight: bold;">Page 8</td></tr>
            <tr style="border-bottom: 1pt solid #e2e8f0;"><td style="padding: 6pt; text-align: center;">9</td><td style="padding: 6pt; font-weight: bold;">Key Personnel &amp; Manpower Deployment (QCBS 20 Marks)</td><td style="padding: 6pt;">Team CVs</td><td style="padding: 6pt; text-align: right; color: #0284c7; font-weight: bold;">Page 9</td></tr>
            <tr style="border-bottom: 1pt solid #e2e8f0;"><td style="padding: 6pt; text-align: center;">10</td><td style="padding: 6pt; font-weight: bold;">Statutory Annexures (Letterhead, ₹100 Stamp, PoA, MSME)</td><td style="padding: 6pt;">Annexures</td><td style="padding: 6pt; text-align: right; color: #0284c7; font-weight: bold;">Page 10</td></tr>
          </tbody>
        </table>
      </div>
      <br clear="all" style="mso-special-character:line-break;page-break-before:always" />
    `;

    // CHAPTERS
    chapters.forEach((ch) => {
      bodyHTML += `
        <div class="WordSection">
          <div style="border-bottom: 1pt solid #94a3b8; padding-bottom: 6pt; margin-bottom: 18pt; font-size: 8.5pt; color: #64748b; font-family: 'Calibri', Arial, sans-serif; display: flex; justify-content: space-between;">
            <span>CONFIDENTIAL • BID REF: ${tender.tenderNumber}</span>
            <span style="text-align: right; float: right;">${signatory.companyName}</span>
          </div>

          <h2 style="font-family: 'Arial', sans-serif; font-size: 14pt; font-weight: bold; color: #0f172a; text-transform: uppercase; border-bottom: 2pt solid #0f172a; padding-bottom: 6pt; margin-bottom: 14pt;">
            ${ch.chapterNumber}: ${ch.title}
          </h2>

          <div style="font-family: 'Times New Roman', serif; font-size: 11pt; line-height: 1.6; color: #1e293b; white-space: pre-line;">
            ${ch.content}
          </div>

          <div style="border-top: 1pt solid #cbd5e1; padding-top: 8pt; margin-top: 24pt; font-size: 8.5pt; color: #64748b; font-family: 'Calibri', Arial, sans-serif; display: flex; justify-content: space-between;">
            <span>Authorized Signatory: ${signatory.signatoryName} (Class-3 DSC: ${signatory.dscSerial})</span>
            <span style="float: right; font-weight: bold; color: #0f172a;">Page ${ch.pageNumber} of ${totalDocumentPages}</span>
          </div>
        </div>
        <br clear="all" style="mso-special-character:line-break;page-break-before:always" />
      `;
    });

    const fullDocHTML = `
      <html xmlns:o='urn:schemas-microsoft-com:office:office' xmlns:w='urn:schemas-microsoft-com:office:word' xmlns='http://www.w3.org/TR/REC-html40'>
      <head>
        <meta charset="utf-8">
        <title>${docTitle}</title>
        <style>
          @page WordSection {
            size: 595.3pt 841.9pt; /* A4 size */
            margin: 54pt 54pt 54pt 54pt;
          }
          div.WordSection { page: WordSection; }
          body { font-family: 'Times New Roman', Georgia, serif; }
        </style>
      </head>
      <body>
        ${bodyHTML}
      </body>
      </html>
    `;

    const blob = new Blob(["\ufeff", fullDocHTML], {
      type: "application/msword",
    });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `${docTitle}.doc`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);

    toast.success("Downloaded Microsoft Word (.doc/.docx) Document!", {
      description: `Saved "${docTitle}.doc" with Master Cover, Index & ${totalDocumentPages} A4 Pages.`,
    });
  };

  // PDF Print Handler
  const handlePrintPdf = () => {
    toast.success("Opening Print / Save as PDF Dialog...", {
      description: "Select 'Save as PDF' to export high-res document.",
    });
    setTimeout(() => {
      window.print();
    }, 300);
  };

  return (
    <div
      className={`space-y-6 ${isFocusMode ? "fixed inset-0 z-50 bg-[#0F172A] p-4 overflow-y-auto" : ""}`}
    >
      {/* ── TOP HERO HEADER BAR ── */}
      <div className="bg-[#101827] text-white rounded-2xl border border-slate-700/80 shadow-md p-5 flex flex-col lg:flex-row lg:items-center justify-between gap-4">
        <div className="flex items-start gap-3.5">
          <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-[#0284c7] to-[#0f172a] text-white flex items-center justify-center shrink-0 shadow-inner border border-sky-400/30">
            <PenLine size={22} className="text-sky-300" />
          </div>
          <div>
            <div className="flex items-center gap-2 flex-wrap">
              <span className="text-[10px] font-mono font-bold uppercase tracking-wider bg-sky-500/20 text-sky-300 px-2 py-0.5 rounded-md border border-sky-500/30">
                Step 4 of 5
              </span>
              <span className="text-xs font-semibold text-slate-300">
                Cover-2: Technical Proposal Studio
              </span>
              <span className="text-[11px] bg-slate-800 text-slate-300 px-2 py-0.5 rounded-md font-mono border border-slate-700">
                RFP: {tender.tenderNumber}
              </span>
            </div>
            <h2 className="text-lg md:text-xl font-black text-white tracking-tight mt-1 flex items-center gap-2">
              <span>Technical Proposal &amp; Document Authoring Desk</span>
              <span className="text-emerald-400 text-xs font-mono font-normal bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/20">
                Live WYSIWYG Mode
              </span>
            </h2>
            <p className="text-xs text-slate-400 mt-0.5">
              Word-like interactive A4 document workbench with live text
              editing, statutory annexures, and real .docx export.
            </p>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center gap-2.5 flex-wrap sm:flex-nowrap">
          <button
            type="button"
            onClick={handleDownloadWordDoc}
            className="px-3.5 py-2 bg-[#0284c7] hover:bg-[#0369a1] text-white rounded-xl text-xs font-bold flex items-center gap-1.5 shadow-sm transition-all cursor-pointer"
            title="Download formatted Microsoft Word document (.doc/.docx)"
          >
            <FileDown size={14} />
            <span>Download .docx</span>
          </button>

          <button
            type="button"
            onClick={() => setIsPdfModalOpen(true)}
            className="px-3.5 py-2 bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 rounded-xl text-xs font-bold flex items-center gap-1.5 transition-colors cursor-pointer"
          >
            <Eye size={14} className="text-emerald-400" />
            <span>Preview PDF</span>
          </button>

          <button
            type="button"
            onClick={handlePrintPdf}
            className="px-3 py-2 bg-slate-800 hover:bg-slate-700 text-slate-300 border border-slate-700 rounded-xl text-xs font-bold flex items-center gap-1.5 transition-colors cursor-pointer"
            title="Print Document to PDF"
          >
            <Printer size={14} />
            <span className="hidden sm:inline">Print</span>
          </button>
        </div>
      </div>

      {/* ── MAIN TWO-COLUMN WORKBENCH (LEFT: DESK CONTROLS | RIGHT: LIVE A4 CANVAS) ── */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* ================= LEFT SIDEBAR PANEL (4 COLS) ================= */}
        <div className="lg:col-span-4 space-y-4">
          {/* 1. TENDER SUMMARY & KEY METRICS (Exact look as shared in screenshot) */}
          <div className="bg-[#111625] rounded-2xl border border-slate-800 p-4 text-white space-y-3.5 shadow-md">
            <div className="flex items-center justify-between pb-2 border-b border-slate-800">
              <span className="text-[11px] font-mono font-bold uppercase tracking-wider text-slate-400">
                Tender Metadata
              </span>
              <span className="text-[10px] font-bold bg-emerald-500/20 text-emerald-400 px-2 py-0.5 rounded border border-emerald-500/30">
                Active &amp; Verified
              </span>
            </div>

            <div className="grid grid-cols-2 gap-3 text-xs">
              <div className="bg-[#1A2234] p-2.5 rounded-xl border border-slate-800/80">
                <span className="text-[10.5px] text-slate-400 block mb-0.5">
                  📅 Submission Deadline:
                </span>
                <strong className="text-slate-100 font-bold block text-xs">
                  {tender.submissionDeadline || "15 Oct 2026, 03:00 PM"}
                </strong>
              </div>

              <div className="bg-[#1A2234] p-2.5 rounded-xl border border-slate-800/80">
                <span className="text-[10.5px] text-slate-400 block mb-0.5">
                  🏛️ Pre-Bid Meeting:
                </span>
                <strong className="text-slate-100 font-bold block text-xs">
                  30 Sep 2026, 11:00 AM
                </strong>
              </div>

              <div className="bg-[#1A2234] p-2.5 rounded-xl border border-slate-800/80">
                <span className="text-[10.5px] text-slate-400 block mb-0.5">
                  💰 Tender Fee:
                </span>
                <strong className="text-amber-400 font-bold block text-xs">
                  ₹5,000
                </strong>
              </div>

              <div className="bg-[#1A2234] p-2.5 rounded-xl border border-slate-800/80">
                <span className="text-[10.5px] text-slate-400 block mb-0.5">
                  🛡️ EMD Security:
                </span>
                <strong className="text-emerald-400 font-bold block text-xs">
                  ₹5,00,000 (MSME Exempt)
                </strong>
              </div>
            </div>

            {/* 2. CREDENTIAL VERIFICATION CHECKLIST (Exact look from screenshot) */}
            <div className="space-y-2 pt-1 border-t border-slate-800/80">
              <span className="text-[10.5px] font-mono font-bold uppercase tracking-wider text-slate-400 block">
                CREDENTIAL VERIFICATION CHECKLIST:
              </span>

              <div className="bg-[#1A2234] p-2.5 rounded-xl border border-slate-800/90 flex items-center justify-between gap-2">
                <div>
                  <strong className="text-xs text-slate-200 block">
                    GST &amp; PAN Registration
                  </strong>
                  <span className="text-[10.5px] text-slate-400 block mt-0.5">
                    Active GSTIN in State • Found: {signatory.gstin} (Active)
                  </span>
                </div>
                <span className="text-[10.5px] font-bold bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 px-2 py-0.5 rounded-md shrink-0">
                  ✓ Pass
                </span>
              </div>

              <div className="bg-[#1A2234] p-2.5 rounded-xl border border-slate-800/90 flex items-center justify-between gap-2">
                <div>
                  <strong className="text-xs text-slate-200 block">
                    3-Year Financial Turnover
                  </strong>
                  <span className="text-[10.5px] text-slate-400 block mt-0.5">
                    Req: Min Avg ₹1.50 Cr • Found: {signatory.companyName} Avg:
                    ₹3.46 Cr
                  </span>
                </div>
                <span className="text-[10.5px] font-bold bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 px-2 py-0.5 rounded-md shrink-0">
                  ✓ Pass
                </span>
              </div>

              <div className="bg-[#1A2234] p-2.5 rounded-xl border border-slate-800/90 flex items-center justify-between gap-2">
                <div>
                  <strong className="text-xs text-slate-200 block">
                    Technical Experience &amp; Delivery
                  </strong>
                  <span className="text-[10.5px] text-slate-400 block mt-0.5">
                    5+ State Govt Sports Portals Delivered on Schedule
                  </span>
                </div>
                <span className="text-[10.5px] font-bold bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 px-2 py-0.5 rounded-md shrink-0">
                  ✓ Pass
                </span>
              </div>
            </div>

            {/* 3. QUICK AI / ENHANCEMENT ACTION CHIPS */}
            <div className="pt-2 border-t border-slate-800/80 space-y-2">
              <span className="text-[10.5px] font-mono font-bold uppercase tracking-wider text-slate-400 block">
                QUICK REFINEMENT PRESETS:
              </span>
              <div className="flex flex-wrap gap-1.5">
                {[
                  "⚡ Add 5-Year Comprehensive Warranty",
                  "⚡ Emphasize 99.99% Cloud SLA",
                  "⚡ Insert DPDP Act 2023 Compliance",
                  "⚡ Add Disaster Recovery RPO < 5 min",
                ].map((chip, idx) => (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => handleExecuteAiPolish(chip)}
                    className="text-[10.5px] bg-[#1A2234] hover:bg-[#232D45] text-sky-300 border border-sky-500/30 px-2.5 py-1 rounded-lg font-medium transition-all cursor-pointer"
                  >
                    {chip}
                  </button>
                ))}
              </div>
            </div>

            {/* 4. AI INSTRUCTION INPUT BOX */}
            <div className="pt-2 border-t border-slate-800/80 space-y-2">
              <div className="relative">
                <input
                  type="text"
                  value={aiPromptInput}
                  onChange={(e) => setAiPromptInput(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") handleExecuteAiPolish(aiPromptInput);
                  }}
                  placeholder="Instruct AI to edit any clause, add warranty, or adjust index..."
                  className="w-full bg-[#1A2234] border border-slate-700/80 rounded-xl pl-3 pr-20 py-2.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-sky-500"
                />
                <button
                  type="button"
                  disabled={isAiProcessing || !aiPromptInput.trim()}
                  onClick={() => handleExecuteAiPolish(aiPromptInput)}
                  className="absolute right-1.5 top-1/2 -translate-y-1/2 px-3 py-1 bg-emerald-600 hover:bg-emerald-500 text-white rounded-lg text-xs font-bold flex items-center gap-1 transition-all disabled:opacity-40 cursor-pointer"
                >
                  <Send size={11} />
                  <span>Send</span>
                </button>
              </div>
              <span className="text-[10.5px] text-slate-500 block">
                Step 4 of 5 • Live Interactive Bid Document Engine
              </span>
            </div>
          </div>

          {/* 5. DOCUMENT SECTIONS NAVIGATOR / OUTLINE PANE */}
          <div className="bg-white rounded-2xl border border-slate-200 shadow-2xs p-4 space-y-3">
            <div className="flex items-center justify-between pb-1 border-b border-slate-100">
              <span className="text-xs font-black text-slate-900 flex items-center gap-1.5">
                <BookOpen size={14} className="text-[#0284c7]" />
                <span>Document Outline ({totalDocumentPages} Pages)</span>
              </span>
              <span className="text-[10.5px] font-mono text-emerald-700 font-bold bg-emerald-50 px-2 py-0.5 rounded">
                100% Ready
              </span>
            </div>

            <div className="space-y-1.5 max-h-[360px] overflow-y-auto pr-1">
              {[
                {
                  id: "sec-cover",
                  title: "Master Cover Page & Submission Dossier",
                  page: "Page 1",
                  icon: Crown,
                },
                {
                  id: "sec-toc",
                  title: "Table of Contents / Sequential Index",
                  page: "Page 2",
                  icon: ScrollText,
                },
                {
                  id: "sec-ch1",
                  title: "Chapter 1: Letter of Transmittal & Exec Summary",
                  page: "Page 3",
                  icon: FileText,
                },
                {
                  id: "sec-ch2",
                  title: "Chapter 2: Scope & 19 Functional Modules",
                  page: "Page 4",
                  icon: FileText,
                },
                {
                  id: "sec-ch3",
                  title: "Chapter 3: System Architecture & Cloud Hosting",
                  page: "Page 5",
                  icon: Cpu,
                },
                {
                  id: "sec-ch4",
                  title: "Chapter 4: Implementation Roadmap (150 Days)",
                  page: "Page 6",
                  icon: CalendarDays,
                },
                {
                  id: "sec-ch5",
                  title: "Chapter 5: Security, CERT-In & 3-Year SLA",
                  page: "Page 7",
                  icon: ShieldCheck,
                },
                {
                  id: "sec-matrix",
                  title: "Clause Compliance Matrix (28 Clauses)",
                  page: "Page 8",
                  icon: FileSpreadsheet,
                },
                {
                  id: "sec-team",
                  title: "Key Personnel & CV Matrix (20 Marks)",
                  page: "Page 9",
                  icon: Users2,
                },
                {
                  id: "sec-annexures",
                  title: "Statutory Annexures (Letterhead, Stamp Paper)",
                  page: "Page 10",
                  icon: Award,
                },
              ].map((item) => {
                const IconComponent = item.icon;
                const isActive = activeSectionNav === item.id;
                return (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => handleScrollToSection(item.id)}
                    className={`w-full text-left p-2.5 rounded-xl text-xs font-semibold flex items-center justify-between gap-2 transition-all cursor-pointer ${
                      isActive
                        ? "bg-[#0284c7]/10 text-[#0284c7] border border-[#0284c7]/30 font-bold"
                        : "text-slate-700 hover:bg-slate-50 border border-transparent"
                    }`}
                  >
                    <div className="flex items-center gap-2 truncate">
                      <IconComponent
                        size={14}
                        className={
                          isActive ? "text-[#0284c7]" : "text-slate-400"
                        }
                      />
                      <span className="truncate">{item.title}</span>
                    </div>
                    <span className="text-[10px] font-mono text-slate-400 shrink-0">
                      {item.page}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* 6. SIGNATORY & DSC TOKEN BADGE */}
          <div className="bg-slate-900 text-white p-4 rounded-2xl border border-slate-800 space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-slate-300 flex items-center gap-1.5">
                <Stamp size={14} className="text-sky-400" />
                <span>Signatory &amp; DSC Token</span>
              </span>
              <span className="text-[10px] bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 px-2 py-0.5 rounded font-mono">
                Class-3 Active
              </span>
            </div>

            <div className="space-y-1 text-xs text-slate-300">
              <strong className="text-slate-100 block">
                {signatory.signatoryName}
              </strong>
              <span className="text-slate-400 block text-[11px]">
                {signatory.signatoryTitle}
              </span>
              <span className="text-sky-400 font-mono text-[10.5px] block">
                Token Serial: {signatory.dscSerial}
              </span>
            </div>

            <div className="pt-2 border-t border-slate-800 flex items-center justify-between text-xs text-slate-400">
              <label className="flex items-center gap-2 cursor-pointer select-none">
                <input
                  type="checkbox"
                  checked={showCompanySeal}
                  onChange={(e) => setShowCompanySeal(e.target.checked)}
                  className="rounded text-sky-600 focus:ring-sky-500 cursor-pointer"
                />
                <span>Embed Round Seal</span>
              </label>

              <label className="flex items-center gap-2 cursor-pointer select-none">
                <input
                  type="checkbox"
                  checked={showDscSignature}
                  onChange={(e) => setShowDscSignature(e.target.checked)}
                  className="rounded text-sky-600 focus:ring-sky-500 cursor-pointer"
                />
                <span>Embed Class-3 DSC</span>
              </label>
            </div>
          </div>
        </div>

        {/* ================= RIGHT WORKBENCH: LIVE A4 DOCUMENT CANVAS (8 COLS) ================= */}
        <div className="lg:col-span-8 space-y-4">
          {/* MS WORD STUDIO TOOLBAR */}
          <div className="bg-[#10131C] border border-slate-800 rounded-2xl p-2.5 px-4 text-white flex items-center justify-between gap-3 shadow-md flex-wrap">
            <div className="flex items-center gap-2">
              <div className="w-6 h-6 rounded bg-[#0284c7] text-white flex items-center justify-center font-black text-xs">
                W
              </div>
              <span className="text-xs font-bold text-slate-200">
                A4 Bid Studio
              </span>
              <span className="text-[11px] text-slate-400 bg-slate-800 px-2 py-0.5 rounded font-mono">
                {totalDocumentPages} Pages Ready
              </span>
            </div>

            {/* Formatting Tools (Bold, Italic, Underline, H1, H2, Lists, Align) */}
            <div className="flex items-center gap-1 bg-slate-800/80 p-1 rounded-xl border border-slate-700/80 text-slate-300">
              <button
                type="button"
                onClick={() => handleFormatText("bold")}
                className="p-1.5 hover:bg-slate-700 hover:text-white rounded-lg transition-colors cursor-pointer"
                title="Bold (Ctrl+B)"
              >
                <Bold size={13} />
              </button>
              <button
                type="button"
                onClick={() => handleFormatText("italic")}
                className="p-1.5 hover:bg-slate-700 hover:text-white rounded-lg transition-colors cursor-pointer"
                title="Italic (Ctrl+I)"
              >
                <Italic size={13} />
              </button>
              <button
                type="button"
                onClick={() => handleFormatText("underline")}
                className="p-1.5 hover:bg-slate-700 hover:text-white rounded-lg transition-colors cursor-pointer"
                title="Underline (Ctrl+U)"
              >
                <Underline size={13} />
              </button>

              <span className="text-slate-600 px-0.5">|</span>

              <button
                type="button"
                onClick={() => handleFormatText("formatBlock", "<h1>")}
                className="px-1.5 py-1 hover:bg-slate-700 hover:text-white rounded-lg text-[11px] font-bold transition-colors cursor-pointer"
                title="Heading 1"
              >
                H1
              </button>
              <button
                type="button"
                onClick={() => handleFormatText("formatBlock", "<h2>")}
                className="px-1.5 py-1 hover:bg-slate-700 hover:text-white rounded-lg text-[11px] font-bold transition-colors cursor-pointer"
                title="Heading 2"
              >
                H2
              </button>

              <span className="text-slate-600 px-0.5">|</span>

              <button
                type="button"
                onClick={() => handleFormatText("insertUnorderedList")}
                className="p-1.5 hover:bg-slate-700 hover:text-white rounded-lg transition-colors cursor-pointer"
                title="Bullet List"
              >
                <List size={13} />
              </button>
              <button
                type="button"
                onClick={() => handleFormatText("insertOrderedList")}
                className="p-1.5 hover:bg-slate-700 hover:text-white rounded-lg transition-colors cursor-pointer"
                title="Numbered List"
              >
                <ListOrdered size={13} />
              </button>
            </div>

            {/* Zoom & Focus Controls */}
            <div className="flex items-center gap-2">
              <div className="flex items-center gap-1 bg-slate-800/80 px-2 py-1 rounded-xl border border-slate-700/80 text-xs">
                <button
                  type="button"
                  onClick={() => setZoomLevel((z) => Math.max(70, z - 10))}
                  className="p-1 text-slate-400 hover:text-white cursor-pointer"
                  title="Zoom Out"
                >
                  <ZoomOut size={13} />
                </button>
                <span className="font-mono text-[11px] text-slate-300 w-9 text-center font-bold">
                  {zoomLevel}%
                </span>
                <button
                  type="button"
                  onClick={() => setZoomLevel((z) => Math.min(130, z + 10))}
                  className="p-1 text-slate-400 hover:text-white cursor-pointer"
                  title="Zoom In"
                >
                  <ZoomIn size={13} />
                </button>
              </div>

              <button
                type="button"
                onClick={() => setIsFocusMode(!isFocusMode)}
                className={`p-2 rounded-xl border text-xs font-bold flex items-center gap-1 transition-all cursor-pointer ${
                  isFocusMode
                    ? "bg-sky-500/20 text-sky-300 border-sky-500/40"
                    : "bg-slate-800 hover:bg-slate-700 text-slate-300 border-slate-700"
                }`}
                title="Toggle Fullscreen Focus Mode"
              >
                {isFocusMode ? (
                  <Minimize2 size={13} />
                ) : (
                  <Maximize2 size={13} />
                )}
              </button>
            </div>
          </div>

          {/* THE REAL A4 PAPER WORKBENCH CONTAINER */}
          <div
            className="bg-[#161922] p-4 sm:p-8 rounded-2xl border border-slate-800/90 overflow-y-auto max-h-[850px] custom-scrollbar shadow-inner"
            style={{
              transform: `scale(${zoomLevel / 100})`,
              transformOrigin: "top center",
            }}
          >
            <div className="space-y-10 max-w-[780px] mx-auto">
              {/* ================= PAGE 1: OFFICIAL MASTER COVER PAGE (Exact Match to Screenshot) ================= */}
              <div
                id="sec-cover"
                className="bg-white text-slate-900 rounded-xs shadow-2xl p-8 sm:p-12 relative min-h-[960px] flex flex-col justify-between border border-slate-200"
              >
                {/* Header Strip */}
                <div className="flex items-center justify-between text-[10px] font-mono text-slate-500 border-b border-slate-200 pb-2 mb-6">
                  <span>CONFIDENTIAL • BID REF: {tender.tenderNumber}</span>
                  <span className="font-bold">
                    {signatory.companyName.toUpperCase()}
                  </span>
                </div>

                {/* Double Border Inner Box */}
                <div className="border-4 border-double border-slate-900 p-6 sm:p-8 flex-1 flex flex-col justify-between">
                  {/* Emblem / Crown Icon Header */}
                  <div className="text-center space-y-2">
                    <div className="w-12 h-12 rounded-full bg-slate-900 text-amber-400 flex items-center justify-center mx-auto shadow-md">
                      <Crown size={24} />
                    </div>
                    <div>
                      <p className="text-[11px] font-bold tracking-widest text-slate-600 uppercase">
                        GOVERNMENT OF JHARKHAND
                      </p>
                      <h1 className="text-base sm:text-lg font-black text-slate-900 uppercase tracking-tight mt-0.5">
                        {tender.organization.toUpperCase()}
                      </h1>
                    </div>
                    <div className="w-full h-0.5 bg-slate-900 my-3" />
                  </div>

                  {/* Navy Blue Dossier Banner */}
                  <div className="bg-[#0F172A] text-white p-4 sm:p-5 rounded-lg text-center my-4 shadow-md">
                    <h2 className="text-base sm:text-lg font-black text-sky-400 uppercase tracking-wide">
                      TECHNICAL &amp; COMMERCIAL BID SUBMISSION DOSSIER
                    </h2>
                    <p className="text-xs text-slate-300 mt-1 font-mono">
                      Tender Notice Reference: {tender.tenderNumber} • GeM
                      Portal
                    </p>
                  </div>

                  {/* Name of Work / Project Scope Box */}
                  <div className="border-l-4 border-[#0284c7] bg-slate-50 p-4 rounded-r-lg my-3 space-y-1">
                    <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-slate-500 block">
                      NAME OF WORK / PROJECT SCOPE:
                    </span>
                    <p className="text-xs sm:text-sm font-bold text-slate-900 leading-snug">
                      &quot;{tender.title}&quot;
                    </p>
                  </div>

                  {/* Bidder & Authority Side-by-Side Table */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 my-4">
                    <div className="border border-slate-300 p-3.5 rounded-lg bg-white space-y-1 text-xs">
                      <strong className="text-[11px] font-bold text-slate-900 block border-b border-slate-200 pb-1 uppercase tracking-wider">
                        SUBMITTED BY (BIDDER):
                      </strong>
                      <p className="font-bold text-slate-900 text-xs mt-1">
                        {signatory.companyName}
                      </p>
                      <p className="text-[10.5px] text-slate-600">
                        CIN: {signatory.cin}
                      </p>
                      <p className="text-[10.5px] text-slate-600">
                        GSTIN: {signatory.gstin} | PAN: {signatory.pan}
                      </p>
                      <p className="text-[10.5px] text-slate-600">
                        {signatory.hqLocation}
                      </p>
                    </div>

                    <div className="border border-slate-300 p-3.5 rounded-lg bg-white space-y-1 text-xs">
                      <strong className="text-[11px] font-bold text-slate-900 block border-b border-slate-200 pb-1 uppercase tracking-wider">
                        SUBMITTED TO (AUTHORITY):
                      </strong>
                      <p className="font-bold text-slate-900 text-xs mt-1">
                        The Executive Director
                      </p>
                      <p className="text-[10.5px] text-slate-600">
                        {tender.organization}
                      </p>
                      <p className="text-[10.5px] text-emerald-700 font-semibold mt-2">
                        Submission Date:{" "}
                        {new Date().toLocaleDateString("en-IN", {
                          day: "2-digit",
                          month: "long",
                          year: "numeric",
                        })}
                      </p>
                    </div>
                  </div>

                  {/* Bottom Footer Details */}
                  <div className="border-t-2 border-slate-900 pt-3 flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-xs">
                    <div>
                      <p className="text-[10.5px] text-slate-600">
                        Bid Validity: 180 Days from Deadline
                      </p>
                      <p className="text-[10.5px] font-bold text-emerald-700">
                        100% GFR 2017 &amp; Public Procurement Compliant
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="text-[10.5px] text-slate-500">
                        Authorized Signatory:
                      </p>
                      <p className="font-bold text-[#0284c7] text-xs">
                        {signatory.signatoryName}
                      </p>
                      <p className="text-[10px] text-slate-500">
                        {signatory.signatoryTitle}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Page Footer */}
                <div className="text-center text-[10px] font-mono text-slate-400 mt-4">
                  Page 1 of {totalDocumentPages} • Cover-2 Technical Submission
                </div>
              </div>

              {/* ================= PAGE 2: TABLE OF CONTENTS & SEQUENTIAL INDEX ================= */}
              <div
                id="sec-toc"
                className="bg-white text-slate-900 rounded-xs shadow-2xl p-8 sm:p-12 min-h-[960px] flex flex-col justify-between border border-slate-200"
              >
                <div>
                  <div className="flex items-center justify-between text-[10px] font-mono text-slate-500 border-b border-slate-200 pb-2 mb-6">
                    <span>CONFIDENTIAL • BID REF: {tender.tenderNumber}</span>
                    <span className="font-bold">
                      {signatory.companyName.toUpperCase()}
                    </span>
                  </div>

                  <div className="text-center space-y-1 mb-6">
                    <h2 className="text-lg font-black text-slate-900 uppercase tracking-tight border-b-2 border-slate-900 pb-2 inline-block">
                      TABLE OF CONTENTS / INDEX OF BID DOSSIER
                    </h2>
                    <p className="text-xs text-slate-500 mt-1">
                      Sequential index of all enclosures, technical chapters,
                      compliance matrices &amp; statutory undertakings
                    </p>
                  </div>

                  <div className="border border-slate-200 rounded-lg overflow-hidden shadow-2xs">
                    <table className="w-full text-xs text-left">
                      <thead className="bg-slate-900 text-white font-bold">
                        <tr>
                          <th className="p-3 w-14 text-center">S.No</th>
                          <th className="p-3">
                            Section / Document Description
                          </th>
                          <th className="p-3 w-28">Type</th>
                          <th className="p-3 w-24 text-right">Page No</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-slate-100 bg-white">
                        {[
                          {
                            no: "1",
                            title:
                              "Master Cover Page & Official Submission Dossier",
                            type: "Cover",
                            page: "Page 1",
                          },
                          {
                            no: "2",
                            title:
                              "Table of Contents & Sequential Index of Dossier",
                            type: "Index",
                            page: "Page 2",
                          },
                          {
                            no: "3",
                            title:
                              "Chapter 1: Letter of Transmittal & Executive Summary",
                            type: "Technical",
                            page: "Page 3",
                          },
                          {
                            no: "4",
                            title:
                              "Chapter 2: Scope Understanding & 19 Functional Modules",
                            type: "Technical",
                            page: "Page 4",
                          },
                          {
                            no: "5",
                            title:
                              "Chapter 3: System Architecture, Cloud Hosting & Tech Stack",
                            type: "Technical",
                            page: "Page 5",
                          },
                          {
                            no: "6",
                            title:
                              "Chapter 4: Implementation Methodology & 150-Day Roadmap",
                            type: "Technical",
                            page: "Page 6",
                          },
                          {
                            no: "7",
                            title:
                              "Chapter 5: Information Security, CERT-In Safe-to-Host & SLA",
                            type: "Technical",
                            page: "Page 7",
                          },
                          {
                            no: "8",
                            title:
                              "Clause-by-Clause Compliance Matrix (28 Clauses)",
                            type: "Matrix",
                            page: "Page 8",
                          },
                          {
                            no: "9",
                            title:
                              "Key Personnel & Manpower Deployment (QCBS 20 Marks)",
                            type: "Team CVs",
                            page: "Page 9",
                          },
                          {
                            no: "10",
                            title:
                              "Statutory Annexures (Letterhead, ₹100 Stamp, PoA, MSME)",
                            type: "Annexures",
                            page: "Page 10",
                          },
                        ].map((row, idx) => (
                          <tr
                            key={idx}
                            className="hover:bg-slate-50 transition-colors"
                          >
                            <td className="p-2.5 text-center font-mono font-bold text-slate-500">
                              {row.no}
                            </td>
                            <td className="p-2.5 font-semibold text-slate-900">
                              {row.title}
                            </td>
                            <td className="p-2.5">
                              <span className="px-2 py-0.5 rounded bg-slate-100 text-slate-700 text-[10.5px]">
                                {row.type}
                              </span>
                            </td>
                            <td className="p-2.5 text-right font-mono font-bold text-[#0284c7]">
                              {row.page}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>

                  <div className="mt-6 p-3 bg-sky-50 border border-sky-200 rounded-lg text-xs text-sky-900 text-center font-semibold">
                    Total Dossier Volume: {totalDocumentPages} Printed A4 Pages
                    • Digitally Sealed with {signatory.signatoryName}&apos;s
                    Class-3 DSC Token
                  </div>
                </div>

                <div className="flex items-center justify-between text-[10px] font-mono text-slate-400 border-t border-slate-200 pt-3 mt-6">
                  <span>Signatory: {signatory.signatoryName}</span>
                  <span>Page 2 of {totalDocumentPages}</span>
                </div>
              </div>

              {/* ================= PAGES 3-7: TECHNICAL CHAPTERS (WYSIWYG EDITABLE) ================= */}
              {chapters.map((ch) => (
                <div
                  key={ch.id}
                  id={ch.sectionKey}
                  className="bg-white text-slate-900 rounded-xs shadow-2xl p-8 sm:p-12 min-h-[960px] flex flex-col justify-between border border-slate-200"
                >
                  <div>
                    {/* Header */}
                    <div className="flex items-center justify-between text-[10px] font-mono text-slate-500 border-b border-slate-200 pb-2 mb-6">
                      <span>CONFIDENTIAL • BID REF: {tender.tenderNumber}</span>
                      <span className="font-bold">
                        {signatory.companyName.toUpperCase()}
                      </span>
                    </div>

                    <div className="mb-6">
                      <span className="text-xs font-mono font-bold uppercase tracking-wider text-[#0284c7] bg-sky-50 px-2.5 py-1 rounded border border-sky-200">
                        {ch.chapterNumber}
                      </span>
                      <h2 className="text-lg font-black text-slate-900 mt-2">
                        {ch.title}
                      </h2>
                      <p className="text-xs text-slate-500 mt-0.5">
                        {ch.subtitle}
                      </p>
                      <div className="w-full h-0.5 bg-slate-900 mt-3 mb-5" />
                    </div>

                    {/* Rich WYSIWYG Editable Document Body */}
                    <div
                      contentEditable
                      suppressContentEditableWarning
                      onBlur={(e) => {
                        const newText = e.currentTarget.innerText;
                        setChapters((prev) =>
                          prev.map((item) =>
                            item.id === ch.id
                              ? { ...item, content: newText }
                              : item,
                          ),
                        );
                        toast.success(`Saved changes in ${ch.chapterNumber}!`);
                      }}
                      className="text-xs sm:text-sm text-slate-800 leading-relaxed font-sans focus:outline-hidden focus:ring-2 focus:ring-sky-500/20 p-3 rounded-lg border border-transparent hover:border-slate-200 transition-all min-h-[420px] whitespace-pre-line"
                      title="Click directly anywhere on this page to edit text"
                    >
                      {ch.content}
                    </div>
                  </div>

                  {/* Signatures & Dynamic Footer */}
                  <div>
                    <div className="flex items-end justify-between border-t border-slate-200 pt-4 mt-6">
                      <div>
                        {showCompanySeal && (
                          <div className="w-16 h-16 rounded-full border-2 border-dashed border-emerald-600 text-emerald-800 flex flex-col items-center justify-center text-[8.5px] font-bold uppercase tracking-tight text-center bg-emerald-50/40 p-1">
                            <span>★ SEAL ★</span>
                            <span>{signatory.companyName.slice(0, 12)}</span>
                          </div>
                        )}
                      </div>

                      {showDscSignature && (
                        <div className="text-right space-y-0.5 text-xs bg-slate-50 p-2.5 rounded-lg border border-slate-200">
                          <span className="text-[10px] text-slate-500 block">
                            Digitally Signed by:
                          </span>
                          <strong className="text-slate-900 font-bold block">
                            {signatory.signatoryName}
                          </strong>
                          <span className="text-[10px] font-mono text-[#0284c7] block">
                            Class-3 DSC: {signatory.dscSerial}
                          </span>
                        </div>
                      )}
                    </div>

                    <div className="flex items-center justify-between text-[10px] font-mono text-slate-400 border-t border-slate-200 pt-3 mt-3">
                      <span>{signatory.companyName}</span>
                      <span>
                        Page {ch.pageNumber} of {totalDocumentPages}
                      </span>
                    </div>
                  </div>
                </div>
              ))}

              {/* ================= PAGE 8: CLAUSE COMPLIANCE MATRIX ================= */}
              <div
                id="sec-matrix"
                className="bg-white text-slate-900 rounded-xs shadow-2xl p-8 sm:p-12 min-h-[960px] flex flex-col justify-between border border-slate-200"
              >
                <div>
                  <div className="flex items-center justify-between text-[10px] font-mono text-slate-500 border-b border-slate-200 pb-2 mb-6">
                    <span>CONFIDENTIAL • BID REF: {tender.tenderNumber}</span>
                    <span className="font-bold">
                      {signatory.companyName.toUpperCase()}
                    </span>
                  </div>

                  <div className="mb-4">
                    <span className="text-xs font-mono font-bold uppercase tracking-wider text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded border border-emerald-200">
                      Compliance Dossier
                    </span>
                    <h2 className="text-lg font-black text-slate-900 mt-2">
                      Clause-by-Clause Technical Compliance Matrix
                    </h2>
                    <p className="text-xs text-slate-500 mt-0.5">
                      RFP Specifications compliance statement with zero
                      technical deviations
                    </p>
                    <div className="w-full h-0.5 bg-slate-900 mt-3 mb-4" />
                  </div>

                  <div className="border border-slate-200 rounded-lg overflow-hidden shadow-2xs">
                    <table className="w-full text-xs text-left">
                      <thead className="bg-slate-900 text-white font-bold">
                        <tr>
                          <th className="p-2.5 w-16">Clause</th>
                          <th className="p-2.5 w-24">Category</th>
                          <th className="p-2.5">RFP Requirement</th>
                          <th className="p-2.5 w-24 text-center">Status</th>
                          <th className="p-2.5">
                            Bidder Technical Justification
                          </th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-slate-100 bg-white">
                        {complianceClauses.map((cl) => (
                          <tr
                            key={cl.id}
                            className="hover:bg-slate-50 transition-colors"
                          >
                            <td className="p-2.5 font-mono font-bold text-slate-900">
                              {cl.clauseNumber}
                            </td>
                            <td className="p-2.5 text-[10.5px] text-slate-600 font-medium">
                              {cl.category}
                            </td>
                            <td className="p-2.5 text-slate-800 font-medium">
                              {cl.requirement}
                            </td>
                            <td className="p-2.5 text-center">
                              <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-100 text-emerald-800">
                                {cl.complianceStatus}
                              </span>
                            </td>
                            <td className="p-2.5 text-slate-600 text-[11px] leading-relaxed">
                              {cl.bidderResponse}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>

                  <div className="mt-4 p-2.5 bg-emerald-50 border border-emerald-200 rounded-lg text-xs text-emerald-900 font-semibold flex items-center justify-between">
                    <span>
                      ✓ 100% Unconditional Technical Compliance • Zero
                      Deviations
                    </span>
                    <span className="font-mono font-bold">
                      Score: 28 / 28 Clauses
                    </span>
                  </div>
                </div>

                <div className="flex items-center justify-between text-[10px] font-mono text-slate-400 border-t border-slate-200 pt-3 mt-6">
                  <span>Authorized Signatory: {signatory.signatoryName}</span>
                  <span>Page 8 of {totalDocumentPages}</span>
                </div>
              </div>

              {/* ================= PAGE 9: KEY PERSONNEL & CV MATRIX ================= */}
              <div
                id="sec-team"
                className="bg-white text-slate-900 rounded-xs shadow-2xl p-8 sm:p-12 min-h-[960px] flex flex-col justify-between border border-slate-200"
              >
                <div>
                  <div className="flex items-center justify-between text-[10px] font-mono text-slate-500 border-b border-slate-200 pb-2 mb-6">
                    <span>CONFIDENTIAL • BID REF: {tender.tenderNumber}</span>
                    <span className="font-bold">
                      {signatory.companyName.toUpperCase()}
                    </span>
                  </div>

                  <div className="mb-4">
                    <span className="text-xs font-mono font-bold uppercase tracking-wider text-amber-700 bg-amber-50 px-2.5 py-1 rounded border border-amber-200">
                      Manpower Deployment (QCBS 20 Marks)
                    </span>
                    <h2 className="text-lg font-black text-slate-900 mt-2">
                      Key Technical Personnel &amp; Deployment CV Matrix
                    </h2>
                    <p className="text-xs text-slate-500 mt-0.5">
                      Pre-verified professional qualifications mapped to RFP
                      Page 20 scoring criteria
                    </p>
                    <div className="w-full h-0.5 bg-slate-900 mt-3 mb-4" />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                    {teamMembers.map((tm) => (
                      <div
                        key={tm.id}
                        className="border border-slate-200 p-3.5 rounded-xl bg-slate-50/60 space-y-2 text-xs"
                      >
                        <div className="flex items-start justify-between">
                          <div>
                            <strong className="text-slate-900 font-bold block">
                              {tm.name}
                            </strong>
                            <span className="text-[#0284c7] font-semibold text-[11px] block">
                              {tm.designation}
                            </span>
                          </div>
                          <span className="text-[10px] font-mono font-bold bg-emerald-100 text-emerald-800 px-1.5 py-0.5 rounded">
                            {tm.experienceYears}+ Yrs
                          </span>
                        </div>

                        <div className="text-[11px] text-slate-600 space-y-0.5 border-t border-slate-200 pt-1.5">
                          <p>
                            <strong>Qualification:</strong> {tm.qualification}
                          </p>
                          <p>
                            <strong>Certifications:</strong>{" "}
                            {tm.certifications.join(", ")}
                          </p>
                        </div>

                        <div className="flex items-center justify-between text-[10.5px] text-emerald-700 font-medium pt-1">
                          <span>✓ Signed Consent Attached</span>
                          <span className="font-mono font-bold">
                            100% Match
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="flex items-center justify-between text-[10px] font-mono text-slate-400 border-t border-slate-200 pt-3 mt-6">
                  <span>Authorized Signatory: {signatory.signatoryName}</span>
                  <span>Page 9 of {totalDocumentPages}</span>
                </div>
              </div>

              {/* ================= PAGE 10: MANDATORY STATUTORY ANNEXURES ================= */}
              <div
                id="sec-annexures"
                className="bg-white text-slate-900 rounded-xs shadow-2xl p-8 sm:p-12 min-h-[960px] flex flex-col justify-between border border-slate-200"
              >
                <div>
                  <div className="flex items-center justify-between text-[10px] font-mono text-slate-500 border-b border-slate-200 pb-2 mb-6">
                    <span>CONFIDENTIAL • BID REF: {tender.tenderNumber}</span>
                    <span className="font-bold">
                      {signatory.companyName.toUpperCase()}
                    </span>
                  </div>

                  <div className="mb-4">
                    <span className="text-xs font-mono font-bold uppercase tracking-wider text-purple-700 bg-purple-50 px-2.5 py-1 rounded border border-purple-200">
                      Legal Declarations
                    </span>
                    <h2 className="text-lg font-black text-slate-900 mt-2">
                      Mandatory Statutory Annexures &amp; Undertakings
                    </h2>
                    <p className="text-xs text-slate-500 mt-0.5">
                      Statutory declarations on Company Letterhead &amp; ₹100
                      Stamp Paper format
                    </p>
                    <div className="w-full h-0.5 bg-slate-900 mt-3 mb-4" />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                    {annexures.map((ann) => (
                      <div
                        key={ann.id}
                        className="border border-slate-200 p-3.5 rounded-xl bg-slate-50/60 space-y-2 text-xs flex flex-col justify-between"
                      >
                        <div>
                          <div className="flex items-center justify-between">
                            <span className="font-mono font-bold text-[10.5px] bg-slate-200 text-slate-800 px-2 py-0.5 rounded">
                              {ann.annexureNumber}
                            </span>
                            <span className="text-[10px] text-[#0284c7] font-semibold">
                              {ann.formatType}
                            </span>
                          </div>
                          <strong className="text-slate-900 font-bold block mt-1.5">
                            {ann.title}
                          </strong>
                          <p className="text-[11px] text-slate-600 mt-1 leading-relaxed">
                            {ann.summary}
                          </p>
                        </div>

                        <div className="pt-2 border-t border-slate-200 flex items-center justify-between text-[10.5px]">
                          <span className="text-emerald-700 font-semibold">
                            ✓ Class-3 DSC Bound
                          </span>
                          <span className="text-slate-500 font-mono">
                            Ready
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="flex items-center justify-between text-[10px] font-mono text-slate-400 border-t border-slate-200 pt-3 mt-6">
                  <span>Authorized Signatory: {signatory.signatoryName}</span>
                  <span>Page 10 of {totalDocumentPages}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ── BOTTOM WORKFLOW BRIDGE TO STEP 5 ── */}
      <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-2xs flex flex-col sm:flex-row items-center justify-between gap-3">
        <div className="flex items-center gap-2 text-xs text-slate-600">
          <div className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
          <span>
            Technical Proposal Dossier is 100% Prepared · Ready for Final Master
            Compilation.
          </span>
        </div>

        {onNextTab && (
          <button
            type="button"
            onClick={onNextTab}
            className="w-full sm:w-auto px-6 py-2.5 bg-[#0F172A] hover:bg-slate-800 text-white rounded-xl text-xs font-bold flex items-center justify-center gap-2 shadow-sm transition-all cursor-pointer"
          >
            <span>Proceed to Step 5: PDF Binder &amp; Master Pack</span>
            <ArrowRight size={15} />
          </button>
        )}
      </div>

      {/* PROPOSAL PDF MODAL */}
      <ProposalPdfPreviewModal
        isOpen={isPdfModalOpen}
        onClose={() => setIsPdfModalOpen(false)}
        tender={tender}
      />
    </div>
  );
};
