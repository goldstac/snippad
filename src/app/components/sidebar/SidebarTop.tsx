import { sidebarItems } from "@/content/sidebarTopItems";
import { useGists } from "@/hooks/useGists";
import { useActiveView } from "@/zustand/states/activeView";
import SidebarItem from "./SidebarItem";

type SidebarTopProps = {
  isSidebarOpen: boolean;
  counts: Record<string, number>;
};

export default function SidebarTop({ isSidebarOpen, counts }: SidebarTopProps) {
  const { setFilter } = useGists();
  const { activeView, setActiveView } = useActiveView();
  return (
    <div className="w-full">
      <div className={`flex flex-col transition-all`}>
        <div
          className={`border-b border-[--border-color] h-[46px] p-1 mb-3 flex items-center justify-center gap-3 flex-shrink-0`}
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
                onClick={() => {
                  setActiveView(item.id);
                  setFilter(item.id);
                }}
                icon={<Icon size={18} />}
                isSidebarOpen={isSidebarOpen}
              />
            );
          })}
        </div>
      </div>
    </div>
  );
}
