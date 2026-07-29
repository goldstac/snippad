import { useAuth } from "@/hooks/useAuth";
import { useGists } from "@/hooks/useGists";
import { useSidebarState } from "@/states/sidebar/sidebar";
import SidebarBottom from "./SidebarBottom";
import SidebarTop from "./SidebarTop";
import { TagList } from "./TagList";

export default function Sidebar() {
  const { isSidebarOpen } = useSidebarState();
  const { gists, starredIds, allTags, selectedTag, setTag } = useGists();
  const { user } = useAuth();

  const counts: Record<string, number> = {
    all: gists.length,
    starred: starredIds.size,
    public: gists.filter((g) => g.public).length,
    secret: gists.filter((g) => !g.public).length,
  };

  return (
    <div
      className={`${isSidebarOpen ? "w-80" : "w-14"} p-2 h-full flex flex-col flex-shrink-0 items-start justify-between border-r bg-[--background-secondary] border-[--border-color] transition-all`}
    >
      <SidebarTop counts={counts} />
      <TagList tags={allTags} onSelect={setTag} selectedTag={selectedTag} />
      <SidebarBottom user={user === null ? undefined : user} />
    </div>
  );
}
