import React, { useState } from "react";
import {
  ShieldCheck,
  CheckCircle2,
  AlertTriangle,
  FileCheck2,
  Building2,
  Award,
  ArrowRight,
  TrendingUp,
  FolderGit2,
  Users,
  ShieldAlert,
  FileText,
  Sparkles,
  Eye,
  UploadCloud,
  Scale,
  Check,
  XCircle,
  UserCheck,
  KeyRound,
  Stamp,
  Mail,
  Phone,
  Shield,
  RefreshCw,
  BadgeCheck,
  LucideIcon,
} from "lucide-react";
import { toast } from "sonner";
import {
  TenderV2,
  DisqualificationGate,
  VaultDocumentAudit,
  QCBSScoreItem,
  RiskRadarItem,
  SignatoryDetails,
} from "../../types";
import { DscPoaManagementModal } from "../DscPoaManagementModal";

const GATE_ICONS: Record<string, LucideIcon> = {
  TrendingUp,
  FolderGit2,
  Building2,
  Users,
  Award,
  ShieldAlert,
  FileCheck2,
};

interface EligibilityGatesTabV2Props {
  tender: TenderV2;
  onNextTab?: () => void;
}

const AVAILABLE_SIGNATORIES = [
  {
    name: "Vikas Kumar",
    title: "Director & Authorized Bid Representative",
    email: "vikasfrontenddeveloper007@gmail.com",
    phone: "+91 98765 43210",
    poaStatus: "Verified" as const,
    dscSerial: "DSC-8839-IN-CLASS3-2027",
    dscExpiry: "12 Oct 2027",
  },
  {
    name: "Priya Sharma",
    title: "Chief Financial Officer & Alternate Signatory",
    email: "priya.sharma@techsolutions.in",
    phone: "+91 98765 11223",
    poaStatus: "Verified" as const,
    dscSerial: "DSC-9912-IN-CLASS3-2026",
    dscExpiry: "30 Nov 2026",
  },
  {
    name: "Arindam Roy",
    title: "Chief Technology Officer & Technical Signatory",
    email: "arindam.roy@techsolutions.in",
    phone: "+91 98765 99887",
    poaStatus: "PoA Pending" as const,
    dscSerial: "DSC-1044-IN-CLASS3-2028",
    dscExpiry: "15 Aug 2028",
  },
];

export const EligibilityGatesTabV2: React.FC<EligibilityGatesTabV2Props> = ({
  tender,
  onNextTab,
}) => {
  const [gateFilter, setGateFilter] = useState<string>("ALL");
  const [vaultDocs, setVaultDocs] = useState<VaultDocumentAudit[]>(
    tender.vaultAuditDocuments || [],
  );

  const defaultSignatory: SignatoryDetails = tender.signatoryDetails || {
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
    poaStatus: "Verified",
    signatureReady: true,
    dscSerial: "DSC-8839-IN-CLASS3-2027",
    dscExpiry: "12 Oct 2027",
    bidLeadName: "Vikas Kumar (Lead Bid Strategist)",
    technicalReviewer: "Arindam Roy (Chief Solution Architect)",
    financialReviewer: "Priya Sharma (Finance Controller)",
  };

  const [currentSignatory, setCurrentSignatory] =
    useState<SignatoryDetails>(defaultSignatory);
  const [isSignatoryMenuOpen, setIsSignatoryMenuOpen] = useState(false);
  const [isDscPoaModalOpen, setIsDscPoaModalOpen] = useState(false);
  const [modalInitialTab, setModalInitialTab] = useState<"dsc" | "poa">("dsc");

  const gates: DisqualificationGate[] = tender.disqualificationGates || [];
  const qcbsScores: QCBSScoreItem[] = tender.qcbsScores || [];
  const riskItems: RiskRadarItem[] = tender.riskRadarItems || [];

  const passedGatesCount = gates.filter((g) => g.status === "PASS").length;
  const actionGatesCount = gates.filter(
    (g) => g.status === "ACTION_REQUIRED",
  ).length;
  const failedGatesCount = gates.filter((g) => g.status === "FAIL").length;

  const totalEarnedMarks = qcbsScores.reduce(
    (acc, item) => acc + item.earnedMarks,
    0,
  );
  const totalMaxMarks = qcbsScores.reduce(
    (acc, item) => acc + item.maxMarks,
    0,
  );

  const filteredGates = gates.filter((gate) => {
    if (gateFilter === "ALL") return true;
    if (gateFilter === "PASS") return gate.status === "PASS";
    if (gateFilter === "ACTION") return gate.status === "ACTION_REQUIRED";
    if (gateFilter === "FAIL") return gate.status === "FAIL";
    return true;
  });

  const handleSimulateDocUpload = () => {
    toast.success("Updated ISO 27001 certificate uploaded to Company Vault!", {
      description: "Validity extended to 2029. Action items cleared.",
    });
    setVaultDocs((prev) =>
      prev.map((doc) =>
        doc.id === "vdoc-6" || doc.status === "action_needed"
          ? {
              ...doc,
              status: "verified",
              expiryDate: "15 Apr 2029",
              message: "Updated ISO 27001 Certificate · Verified Active",
            }
          : doc,
      ),
    );
  };

  const handleSelectSignatory = (sig: (typeof AVAILABLE_SIGNATORIES)[0]) => {
    setCurrentSignatory((prev) => ({
      ...prev,
      signatoryName: sig.name,
      signatoryTitle: sig.title,
      signatoryEmail: sig.email,
      signatoryPhone: sig.phone,
      poaStatus: sig.poaStatus,
      dscSerial: sig.dscSerial,
      dscExpiry: sig.dscExpiry,
    }));
    setIsSignatoryMenuOpen(false);
    toast.success(`Authorized Signatory updated to ${sig.name}`, {
      description: `DSC & PoA credentials mapped to Cover-1 pack.`,
    });
  };

  const handleVerifyDscToken = () => {
    toast.success("Class-3 DSC Token Verified & Connected!", {
      description: `Signer: ${currentSignatory.signatoryName} · Token Serial: ${currentSignatory.dscSerial} · Valid until ${currentSignatory.dscExpiry}`,
    });
  };

  const handleOpenDscModal = (tab: "dsc" | "poa") => {
    setModalInitialTab(tab);
    setIsDscPoaModalOpen(true);
  };

  const handleUpdateSignatory = (updated: Partial<SignatoryDetails>) => {
    setCurrentSignatory((prev) => ({ ...prev, ...updated }));
  };

  return (
    <div className="space-y-6 fade-up">
      {/* 1. SECTION: MANDATORY DISQUALIFICATION GATES (HARD PASS/FAIL RULES) */}
      <div className="bg-white p-5 md:p-6 rounded-2xl border border-slate-200/90 shadow-2xs space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-100 pb-3">
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold uppercase tracking-wider bg-slate-900 text-white px-2.5 py-0.5 rounded-md">
                Step 2 Audit
              </span>
              <h3 className="text-base font-bold text-slate-900">
                Mandatory Disqualification Gates
              </h3>
            </div>
            <p className="text-xs text-slate-500 mt-0.5">
              Automated audit comparing verified corporate records against RFP
              mandatory rules. Zero disqualifications required for Cover-1.
            </p>
          </div>

          {/* Filter Pills */}
          <div className="flex items-center gap-1 bg-slate-100 p-1 rounded-xl border border-slate-200 text-xs">
            <button
              type="button"
              onClick={() => setGateFilter("ALL")}
              className={`px-3 py-1 rounded-lg font-bold transition-all cursor-pointer ${
                gateFilter === "ALL"
                  ? "bg-[#173C40] text-white shadow-2xs"
                  : "text-slate-600 hover:text-slate-900"
              }`}
            >
              All ({gates.length})
            </button>
            <button
              type="button"
              onClick={() => setGateFilter("PASS")}
              className={`px-3 py-1 rounded-lg font-bold transition-all cursor-pointer ${
                gateFilter === "PASS"
                  ? "bg-emerald-700 text-white shadow-2xs"
                  : "text-slate-600 hover:text-slate-900"
              }`}
            >
              Passed ({passedGatesCount})
            </button>
            {actionGatesCount > 0 && (
              <button
                type="button"
                onClick={() => setGateFilter("ACTION")}
                className={`px-3 py-1 rounded-lg font-bold transition-all cursor-pointer ${
                  gateFilter === "ACTION"
                    ? "bg-amber-600 text-white shadow-2xs"
                    : "text-slate-600 hover:text-slate-900"
                }`}
              >
                Action Needed ({actionGatesCount})
              </button>
            )}
          </div>
        </div>

        {/* Gates List */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5">
          {filteredGates.map((gate) => {
            const IconComp = GATE_ICONS[gate.iconName || ""] || ShieldCheck;
            const isPass = gate.status === "PASS";
            const isAction = gate.status === "ACTION_REQUIRED";

            return (
              <div
                key={gate.id}
                className={`p-4 rounded-xl border transition-all flex flex-col justify-between space-y-3 ${
                  isPass
                    ? "bg-slate-50/70 hover:bg-slate-50 border-slate-200"
                    : isAction
                      ? "bg-amber-50/40 hover:bg-amber-50/70 border-amber-200"
                      : "bg-red-50/40 hover:bg-red-50/70 border-red-200"
                }`}
              >
                <div>
                  {/* Gate Top Bar */}
                  <div className="flex items-center justify-between gap-2 mb-2">
                    <span className="text-[10px] uppercase font-bold tracking-wider text-slate-500 bg-white border border-slate-200 px-2 py-0.5 rounded-md">
                      {gate.category}
                    </span>
                    <span
                      className={`text-[10.5px] font-extrabold px-2.5 py-0.5 rounded-full flex items-center gap-1 ${
                        isPass
                          ? "bg-emerald-100 text-emerald-800 border border-emerald-200"
                          : isAction
                            ? "bg-amber-100 text-amber-800 border border-amber-200"
                            : "bg-red-100 text-red-800 border border-red-200"
                      }`}
                    >
                      {isPass ? (
                        <>
                          <Check size={12} strokeWidth={3} /> Eligible.
                        </>
                      ) : isAction ? (
                        <>
                          <AlertTriangle size={12} /> ACTION REQUIRED
                        </>
                      ) : (
                        <>
                          <XCircle size={12} /> DISQUALIFIED
                        </>
                      )}
                    </span>
                  </div>

                  {/* Title & Icon */}
                  <div className="flex items-start gap-2.5">
                    <div
                      className={`w-7 h-7 rounded-lg border flex items-center justify-center shrink-0 mt-0.5 font-bold ${
                        isPass
                          ? "bg-emerald-50 text-emerald-700 border-emerald-200"
                          : isAction
                            ? "bg-amber-50 text-amber-700 border-amber-200"
                            : "bg-red-50 text-red-700 border-red-200"
                      }`}
                    >
                      <IconComp size={15} />
                    </div>
                    <div>
                      <h4 className="text-xs font-bold text-slate-900 leading-snug">
                        {gate.title}
                      </h4>
                    </div>
                  </div>

                  {/* Comparison Box */}
                  <div className="mt-3 grid grid-cols-2 gap-2 text-xs bg-white p-2.5 rounded-lg border border-slate-200/80">
                    <div>
                      <span className="text-[10px] uppercase font-bold text-slate-400 block">
                        RFP Threshold:
                      </span>
                      <strong className="text-slate-800 text-[11px] block mt-0.5">
                        {gate.requiredValue}
                      </strong>
                    </div>
                    <div>
                      <span className="text-[10px] uppercase font-bold text-slate-400 block">
                        Company Vault:
                      </span>
                      <strong
                        className={`text-[11px] block mt-0.5 ${
                          isPass
                            ? "text-emerald-700 font-bold"
                            : isAction
                              ? "text-amber-700 font-bold"
                              : "text-red-700 font-bold"
                        }`}
                      >
                        {gate.companyValue}
                      </strong>
                    </div>
                  </div>

                  {/* AI Auditor Note */}
                  <p className="text-[11px] text-slate-600 mt-2 leading-relaxed">
                    {gate.note}
                  </p>
                </div>

                {/* Linked Proof Doc */}
                <div className="pt-2.5 border-t border-slate-200/70 flex items-center justify-between gap-2 text-xs">
                  <div className="flex items-center gap-1.5 text-slate-500 text-[11px] truncate">
                    <FileText size={12} className="shrink-0" />
                    <span
                      className="truncate font-mono"
                      title={gate.proofDocumentName}
                    >
                      {gate.proofDocumentName}
                    </span>
                  </div>
                  <button
                    type="button"
                    onClick={() =>
                      toast.info(
                        `Viewing vault document: ${gate.proofDocumentName}`,
                      )
                    }
                    className="text-[11px] font-bold text-[#173C40] hover:underline flex items-center gap-0.5 shrink-0 cursor-pointer"
                  >
                    <Eye size={11} /> View
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* 2. SECTION: COMPANY VAULT VERIFICATION & MISSING ACTION DESK */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
        {/* Left: Verified Vault Documents */}
        <div className="bg-white p-5 rounded-2xl border border-slate-200/90 shadow-2xs space-y-3.5">
          <div className="flex items-center justify-between border-b border-slate-100 pb-3">
            <div className="flex items-center gap-2">
              <div className="w-7 h-7 rounded-lg bg-emerald-50 text-emerald-700 border border-emerald-200 flex items-center justify-center font-bold">
                <FileCheck2 size={15} />
              </div>
              <div>
                <h4 className="text-sm font-bold text-slate-900">
                  Verified Company Vault Records
                </h4>
                <p className="text-[11px] text-slate-500">
                  Auto-linked statutory proofs ready for Cover-1 dossier
                </p>
              </div>
            </div>
            <span className="text-xs font-bold text-emerald-800 bg-emerald-100 px-2.5 py-0.5 rounded-full">
              {vaultDocs.filter((d) => d.status === "verified").length} Active
            </span>
          </div>

          <div className="space-y-2 max-h-[380px] overflow-y-auto pr-1">
            {vaultDocs
              .filter((d) => d.status === "verified")
              .map((doc) => (
                <div
                  key={doc.id}
                  className="p-3 rounded-xl bg-slate-50/80 border border-slate-200/70 flex items-center justify-between gap-3 text-xs"
                >
                  <div className="min-w-0">
                    <strong className="text-slate-900 block truncate text-xs">
                      {doc.name}
                    </strong>
                    <span className="text-[10.5px] text-slate-500 block truncate mt-0.5">
                      {doc.message}
                    </span>
                  </div>
                  <div className="flex items-center gap-1 shrink-0">
                    <span className="text-[10px] font-bold text-emerald-700 bg-emerald-50 border border-emerald-200 px-2 py-0.5 rounded-md">
                      Verified
                    </span>
                  </div>
                </div>
              ))}
          </div>
        </div>

        {/* Right: Action Needed / Expiry Desk */}
        <div className="bg-white p-5 rounded-2xl border border-slate-200/90 shadow-2xs space-y-3.5">
          <div className="flex items-center justify-between border-b border-slate-100 pb-3">
            <div className="flex items-center gap-2">
              <div className="w-7 h-7 rounded-lg bg-amber-50 text-amber-700 border border-amber-200 flex items-center justify-center font-bold">
                <AlertTriangle size={15} />
              </div>
              <div>
                <h4 className="text-sm font-bold text-slate-900">
                  Vault Document Action Desk
                </h4>
                <p className="text-[11px] text-slate-500">
                  Certificates requiring renewal or supplementary proof
                </p>
              </div>
            </div>
            <span className="text-xs font-bold text-amber-800 bg-amber-100 px-2.5 py-0.5 rounded-full">
              {vaultDocs.filter((d) => d.status === "action_needed").length}{" "}
              Action Item
            </span>
          </div>

          <div className="space-y-3">
            {vaultDocs
              .filter((d) => d.status === "action_needed")
              .map((doc) => (
                <div
                  key={doc.id}
                  className="p-4 rounded-xl bg-amber-50/50 border border-amber-200 space-y-2.5 text-xs"
                >
                  <div className="flex items-start justify-between gap-2">
                    <div>
                      <strong className="text-slate-900 block font-bold text-xs">
                        {doc.name}
                      </strong>
                      <span className="text-[11px] text-amber-800 block mt-0.5 font-medium">
                        {doc.message}
                      </span>
                    </div>
                    <span className="text-[10px] font-bold text-amber-800 bg-amber-100 border border-amber-300 px-2 py-0.5 rounded-md shrink-0">
                      Expiring Soon
                    </span>
                  </div>

                  <div className="pt-2 border-t border-amber-200/70 flex items-center justify-between gap-2">
                    <span className="text-[11px] text-slate-500">
                      Expiry Date:{" "}
                      <strong className="text-slate-800">
                        {doc.expiryDate}
                      </strong>
                    </span>
                    {/* <button
                      type="button"
                      onClick={handleSimulateDocUpload}
                      className="px-3 py-1.5 bg-[#173C40] hover:bg-slate-800 text-white rounded-lg text-xs font-bold flex items-center gap-1.5 shadow-2xs transition-colors cursor-pointer"
                    >
                      <UploadCloud size={13} />
                      <span>Upload Renewal Letter</span>
                    </button> */}
                  </div>
                </div>
              ))}

            {vaultDocs.filter((d) => d.status === "action_needed").length ===
              0 && (
              <div className="p-6 text-center text-slate-500 text-xs space-y-1">
                <CheckCircle2
                  size={24}
                  className="mx-auto text-emerald-600 mb-1"
                />
                <strong className="text-slate-800 block">
                  All Vault Documents Verified
                </strong>
                <p className="text-[11px]">
                  No expiring or missing certificates found.
                </p>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* 3. SECTION: QCBS TECHNICAL EVALUATION SCORING MATRIX */}
      {qcbsScores.length > 0 && (
        <div className="bg-white p-5 md:p-6 rounded-2xl border border-slate-200/90 shadow-2xs space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-100 pb-3">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-xl bg-teal-50 text-teal-700 border border-teal-200 flex items-center justify-center font-bold">
                <Scale size={16} />
              </div>
              <div>
                <h3 className="text-sm font-bold text-slate-900">
                  QCBS Technical Evaluation Marks (100 Marks Matrix)
                </h3>
                <p className="text-[11px] text-slate-500">
                  Scoring criteria applied by the Tender Evaluation Committee
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <span className="text-xs font-extrabold bg-[#173C40] text-white px-3 py-1 rounded-xl shadow-2xs">
                Total Score: {totalEarnedMarks} / {totalMaxMarks} Marks
                (Qualified)
              </span>
            </div>
          </div>

          <div className="space-y-2.5">
            {qcbsScores.map((item, idx) => {
              const percent = Math.round(
                (item.earnedMarks / item.maxMarks) * 100,
              );

              return (
                <div
                  key={idx}
                  className="p-3.5 rounded-xl bg-slate-50/80 border border-slate-200/70 space-y-2"
                >
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-xs">
                    <div>
                      <strong className="text-slate-900 block font-bold text-xs">
                        {item.parameter}
                      </strong>
                      <span className="text-[11px] text-slate-500 mt-0.5 block">
                        {item.evaluationBasis}
                      </span>
                    </div>

                    <div className="flex items-center gap-2.5 shrink-0 self-start sm:self-auto">
                      <div className="text-right">
                        <strong className="text-sm font-extrabold text-[#173C40] block">
                          {item.earnedMarks} / {item.maxMarks}
                        </strong>
                        <span className="text-[10px] text-slate-400 font-medium">
                          {percent}% Marks
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Progress Bar */}
                  <div className="w-full bg-slate-200/80 h-1.5 rounded-full overflow-hidden">
                    <div
                      className="bg-emerald-700 h-full rounded-full transition-all duration-500"
                      style={{ width: `${percent}%` }}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* 4. SECTION: RISK RADAR & AI MITIGATION ADVISORY */}
      {riskItems.length > 0 && (
        <div className="bg-white p-5 md:p-6 rounded-2xl border border-slate-200/90 shadow-2xs space-y-4">
          <div className="flex items-center justify-between border-b border-slate-100 pb-3">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-xl bg-amber-50 text-amber-700 border border-amber-200 flex items-center justify-center font-bold">
                <ShieldAlert size={16} />
              </div>
              <div>
                <h3 className="text-sm font-bold text-slate-900">
                  Risk Radar &amp; Disqualification Guardrails
                </h3>
                <p className="text-[11px] text-slate-500">
                  AI-identified technical evaluation risks and recommended
                  mitigation steps
                </p>
              </div>
            </div>
            <span className="text-xs font-bold text-slate-600 bg-slate-100 px-2.5 py-1 rounded-full border border-slate-200">
              {riskItems.length} Warnings Identified
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5">
            {riskItems.map((risk) => (
              <div
                key={risk.id}
                className="p-4 rounded-xl bg-slate-50/80 border border-slate-200/80 space-y-2.5 text-xs flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between gap-2 mb-1.5">
                    <span
                      className={`text-[9.5px] font-extrabold uppercase px-2 py-0.2 rounded-md ${
                        risk.severity === "high"
                          ? "bg-red-100 text-red-800 border border-red-200"
                          : risk.severity === "medium"
                            ? "bg-amber-100 text-amber-800 border border-amber-200"
                            : "bg-blue-100 text-blue-800 border border-blue-200"
                      }`}
                    >
                      {risk.severity} Risk
                    </span>
                  </div>

                  <strong className="text-xs font-bold text-slate-900 block leading-snug">
                    {risk.title}
                  </strong>
                  <p className="text-[11px] text-slate-600 mt-1 leading-relaxed">
                    {risk.riskDescription}
                  </p>
                </div>

                <div className="pt-2 border-t border-slate-200/70 bg-emerald-50/60 p-2.5 rounded-lg border border-emerald-200/60">
                  <span className="text-[10px] uppercase font-bold text-emerald-900 block flex items-center gap-1">
                    <Sparkles size={11} /> AI Mitigation Strategy:
                  </span>
                  <p className="text-[11px] text-emerald-950 mt-0.5 leading-relaxed">
                    {risk.mitigationStrategy}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* 5. SECTION: AUTHORIZED BID SIGNATORY (SIMPLIFIED & CLEAN) */}
      <div className="bg-white p-5 md:p-6 rounded-2xl border border-slate-200/90 shadow-2xs space-y-4">
        {/* Top Header with Change Signatory Dropdown */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-100 pb-3">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-xl bg-indigo-50 text-indigo-700 border border-indigo-200 flex items-center justify-center font-bold">
              <UserCheck size={16} />
            </div>
            <div>
              <h3 className="text-sm md:text-base font-bold text-slate-900">
                Authorized Bid Signatory
              </h3>
              <p className="text-[11px] text-slate-500">
                Person legally authorized to sign RFP submissions, declarations
                &amp; BOQ
              </p>
            </div>
          </div>

          {/* Change Signatory Dropdown */}
          <div className="relative">
            <button
              type="button"
              onClick={() => setIsSignatoryMenuOpen(!isSignatoryMenuOpen)}
              className="px-3 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl text-xs font-bold border border-slate-300 flex items-center gap-1.5 transition-colors cursor-pointer"
            >
              <RefreshCw size={12} />
              <span>Change Signatory ▾</span>
            </button>

            {isSignatoryMenuOpen && (
              <div className="absolute right-0 top-full mt-1.5 w-72 bg-white rounded-xl shadow-xl border border-slate-200 p-2 z-50 space-y-1">
                <span className="text-[10px] uppercase font-bold text-slate-400 px-2 py-1 block">
                  Select Signatory from Vault
                </span>
                {AVAILABLE_SIGNATORIES.map((sig) => (
                  <button
                    key={sig.name}
                    type="button"
                    onClick={() => handleSelectSignatory(sig)}
                    className={`w-full text-left p-2.5 rounded-lg text-xs transition-colors cursor-pointer flex flex-col ${
                      currentSignatory.signatoryName === sig.name
                        ? "bg-emerald-50 text-emerald-950 font-bold border border-emerald-200"
                        : "hover:bg-slate-50 text-slate-700"
                    }`}
                  >
                    <span className="flex items-center justify-between">
                      <span className="font-bold">{sig.name}</span>
                      {currentSignatory.signatoryName === sig.name && (
                        <Check
                          size={13}
                          className="text-emerald-700 font-bold"
                        />
                      )}
                    </span>
                    <span className="text-[10.5px] text-slate-500 font-normal mt-0.5">
                      {sig.title.split("&")[0]} · {sig.poaStatus}
                    </span>
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Signatory Profile Overview */}
        <div className="flex items-center gap-3.5 bg-slate-50/70 p-3.5 rounded-xl border border-slate-200/70">
          <div className="w-10 h-10 rounded-xl bg-[#173C40] text-white flex items-center justify-center font-extrabold text-sm shrink-0 shadow-2xs">
            {currentSignatory.signatoryName.charAt(0)}
          </div>

          <div className="space-y-0.5 min-w-0">
            <div className="flex items-center gap-2 flex-wrap">
              <strong className="text-sm font-bold text-slate-900">
                {currentSignatory.signatoryName}
              </strong>
              <span className="text-[11px] text-slate-500">
                ({currentSignatory.signatoryTitle.split("&")[0].trim()})
              </span>
            </div>

            <div className="flex items-center gap-3 text-xs text-slate-500 flex-wrap pt-0.5">
              <span className="flex items-center gap-1">
                <Mail size={11} className="text-slate-400" />
                <span className="text-slate-700 font-medium">
                  {currentSignatory.signatoryEmail}
                </span>
              </span>
              <span className="flex items-center gap-1">
                <Phone size={11} className="text-slate-400" />
                <span className="text-slate-700 font-medium">
                  {currentSignatory.signatoryPhone}
                </span>
              </span>
            </div>
          </div>
        </div>

        {/* 2 Simple Status & Action Boxes */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5 pt-1">
          {/* Box 1: Power of Attorney (PoA) */}
          <div className="p-3.5 rounded-xl border bg-white flex flex-col justify-between space-y-3 border-slate-200 shadow-2xs">
            <div>
              <div className="flex items-center justify-between gap-2 mb-1.5">
                <span className="text-[10px] uppercase font-bold text-slate-500 flex items-center gap-1">
                  <FileText size={12} className="text-indigo-600" /> Power of
                  Attorney (PoA)
                </span>
                <span
                  className={`text-[10px] font-bold px-2 py-0.2 rounded-md ${
                    currentSignatory.poaStatus === "Verified"
                      ? "bg-emerald-100 text-emerald-800 border border-emerald-200"
                      : "bg-amber-100 text-amber-800 border border-amber-300"
                  }`}
                >
                  {currentSignatory.poaStatus === "Verified"
                    ? "✓ Verified"
                    : "⚠️ Pending"}
                </span>
              </div>

              <strong className="text-xs font-bold text-slate-800 block">
                Board Resolution &amp; ₹100 Notarized Stamp
              </strong>
              <p className="text-[11px] text-slate-500 mt-0.5">
                {currentSignatory.poaStatus === "Verified"
                  ? "Approved under Board Resolution 2024/BR-09"
                  : "Upload Board Resolution to authorize this signatory"}
              </p>
            </div>

            <div className="pt-2 border-t border-slate-100 flex items-center gap-2">
              <button
                type="button"
                onClick={() => handleOpenDscModal("poa")}
                className="px-3 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-lg text-xs font-bold transition-colors cursor-pointer flex items-center gap-1"
              >
                <Eye size={12} />
                <span>View / Upload PoA</span>
              </button>
            </div>
          </div>

          {/* Box 2: Digital Signature Certificate (DSC) */}
          <div className="p-3.5 rounded-xl border bg-white flex flex-col justify-between space-y-3 border-slate-200 shadow-2xs">
            <div>
              <div className="flex items-center justify-between gap-2 mb-1.5">
                <span className="text-[10px] uppercase font-bold text-slate-500 flex items-center gap-1">
                  <KeyRound size={12} className="text-teal-600" /> Digital
                  Signature (DSC)
                </span>
                <span className="text-[10px] font-bold bg-emerald-100 text-emerald-800 border border-emerald-200 px-2 py-0.2 rounded-md">
                  ✓ Class-3 Active
                </span>
              </div>

              <strong className="text-xs font-bold text-slate-800 block">
                USB Hardware Dongle &amp; Certificate
              </strong>
              <p className="text-[11px] text-slate-500 mt-0.5">
                e-Mudhra Token · Valid until {currentSignatory.dscExpiry}
              </p>
            </div>

            <div className="pt-2 border-t border-slate-100 flex items-center gap-2">
              <button
                type="button"
                onClick={() => handleOpenDscModal("dsc")}
                className="px-3 py-1.5 bg-[#173C40] hover:bg-slate-800 text-white rounded-lg text-xs font-bold transition-colors shadow-2xs cursor-pointer flex items-center gap-1"
              >
                <KeyRound size={12} />
                <span>Test / Manage DSC</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* 6. BRIDGE TO STEP 3: FINANCIAL SECURITY & EMD EXEMPTION DESK */}
      <div className="bg-gradient-to-r from-emerald-900 via-[#0C3B34] to-[#134942] text-white p-5 rounded-2xl shadow-md border border-emerald-500/40 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <span className="text-[10px] uppercase font-bold bg-emerald-400 text-emerald-950 px-2 py-0.5 rounded-md tracking-wider">
              Step 2 Completed
            </span>
            <strong className="text-sm font-bold text-white">
              Step 3: Payment Proof, EMD &amp; MSME Exemption Desk
            </strong>
          </div>
          <p className="text-xs text-emerald-100/80 max-w-2xl leading-relaxed">
            Company Vault capability, Disqualification Gates, and Authorized
            Signatory are verified. Proceed to Step 3 to review Tender
            Processing Fee challan, EMD payment proof, or attach MSME / Udyam
            Rule 170 exemption declaration.
          </p>
        </div>

        {onNextTab && (
          <button
            type="button"
            onClick={onNextTab}
            className="px-5 py-2.5 bg-emerald-400 hover:bg-emerald-300 text-emerald-950 rounded-xl text-xs font-extrabold flex items-center gap-2 shadow-sm transition-all shrink-0 cursor-pointer"
          >
            <span>Proceed to Step 3: Payment Proof</span>
            <ArrowRight size={14} />
          </button>
        )}
      </div>

      {/* 7. DSC & POA MANAGEMENT MODAL */}
      <DscPoaManagementModal
        isOpen={isDscPoaModalOpen}
        onClose={() => setIsDscPoaModalOpen(false)}
        signatory={currentSignatory}
        initialTab={modalInitialTab}
        onUpdateSignatory={handleUpdateSignatory}
      />
    </div>
  );
};
