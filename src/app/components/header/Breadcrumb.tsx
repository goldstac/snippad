import { ChevronRight, FileCode } from "lucide-react";
import { sidebarItems } from "../../content/sidebarTopItems";
import { ViewTypes } from "../../types/app";

interface BreadcrumbProps {
  gistName?: string;
  activeView: ViewTypes;
}

export function Breadcrumb({ gistName, activeView }: BreadcrumbProps) {
  return (
    <div className="flex items-center gap-1.5 text-xs text-[--text-muted] px-3 h-7 bg-[--background-secondary]">
      <FileCode size={12} />
      <span>{sidebarItems.filter((i) => i.id == activeView)[0].label}</span>
      {gistName && (
        <>
          <ChevronRight size={12} />
          <span className="text-[--text-secondary]">{gistName}</span>
        </>
      )}
    </div>
  );
}
