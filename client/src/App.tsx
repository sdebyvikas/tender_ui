import React, { useEffect, useMemo } from "react";
import { useLocation } from "react-router-dom";
import { Toaster } from "sonner";

// Layout & Navigation Components
import Sidebar from "./components/Sidebar";
import Topbar from "./components/Topbar";
import AppModals from "./components/AppModals";
import { AppRoutes, getActivePageLabel } from "./routes";
import { useTenderStore, useCompanyStore } from "./store";

export default function App() {
  const location = useLocation();

  const fetchTenders = useTenderStore((state) => state.fetchTenders);
  const fetchCompanyProfile = useCompanyStore(
    (state) => state.fetchCompanyProfile,
  );

  useEffect(() => {
    fetchTenders();
    fetchCompanyProfile();
  }, [fetchTenders, fetchCompanyProfile]);

  const activeLabel = useMemo(
    () => getActivePageLabel(location.pathname),
    [location.pathname],
  );

  return (
    <div className="app-shell">
      <Toaster position="top-right" richColors />

      {/* SIDEBAR NAVIGATION */}
      <Sidebar />

      {/* MAIN CONTENT AREA */}
      <main className="main-area flex-1 flex flex-col h-screen max-h-screen overflow-y-auto min-w-0">
        <Topbar activeLabel={activeLabel} />

        <div
          className={`page-content ${
            location.pathname === "/ai-mode"
              ? "!p-0 !max-w-none !h-[calc(100vh-66px)] !overflow-hidden"
              : ""
          }`}
        >
          <AppRoutes />
        </div>
      </main>

      {/* GLOBAL MODALS */}
      <AppModals />
    </div>
  );
}
