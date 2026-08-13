import { useEditor } from "@/states/editor/editor";
import { useModal } from "@/states/modal/modal";
import { useSnip } from "@/states/snips/snips";
import SnipCard from "./SnipCard";

export default function Sidebar() {
  const { filteredSnips, setActiveSnip } = useSnip();
  const { setContent, setActiveFile } = useEditor();
  const { openModal } = useModal();

  return (
    <aside className="w-96 h-full border-r border-[--border-color] p-2 flex flex-col gap-3 overflow-y-auto flex-shrink-0">
      {filteredSnips && filteredSnips.length > 0 ? (
        filteredSnips.map((snip) => {
          const {
            title,
            description,
            id,
            createdAt,
            updatedAt,
            starred,
            tags,
          } = snip.metadata;
          return (
            <SnipCard
              key={id}
              title={title}
              description={description}
              id={id}
              createdAt={createdAt}
              updatedAt={updatedAt}
              starred={starred}
              tags={tags}
              onClick={() => {
                setActiveSnip(id);
                setActiveFile(snip?.files[0].name);
                setContent(snip?.files[0].content);
              }}
            />
          );
        })
      ) : (
        <div className="h-full w-full flex flex-col gap-3 items-center justify-center">
          <h1 className="text-4xl">No snips yet!</h1>
          <span className="text-[--text-secondary]">
            <span
              className="text-[--accent-color] cursor-pointer"
              onClick={() => openModal({ type: "newsnip", title: "New Snip" })}
            >
              Create a snip
            </span>{" "}
            to get started.
          </span>
        </div>
      )}
    </aside>
  );
}
