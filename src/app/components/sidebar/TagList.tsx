import { Tag } from "@/components/ui/misc/Tag";
import { useBreadcrumb } from "@/states/breadcrumb/breadcrumb";
import { useSidebarState } from "@/states/sidebar/sidebar";

interface TagListProps {
  tags: string[];
  selectedTag: string | null;
  onSelect: (tag: string | null) => void;
}

export function TagList({ tags, selectedTag, onSelect }: TagListProps) {
  const { setBase } = useBreadcrumb();
  const { isSidebarOpen } = useSidebarState();

  if (!isSidebarOpen) return null;

  if (tags.length === 0) {
    return (
      <div className="px-3 py-1.5 text-xs text-[--text-muted]">No tags yet</div>
    );
  }

  return (
    <div className="flex flex-col h-full w-full px-3 py-2 mt-2 border-t border-[--border-color] overflow-hidden">
      <h1 className="text-lg flex-shrink-0 mb-1">Tags</h1>

      <div className="flex-1 overflow-y-auto overflow-x-hidden space-y-0.5 pr-1">
        {tags.map((tag) => (
          <div key={tag} className="p-1">
            <Tag
              active={selectedTag === tag}
              onClick={() => {
                onSelect(selectedTag === tag ? null : tag);
                setBase(`# ${tag}`);
              }}
              tag={tag}
            >
              {/*{tag}*/}
            </Tag>
          </div>
        ))}
      </div>
    </div>
  );
}
