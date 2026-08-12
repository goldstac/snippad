import { Button } from "@/components/ui/Button";
import Input from "@/components/ui/Input";
import { useEditor } from "@/states/editor/editor";
import { useModal } from "@/states/modal/modal";
import { useSnip } from "@/states/snips/snips";
import { useState } from "react";

export default function NewFileModal() {
  const [value, setValue] = useState("");
  const [disabled, setDisabled] = useState(true);
  const [error, setError] = useState("");
  const { snips, activeSnip, update } = useSnip();
  const { closeModal } = useModal();
  const { setActiveFile, setContent } = useEditor();

  const snip = snips?.find((s) => s.metadata.id === activeSnip);

  if (!snip) return <></>;

  const handleValidation = (val: string) => {
    const trimmed = val.trim();

    if (!trimmed) {
      setError("");
      setDisabled(true);
      return;
    }

    if (/[/\\]/.test(trimmed)) {
      setError("File name cannot contain slashes.");
      setDisabled(true);
      return;
    }

    if (trimmed === "__snip_metadata") {
      setError("Name reserved for the metadata file.");
      setDisabled(true);
      return;
    }

    const fileExists = snip.files.some(
      (f) => f.name.toLowerCase() === trimmed.toLowerCase(),
    );
    if (fileExists) {
      setError("File already exists.");
      setDisabled(true);
      return;
    }

    setError("");
    setDisabled(false);
  };

  const handleCreate = async () => {
    const fileName = value.trim();
    if (disabled || !fileName) return;

    await update(snip.metadata.id, {
      files: [...snip.files, { name: fileName, content: "" }],
    });

    setActiveFile(fileName);
    setContent("");
    closeModal();
  };

  return (
    <div className="flex flex-col items-center justify-center gap-2">
      <Input
        placeholder="Enter file name (e.g. index.ts)..."
        className="w-full"
        value={value}
        onChange={(e) => {
          const val = e.target.value;
          setValue(val);
          handleValidation(val);
        }}
        // onKeyDown={(e) => {
        //   if (e.key === "Enter" && !disabled) {
        //     handleCreate();
        //   }
        // }}
        autoFocus
      />
      <div className="flex items-center justify-between w-full">
        <div className="text-[--danger] text-sm">{error}</div>
        <Button variant="primary" disabled={disabled} onClick={handleCreate}>
          Create File
        </Button>
      </div>
    </div>
  );
}
