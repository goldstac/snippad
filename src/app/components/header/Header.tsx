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
      <div className="border-b w-full border-[--border-color] bg-[--background-secondary] h-[55px] p-2 flex items-center justify-between gap-3">
        <Button
          variant="secondary"
          onClick={() => setIsSidebarOpen(!isSidebarOpen)}
          className="border-none"
        >
          <Sidebar />
        </Button>
        <div></div>
      </div>
      <Breadcrumb gistName={gistName} activeView={activeView} />
    </div>
  );
}
