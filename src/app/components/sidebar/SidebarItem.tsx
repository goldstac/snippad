import { MouseEvent, ReactElement } from "react";

type SidebarItemProps = {
  label?: string;
  number?: number;
  active: boolean;
  // changeView: (view: string) => void;
  onClick: (e: MouseEvent<HTMLButtonElement>) => void;
  icon: ReactElement;
  sidebarOpen: boolean;
};

export default function SidebarItem({
  active = false,
  label,
  number,
  // changeView,
  onClick,
  icon,
  sidebarOpen,
}: SidebarItemProps) {
  return (
    <button
      onClick={onClick}
      className={`rounded-md bg-[${active ? "--background-elevated" : "--background-secondary"}] p-3 flex items-center justify-between border border-transparent ${!active && "hover:border-[--border-color]"} transition-all`}
    >
      <div className="flex gap-4">
        <span
          className={active ? "text-[--accent-color]" : "text-[--text-muted]"}
        >
          {icon}
        </span>
        {sidebarOpen && (
          <h1 className="whitespace-nowrap text-[0.9rem]">{label}</h1>
        )}
      </div>

      {sidebarOpen && <span className="text-[--text-muted]">{number}</span>}
    </button>
  );
}
