import React, { useState } from "react";
import { createPortal } from "react-dom";
import {
  X,
  KeyRound,
  FileText,
  ShieldCheck,
  CheckCircle2,
  AlertTriangle,
  UploadCloud,
  Cpu,
  Lock,
  RefreshCw,
  Eye,
  FileBadge2,
  Check,
  Sparkles,
  Shield,
} from "lucide-react";
import { toast } from "sonner";
import { SignatoryDetails } from "../types";

interface DscPoaManagementModalProps {
  isOpen: boolean;
  onClose: () => void;
  signatory: SignatoryDetails;
  initialTab?: "dsc" | "poa";
  onUpdateSignatory: (updated: Partial<SignatoryDetails>) => void;
}

export const DscPoaManagementModal: React.FC<DscPoaManagementModalProps> = ({
  isOpen,
  onClose,
  signatory,
  initialTab = "dsc",
  onUpdateSignatory,
}) => {
  const [activeTab, setActiveTab] = useState<"dsc" | "poa">(initialTab);
  const [isDetectingUsb, setIsDetectingUsb] = useState(false);
  const [tokenPin, setTokenPin] = useState("••••••••");
  const [isPinVerified, setIsPinVerified] = useState(true);
  const [poaDocName, setPoaDocName] = useState(
    "Board_Resolution_PoA_Signatory_TechSolutions.pdf",
  );
  const [poaDate, setPoaDate] = useState("14 May 2024");
  const [poaRefNumber, setPoaRefNumber] = useState("BR-2024/09");
  const [isPoaVerified, setIsPoaVerified] = useState(
    signatory.poaStatus === "Verified",
  );

  // Sync tab if initialTab changes
  React.useEffect(() => {
    setActiveTab(initialTab);
  }, [initialTab]);

  if (!isOpen) return null;

  const handleDetectUsbDongle = () => {
    setIsDetectingUsb(true);
    setTimeout(() => {
      setIsDetectingUsb(false);
      setIsPinVerified(true);
      onUpdateSignatory({
        signatureReady: true,
        dscSerial: "DSC-8839-IN-CLASS3-2027",
        dscExpiry: "12 Oct 2027",
      });
      toast.success("e-Mudhra Class-3 USB Token Detected & Connected!", {
        description: `Hardware serial: DSC-8839 · Holder: ${signatory.signatoryName} · Valid until 12 Oct 2027`,
      });
    }, 1200);
  };

  const handleTestPinVerification = () => {
    toast.success("DSC Token PIN Verified Successfully!", {
      description:
        "Cryptographic signing hash generated & verified with SHA-256.",
    });
    setIsPinVerified(true);
  };

  const handleUploadNewPoa = () => {
    setIsPoaVerified(true);
    setPoaDocName("Notarized_PoA_Stamp_Paper_2026.pdf");
    setPoaDate("05 Mar 2026");
    setPoaRefNumber("POA-2026/04");
    onUpdateSignatory({
      poaStatus: "Verified",
    });
    toast.success("Power of Attorney (PoA) Document Uploaded & Verified!", {
      description:
        "Notarized ₹100 stamp paper affidavit verified for Cover-1 submission.",
    });
  };

  return createPortal(
    <div
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
      className="fixed inset-0 z-[9999] flex items-center justify-center p-4 bg-slate-950/75 backdrop-blur-xs animate-in fade-in duration-200"
    >
      <div className="bg-white rounded-2xl max-w-2xl w-full shadow-2xl border border-slate-200 overflow-hidden flex flex-col max-h-[90vh] my-auto">
        {/* Modal Header */}
        <div className="bg-gradient-to-r from-[#082924] via-[#0C3B34] to-[#134942] text-white p-5 flex items-start justify-between gap-4">
          <div className="space-y-1">
            <div className="flex items-center gap-2 flex-wrap">
              <span className="text-[10px] font-extrabold uppercase bg-emerald-400 text-emerald-950 px-2.5 py-0.5 rounded-full tracking-wider">
                Signatory &amp; Legal Desk
              </span>
              <span className="text-xs bg-white/10 px-2.5 py-0.5 rounded-full border border-white/15 text-emerald-200">
                {signatory.signatoryName}
              </span>
            </div>
            <h2 className="text-lg font-bold text-white tracking-tight">
              Manage DSC Token &amp; Power of Attorney (PoA)
            </h2>
            <p className="text-xs text-emerald-100/80">
              Configure Class-3 Digital Signature Certificate and legal Board
              Resolution for tender signing
            </p>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="p-1.5 rounded-lg bg-white/10 hover:bg-white/20 text-white transition-colors cursor-pointer shrink-0"
          >
            <X size={18} />
          </button>
        </div>

        {/* Modal Tab Stepper */}
        <div className="flex border-b border-slate-200 bg-slate-50 px-5 pt-2 gap-2 text-xs font-bold">
          <button
            type="button"
            onClick={() => setActiveTab("dsc")}
            className={`pb-2.5 px-3 border-b-2 flex items-center gap-1.5 transition-all cursor-pointer ${
              activeTab === "dsc"
                ? "border-[#173C40] text-[#173C40] bg-white rounded-t-lg"
                : "border-transparent text-slate-500 hover:text-slate-800"
            }`}
          >
            <KeyRound size={13} />
            <span>1. Class-3 DSC Token &amp; Keys</span>
            <span className="w-2 h-2 rounded-full bg-emerald-500" />
          </button>

          <button
            type="button"
            onClick={() => setActiveTab("poa")}
            className={`pb-2.5 px-3 border-b-2 flex items-center gap-1.5 transition-all cursor-pointer ${
              activeTab === "poa"
                ? "border-[#173C40] text-[#173C40] bg-white rounded-t-lg"
                : "border-transparent text-slate-500 hover:text-slate-800"
            }`}
          >
            <FileText size={13} />
            <span>2. Power of Attorney (PoA) Document</span>
            {isPoaVerified ? (
              <span className="w-2 h-2 rounded-full bg-emerald-500" />
            ) : (
              <span className="w-2 h-2 rounded-full bg-amber-500" />
            )}
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-5 overflow-y-auto space-y-4">
          {activeTab === "dsc" && (
            <div className="space-y-4">
              {/* USB Hardware Token Detection Bar */}
              <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-teal-50 text-teal-700 border border-teal-200 flex items-center justify-center font-bold shrink-0">
                    <Cpu size={20} />
                  </div>
                  <div>
                    <strong className="text-xs font-bold text-slate-900 block">
                      Hardware USB Dongle Auto-Detection
                    </strong>
                    <span className="text-[11px] text-slate-500">
                      Supports e-Mudhra, ProxKey, mToken, Watchdata &amp;
                      SafeScrypt
                    </span>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={handleDetectUsbDongle}
                  disabled={isDetectingUsb}
                  className="px-3.5 py-2 bg-[#173C40] hover:bg-slate-800 text-white rounded-xl text-xs font-bold flex items-center justify-center gap-1.5 shadow-2xs transition-colors cursor-pointer shrink-0"
                >
                  {isDetectingUsb ? (
                    <>
                      <RefreshCw size={13} className="animate-spin" />
                      <span>Scanning USB Ports...</span>
                    </>
                  ) : (
                    <>
                      <Sparkles size={13} className="text-emerald-400" />
                      <span>Detect Connected Token</span>
                    </>
                  )}
                </button>
              </div>

              {/* Detected Certificate Details */}
              <div className="p-4 rounded-xl bg-emerald-50/40 border border-emerald-200 space-y-3">
                <div className="flex items-center justify-between border-b border-emerald-200/60 pb-2">
                  <div className="flex items-center gap-2">
                    <ShieldCheck size={16} className="text-emerald-700" />
                    <strong className="text-xs font-bold text-slate-900">
                      Active Class-3 Certificate Details
                    </strong>
                  </div>
                  <span className="text-[10px] font-bold bg-emerald-100 text-emerald-800 border border-emerald-200 px-2 py-0.5 rounded-full">
                    Hardware Verified
                  </span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                  <div className="bg-white p-2.5 rounded-lg border border-emerald-200/80">
                    <span className="text-[10px] uppercase font-bold text-slate-400 block">
                      Certificate Holder (CN)
                    </span>
                    <strong className="text-slate-900 text-xs block mt-0.5">
                      {signatory.signatoryName}
                    </strong>
                    <span className="text-[10.5px] text-slate-500">
                      {signatory.signatoryTitle}
                    </span>
                  </div>

                  <div className="bg-white p-2.5 rounded-lg border border-emerald-200/80">
                    <span className="text-[10px] uppercase font-bold text-slate-400 block">
                      Issuing Certifying Authority (CA)
                    </span>
                    <strong className="text-slate-900 text-xs block mt-0.5">
                      e-Mudhra Sub-CA Class 3 2024
                    </strong>
                    <span className="text-[10.5px] text-slate-500">
                      CCA Govt of India Approved
                    </span>
                  </div>

                  <div className="bg-white p-2.5 rounded-lg border border-emerald-200/80">
                    <span className="text-[10px] uppercase font-bold text-slate-400 block">
                      Token Serial Number
                    </span>
                    <strong className="text-slate-800 font-mono text-[11px] block mt-0.5">
                      {signatory.dscSerial}
                    </strong>
                    <span className="text-[10.5px] text-slate-500">
                      Key: RSA 2048-bit (SHA-256)
                    </span>
                  </div>

                  <div className="bg-white p-2.5 rounded-lg border border-emerald-200/80">
                    <span className="text-[10px] uppercase font-bold text-slate-400 block">
                      Validity Period
                    </span>
                    <strong className="text-emerald-800 font-bold text-xs block mt-0.5">
                      Valid until {signatory.dscExpiry}
                    </strong>
                    <span className="text-[10.5px] text-emerald-700">
                      Status: Active (582 Days Remaining)
                    </span>
                  </div>
                </div>
              </div>

              {/* PIN Verification & Token Test */}
              <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-3">
                <div className="flex items-center gap-2">
                  <Lock size={14} className="text-slate-600" />
                  <strong className="text-xs font-bold text-slate-900">
                    Verify USB Token User PIN
                  </strong>
                </div>

                <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2">
                  <div className="relative flex-1">
                    <input
                      type="password"
                      value={tokenPin}
                      onChange={(e) => setTokenPin(e.target.value)}
                      placeholder="Enter Token PIN"
                      className="w-full px-3 py-2 bg-white border border-slate-300 rounded-xl text-xs font-mono text-slate-800 focus:outline-hidden focus:ring-2 focus:ring-[#173C40]"
                    />
                  </div>

                  <button
                    type="button"
                    onClick={handleTestPinVerification}
                    className="px-4 py-2 bg-emerald-700 hover:bg-emerald-800 text-white rounded-xl text-xs font-bold transition-colors cursor-pointer shrink-0 flex items-center justify-center gap-1.5"
                  >
                    <CheckCircle2 size={13} />
                    <span>Authorize &amp; Test PIN</span>
                  </button>
                </div>

                <p className="text-[10.5px] text-slate-500">
                  PIN is verified locally against your PKI USB token driver to
                  authorize automated digital stamping during Step 5 (PDF
                  Binder).
                </p>
              </div>
            </div>
          )}

          {activeTab === "poa" && (
            <div className="space-y-4">
              {/* Existing PoA Status Banner */}
              <div
                className={`p-4 rounded-xl border space-y-3 ${
                  isPoaVerified
                    ? "bg-emerald-50/50 border-emerald-200"
                    : "bg-amber-50/50 border-amber-200"
                }`}
              >
                <div className="flex items-center justify-between border-b pb-2.5 border-slate-200/60">
                  <div className="flex items-center gap-2">
                    {isPoaVerified ? (
                      <CheckCircle2 size={16} className="text-emerald-700" />
                    ) : (
                      <AlertTriangle size={16} className="text-amber-700" />
                    )}
                    <div>
                      <strong className="text-xs font-bold text-slate-900 block">
                        Board Resolution &amp; Power of Attorney (PoA)
                      </strong>
                      <span className="text-[10.5px] text-slate-500">
                        {isPoaVerified
                          ? "Verified & approved for bidding by Company Board of Directors"
                          : "Action Required: Attach notarized PoA document for this signatory"}
                      </span>
                    </div>
                  </div>

                  <span
                    className={`text-[10px] font-bold px-2.5 py-0.5 rounded-full ${
                      isPoaVerified
                        ? "bg-emerald-100 text-emerald-800 border border-emerald-200"
                        : "bg-amber-100 text-amber-800 border border-amber-200"
                    }`}
                  >
                    {isPoaVerified ? "Verified Active" : "PoA Pending"}
                  </span>
                </div>

                {/* Document Preview Details */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5 text-xs">
                  <div className="bg-white p-2.5 rounded-lg border border-slate-200">
                    <span className="text-[10px] uppercase font-bold text-slate-400 block">
                      Attached Document
                    </span>
                    <strong
                      className="text-slate-900 text-xs block mt-0.5 truncate"
                      title={poaDocName}
                    >
                      {poaDocName}
                    </strong>
                    <span className="text-[10.5px] text-slate-500">
                      1.8 MB · PDF Format
                    </span>
                  </div>

                  <div className="bg-white p-2.5 rounded-lg border border-slate-200">
                    <span className="text-[10px] uppercase font-bold text-slate-400 block">
                      Board Resolution Date
                    </span>
                    <strong className="text-slate-900 text-xs block mt-0.5">
                      {poaDate}
                    </strong>
                    <span className="text-[10.5px] text-slate-500">
                      Ref: {poaRefNumber}
                    </span>
                  </div>

                  <div className="bg-white p-2.5 rounded-lg border border-slate-200">
                    <span className="text-[10px] uppercase font-bold text-slate-400 block">
                      Notarized Stamp
                    </span>
                    <strong className="text-slate-900 text-xs block mt-0.5">
                      ₹100 Stamp Paper
                    </strong>
                    <span className="text-[10.5px] text-emerald-700 font-medium">
                      Notary Reg #4829
                    </span>
                  </div>
                </div>

                <div className="flex items-center gap-2 pt-1">
                  <button
                    type="button"
                    onClick={() =>
                      toast.info(`Opening preview for ${poaDocName}`, {
                        description: `Board Resolution authorizing ${signatory.signatoryName}`,
                      })
                    }
                    className="px-3 py-1.5 bg-white hover:bg-slate-100 text-slate-700 border border-slate-300 rounded-lg text-xs font-bold transition-colors cursor-pointer flex items-center gap-1.5"
                  >
                    <Eye size={12} />
                    <span>View Attached PoA</span>
                  </button>

                  <button
                    type="button"
                    onClick={handleUploadNewPoa}
                    className="px-3 py-1.5 bg-[#173C40] hover:bg-slate-800 text-white rounded-lg text-xs font-bold transition-colors cursor-pointer flex items-center gap-1.5"
                  >
                    <UploadCloud size={12} />
                    <span>Upload Replacement PoA</span>
                  </button>
                </div>
              </div>

              {/* Upload Dropzone */}
              <div
                onClick={handleUploadNewPoa}
                className="border-2 border-dashed border-slate-300 hover:border-emerald-600 rounded-xl p-6 text-center space-y-2 bg-slate-50/60 hover:bg-emerald-50/30 transition-all cursor-pointer"
              >
                <div className="w-10 h-10 rounded-full bg-emerald-50 text-emerald-700 mx-auto flex items-center justify-center border border-emerald-200">
                  <UploadCloud size={20} />
                </div>
                <div>
                  <strong className="text-xs font-bold text-slate-800 block">
                    Click to browse or drop new Power of Attorney PDF
                  </strong>
                  <p className="text-[11px] text-slate-500 mt-0.5">
                    Upload ₹100 Notarized Stamp Paper or Board Resolution signed
                    by Managing Director (PDF up to 25 MB)
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Modal Footer */}
        <div className="bg-slate-50 p-4 border-t border-slate-200 flex items-center justify-between gap-3">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 bg-white hover:bg-slate-100 text-slate-700 border border-slate-300 rounded-xl text-xs font-bold transition-colors cursor-pointer"
          >
            Close
          </button>

          <button
            type="button"
            onClick={() => {
              toast.success("Credentials saved to Company Vault!", {
                description: "DSC and PoA settings mapped to tender dossier.",
              });
              onClose();
            }}
            className="px-5 py-2 bg-[#173C40] hover:bg-slate-800 text-white rounded-xl text-xs font-bold transition-colors shadow-2xs cursor-pointer flex items-center gap-1.5"
          >
            <Check size={13} />
            <span>Save &amp; Apply Credentials</span>
          </button>
        </div>
      </div>
    </div>,
    document.body,
  );
};
