import { getLangFromExt } from "@/lib/langMap";
import { useEditor } from "@/states/editor/editor";
import { useModal } from "@/states/modal/modal";
import { useSettings } from "@/states/settings/settings";
import { useSnip } from "@/states/snips/snips";
import { More } from "reicon-react";

export default function Tabs() {
  const { activeSnip, snips } = useSnip();
  const { setContent, activeFile, setActiveFile } = useEditor();
  const { settings } = useSettings();
  const { openModal } = useModal();

  const snip = snips?.filter((snip) => snip?.metadata?.id == activeSnip)[0];

  if (!snip) return <></>;

  return (
    <div className="w-full flex items-center">
      {snip?.files.map((file) => {
        const ext = getLangFromExt(file.name.split(".").pop())
          ? file.name.split(".").pop()
          : undefined;
        return (
          <div
            key={file.name}
            onClick={() => {
              setActiveFile(file.name);
              setContent(file.content);
            }}
            className={`flex items-center p-3 bg-[--bg-secondary] gap-2 border border-[--border-color] ${settings?.client?.tabs?.showBottomBorder && activeFile === file.name && "border-b border-b-[--accent-color]"} ${!(activeFile === file.name) && "opacity-65"} hover:cursor-pointer`}
          >
            <span className="code">{file.name}</span>
            {settings?.client?.tabs?.showExtension && ext && (
              <span className="code text-[--text-muted]">{ext}</span>
            )}
            <button
              onClick={() =>
                openModal({
                  type: "fileaction",
                  title: "More Options",
                  data: {
                    fileName: file.name,
                  },
                })
              }
            >
              <More className="rotate-90 text-[--text-secondary]" size={14} />
            </button>
          </div>
        );
      })}
    </div>
  );
}
