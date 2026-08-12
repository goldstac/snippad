import { useSettings } from "@/states/settings/settings";
import { useSnip } from "@/states/snips/snips";
import { useView } from "@/states/view/view";
import { Metadata } from "@shared/types/snippets";
import { Star, Tag } from "reicon-react";

export default function SidebarItem({
  id,
  title,
  updatedAt,
  description,
  starred,
  tags,
  onClick,
}: Metadata & { onClick?: () => void }) {
  const { activeSnip, setSnipFilter, star } = useSnip();
  const isActive = activeSnip === id;
  const { activeView, setActiveView } = useView();
  const { settings } = useSettings();

  const fillIcons = settings?.client?.icons?.fill;

  return (
    <div
      onClick={onClick}
      className={`w-full p-4 flex flex-col hover:bg-[--bg-secondary] ${isActive && "bg-[--bg-secondary]"} rounded-md transition-all gap-3 hover:cursor-pointer`}
    >
      <div className="flex items-center justify-between">
        {title && <h1 className="text-[1rem]">{title}</h1>}
        <div className="flex items-center gap-2">
          <button onClick={() => star(id)}>
            <Star
              size={14}
              weight={starred ? "Filled" : "Outline"}
              className={
                starred
                  ? "text-[--accent-color]"
                  : "text-[--accent-color-muted]"
              }
            />
          </button>

          <span>
            {updatedAt && (
              <span className="text-[--text-muted]">
                {new Date(updatedAt).toLocaleDateString()}
              </span>
            )}
          </span>
        </div>
      </div>
      <span className="text-[--text-secondary] w-full flex">{description}</span>
      {tags && (
        <div className="flex flex-wrap items-center gap-3">
          {tags.slice(0, 5).map((tag) => {
            const isActive = activeView.id === tag && activeView.tag;
            return (
              <button
                key={tag}
                onClick={() => {
                  setSnipFilter((s) => !!s.metadata?.tags?.includes(tag));
                  setActiveView({
                    id: tag,
                    label: `#${tag}`,
                    tag: true,
                  });
                }}
                className="code text-xs text-[--text-secondary] hover:text-[--accent-color] hover:cursor-pointer transition-all flex items-center gap-1"
              >
                <Tag
                  className={`transition-all ${isActive && "text-[--accent-color]"}`}
                  size={10}
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
      )}
    </div>
  );
}
