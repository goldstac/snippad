import React, { useEffect } from "react";
import { sidebarItems } from "../../content/sidebarItems";
import { useGists } from "../../hooks/useGists";
import { ViewTypes } from "../../types/app";
import SidebarItem from "./SidebarItem";

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
      className={`h-full ${isSidebarOpen ? "w-80" : "w-14"} border bg-[--background-secondary] border-[--border-color] flex flex-col p-2 transition-all`}
    >
      <div
        className={`border-b border-[--border-color] h-[46px] p-1 mb-3 flex items-center justify-center gap-3`}
      >
        <div className="h-7 w-7 overflow-hidden">
          <img src="../../../assets/icon.svg" />
        </div>
        {isSidebarOpen && <h1 className="text-xl">PureGist</h1>}
      </div>
      <div className={`flex flex-col ${!isSidebarOpen && "gap-1"}`}>
        {sidebarItems.map((item, i) => {
          const Icon = item.icon;
          return (
            <SidebarItem
              key={i}
              label={sidebarItems[i].label}
              number={counts[item.id]}
              active={activeView === item.id}
              onClick={() => setActiveView(item.id)}
              icon={<Icon size={18} />}
              sidebarOpen={isSidebarOpen}
            />
          );
        })}
      </div>
    </div>
  );
}
