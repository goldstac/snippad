import { GitHubUser } from "@/types/gist";
import { IconComponent, InfoCircle, Palette, Settings } from "reicon-react";
import SidebarItem from "./SidebarItem";

type SidebarBottomProps = {
  user?: GitHubUser;
  isSidebarOpen: boolean;
};

export default function SidebarBottom({
  user,
  isSidebarOpen,
}: SidebarBottomProps) {
  if (!user) return <></>;

  // TODO: implement `onClick` for `sidebarItems` items
  const sidebarItems: {
    label: string;
    id: string;
    icon: IconComponent;
    onClick: () => void;
  }[] = [
    { label: "Settings", id: "settings", icon: Settings, onClick: () => {} },
    { label: "Themes", id: "themes", icon: Palette, onClick: () => {} },
    { label: "About", id: "about", icon: InfoCircle, onClick: () => {} },
  ];

  return (
    <div className="w-full">
      <div
        className={`flex flex-col transition-all border-t border-[--border-color]`}
      >
        <div className={`flex flex-col ${!isSidebarOpen && "gap-1"}`}>
          {sidebarItems.map((item, i) => {
            const Icon = item.icon;
            return (
              <SidebarItem
                key={i}
                label={sidebarItems[i].label}
                active={false}
                onClick={item.onClick}
                icon={<Icon size={18} />}
                isSidebarOpen={isSidebarOpen}
              />
            );
          })}
        </div>
        <div
          className={`flex gap-3 ${isSidebarOpen && "bg-[--background-tertiary]"} py-3 px-${isSidebarOpen ? 3 : 2} rounded-md flex-shrink-0`}
        >
          <div className="w-8 h-8 rounded-full overflow-hidden flex-shrink-0">
            <img src={user.avatar_url} />
          </div>
          {isSidebarOpen && (
            <div className="flex flex-col">
              <h1 className="text-[0.9rem]">{user.name}</h1>
              <span className="text-[--text-secondary] text-[0.7rem]">
                {user.html_url
                  .slice(user.html_url.lastIndexOf("/"))
                  .replace("/", "@")}
              </span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
