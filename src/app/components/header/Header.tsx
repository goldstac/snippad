import React from "react";
import { Sidebar } from "reicon-react";
import { useGists } from "../../hooks/useGists";
import { ViewTypes } from "../../types/app";
import { Button } from "../ui/misc/Button";
import { Breadcrumb } from "./Breadcrumb";

type HeaderProps = {
  setIsSidebarOpen: React.Dispatch<React.SetStateAction<boolean>>;
  isSidebarOpen: boolean;
  activeView: ViewTypes;
};

export default function Header({
  setIsSidebarOpen,
  isSidebarOpen,
  activeView,
}: HeaderProps) {
  const { selectedGist } = useGists();

  const gistName = selectedGist
    ? Object.keys(selectedGist.files)[0] ||
      selectedGist.description ||
      "Untitled"
    : undefined;

  return (
    <div className="w-full flex flex-col">
      <div
        className={`border-b border-[--border-color] w-full bg-[--background-secondary] h-[${isSidebarOpen ? 54 : 50}px] p-2 flex items-center justify-between gap-3`}
      >
        <Button
          variant="secondary"
          onClick={() => setIsSidebarOpen(!isSidebarOpen)}
          className="border-none"
        >
          <Sidebar />
        </Button>
        <div></div>
      </div>
      <Breadcrumb path={[activeView, gistName || ""].filter(Boolean)} />
    </div>
  );
}
