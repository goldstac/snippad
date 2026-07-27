import { Eye, File, IconComponent, Lock, Palette, Star } from "reicon-react";
import { ViewTypes } from "../types/app";

export const sidebarItems: {
  label: string;
  id: ViewTypes;
  icon: IconComponent;
}[] = [
  {
    label: "All Gists",
    id: "all",
    icon: File,
  },
  { label: "Starred", id: "starred", icon: Star },
  { label: "Public", id: "public", icon: Eye },
  { label: "Secret", id: "secret", icon: Lock },
  { label: "Themes", id: "themes", icon: Palette },
];
