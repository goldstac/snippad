import { Button } from "@/components/ui/Button";
import Input from "@/components/ui/Input";
import TextArea from "@/components/ui/TextArea";
import { useModal } from "@/states/modal/modal";
import { useSnip } from "@/states/snips/snips";
import { parseTags } from "@/utils/parseTags";
import { useState } from "react";
import { Floppy2 } from "reicon-react";

export default function EditSnipModal() {
  const { activeSnip, snips, update } = useSnip();
  const { closeModal } = useModal();

  const snip = snips?.find((s) => s.metadata.id === activeSnip);

  const [title, setTitle] = useState(snip?.metadata.title ?? "");
  const [description, setDescription] = useState(
    snip?.metadata.description ?? "",
  );
  const [tagsInput, setTagsInput] = useState(
    snip?.metadata.tags?.join(", ") ?? "",
  );

  if (!snip) return null;

  const currentTags = parseTags(tagsInput);
  const originalTags = snip.metadata.tags ?? [];
  const isTagsUnchanged =
    currentTags.length === originalTags.length &&
    currentTags.every((t, i) => t === originalTags[i]);

  const isUnchanged =
    title.trim() === snip.metadata.title &&
    description.trim() === (snip.metadata.description ?? "") &&
    isTagsUnchanged;

  const isSaveDisabled = !title.trim() || isUnchanged;

  const handleSave = async () => {
    if (isSaveDisabled) return;

    await update(snip.metadata.id, {
      title: title.trim(),
      description: description.trim(),
      tags: parseTags(tagsInput),
    });

    closeModal();
  };

  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-col gap-1.5">
        <label className="text-sm font-medium">Title</label>
        <Input
          className="w-full"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter" && !isSaveDisabled) {
              handleSave();
            }
          }}
          autoFocus
        />
      </div>

      <div className="flex flex-col gap-1.5">
        <label className="text-sm font-medium">Description</label>
        <TextArea
          className="w-full"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          rows={3}
        />
      </div>

      <div className="flex flex-col gap-1.5">
        <label className="text-sm font-medium">Tags (comma separated)</label>
        <Input
          className="w-full"
          placeholder="e.g. react, hooks, typescript"
          value={tagsInput}
          onChange={(e) => setTagsInput(e.target.value)}
        />
      </div>

      <div className="flex items-center justify-end w-full pt-2 border-t border-(--border-color-subtle)">
        <Button
          variant="primary"
          disabled={isSaveDisabled}
          onClick={handleSave}
          icon={Floppy2}
        >
          Save Changes
        </Button>
      </div>
    </div>
  );
}
