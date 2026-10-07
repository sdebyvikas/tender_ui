import { create } from "zustand";
import { devtools } from "zustand/middleware";
import { toast } from "sonner";
import { CompanyProfile } from "../types/company";
import { companyProfileAPI } from "../services/api";

interface CompanyState {
  companyProfile: CompanyProfile | null;
  loading: boolean;

  // Actions
  fetchCompanyProfile: () => Promise<void>;
  updateCompanyProfile: (data: Partial<CompanyProfile>) => Promise<boolean>;
  setCompanyProfile: (
    profile:
      | CompanyProfile
      | null
      | ((prev: CompanyProfile | null) => CompanyProfile | null),
  ) => void;
  deleteVaultDocument: (docId: string | number) => Promise<boolean>;
}

export const useCompanyStore = create<CompanyState>()(
  devtools(
    (set) => ({
      companyProfile: null,
      loading: false,

      fetchCompanyProfile: async () => {
        try {
          set({ loading: true });
          const res = await companyProfileAPI.get();
          set({
            companyProfile: res.data.companyProfile || null,
            loading: false,
          });
        } catch (err) {
          console.error("Failed to load company profile:", err);
          set({ loading: false });
        }
      },

      updateCompanyProfile: async (data) => {
        try {
          const res = await companyProfileAPI.update(data);
          set({ companyProfile: res.data.companyProfile });
          toast.success("Company profile updated");
          return true;
        } catch (err) {
          console.error("Failed to update profile:", err);
          toast.error("Failed to update profile");
          return false;
        }
      },

      setCompanyProfile: (profileOrUpdater) => {
        set((state) => ({
          companyProfile:
            typeof profileOrUpdater === "function"
              ? profileOrUpdater(state.companyProfile)
              : profileOrUpdater,
        }));
      },

      deleteVaultDocument: async (docId) => {
        try {
          const res = await companyProfileAPI.deleteDocument(docId);
          if (res.data?.companyProfile) {
            set({ companyProfile: res.data.companyProfile });
          } else {
            set((state) => ({
              companyProfile: state.companyProfile
                ? {
                    ...state.companyProfile,
                    statutoryDocuments: (
                      state.companyProfile.statutoryDocuments || []
                    ).filter((d) => d.id !== docId),
                  }
                : null,
            }));
          }
          toast.success("Document removed from vault");
          return true;
        } catch (err) {
          console.error("Failed to remove document:", err);
          toast.error("Failed to remove document");
          return false;
        }
      },
    }),
    { name: "CompanyStore" },
  ),
);
