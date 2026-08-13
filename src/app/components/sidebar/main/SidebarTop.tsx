import { useSettings } from "@/states/settings/settings";
import { useSidebarState } from "@/states/sidebar/sidebar";
import { useSnip } from "@/states/snips/snips";
import { useView } from "@/states/view/view";
import { useMemo } from "react";
import { File, IconComponent, Star, Tag } from "reicon-react";
import SidebarItem from "./SidebarItem";

export default function SidebarTop() {
  const { isSidebarOpen } = useSidebarState();
  const { activeView, setActiveView } = useView();
  const { snips, setSnipFilter } = useSnip();
  const { settings } = useSettings();

  const { starredCount, tagsCount } = useMemo(() => {
    if (!snips) return { starredCount: 0, tagsCount: 0 };

    const starred = snips.filter((s) => s.metadata?.starred).length;
    const uniqueTags = new Set(snips.flatMap((s) => s.metadata?.tags ?? []))
      .size;

    return { starredCount: starred, tagsCount: uniqueTags };
  }, [snips]);

  const sidebarItems: {
    label: string;
    id: string;
    icon: IconComponent;
    number: number | undefined;
    onClick: () => void;
  }[] = [
    {
      label: "All Snips",
      id: "all",
      icon: File,
      number: snips?.length ?? 0,
      onClick: () => setSnipFilter(),
    },
    {
      label: "Starred",
      id: "starred",
      icon: Star,
      number: starredCount,
      onClick: () => setSnipFilter((s) => !!s.metadata?.starred),
    },
    {
      label: "All Tags",
      id: "tags",
      icon: Tag,
      number: tagsCount,
      onClick: () => setSnipFilter(),
    },
  ];

  return (
    <div className="flex flex-col items-center justify-start gap-2 w-full">
      <div
        className={`
          flex h-12 w-full items-center ${settings?.client?.sidebar?.showDividers && "border-b border-[--border-color]"} transition-all
          ${isSidebarOpen ? "justify-start gap-3 px-3" : "justify-center px-0"}
        `}
      >
        <img
          src="./icon.png"
          width="24"
          className="flex-shrink-0"
          alt="SnipPad Logo"
        />
        {isSidebarOpen && <h1 className="text-xl leading-none">SnipPad</h1>}
      </div>

      <div className="w-full flex flex-col gap-2">
        {sidebarItems.map((item) => (
          <SidebarItem
            key={item.id}
            active={activeView.id === item.id && !activeView.tag}
            label={item.label}
            icon={item.icon}
            onClick={() => {
              setActiveView({ id: item.id, label: item.label, tag: false });
              item.onClick();
            }}
            number={item.number}
          />
        ))}
      </div>
    </div>
  );
}
