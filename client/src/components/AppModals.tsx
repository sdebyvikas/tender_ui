import React from "react";
import { useNavigate } from "react-router-dom";
import TenderAIChatDrawer from "./TenderAIChatDrawer";
import TenderUploadModal from "./TenderUploadModal";
import VaultDocumentUploadModal from "./VaultDocumentUploadModal";
import CompanyProfileModal from "./CompanyProfileModal";
import AuthorizedSignatoriesModal from "./AuthorizedSignatoriesModal";
import { useUIStore, useTenderStore, useCompanyStore } from "../store";

export default function AppModals() {
  const navigate = useNavigate();

  const {
    isChatOpen,
    isUploadOpen,
    isVaultUploadOpen,
    isProfileModalOpen,
    isSignatoriesModalOpen,
    closeModal,
    openModal,
  } = useUIStore();

  const { activeTender, addTender } = useTenderStore();
  const currentActiveTender = activeTender();

  const { companyProfile, updateCompanyProfile, setCompanyProfile } =
    useCompanyStore();

  return (
    <>
      {/* AI CHAT DRAWER */}
      <TenderAIChatDrawer
        isOpen={isChatOpen}
        onClose={() => closeModal("chat")}
        activeTender={currentActiveTender}
        companyProfile={companyProfile}
      />

      {/* TENDER UPLOAD MODAL */}
      <TenderUploadModal
        isOpen={isUploadOpen}
        onClose={() => closeModal("upload")}
        onTenderCreated={(newTender) => {
          addTender(newTender);
          navigate(`/intake/${newTender.id}/overview`);
        }}
      />

      {/* VAULT DOCUMENT UPLOAD MODAL */}
      <VaultDocumentUploadModal
        isOpen={isVaultUploadOpen}
        onClose={() => closeModal("vaultUpload")}
        onDocumentUploaded={(updatedProfile) => {
          if (updatedProfile) setCompanyProfile(updatedProfile);
        }}
      />

      {/* COMPANY PROFILE MODAL */}
      <CompanyProfileModal
        isOpen={isProfileModalOpen}
        onClose={() => closeModal("profile")}
        companyProfile={companyProfile}
        onUpdateProfile={updateCompanyProfile}
        onOpenSignatories={() => {
          closeModal("profile");
          openModal("signatories");
        }}
      />

      {/* AUTHORIZED SIGNATORIES MODAL */}
      <AuthorizedSignatoriesModal
        isOpen={isSignatoriesModalOpen}
        onClose={() => closeModal("signatories")}
        companyProfile={companyProfile}
        onSave={updateCompanyProfile}
      />
    </>
  );
}
