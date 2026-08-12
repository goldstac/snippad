import { useModal } from "@/states/modal/modal";
import { useSettings } from "@/states/settings/settings";
import { IconComponent, InfoCircle, Palette, Settings } from "reicon-react";
import SidebarItem from "./SidebarItem";

export default function SidebarBottom() {
  const { settings } = useSettings();
  const { openModal } = useModal();
  // TODO: complete onClick for each item (popup)
  const sidebarItems: {
    label: string;
    id: string;
    icon: IconComponent;
    number?: number;
    onClick: () => void;
  }[] = [
    {
      label: "Themes",
      id: "themes",
      icon: Palette,
      onClick: () => openModal({ type: "themes", title: "Themes" }),
    },
    {
      label: "Settings",
      id: "settings",
      icon: Settings,
      onClick: () => openModal({ type: "settings", title: "Settings" }),
    },
    {
      label: "About",
      id: "about",
      icon: InfoCircle,
      onClick: () => openModal({ type: "about", title: "About" }),
    },
  ];

  return (
    <div
      className={`flex flex-col items-center gap-2 w-full ${settings?.client?.sidebar?.showDividers && "border-t border-[--border-color]"}`}
    >
      {sidebarItems.map((item) => (
        <SidebarItem
          key={item.id}
          active={false}
          label={item.label}
          icon={item.icon}
          onClick={item.onClick}
        />
      ))}
    </div>
  );
}
