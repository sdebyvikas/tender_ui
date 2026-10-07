import React, { useMemo } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { toast } from "sonner";
import {
  ArrowUpRight,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  MoreHorizontal,
  Settings2,
  Sparkles,
  X,
} from "lucide-react";
import { LogoMark, navItems } from "./Common";
import { useUIStore, useCompanyStore } from "../store";

export default function Sidebar() {
  const navigate = useNavigate();
  const location = useLocation();

  const {
    sidebarOpen,
    setSidebarOpen,
    isSidebarCollapsed,
    setIsSidebarCollapsed,
    openModal,
  } = useUIStore();

  const { companyProfile } = useCompanyStore();

  const groupedNav = useMemo(() => {
    return ["Workspace", "Bid Operations"].map((section) => ({
      section,
      items: navItems.filter((item) => item.section === section),
    }));
  }, []);

  return (
    <>
      <aside
        className={`sidebar ${sidebarOpen ? "sidebar-open" : ""} ${
          isSidebarCollapsed ? "sidebar-collapsed" : ""
        }`}
      >
        {/* Brand Row */}
        <div className="brand-row">
          <div
            className="brand-lockup cursor-pointer"
            onClick={() => navigate("/overview")}
          >
            <LogoMark />
            {!isSidebarCollapsed && (
              <div>
                <strong>
                  Tender<span>Flow</span>
                </strong>
                <small>Bid operations OS</small>
              </div>
            )}
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
            <button
              type="button"
              className="sidebar-collapse-toggle cursor-pointer"
              onClick={() => setIsSidebarCollapsed((prev) => !prev)}
              title={
                isSidebarCollapsed ? "Expand Sidebar" : "Collapse to Icons"
              }
            >
              {isSidebarCollapsed ? (
                <ChevronRight size={14} />
              ) : (
                <ChevronLeft size={14} />
              )}
            </button>
            <button
              className="sidebar-close cursor-pointer"
              onClick={() => setSidebarOpen(false)}
            >
              <X size={18} />
            </button>
          </div>
        </div>

        {/* Workspace Switcher */}
        <div
          className="workspace-switcher cursor-pointer"
          onClick={() => openModal("profile")}
          title={isSidebarCollapsed ? "Tech Solutions (Admin)" : undefined}
        >
          <div className="workspace-avatar">TS</div>
          {!isSidebarCollapsed && (
            <>
              <div>
                <strong>{companyProfile?.name || "Tech Solutions"}</strong>
                <small>Admin workspace</small>
              </div>
              <ChevronDown
                size={14}
                style={{ color: "#7890a4", flexShrink: 0, marginLeft: "auto" }}
              />
            </>
          )}
        </div>

        {/* Navigation Items */}
        <nav className="side-nav">
          {groupedNav.map((group) => (
            <div className="nav-section" key={group.section}>
              {!isSidebarCollapsed && (
                <span className="nav-section-label">{group.section}</span>
              )}
              {group.items.map((item) => {
                const ItemIcon = item.icon;
                const isSelected =
                  location.pathname === item.path ||
                  (item.path === "/overview" &&
                    (location.pathname === "/" ||
                      location.pathname === "/overview")) ||
                  (item.path === "/vault" &&
                    (location.pathname === "/vault" ||
                      location.pathname === "/company-vault")) ||
                  (item.path === "/tenders-v2" &&
                    location.pathname.startsWith("/tenders-v2")) ||
                  (item.path === "/intake" &&
                    (location.pathname === "/intake" ||
                      location.pathname === "/tender-intake" ||
                      location.pathname.startsWith("/intake/") ||
                      location.pathname.startsWith("/tender-intake/") ||
                      location.pathname.startsWith("/tenders/")));

                return (
                  <button
                    key={item.label}
                    className={`nav-item cursor-pointer ${
                      isSelected ? "active" : ""
                    }`}
                    title={isSidebarCollapsed ? item.label : undefined}
                    onClick={() => {
                      navigate(item.path);
                      setSidebarOpen(false);
                    }}
                  >
                    <ItemIcon size={17} />
                    {!isSidebarCollapsed && <span>{item.label}</span>}
                  </button>
                );
              })}
            </div>
          ))}
        </nav>

        <div className="sidebar-spacer" />

        {/* Automation Insights Tip */}
        {!isSidebarCollapsed && (
          <div className="sidebar-tip">
            <div className="tip-spark">
              <Sparkles size={15} />
            </div>
            <strong>30 min to bid-ready</strong>
            <p>Your workflow is 41% faster than the team average.</p>
            <button
              className="cursor-pointer"
              onClick={() =>
                toast("Automation insights", {
                  description:
                    "Time saved is calculated from your workspace activity.",
                })
              }
            >
              See insights <ArrowUpRight size={14} />
            </button>
          </div>
        )}

        {/* Sidebar Footer */}
        <div className="sidebar-footer">
          <button
            className="nav-item cursor-pointer"
            title={isSidebarCollapsed ? "Settings" : undefined}
            onClick={() =>
              toast("Settings", {
                description: "Workspace configuration opened.",
              })
            }
          >
            <Settings2 size={17} />
            {!isSidebarCollapsed && <span>Settings</span>}
          </button>
          <div
            className="profile-row cursor-pointer"
            onClick={() => openModal("profile")}
            title={
              isSidebarCollapsed ? "Arjun Mehta (Administrator)" : undefined
            }
          >
            <div className="profile-avatar">AM</div>
            {!isSidebarCollapsed && (
              <>
                <div>
                  <strong>Arjun Mehta</strong>
                  <small>Administrator</small>
                </div>
                <MoreHorizontal size={16} />
              </>
            )}
          </div>
        </div>
      </aside>

      {/* Sidebar Mobile Overlay Backdrop */}
      {sidebarOpen && (
        <button
          className="sidebar-overlay"
          aria-label="Close menu"
          onClick={() => setSidebarOpen(false)}
        />
      )}
    </>
  );
}
