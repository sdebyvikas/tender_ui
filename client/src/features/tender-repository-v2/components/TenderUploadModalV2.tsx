import React, { useState } from "react";
import {
  UploadCloud,
  X,
  FileText,
  Sparkles,
  CheckCircle2,
  Building2,
  Calendar,
  IndianRupee,
  MapPin,
  ArrowRight,
  Cpu,
  Layers,
  FileUp,
} from "lucide-react";
import { toast } from "sonner";
import { TenderV2, TenderRequirement } from "../types";

interface TenderUploadModalV2Props {
  isOpen: boolean;
  onClose: () => void;
  onTenderCreated: (newTender: TenderV2) => void;
}

interface SamplePreset {
  name: string;
  filename: string;
  pages: number;
  size: string;
  data: Partial<TenderV2>;
}

const SAMPLE_PRESETS: SamplePreset[] = [
  {
    name: "Delhi Metro (DMRC) Automated Fare Collection & Mobile Ticketing RFP",
    filename: "DMRC_AFC_Mobile_Ticketing_RFP_2026.pdf",
    pages: 184,
    size: "12.4 MB",
    data: {
      id: `tender-dmrc-${Date.now()}`,
      tenderNumber: "DMRC/S&T/AFC/2026-08",
      title:
        "Design, Implementation & Maintenance of Automated Fare Collection (AFC) & QR Mobile Ticketing System",
      organization: "Delhi Metro Rail Corporation Ltd. (DMRC)",
      department: "Signaling & Telecom Directorate",
      location: "New Delhi, Delhi",
      publishDate: "05 Apr 2026",
      submissionDeadline: "30 Apr 2026, 03:00 PM",
      technicalOpeningDate: "01 May 2026, 11:00 AM",
      estimatedValueDisplay: "₹8,50,00,000 (₹8.50 Cr)",
      tenderFeeDisplay: "₹10,000 + GST",
      emdDisplay: "₹17,00,000",
      emdStatus: "Verified",
      readinessScore: 82,
      winProbability: 78,
      decision: "GO",
      status: "Ingested",
      submissionMode: "e-Procurement Portal (DMRC e-Tenders)",
      turnoverRequired: "₹5.00 Cr",
      companyTurnover: "₹16.20 Cr",
      scopeSummary:
        "Procurement, cloud deployment, QR/NFC gate validator integration, passenger mobile ticketing app (iOS/Android), and 5-year SLA maintenance across 60 transit stations.",
      tags: ["Metro Rail", "AFC", "Mobile Ticketing", "Smart Transit", "IoT"],
      commercialTerms: {
        contractDuration: "9 Months (Rollout) + 5 Years (O&M AMC)",
        performanceSecurityPBG: "5% of Total Contract Value",
        bidValidity: "180 Days",
        penaltyClause: "0.5% per week of delay (Max 10%)",
        coversCount: "2-Cover System (Cover 1: Fee & Tech, Cover 2: Financial)",
        consortiumRule: "Consortium Allowed (Up to 2 partners, Lead 51%)",
        msmePolicy: "EMD Exemption Eligible under Rule 170 of GFR",
      },
      paymentMilestones: [
        {
          phase: "Phase 1",
          percentage: "20%",
          milestoneTitle: "System Architecture & Gate Design Signoff",
          description:
            "Submission of AFC hardware protocols and cloud ticketing backend.",
        },
        {
          phase: "Phase 2",
          percentage: "40%",
          milestoneTitle: "Hardware Delivery & Station Installation",
          description:
            "Validator supply, QR turnstile integration, and station trial runs.",
        },
        {
          phase: "Phase 3",
          percentage: "25%",
          milestoneTitle: "Mobile App Launch & Go-Live",
          description:
            "App store release, payment gateway integration, and security audit.",
        },
        {
          phase: "Phase 4",
          percentage: "15%",
          milestoneTitle: "5-Year SLA Operations",
          description: "Quarterly payments tied to 99.8% ticketing uptime.",
        },
      ],
      requirements: [
        {
          id: "req-dmrc-1",
          category: "financial",
          categoryLabel: "Financial Turnover",
          title: "Minimum Average Annual Turnover of ₹5.00 Cr",
          ruleDescription:
            "Average turnover of last 3 FYs must exceed ₹5.00 Crore.",
          thresholdValue: "₹5.00 Cr Turnover",
          proofRequired: "CA Certified Audited Balance Sheets with UDIN.",
          mandatory: true,
          iconName: "TrendingUp",
        },
        {
          id: "req-dmrc-2",
          category: "experience",
          categoryLabel: "Past Project Experience",
          title: "Minimum 2 Transit / Ticketing Deployments",
          ruleDescription:
            "Successfully implemented at least 2 transit AFC, smart ticketing, or payment kiosk projects in India.",
          thresholdValue: "2+ Transit Projects",
          proofRequired: "Work orders and client completion certificates.",
          mandatory: true,
          iconName: "FolderGit2",
        },
        {
          id: "req-dmrc-3",
          category: "certifications",
          categoryLabel: "Quality & Security Accreditations",
          title: "ISO 9001 & ISO 27001 / PCI-DSS",
          ruleDescription:
            "Valid ISO 27001 information security certification and PCI-DSS payment compliance.",
          thresholdValue: "ISO 27001 & PCI-DSS",
          proofRequired: "Copies of active accreditation certificates.",
          mandatory: true,
          iconName: "Award",
        },
      ],
    },
  },
  {
    name: "UP Health (NHM) Telemedicine & e-Sanjeevani AI Diagnostic Portal RFP",
    filename: "UP_NHM_Telemedicine_AI_Portal_RFP_2026.pdf",
    pages: 116,
    size: "6.8 MB",
    data: {
      id: `tender-up-health-${Date.now()}`,
      tenderNumber: "NHM-UP/IT/TELEMED/2026-19",
      title:
        "Selection of Agency for Development, AI Symptom Checker Integration & 3-Year Maintenance of State Telemedicine Platform",
      organization: "National Health Mission, Uttar Pradesh (NHM-UP)",
      department: "Medical Health & Family Welfare Department",
      location: "Lucknow, Uttar Pradesh",
      publishDate: "10 Apr 2026",
      submissionDeadline: "02 May 2026, 04:00 PM",
      technicalOpeningDate: "03 May 2026, 12:00 PM",
      estimatedValueDisplay: "₹3,20,00,000 (₹3.20 Cr)",
      tenderFeeDisplay: "₹5,000",
      emdDisplay: "₹6,40,000",
      emdStatus: "Verified",
      readinessScore: 79,
      winProbability: 75,
      decision: "GO",
      status: "Ingested",
      submissionMode: "e-Tender Portal Uttar Pradesh (etender.up.nic.in)",
      turnoverRequired: "₹2.00 Cr",
      companyTurnover: "₹16.20 Cr",
      scopeSummary:
        "Design, build, and maintain Web & Mobile Telemedicine portal connecting 1,200 rural health wellness centres with district doctors, EHR integration, and ABDM compliance.",
      tags: ["Health Tech", "Telemedicine", "ABDM", "Web Portal", "Mobile App"],
      commercialTerms: {
        contractDuration: "6 Months (Dev) + 36 Months (Support & Maintenance)",
        performanceSecurityPBG: "5% of Contract Value",
        bidValidity: "180 Days",
        penaltyClause: "0.5% per week of delay (Max 10%)",
        coversCount: "2-Cover System",
        consortiumRule: "Sole Bidder Only",
        msmePolicy: "EMD Exempt for Registered Micro & Small Enterprises",
      },
      paymentMilestones: [
        {
          phase: "Phase 1",
          percentage: "25%",
          milestoneTitle: "SRS & ABDM M1/M2 Architecture Approval",
          description: "Design specifications, ABDM API integration roadmap.",
        },
        {
          phase: "Phase 2",
          percentage: "35%",
          milestoneTitle: "Doctor & Patient Web/App Module Delivery",
          description:
            "Video consultation engine, prescription module, and UAT.",
        },
        {
          phase: "Phase 3",
          percentage: "25%",
          milestoneTitle: "Security Audit & State-wide Pilot Launch",
          description:
            "CERT-In clearance, EHR sync, and live launch in 5 districts.",
        },
        {
          phase: "Phase 4",
          percentage: "15%",
          milestoneTitle: "3-Year SLA Support",
          description: "Quarterly operational retainer based on SLA.",
        },
      ],
      requirements: [
        {
          id: "req-nhm-1",
          category: "financial",
          categoryLabel: "Financial Turnover",
          title: "Minimum ₹2.00 Cr Annual Turnover",
          ruleDescription: "Average 3-year turnover >= ₹2.00 Cr.",
          thresholdValue: "₹2.00 Cr Turnover",
          proofRequired: "Audited Balance Sheets.",
          mandatory: true,
          iconName: "TrendingUp",
        },
        {
          id: "req-nhm-2",
          category: "experience",
          categoryLabel: "Past Project Experience",
          title: "2+ HealthTech / e-Governance Portals",
          ruleDescription:
            "Experience in building medical or government portal solutions.",
          thresholdValue: "2+ Completed Health/Govt Projects",
          proofRequired: "Completion certificates.",
          mandatory: true,
          iconName: "FolderGit2",
        },
      ],
    },
  },
];

export const TenderUploadModalV2: React.FC<TenderUploadModalV2Props> = ({
  isOpen,
  onClose,
  onTenderCreated,
}) => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [selectedPreset, setSelectedPreset] = useState<SamplePreset | null>(
    SAMPLE_PRESETS[0],
  );
  const [isProcessing, setIsProcessing] = useState<boolean>(false);
  const [progressPercent, setProgressPercent] = useState<number>(0);
  const [currentStatusText, setCurrentStatusText] = useState<string>("");

  if (!isOpen) return null;

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setSelectedFile(file);
      setSelectedPreset(null);
    }
  };

  const handleStartIngestion = () => {
    setIsProcessing(true);
    setProgressPercent(15);
    setCurrentStatusText("Scanning PDF structure & OCR tables...");

    setTimeout(() => {
      setProgressPercent(45);
      setCurrentStatusText(
        "Extracting Authority, EMD & Submission Deadlines...",
      );
    }, 700);

    setTimeout(() => {
      setProgressPercent(80);
      setCurrentStatusText("Parsing Mandatory Qualification Rules & Scope...");
    }, 1400);

    setTimeout(() => {
      setProgressPercent(100);
      setCurrentStatusText("Ingestion Complete! Opening Overview & Scope...");

      setTimeout(() => {
        let newTender: TenderV2;

        if (selectedPreset) {
          newTender = {
            id: selectedPreset.data.id || `tender-${Date.now()}`,
            tenderNumber: selectedPreset.data.tenderNumber || "TENDER/2026/01",
            title: selectedPreset.data.title || "Custom RFP Project",
            organization: selectedPreset.data.organization || "Govt Authority",
            department: selectedPreset.data.department || "IT Procurement",
            location: selectedPreset.data.location || "India",
            publishDate: selectedPreset.data.publishDate || "01 Apr 2026",
            submissionDeadline:
              selectedPreset.data.submissionDeadline || "25 Apr 2026, 03:00 PM",
            technicalOpeningDate:
              selectedPreset.data.technicalOpeningDate ||
              "26 Apr 2026, 11:00 AM",
            estimatedValueDisplay:
              selectedPreset.data.estimatedValueDisplay ||
              "₹2,50,00,000 (₹2.50 Cr)",
            tenderFeeDisplay: selectedPreset.data.tenderFeeDisplay || "₹5,000",
            emdDisplay: selectedPreset.data.emdDisplay || "₹5,00,000",
            emdStatus: "Verified",
            readinessScore: selectedPreset.data.readinessScore || 78,
            winProbability: selectedPreset.data.winProbability || 74,
            decision: "GO",
            status: "Ingested",
            submissionMode:
              selectedPreset.data.submissionMode ||
              "Online e-Procurement Portal",
            turnoverRequired:
              selectedPreset.data.turnoverRequired || "₹1.50 Cr",
            companyTurnover: "₹16.20 Cr",
            scopeSummary:
              selectedPreset.data.scopeSummary ||
              "Full lifecycle design, engineering, cloud architecture, and maintenance support.",
            keyDates: [
              {
                label: "RFP Publication",
                date: selectedPreset.data.publishDate || "01 Apr 2026",
                isPassed: true,
              },
              {
                label: "Pre-Bid Query Deadline",
                date: "12 Apr 2026",
                isPassed: false,
              },
              {
                label: "Bid Submission Deadline",
                date:
                  selectedPreset.data.submissionDeadline ||
                  "25 Apr 2026, 03:00 PM",
                isPassed: false,
              },
              {
                label: "Technical Bid Opening",
                date:
                  selectedPreset.data.technicalOpeningDate ||
                  "26 Apr 2026, 11:00 AM",
                isPassed: false,
              },
            ],
            tags: selectedPreset.data.tags || [
              "Web Portal",
              "Mobile App",
              "Cloud Native",
            ],
            commercialTerms: selectedPreset.data.commercialTerms || {
              contractDuration: "12 Months + 36 Months O&M",
              performanceSecurityPBG: "5% of Contract Value",
              bidValidity: "180 Days",
              penaltyClause: "0.5% per week of delay (Max 10%)",
              coversCount: "2-Cover System",
              consortiumRule: "Sole Bidder Only",
              msmePolicy: "EMD Exemption Eligible",
            },
            paymentMilestones: selectedPreset.data.paymentMilestones || [
              {
                phase: "Phase 1",
                percentage: "20%",
                milestoneTitle: "SRS & UI Signoff",
                description:
                  "Design specifications and architecture blueprint.",
              },
              {
                phase: "Phase 2",
                percentage: "40%",
                milestoneTitle: "Beta Build Delivery",
                description: "App and portal staging deployment and UAT.",
              },
              {
                phase: "Phase 3",
                percentage: "40%",
                milestoneTitle: "Go-Live & SLA Maintenance",
                description: "Production rollout and warranty support.",
              },
            ],
            sourceDocuments: [
              {
                id: `doc-${Date.now()}`,
                name: selectedPreset.filename,
                size: selectedPreset.size,
                pages: selectedPreset.pages,
                type: "RFP",
                date: "Today",
              },
            ],
            requirements: selectedPreset.data.requirements || [
              {
                id: "req-gen-1",
                category: "financial",
                categoryLabel: "Financial Turnover",
                title: "Minimum Turnover Threshold",
                ruleDescription: "Average 3-year turnover >= ₹1.50 Cr.",
                thresholdValue: "₹1.50 Cr Turnover",
                proofRequired: "Audited Balance Sheets with CA UDIN.",
                mandatory: true,
                iconName: "TrendingUp",
              },
              {
                id: "req-gen-2",
                category: "experience",
                categoryLabel: "Past Project Experience",
                title: "3 Completed Projects in Software",
                ruleDescription: "Must have delivered 3 similar IT projects.",
                thresholdValue: "3+ Projects",
                proofRequired: "Work completion certificates.",
                mandatory: true,
                iconName: "FolderGit2",
              },
            ],
          };
        } else {
          // Custom uploaded file
          const fname = selectedFile
            ? selectedFile.name
            : "Custom_Tender_RFP.pdf";
          newTender = {
            id: `tender-custom-${Date.now()}`,
            tenderNumber: `RFP/AUTO/${Math.floor(1000 + Math.random() * 9000)}`,
            title: fname.replace(/\.pdf$/i, "").replace(/[_-]/g, " "),
            organization: "State Procurement Authority",
            department: "Information Technology Wing",
            location: "India",
            publishDate: "Today",
            submissionDeadline: "25 Apr 2026, 05:00 PM",
            technicalOpeningDate: "26 Apr 2026, 11:00 AM",
            estimatedValueDisplay: "₹2,00,00,000 (₹2.00 Cr)",
            tenderFeeDisplay: "₹5,000",
            emdDisplay: "₹4,00,000",
            emdStatus: "Verified",
            readinessScore: 78,
            winProbability: 74,
            decision: "GO",
            status: "Ingested",
            submissionMode: "Online e-Procurement",
            turnoverRequired: "₹1.50 Cr",
            companyTurnover: "₹16.20 Cr",
            scopeSummary:
              "AI-parsed RFP document: Complete system design, development, cloud infrastructure setup, security compliance, and multi-year maintenance support.",
            keyDates: [
              { label: "RFP Publication", date: "Today", isPassed: true },
              {
                label: "Pre-Bid Queries",
                date: "15 Apr 2026",
                isPassed: false,
              },
              {
                label: "Bid Due Date",
                date: "25 Apr 2026, 05:00 PM",
                isPassed: false,
              },
              {
                label: "Tech Opening",
                date: "26 Apr 2026, 11:00 AM",
                isPassed: false,
              },
            ],
            tags: ["Web Portal", "Mobile App", "Custom RFP"],
            commercialTerms: {
              contractDuration: "12 Months + 36 Months AMC",
              performanceSecurityPBG: "5% of Contract Value",
              bidValidity: "180 Days",
              penaltyClause: "0.5% per week of delay",
              coversCount: "2-Cover System",
              consortiumRule: "Sole Bidder Only",
              msmePolicy: "EMD Exemption Eligible",
            },
            paymentMilestones: [
              {
                phase: "Phase 1",
                percentage: "25%",
                milestoneTitle: "SRS & Architecture Approval",
                description: "Design blueprints and technical specifications.",
              },
              {
                phase: "Phase 2",
                percentage: "50%",
                milestoneTitle: "Development & UAT",
                description: "Application development and user testing.",
              },
              {
                phase: "Phase 3",
                percentage: "25%",
                milestoneTitle: "Go-Live & Maintenance",
                description: "Deployment and 3-year support.",
              },
            ],
            sourceDocuments: [
              {
                id: `doc-${Date.now()}`,
                name: fname,
                size: selectedFile
                  ? `${(selectedFile.size / (1024 * 1024)).toFixed(1)} MB`
                  : "4.2 MB",
                pages: 86,
                type: "RFP",
                date: "Today",
              },
            ],
            requirements: [
              {
                id: "req-c-1",
                category: "financial",
                categoryLabel: "Financial Turnover",
                title: "Minimum Turnover Requirement",
                ruleDescription: "Average 3-year annual turnover >= ₹1.50 Cr.",
                thresholdValue: "₹1.50 Cr Turnover",
                proofRequired: "Audited Financial Statements with UDIN.",
                mandatory: true,
                iconName: "TrendingUp",
              },
              {
                id: "req-c-2",
                category: "experience",
                categoryLabel: "Past Project Experience",
                title: "Minimum 3 Completed Projects",
                ruleDescription:
                  "Must have delivered 3 similar IT projects in last 5 years.",
                thresholdValue: "3+ Projects",
                proofRequired: "Work completion certificates.",
                mandatory: true,
                iconName: "FolderGit2",
              },
              {
                id: "req-c-3",
                category: "manpower",
                categoryLabel: "Team & Manpower Strength",
                title: "Minimum 20+ Technical Engineers",
                ruleDescription:
                  "Must have 20+ software developers on payroll.",
                thresholdValue: "20+ Engineers",
                proofRequired: "EPF returns / HR declaration.",
                mandatory: true,
                iconName: "Users",
              },
            ],
          };
        }

        setIsProcessing(false);
        onTenderCreated(newTender);
        onClose();
        toast.success(
          `Tender ingested successfully: ${newTender.title.slice(0, 45)}...`,
        );
      }, 500);
    }, 2100);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-xs p-4 animate-in fade-in duration-200">
      <div className="bg-white rounded-3xl shadow-2xl border border-slate-200 w-full max-w-2xl overflow-hidden flex flex-col max-h-[90vh]">
        {/* Modal Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-100 bg-slate-50/70">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-emerald-50 text-[#173C40] border border-emerald-200 flex items-center justify-center font-bold">
              <UploadCloud size={18} />
            </div>
            <div>
              <h3 className="text-base font-bold text-slate-900 leading-tight">
                Upload &amp; Ingest Tender RFP PDF
              </h3>
              <p className="text-xs text-slate-500">
                AI will extract parameters, dates, fees, scope &amp; mandatory
                rules
              </p>
            </div>
          </div>
          <button
            type="button"
            disabled={isProcessing}
            onClick={onClose}
            className="p-1.5 text-slate-400 hover:text-slate-600 rounded-lg hover:bg-slate-100 transition-colors cursor-pointer"
          >
            <X size={18} />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6 overflow-y-auto space-y-5">
          {/* If Processing: Show Live AI Progress HUD */}
          {isProcessing ? (
            <div className="py-8 px-4 text-center space-y-5">
              <div className="w-16 h-16 rounded-2xl bg-emerald-50 text-[#173C40] border border-emerald-200 flex items-center justify-center mx-auto animate-pulse">
                <Cpu size={32} />
              </div>

              <div className="space-y-1">
                <h4 className="text-base font-bold text-slate-900">
                  AI Tender Ingestion in Progress
                </h4>
                <p className="text-xs text-slate-500">{currentStatusText}</p>
              </div>

              {/* Progress Bar */}
              <div className="w-full max-w-md mx-auto bg-slate-100 h-2.5 rounded-full overflow-hidden border border-slate-200">
                <div
                  className="bg-[#173C40] h-full transition-all duration-500 rounded-full"
                  style={{ width: `${progressPercent}%` }}
                />
              </div>

              <div className="text-[11px] font-mono font-bold text-emerald-800">
                {progressPercent}% Completed
              </div>
            </div>
          ) : (
            <>
              {/* Dropzone Area */}
              <label className="border-2 border-dashed border-slate-300 hover:border-[#173C40] rounded-2xl p-6 text-center block cursor-pointer transition-all bg-slate-50/50 hover:bg-emerald-50/20">
                <input
                  type="file"
                  accept=".pdf"
                  className="hidden"
                  onChange={handleFileChange}
                />
                <FileUp
                  size={32}
                  className="mx-auto text-slate-400 mb-2.5 hover:scale-105 transition-transform"
                />
                <strong className="text-sm font-bold text-slate-800 block">
                  {selectedFile
                    ? selectedFile.name
                    : "Click to upload Tender PDF or Drag & Drop"}
                </strong>
                <span className="text-xs text-slate-500 block mt-1">
                  Supports standard government / enterprise RFP PDF documents up
                  to 50 MB
                </span>
                {selectedFile && (
                  <span className="inline-block mt-2 text-xs font-bold text-emerald-800 bg-emerald-100 px-3 py-0.5 rounded-full">
                    Selected: {(selectedFile.size / (1024 * 1024)).toFixed(2)}{" "}
                    MB
                  </span>
                )}
              </label>
            </>
          )}
        </div>

        {/* Modal Footer */}
        {!isProcessing && (
          <div className="px-6 py-4 border-t border-slate-100 bg-slate-50/70 flex items-center justify-between gap-3">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-xs font-bold text-slate-600 hover:text-slate-800 bg-white border border-slate-200 rounded-xl transition-colors cursor-pointer shadow-2xs"
            >
              Cancel
            </button>

            <button
              type="button"
              onClick={handleStartIngestion}
              className="px-5 py-2.5 bg-[#173C40] hover:bg-slate-800 text-white rounded-xl text-xs font-extrabold flex items-center gap-2 shadow-xs transition-colors cursor-pointer"
            >
              <span>Start AI Ingestion &amp; Open Details</span>
              <ArrowRight size={14} />
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
