import { Button } from "@/components/ui/Button";
import Input from "@/components/ui/Input";
import TextArea from "@/components/ui/TextArea";
import { useEditor } from "@/states/editor/editor";
import { useModal } from "@/states/modal/modal";
import { useSnip } from "@/states/snips/snips";
import { parseTags } from "@/utils/parseTags";
import { useState } from "react";

export default function NewSnipModal() {
  const { create, setActiveSnip } = useSnip();
  const { closeModal } = useModal();
  const { setActiveFile } = useEditor();

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [tagsInput, setTagsInput] = useState("");
  const [initialFileName, setInitialFileName] = useState("main.txt");

  const isSaveDisabled = !title.trim() || !initialFileName.trim();

  const handleCreate = async () => {
    if (isSaveDisabled) return;

    const fileName = initialFileName.trim();

    const newSnip = await create({
      title: title.trim(),
      description: description.trim(),
      tags: parseTags(tagsInput),
      files: [{ name: fileName, content: "" }],
    });

    if (newSnip) {
      setActiveSnip(newSnip.metadata.id);
      setActiveFile(newSnip.files[0].name || "");
      closeModal();
    }
  };

  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-col gap-1.5">
        <label className="text-sm font-medium">Title</label>
        <Input
          className="w-full"
          placeholder="e.g. Utility Helpers"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter" && !isSaveDisabled) {
              handleCreate();
            }
          }}
          autoFocus
        />
      </div>

      <div className="flex flex-col gap-1.5">
        <label className="text-sm font-medium">Initial File Name</label>
        <Input
          className="w-full"
          placeholder="e.g. index.ts, style.css"
          value={initialFileName}
          onChange={(e) => setInitialFileName(e.target.value)}
        />
      </div>

      <div className="flex flex-col gap-1.5">
        <label className="text-sm font-medium">Description (optional)</label>
        <TextArea
          className="w-full"
          placeholder="What is this snip for?"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          rows={3}
        />
      </div>

      <div className="flex flex-col gap-1.5">
        <label className="text-sm font-medium">
          Tags (comma separated, optional)
        </label>
        <Input
          className="w-full"
          placeholder="e.g. react, hooks, typescript"
          value={tagsInput}
          onChange={(e) => setTagsInput(e.target.value)}
        />
      </div>

      <div className="flex items-center justify-end w-full pt-2 border-t border-[--border-color-subtle]">
        <Button
          variant="primary"
          disabled={isSaveDisabled}
          onClick={handleCreate}
        >
          Create Snip
        </Button>
      </div>
    </div>
  );
}
