import React, { ReactNode } from "react";
import { LucideIcon, Sparkles } from "lucide-react";

interface TabPlaceholderCardProps {
  stepNumber: number;
  title: string;
  subtitle: string;
  description: string;
  icon: LucideIcon;
  badgeText?: string;
  children?: ReactNode;
}

export const TabPlaceholderCard: React.FC<TabPlaceholderCardProps> = ({
  stepNumber,
  title,
  subtitle,
  description,
  icon: Icon,
  badgeText = "Modular Step",
  children,
}) => {
  return (
    <div className="space-y-6 fade-up">
      {/* Top Banner for this Tab */}
      <div className="bg-white p-5 md:p-6 rounded-2xl border border-slate-200/90 shadow-2xs">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-start gap-3.5">
            <div className="w-10 h-10 rounded-xl bg-emerald-50 text-[#173C40] border border-emerald-200/70 flex items-center justify-center shrink-0">
              <Icon size={20} />
            </div>
            <div>
              <div className="flex items-center gap-2 flex-wrap">
                <span className="text-[10.5px] uppercase font-bold tracking-wider bg-slate-100 text-slate-700 px-2.5 py-0.5 rounded-full border border-slate-200">
                  Step {stepNumber}
                </span>
                <span className="text-[10.5px] uppercase font-semibold text-emerald-800 bg-emerald-100/70 px-2 py-0.5 rounded-full">
                  {badgeText}
                </span>
              </div>
              <h3 className="text-base md:text-lg font-bold text-slate-900 mt-1">
                {title}
              </h3>
              <p className="text-xs text-slate-500 mt-0.5 max-w-2xl leading-relaxed">
                {description}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2 self-start sm:self-center">
            <span className="inline-flex items-center gap-1 text-xs font-semibold text-emerald-700 bg-emerald-50 px-3 py-1.5 rounded-xl border border-emerald-200">
              <Sparkles size={13} /> Active View
            </span>
          </div>
        </div>
      </div>

      {/* Main Tab Custom Content / Placeholders */}
      {children}
    </div>
  );
};
