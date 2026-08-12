import { Button } from "@/components/ui/Button";
import Input from "@/components/ui/Input";
import { useEditor } from "@/states/editor/editor";
import { useModal } from "@/states/modal/modal";
import { useSnip } from "@/states/snips/snips";
import { useState } from "react";

export default function FileActionModal() {
  const { snips, activeSnip, update } = useSnip();
  const { closeModal, data } = useModal();
  const { activeFile, setActiveFile, setContent } = useEditor();

  const originalName = data?.fileName ?? "";

  const [fileName, setFileName] = useState(originalName);
  const [error, setError] = useState("");

  const snip = snips?.find((s) => s.metadata.id === activeSnip);

  if (!snip || !originalName) return null;

  const handleValidation = (val: string) => {
    const trimmed = val.trim();

    if (!trimmed) {
      setError("File name cannot be empty.");
      return false;
    }

    if (/[/\\]/.test(trimmed)) {
      setError("File name cannot contain slashes.");
      return false;
    }

    if (trimmed === "__snip_metadata") {
      setError("Name reserved for metadata file.");
      return false;
    }

    const isDuplicate = snip.files.some(
      (f) =>
        f.name.toLowerCase() === trimmed.toLowerCase() &&
        f.name !== originalName,
    );

    if (isDuplicate) {
      setError("A file with this name already exists.");
      return false;
    }

    setError("");
    return true;
  };

  const handleRename = async () => {
    const trimmed = fileName.trim();
    if (!handleValidation(trimmed) || trimmed === originalName) return;

    const updatedFiles = snip.files.map((f) =>
      f.name === originalName ? { ...f, name: trimmed } : f,
    );

    await update(snip.metadata.id, { files: updatedFiles });

    if (activeFile === originalName) {
      setActiveFile(trimmed);
    }

    closeModal();
  };

  // TODO: open a confirmation modal on delete
  const handleDelete = async () => {
    const updatedFiles = snip.files.filter((f) => f.name !== originalName);

    await update(snip.metadata.id, { files: updatedFiles });

    if (activeFile === originalName) {
      const remainingFile = updatedFiles[0]?.name ?? null;
      const remainingFileContent = updatedFiles[0]?.content ?? null;
      setActiveFile(remainingFile);
      setContent(remainingFileContent);
    }

    closeModal();
  };

  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-col gap-2">
        <Input
          value={fileName}
          onChange={(e) => {
            setFileName(e.target.value);
            handleValidation(e.target.value);
          }}
          onKeyDown={(e) => {
            if (
              e.key === "Enter" &&
              !error &&
              fileName.trim() !== originalName
            ) {
              handleRename();
            }
          }}
          placeholder="Rename file..."
          autoFocus
        />
        {error && <span className="text-xs text-[--danger]">{error}</span>}
      </div>

      <div className="flex items-center justify-between pt-2">
        <Button variant="danger" onClick={handleDelete}>
          Delete File
        </Button>

        <div className="flex gap-2">
          <Button
            variant="primary"
            disabled={
              !!error || !fileName.trim() || fileName.trim() === originalName
            }
            onClick={handleRename}
          >
            Save Changes
          </Button>
        </div>
      </div>
    </div>
  );
}
