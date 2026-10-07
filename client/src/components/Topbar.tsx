import React from "react";
import { toast } from "sonner";
import {
  Bell,
  Grid2X2,
  HelpCircle,
  Menu,
  Search,
  Sparkles,
} from "lucide-react";
import { IconButton } from "./Common";
import { useUIStore } from "../store";

interface TopbarProps {
  activeLabel: string;
}

export default function Topbar({ activeLabel }: TopbarProps) {
  const { setSidebarOpen, setIsChatOpen, openModal } = useUIStore();

  return (
    <header className="topbar">
      <div className="topbar-left">
        <button
          className="mobile-menu cursor-pointer"
          onClick={() => setSidebarOpen(true)}
          aria-label="Open navigation menu"
        >
          <Menu size={19} />
        </button>
        <div className="topbar-page">
          <Grid2X2 size={15} />
          <span>{activeLabel}</span>
        </div>
      </div>

      <div className="topbar-actions">
        <label className="search-box">
          <Search size={16} />
          <input placeholder="Search tenders, documents..." />
          <kbd>⌘ K</kbd>
        </label>

        <button
          className="icon-button cursor-pointer"
          aria-label="Tender Copilot AI"
          title="Tender Copilot AI"
          onClick={() => setIsChatOpen((v) => !v)}
        >
          <Sparkles size={18} className="text-[#18794e]" />
        </button>

        <IconButton
          label="Help center"
          onClick={() =>
            toast("Help Center", {
              description: "Guidance is available inside each workflow step.",
            })
          }
        >
          <HelpCircle size={18} />
        </IconButton>

        <button
          className="notification-button cursor-pointer"
          aria-label="Notifications"
          onClick={() =>
            toast("Notifications", {
              description:
                "3 alerts: ISO 27001 expiring, EMD payment pending, draft ready.",
            })
          }
        >
          <Bell size={18} />
          <i />
        </button>

        <div
          className="top-avatar cursor-pointer"
          onClick={() => openModal("profile")}
          title="Arjun Mehta (Tech Solutions)"
        >
          AM
        </div>
      </div>
    </header>
  );
}
