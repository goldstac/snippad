import { Button } from "@/components/ui/misc/Button";
import { useSidebarState } from "@/states/sidebar/sidebar";
import { Sidebar } from "reicon-react";
import { Breadcrumb } from "./Breadcrumb";

export default function Header() {
  const { isSidebarOpen, setSidebarState } = useSidebarState();

  return (
    <div className="w-full flex flex-col">
      <div
        className={`border-b border-[--border-color] w-full bg-[--background-secondary] h-[54px] p-2 flex items-center justify-between gap-3`}
      >
        <Button
          variant="secondary"
          onClick={() => setSidebarState(!isSidebarOpen)}
          className="border-none"
        >
          <Sidebar />
        </Button>
        <div></div>
      </div>
      <Breadcrumb />
    </div>
  );
}
