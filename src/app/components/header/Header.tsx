import { useModal } from "@/states/modal/modal";
import { useSettings } from "@/states/settings/settings";
import { useSidebarState } from "@/states/sidebar/sidebar";
import { useView } from "@/states/view/view";
import { Plus, Sidebar } from "reicon-react";
import { Button } from "../ui/Button";

export default function Header() {
  const { isSidebarOpen, toggleSidebarState } = useSidebarState();
  const { openModal } = useModal();
  const { activeView } = useView();
  const { settings } = useSettings();
  const fillIcons = settings?.client?.icons?.fill;

  return (
    <header
      className={`
        flex items-center justify-between bg-(--bg-secondary) h-15 p-2 border-b border-(--border-color) transition-all w-full shrink-0
      `}
    >
      <div className="flex items-center gap-3">
        <Button size="sm" onClick={() => toggleSidebarState()}>
          <Sidebar
            size={22}
            className="text-(--text-secondary)"
            weight={
              fillIcons === "auto"
                ? isSidebarOpen
                  ? "Filled"
                  : "Outline"
                : fillIcons === true
                  ? "Filled"
                  : "Outline"
            }
          />
        </Button>
        <h1 className={`text-lg ${activeView.tag && "code"}`}>
          {activeView.label}
        </h1>
      </div>

      <div>
        <Button
          size="sm"
          onClick={() => openModal({ type: "newsnip", title: "New Snip" })}
        >
          <Plus size={16} />
        </Button>
      </div>
    </header>
  );
}
