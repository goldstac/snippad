import { MouseEvent, ReactElement } from "react";

type SidebarItemProps = {
  label?: string;
  number?: number;
  active: boolean;
  // changeView: (view: string) => void;
  onClick: (e: MouseEvent<HTMLButtonElement>) => void;
  icon: ReactElement;
  isSidebarOpen: boolean;
};

export default function SidebarItem({
  active = false,
  label,
  number,
  // changeView,
  onClick,
  icon,
  isSidebarOpen,
}: SidebarItemProps) {
  return (
    <button
      onClick={onClick}
      className={`${isSidebarOpen && "w-full"} rounded-md bg-[${active ? "--background-tertiary" : "--background-secondary"}] p-3 flex items-center justify-between border border-transparent hover:border-[--border-color] transition-all`}
    >
      <div className="flex gap-4">
        <span
          className={active ? "text-[--accent-color]" : "text-[--text-muted]"}
        >
          {icon}
        </span>
        {isSidebarOpen && (
          <h1 className="whitespace-nowrap text-[0.9rem]">{label}</h1>
        )}
      </div>

      {isSidebarOpen && <span className="text-[--text-muted]">{number}</span>}
    </button>
  );
}
