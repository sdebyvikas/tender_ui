import { create } from "zustand";
import { devtools } from "zustand/middleware";

export type ModalType =
  | "chat"
  | "upload"
  | "vaultUpload"
  | "profile"
  | "signatories";

interface UIState {
  sidebarOpen: boolean;
  isSidebarCollapsed: boolean;

  // Modals
  isChatOpen: boolean;
  isUploadOpen: boolean;
  isVaultUploadOpen: boolean;
  isProfileModalOpen: boolean;
  isSignatoriesModalOpen: boolean;

  // Sidebar Actions
  setSidebarOpen: (open: boolean) => void;
  toggleSidebar: () => void;
  setIsSidebarCollapsed: (
    collapsed: boolean | ((prev: boolean) => boolean),
  ) => void;
  toggleSidebarCollapse: () => void;

  // Modal Actions
  setIsChatOpen: (open: boolean | ((prev: boolean) => boolean)) => void;
  setIsUploadOpen: (open: boolean) => void;
  setIsVaultUploadOpen: (open: boolean) => void;
  setIsProfileModalOpen: (open: boolean) => void;
  setIsSignatoriesModalOpen: (open: boolean) => void;

  openModal: (modal: ModalType) => void;
  closeModal: (modal: ModalType) => void;
  closeAllModals: () => void;
}

export const useUIStore = create<UIState>()(
  devtools(
    (set) => ({
      sidebarOpen: false,
      isSidebarCollapsed: false,

      isChatOpen: false,
      isUploadOpen: false,
      isVaultUploadOpen: false,
      isProfileModalOpen: false,
      isSignatoriesModalOpen: false,

      setSidebarOpen: (open) => set({ sidebarOpen: open }),
      toggleSidebar: () =>
        set((state) => ({ sidebarOpen: !state.sidebarOpen })),

      setIsSidebarCollapsed: (collapsedOrUpdater) => {
        set((state) => ({
          isSidebarCollapsed:
            typeof collapsedOrUpdater === "function"
              ? collapsedOrUpdater(state.isSidebarCollapsed)
              : collapsedOrUpdater,
        }));
      },
      toggleSidebarCollapse: () =>
        set((state) => ({ isSidebarCollapsed: !state.isSidebarCollapsed })),

      setIsChatOpen: (openOrUpdater) => {
        set((state) => ({
          isChatOpen:
            typeof openOrUpdater === "function"
              ? openOrUpdater(state.isChatOpen)
              : openOrUpdater,
        }));
      },
      setIsUploadOpen: (open) => set({ isUploadOpen: open }),
      setIsVaultUploadOpen: (open) => set({ isVaultUploadOpen: open }),
      setIsProfileModalOpen: (open) => set({ isProfileModalOpen: open }),
      setIsSignatoriesModalOpen: (open) =>
        set({ isSignatoriesModalOpen: open }),

      openModal: (modal) => {
        switch (modal) {
          case "chat":
            set({ isChatOpen: true });
            break;
          case "upload":
            set({ isUploadOpen: true });
            break;
          case "vaultUpload":
            set({ isVaultUploadOpen: true });
            break;
          case "profile":
            set({ isProfileModalOpen: true });
            break;
          case "signatories":
            set({ isSignatoriesModalOpen: true });
            break;
        }
      },

      closeModal: (modal) => {
        switch (modal) {
          case "chat":
            set({ isChatOpen: false });
            break;
          case "upload":
            set({ isUploadOpen: false });
            break;
          case "vaultUpload":
            set({ isVaultUploadOpen: false });
            break;
          case "profile":
            set({ isProfileModalOpen: false });
            break;
          case "signatories":
            set({ isSignatoriesModalOpen: false });
            break;
        }
      },

      closeAllModals: () =>
        set({
          isChatOpen: false,
          isUploadOpen: false,
          isVaultUploadOpen: false,
          isProfileModalOpen: false,
          isSignatoriesModalOpen: false,
        }),
    }),
    { name: "UIStore" },
  ),
);
