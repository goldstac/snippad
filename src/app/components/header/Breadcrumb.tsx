import { ChevronRight, CodeFile } from "reicon-react";

interface BreadcrumbProps {
  path: (string | number)[];
}

export function Breadcrumb({ path }: BreadcrumbProps) {
  return (
    <div className="flex items-center gap-2 text-xs text-[--text-muted] px-3 h-7 bg-[--background-secondary] p-4">
      <CodeFile size={16} />
      {path.map((p, i) => {
        return (
          <span className="flex gap-2 items-center">
            {p} {i !== path.length - 1 && <ChevronRight size={12} />}
          </span>
        );
      })}
    </div>
  );
}
