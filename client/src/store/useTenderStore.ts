import { create } from "zustand";
import { devtools } from "zustand/middleware";
import { toast } from "sonner";
import { Tender } from "../types/tender";
import { tenderAPI } from "../services/api";

interface TenderState {
  tenders: Tender[];
  selectedTenderId: string | number | null;
  loading: boolean;
  stage: number;

  // Computed / Getter
  activeTender: () => Tender | null;

  // Actions
  fetchTenders: () => Promise<void>;
  selectTender: (tenderOrId: Tender | string | number | null) => void;
  addTender: (newTender: Tender) => void;
  updateTender: (id: string | number, updated: Partial<Tender>) => void;
  deleteTender: (tenderId: string | number) => Promise<boolean>;
  setStage: (stage: number) => void;
}

export const useTenderStore = create<TenderState>()(
  devtools(
    (set, get) => ({
      tenders: [],
      selectedTenderId: null,
      loading: false,
      stage: 3,

      activeTender: () => {
        const { tenders, selectedTenderId } = get();
        if (selectedTenderId) {
          return (
            tenders.find((t) => t.id === selectedTenderId) || tenders[0] || null
          );
        }
        return tenders[0] || null;
      },

      fetchTenders: async () => {
        try {
          set({ loading: true });
          const res = await tenderAPI.getAll();
          const loadedTenders = res.data.tenders || [];
          set((state) => ({
            tenders: loadedTenders,
            selectedTenderId:
              state.selectedTenderId || (loadedTenders[0]?.id ?? null),
            loading: false,
          }));
        } catch (err) {
          console.error("Failed to load tenders:", err);
          set({ loading: false });
        }
      },

      selectTender: (tenderOrId) => {
        if (!tenderOrId) return;
        const id = typeof tenderOrId === "object" ? tenderOrId.id : tenderOrId;
        set({ selectedTenderId: id });
      },

      addTender: (newTender) => {
        set((state) => ({
          tenders: [newTender, ...state.tenders],
          selectedTenderId: newTender.id,
        }));
      },

      updateTender: (id, updated) => {
        set((state) => ({
          tenders: state.tenders.map((t) =>
            t.id === id ? { ...t, ...updated } : t,
          ),
        }));
      },

      deleteTender: async (tenderId) => {
        try {
          await tenderAPI.delete(tenderId);
          set((state) => {
            const remaining = state.tenders.filter((t) => t.id !== tenderId);
            const nextSelected =
              state.selectedTenderId === tenderId
                ? remaining[0]?.id || null
                : state.selectedTenderId;
            return {
              tenders: remaining,
              selectedTenderId: nextSelected,
            };
          });
          toast.success("Tender deleted successfully");
          return true;
        } catch (err) {
          console.error("Failed to delete tender:", err);
          toast.error("Failed to delete tender");
          return false;
        }
      },

      setStage: (stage) => set({ stage }),
    }),
    { name: "TenderStore" },
  ),
);
