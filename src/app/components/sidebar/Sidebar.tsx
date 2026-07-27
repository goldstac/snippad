import React, { useEffect } from "react";
import { useAuth } from "../../hooks/useAuth";
import { useGists } from "../../hooks/useGists";
import { ViewTypes } from "../../types/app";
import SidebarBottom from "./SidebarBottom";
import SidebarTop from "./SidebarTop";

type SidebarProps = {
  activeView: ViewTypes;
  setActiveView: React.Dispatch<React.SetStateAction<ViewTypes>>;
  isSidebarOpen?: boolean;
};

export default function Sidebar({
  activeView,
  setActiveView,
  isSidebarOpen = true,
}: SidebarProps) {
  const { gists, starredIds, refresh } = useGists();
  const { user } = useAuth();
  useEffect(() => {
    refresh();
  }, [refresh]);

  const counts: Record<string, number> = {
    all: gists.length,
    starred: starredIds.size,
    public: gists.filter((g) => g.public).length,
    secret: gists.filter((g) => !g.public).length,
  };

  return (
    <div
      className={`${isSidebarOpen ? "w-80" : "w-14"} h-full flex flex-col items-start justify-between border-r bg-[--background-secondary] border-[--border-color] transition-all p-${isSidebarOpen ? 2 : 1}`}
    >
      <SidebarTop
        activeView={activeView}
        setActiveView={setActiveView}
        isSidebarOpen={isSidebarOpen}
        counts={counts}
      />
      <SidebarBottom
        isSidebarOpen={isSidebarOpen}
        user={user === null ? undefined : user}
      />
    </div>
  );
}
