import React from "react";
import { Navigate, useNavigate } from "react-router-dom";
import { useTenderStore, useCompanyStore, useUIStore } from "../store";

// Page Components
import Overview from "../pages/Overview";
import CompanyVault from "../pages/CompanyVault";
import TenderIntake from "../pages/TenderIntake";
import Eligibility from "../pages/Eligibility";
import PaymentProof from "../pages/PaymentProof";
import ProposalDesk from "../pages/ProposalDesk";
import PdfBinder from "../pages/PdfBinder";
import AIModeWorkspace from "../ai-mode/AIModeWorkspace";
import { TendersRepositoryV2Page } from "../features/tender-repository-v2";

export const ROUTE_MAP: Record<string, string> = {
  Overview: "/overview",
  "Company Vault": "/vault",
  "Tenders Repository": "/intake",
  "Tender Intake": "/intake",
  "Tenders Repository v2": "/tenders-v2",
  Eligibility: "/eligibility",
  "Payment Proof": "/payment-proof",
  "Proposal Desk": "/proposal-desk",
  "PDF Binder": "/pdf-binder",
  "AI Mode": "/ai-mode",
};

export const PATH_TO_LABEL_MAP: Record<string, string> = {
  "/": "Overview",
  "/overview": "Overview",
  "/vault": "Company Vault",
  "/company-vault": "Company Vault",
  "/intake": "Tenders Repository",
  "/tender-intake": "Tenders Repository",
  "/tenders-v2": "Tenders Repository v2",
  "/eligibility": "Eligibility",
  "/payment-proof": "Payment Proof",
  "/proposal-desk": "Proposal Desk",
  "/pdf-binder": "PDF Binder",
  "/ai-mode": "AI Mode",
};

export function getActivePageLabel(pathname: string): string {
  if (pathname.startsWith("/tenders-v2")) {
    return "Tenders Repository v2";
  }
  if (
    pathname.startsWith("/intake/") ||
    pathname.startsWith("/tender-intake/") ||
    pathname.startsWith("/tenders/")
  ) {
    return "Tender Command Center";
  }
  return PATH_TO_LABEL_MAP[pathname] || "Overview";
}

// Clean Route Adapters connected directly to Zustand Stores
const OverviewRoute = () => {
  const { tenders, selectedTenderId, activeTender, selectTender, setStage } =
    useTenderStore();
  const { openModal } = useUIStore();
  const navigate = useNavigate();
  const setActive = (target: string) => navigate(ROUTE_MAP[target] || target);

  return (
    <Overview
      tenders={tenders}
      activeTender={activeTender()}
      selectedTenderId={selectedTenderId}
      onSelectTender={selectTender}
      setActive={setActive}
      setStage={setStage}
      onOpenUploadModal={() => openModal("upload")}
    />
  );
};

const CompanyVaultRoute = () => {
  const { companyProfile, setCompanyProfile, deleteVaultDocument } =
    useCompanyStore();
  const { openModal } = useUIStore();

  return (
    <CompanyVault
      companyProfile={companyProfile}
      onEditProfile={() => openModal("profile")}
      onOpenSignatoriesModal={() => openModal("signatories")}
      onUploadDoc={() => openModal("vaultUpload")}
      onDocumentUpdated={(updated) => setCompanyProfile(updated)}
      onDeleteDoc={(docId) => {
        deleteVaultDocument(docId);
      }}
    />
  );
};

const TenderIntakeRoute = () => {
  const {
    tenders,
    activeTender,
    selectTender,
    setStage,
    addTender,
    deleteTender,
  } = useTenderStore();
  const { companyProfile } = useCompanyStore();
  const navigate = useNavigate();
  const setActive = (target: string) => navigate(ROUTE_MAP[target] || target);

  return (
    <TenderIntake
      tenders={tenders}
      activeTender={activeTender()}
      onSelectTender={selectTender}
      setActive={setActive}
      setStage={setStage}
      onTenderCreated={addTender}
      onDeleteTender={(id) => {
        deleteTender(id);
      }}
      companyProfile={companyProfile}
    />
  );
};

const EligibilityRoute = () => {
  const { activeTender } = useTenderStore();
  const { companyProfile } = useCompanyStore();
  const { openModal } = useUIStore();
  const navigate = useNavigate();
  const setActive = (target: string) => navigate(ROUTE_MAP[target] || target);

  return (
    <Eligibility
      activeTender={activeTender()}
      companyProfile={companyProfile}
      setActive={setActive}
      onOpenProfileModal={() => openModal("profile")}
      onOpenSignatoriesModal={() => openModal("signatories")}
    />
  );
};

const PaymentProofRoute = () => {
  const { activeTender } = useTenderStore();
  const navigate = useNavigate();
  const setActive = (target: string) => navigate(ROUTE_MAP[target] || target);

  return <PaymentProof activeTender={activeTender()} setActive={setActive} />;
};

const ProposalDeskRoute = () => {
  const { activeTender } = useTenderStore();
  const { companyProfile } = useCompanyStore();
  const navigate = useNavigate();
  const setActive = (target: string) => navigate(ROUTE_MAP[target] || target);

  return (
    <ProposalDesk
      activeTender={activeTender()}
      companyProfile={companyProfile}
      setActive={setActive}
    />
  );
};

const PdfBinderRoute = () => {
  const { activeTender } = useTenderStore();
  const { companyProfile } = useCompanyStore();

  return (
    <PdfBinder activeTender={activeTender()} companyProfile={companyProfile} />
  );
};

const AIModeRoute = () => {
  const { activeTender } = useTenderStore();
  const { companyProfile } = useCompanyStore();
  const navigate = useNavigate();

  return (
    <AIModeWorkspace
      activeTender={activeTender()}
      companyProfile={companyProfile}
      onBackToClassic={() => navigate("/overview")}
    />
  );
};

export interface AppRouteItem {
  path: string | string[];
  name: string;
  element: React.ReactNode;
}

export const appRoutesConfig: AppRouteItem[] = [
  {
    path: ["/", "/overview"],
    name: "Overview",
    element: <OverviewRoute />,
  },
  {
    path: ["/vault", "/company-vault"],
    name: "Company Vault",
    element: <CompanyVaultRoute />,
  },
  {
    path: [
      "/intake",
      "/intake/:tenderId",
      "/intake/:tenderId/:stepKey",
      "/tender-intake",
      "/tender-intake/:tenderId",
      "/tender-intake/:tenderId/:stepKey",
      "/tenders/:tenderId",
      "/tenders/:tenderId/:stepKey",
    ],
    name: "Tender Intake",
    element: <TenderIntakeRoute />,
  },
  {
    path: "/eligibility",
    name: "Eligibility",
    element: <EligibilityRoute />,
  },
  {
    path: "/payment-proof",
    name: "Payment Proof",
    element: <PaymentProofRoute />,
  },
  {
    path: "/proposal-desk",
    name: "Proposal Desk",
    element: <ProposalDeskRoute />,
  },
  {
    path: "/pdf-binder",
    name: "PDF Binder",
    element: <PdfBinderRoute />,
  },
  {
    path: "/ai-mode",
    name: "AI Mode",
    element: <AIModeRoute />,
  },
  {
    path: ["/tenders-v2", "/tenders-v2/:tenderId"],
    name: "Tenders Repository v2",
    element: <TendersRepositoryV2Page />,
  },
  {
    path: "*",
    name: "Fallback",
    element: <Navigate to="/" replace />,
  },
];
