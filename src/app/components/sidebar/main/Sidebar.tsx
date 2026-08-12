import { useSettings } from "@/states/settings/settings";
import { useSidebarState } from "@/states/sidebar/sidebar";
import SidebarBottom from "./SidebarBottom";
import SidebarTop from "./SidebarTop";
import TagsList from "./TagsList";

export function Sidebar() {
  const { isSidebarOpen } = useSidebarState();
  const { settings } = useSettings();

  return (
    <aside
      className={`
        flex flex-col items-center ${settings?.client?.sidebar?.showDividers ? "gap-3" : "gap-1"} h-full border-r border-[--border-color] transition-all bg-[--bg-secondary] flex-shrink-0
        ${isSidebarOpen ? "w-80 p-3" : "w-12 py-3 px-2"}
      `}
    >
      <SidebarTop />
      <SidebarBottom />
      {settings?.client?.sidebar?.showTags && <TagsList />}
    </aside>
  );
}
