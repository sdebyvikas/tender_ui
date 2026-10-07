import React, { useState, useMemo } from "react";
import {
  FileText,
  Search,
  X,
  CalendarDays,
  ChevronRight,
  Plus,
  Sparkles,
} from "lucide-react";
import { toast } from "sonner";
import { TenderV2 } from "../types";

interface TenderListV2Props {
  tenders: TenderV2[];
  selectedTender: TenderV2 | null;
  onOpenTender: (tender: TenderV2) => void;
  onOpenUploadModal?: () => void;
}

export const TenderListV2: React.FC<TenderListV2Props> = ({
  tenders,
  selectedTender,
  onOpenTender,
  onOpenUploadModal,
}) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [activeFilter, setActiveFilter] = useState<string>("All");

  const filteredTenders = useMemo(() => {
    return tenders.filter((t) => {
      const matchSearch =
        !searchTerm ||
        t.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        t.tenderNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
        t.organization.toLowerCase().includes(searchTerm.toLowerCase());

      if (!matchSearch) return false;
      if (activeFilter === "All") return true;
      if (activeFilter === "Active") return t.id === selectedTender?.id;
      if (activeFilter === "GO") return t.decision === "GO";
      if (activeFilter === "In Review")
        return t.decision === "IN REVIEW" || t.status === "In Review";
      return true;
    });
  }, [tenders, searchTerm, activeFilter, selectedTender?.id]);

  return (
    <div className="space-y-6 fade-up">
      {/* 1. Top Breadcrumb & Title Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-1.5 text-xs text-slate-500 mb-1 font-medium">
            <span>Bid workspace</span>
            <span>&rsaquo;</span>
            <span className="text-[#173C40] font-semibold">
              Tenders Repository v2
            </span>
          </div>
          <div className="flex items-center gap-2.5">
            <h1 className="text-2xl md:text-3xl font-extrabold text-slate-900 tracking-tight">
              All Ingested Tenders
            </h1>
            <span className="text-[11px] font-bold bg-emerald-100 text-emerald-800 px-2.5 py-0.5 rounded-full border border-emerald-200">
              v2 Static Mode
            </span>
          </div>
        </div>

        <div className="flex items-center gap-2.5">
          {selectedTender && (
            <button
              type="button"
              onClick={() => onOpenTender(selectedTender)}
              className="px-4 py-2 bg-white hover:bg-slate-50 text-slate-800 border border-slate-300 rounded-xl text-xs font-bold flex items-center gap-1.5 shadow-2xs transition-colors cursor-pointer"
            >
              <span>Go to Active Focus</span>
              <ChevronRight size={14} />
            </button>
          )}

          <button
            type="button"
            onClick={onOpenUploadModal}
            className="px-4 py-2 bg-[#173C40] hover:bg-slate-800 text-white rounded-xl text-xs font-bold flex items-center gap-1.5 shadow-xs transition-colors cursor-pointer"
          >
            <Plus size={15} />
            <span>Upload New RFP</span>
          </button>
        </div>
      </div>

      {/* 2. Currently In Focus Banner */}
      {selectedTender && (
        <div className="p-4 bg-emerald-50/80 border border-emerald-200/90 rounded-2xl flex flex-col sm:flex-row sm:items-center justify-between gap-3 shadow-2xs">
          <div className="flex items-center gap-3 min-w-0">
            <div className="min-w-0">
              <div className="flex items-center gap-2 flex-wrap">
                <span className="text-[10px] uppercase font-bold bg-[#18794e] text-white px-2.5 py-0.5 rounded-full tracking-wider">
                  Currently In Focus
                </span>
                <strong className="text-sm font-bold text-[#173C40] truncate block">
                  {selectedTender.title}
                </strong>
              </div>
              <p className="text-xs text-emerald-800 font-mono mt-0.5">
                {selectedTender.tenderNumber} · {selectedTender.organization}
              </p>
            </div>
          </div>

          <button
            type="button"
            className="px-4 py-2 bg-[#173C40] hover:bg-slate-800 text-white rounded-xl text-xs font-semibold flex items-center gap-1.5 shrink-0 shadow-xs cursor-pointer transition-colors"
            onClick={() => onOpenTender(selectedTender)}
          >
            Open Active Hub <ChevronRight size={14} />
          </button>
        </div>
      )}

      {/* 3. Filter Bar & Table Panel */}
      <section className="bg-white p-5 rounded-2xl border border-slate-200 shadow-2xs space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-slate-100">
          <div className="flex items-center gap-2 flex-wrap">
            <label className="search-box">
              <Search size={15} />
              <input
                placeholder="Search tender title, authority, reference..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              {searchTerm && (
                <button
                  type="button"
                  onClick={() => setSearchTerm("")}
                  className="text-slate-400 hover:text-slate-600 cursor-pointer"
                >
                  <X size={13} />
                </button>
              )}
            </label>

            {/* Filter Tabs */}
            <div className="flex gap-1 bg-slate-100 p-1 rounded-lg border border-slate-200 text-xs">
              {["All", "Active", "GO", "In Review"].map((filt) => (
                <button
                  key={filt}
                  type="button"
                  className={`px-2.5 py-1 rounded-md font-semibold transition-all ${
                    activeFilter === filt
                      ? "bg-white text-[#173C40] shadow-2xs"
                      : "text-slate-600 hover:text-slate-900 cursor-pointer"
                  }`}
                  onClick={() => setActiveFilter(filt)}
                >
                  {filt}
                </button>
              ))}
            </div>
          </div>

          <div className="text-xs text-slate-500 font-medium">
            Showing {filteredTenders.length} of {tenders.length} RFPs
          </div>
        </div>

        {/* Table View */}
        <div className="overflow-x-auto rounded-xl border border-slate-200/90 bg-white shadow-2xs">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-slate-200 bg-slate-50/90 text-[11px] font-bold uppercase tracking-wider text-slate-500">
                <th className="py-2.5 px-3.5">Tender Ref &amp; Title</th>
                <th className="py-2.5 px-3.5">Authority</th>
                <th className="py-2.5 px-3.5 whitespace-nowrap">
                  Bid Deadline
                </th>
                <th className="py-2.5 px-3.5 whitespace-nowrap">
                  Estimated Value &amp; EMD
                </th>
                <th className="py-2.5 px-3.5 text-center whitespace-nowrap">
                  Decision
                </th>
                <th className="py-2.5 px-3.5 text-right whitespace-nowrap">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-xs">
              {filteredTenders.length > 0 ? (
                filteredTenders.map((row) => {
                  const isCurrent = selectedTender?.id === row.id;

                  return (
                    <tr
                      key={row.id}
                      onClick={() => onOpenTender(row)}
                      className={`group transition-colors cursor-pointer ${
                        isCurrent
                          ? "bg-emerald-50/70 hover:bg-emerald-50/90"
                          : "hover:bg-slate-50/80"
                      }`}
                    >
                      {/* 1. Tender Ref & Title (Single Line with Full Hover Tooltip) */}
                      <td className="py-2.5 px-3.5 max-w-[280px] lg:max-w-[340px]">
                        <div className="flex items-center gap-2.5">
                          <div
                            className={`w-7 h-7 rounded-lg flex items-center justify-center shrink-0 transition-colors ${
                              isCurrent
                                ? "bg-[#173C40] text-white"
                                : "bg-slate-100 text-slate-600 group-hover:bg-emerald-100 group-hover:text-emerald-800"
                            }`}
                          >
                            <FileText size={14} />
                          </div>
                          <div className="min-w-0">
                            <div className="flex items-center gap-1.5">
                              <strong
                                title={row.title}
                                className="text-slate-900 font-bold block truncate group-hover:text-emerald-950 transition-colors"
                              >
                                {row.title}
                              </strong>
                              {isCurrent && (
                                <span className="text-[9px] bg-emerald-700 text-white px-1.5 py-0.2 rounded font-bold uppercase tracking-wider shrink-0">
                                  Active
                                </span>
                              )}
                            </div>
                            <span className="text-[10.5px] font-mono text-slate-500 block truncate">
                              {row.tenderNumber}
                            </span>
                          </div>
                        </div>
                      </td>

                      {/* 2. Authority (Strict 1 Line with Full Hover Tooltip) */}
                      <td className="py-2.5 px-3.5 max-w-[180px] lg:max-w-[220px]">
                        <span
                          title={row.organization}
                          className="text-xs font-semibold text-slate-800 block truncate whitespace-nowrap"
                        >
                          {row.organization}
                        </span>
                        {row.location && (
                          <span
                            title={row.location}
                            className="text-[10px] text-slate-400 block truncate whitespace-nowrap"
                          >
                            {row.location}
                          </span>
                        )}
                      </td>

                      {/* 3. Bid Deadline */}
                      <td className="py-2.5 px-3.5 whitespace-nowrap">
                        <div className="flex items-center gap-1.5 text-slate-700 font-medium">
                          <CalendarDays
                            size={13}
                            className="text-slate-400 shrink-0"
                          />
                          <span>{row.submissionDeadline.split(",")[0]}</span>
                        </div>
                      </td>

                      {/* 4. Estimated Value & EMD */}
                      <td className="py-2.5 px-3.5 whitespace-nowrap">
                        <strong className="text-slate-900 font-mono font-bold block text-xs">
                          {row.estimatedValueDisplay.split("(")[0].trim()}
                        </strong>
                        <span className="text-[10px] text-slate-500 block">
                          EMD: {row.emdDisplay}
                        </span>
                      </td>

                      {/* 5. Decision Status */}
                      <td className="py-2.5 px-3.5 text-center whitespace-nowrap">
                        <span
                          className={`inline-flex items-center gap-1 text-[10px] font-bold px-2 py-0.5 rounded-full border ${
                            row.decision === "GO"
                              ? "bg-emerald-50 text-emerald-800 border-emerald-200"
                              : row.decision === "CONDITIONAL GO"
                                ? "bg-amber-50 text-amber-800 border-amber-200"
                                : row.decision === "NO-GO"
                                  ? "bg-rose-50 text-rose-800 border-rose-200"
                                  : "bg-sky-50 text-sky-800 border-sky-200"
                          }`}
                        >
                          <span className="w-1.5 h-1.5 rounded-full bg-current" />
                          {row.decision}
                        </span>
                      </td>

                      {/* 6. Actions */}
                      <td className="py-2.5 px-3.5 text-right whitespace-nowrap">
                        <button
                          type="button"
                          onClick={(e) => {
                            e.stopPropagation();
                            onOpenTender(row);
                          }}
                          className="px-2.5 py-1 text-xs font-bold bg-white hover:bg-[#173C40] text-slate-700 hover:text-white rounded-lg border border-slate-300 hover:border-[#173C40] transition-all inline-flex items-center gap-1 shadow-2xs cursor-pointer"
                        >
                          <span>Open</span>
                          <ChevronRight size={13} />
                        </button>
                      </td>
                    </tr>
                  );
                })
              ) : (
                <tr>
                  <td colSpan={6} className="text-center py-8 text-slate-500">
                    <p className="text-xs font-semibold text-slate-700">
                      No tenders match your search criteria
                    </p>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
};
