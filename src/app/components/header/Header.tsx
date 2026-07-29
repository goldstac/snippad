import { Button } from "@/components/ui/misc/Button";
import { useGists } from "@/hooks/useGists";
import { useSidebarState } from "@/states/sidebar/sidebar";
import { useActiveView } from "@/states/view/activeView";
import { Sidebar } from "reicon-react";
import { Breadcrumb } from "./Breadcrumb";

export default function Header() {
  const { isSidebarOpen, setSidebarState } = useSidebarState();
  const { selectedGist } = useGists();
  const { activeView } = useActiveView();

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
          onClick={() => setSidebarState(!isSidebarOpen)}
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
