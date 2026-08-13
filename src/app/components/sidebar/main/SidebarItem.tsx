import { useSettings } from "@/states/settings/settings";
import { useSidebarState } from "@/states/sidebar/sidebar";
import { type IconComponent } from "reicon-react";

type SidebarItemProps = {
  icon: IconComponent;
  number?: number;
  label: string;
  onClick: () => void;
  active: boolean;
};

export default function SidebarItem({
  icon,
  number,
  label,
  onClick,
  active,
}: SidebarItemProps) {
  const { isSidebarOpen } = useSidebarState();
  const { settings } = useSettings();
  const fillIcons = settings?.client?.icons?.fill;
  const Icon = icon;

  return (
    <button
      onClick={onClick}
      className={`
        flex h-12 w-full items-center justify-between rounded-md transition-all
        ${isSidebarOpen ? "px-4" : "px-2 justify-center"} ${isSidebarOpen && "hover:bg-(--bg-tertiary)"}
        ${active && isSidebarOpen ? "bg-(--bg-tertiary)" : ""}
      `}
    >
      <div className="flex items-center justify-center gap-3">
        <Icon
          size={20}
          weight={
            fillIcons === "auto"
              ? active
                ? "Filled"
                : "Outline"
              : fillIcons === true
                ? "Filled"
                : "Outline"
          }
          className={`${active ? "text-(--accent-color)" : "text-(--text-muted)"} transition-all ${!isSidebarOpen && !active && "hover:text-(--text-secondary)"}`}
        />
        {isSidebarOpen && (
          <span className="bricolage whitespace-nowrap text-lg leading-none">
            {label}
          </span>
        )}
      </div>
      {isSidebarOpen && settings?.client?.sidebar?.showNumbers && (
        <span className="text-(--text-muted)">{number}</span>
      )}
    </button>
  );
}
