import { useBreadcrumb } from "@/states/breadcrumb/breadcrumb";
import { ChevronRight, CodeFile } from "reicon-react";

export function Breadcrumb() {
  const { base, path } = useBreadcrumb();
  return (
    <div className="flex items-center gap-2 text-xs text-[--text-muted] px-3 h-7 bg-[--background-secondary] p-4">
      <CodeFile size={16} /> {base}
      {path.map((p, i) => {
        return (
          <span className="flex gap-2 items-center">
            {i === 0 && <ChevronRight size={12} />}
            {p} {i !== path.length - 1 && <ChevronRight size={12} />}
          </span>
        );
      })}
    </div>
  );
}
