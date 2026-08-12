import { Button } from "@/components/ui/Button";
import { useSettings } from "@/states/settings/settings";
import { useSidebarState } from "@/states/sidebar/sidebar";
import { useSnip } from "@/states/snips/snips";
import { useView } from "@/states/view/view";
import { Tag } from "reicon-react";

export default function TagsList() {
  const { getAllTags, setSnipFilter } = useSnip();
  const { isSidebarOpen } = useSidebarState();
  const { activeView, setActiveView } = useView();
  const { settings } = useSettings();

  const fillIcons = settings?.client?.icons?.fill;

  const tags = getAllTags();

  if (!isSidebarOpen || tags.length === 0) return <></>;

  return (
    <div
      className={`flex flex-col w-full h-full min-h-0 px-6 py-3 gap-3 ${settings?.client?.sidebar?.showDividers && "border-t border-[--border-color]"}`}
    >
      <div className="w-full flex items-center justify-between">
        <h1 className="text-lg font-medium flex-shrink-0">Tags</h1>
        <Button
          onClick={() =>
            setActiveView({ id: "tags", label: "All Tags", tag: false })
          }
          className="px-5"
        >
          All
        </Button>
      </div>
      <div className="flex flex-col gap-1 overflow-y-auto min-h-0 flex-1">
        {tags.slice(0, 100).map((tag) => {
          const isActive = activeView.id == tag && activeView.tag;
          return (
            <button
              key={tag}
              onClick={() => {
                setSnipFilter((snip) =>
                  Boolean(snip.metadata?.tags?.includes(tag)),
                );
                setActiveView({
                  label: `#${tag}`,
                  id: tag,
                  tag: true,
                });
              }}
              className="code flex gap-2 items-center text-[--text-secondary] hover:text-[--text-primary] transition-colors text-left py-1 cursor-pointer flex-shrink-0"
            >
              <Tag
                size={12}
                className={`flex-shrink-0 ${isActive && "text-[--accent-color]"} transition-all`}
                weight={
                  fillIcons === "auto"
                    ? isActive
                      ? "Filled"
                      : "Outline"
                    : fillIcons === true
                      ? "Filled"
                      : "Outline"
                }
              />
              <span
                className={`transition-all ${isActive && "text-[--accent-color]"}`}
              >
                {tag}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
