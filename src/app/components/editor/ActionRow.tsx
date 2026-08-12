import { getLangFromExt } from "@/lib/langMap";
import { useEditor } from "@/states/editor/editor";
import { useModal } from "@/states/modal/modal";
import { useSettings } from "@/states/settings/settings";
import { useSnip } from "@/states/snips/snips";
import {
  Edit,
  Eye,
  IconComponent,
  PlusCircle,
  Save,
  Star,
  Trash,
} from "reicon-react";
import { Button, ButtonVariant } from "../ui/Button";

type ActionRowType = {
  icon: IconComponent;
  label: string;
  onClick: () => void;
  variant?: ButtonVariant;
  disabled?: boolean;
};

export default function ActionRow() {
  const { activeSnip, snips, update, star } = useSnip();
  const { activeFile, content } = useEditor();
  const { settings } = useSettings();
  const { openModal } = useModal();

  const snip = snips?.find((s) => s.metadata.id === activeSnip);

  if (!snip) return null;

  const currentFileContent = snip.files.find(
    (f) => f.name === activeFile,
  )?.content;
  const isSaveDisabled = !activeFile || content === currentFileContent;

  const actionRow: ActionRowType[] = [
    {
      icon: Save,
      label: "Save",
      variant: "primary",
      disabled: isSaveDisabled,
      onClick: async () => {
        if (!activeFile) return;

        const fileExists = snip.files.some((f) => f.name === activeFile);

        const updatedFiles = fileExists
          ? snip.files.map((f) =>
              f.name === activeFile ? { ...f, content } : f,
            )
          : [...snip.files, { name: activeFile, content }];

        await update(snip.metadata.id, { files: updatedFiles });
      },
    },
    {
      icon: PlusCircle,
      label: "New File",
      onClick: () => openModal({ type: "newfile", title: "New File" }),
    },
    {
      icon: Edit,
      label: "Edit",
      onClick: () =>
        openModal({
          type: "editsnip",
          title: "Edit Snip",
        }),
      disabled: !activeFile,
    },
    {
      icon: Star,
      label: snip.metadata.starred ? "Unstar" : "Star",
      onClick: async () => {
        await star(snip.metadata.id);
      },
    },
  ];

  const lang = getLangFromExt(activeFile);

  if (lang === "markdown" || lang === "html") {
    actionRow.push({
      icon: Eye,
      label: "Preview",
      onClick: () => {
        // TODO
      },
    });
  }

  actionRow.push({
    icon: Trash,
    label: "Delete",
    variant: "danger",
    onClick: () => openModal({ type: "deleteconfirm", title: "Delete Snip" }),
  });

  const iconWeight =
    settings?.client?.icons?.fill && settings?.client?.icons?.fill !== "auto"
      ? "Filled"
      : "Outline";

  return (
    <div className="w-full px-3 flex items-center justify-between h-11 bg-[--bg-primary] border-b border-[--border-color-subtle] gap-2">
      <div className="flex items-center gap-2 flex-shrink-0">
        {actionRow.map((act) => {
          const Icon = act.icon;
          return (
            <Button
              key={act.label}
              size="sm"
              variant={act.variant}
              onClick={act.onClick}
              disabled={act.disabled}
            >
              <Icon size={16} weight={iconWeight} />
              {settings?.client?.actionRow?.showLabels && (
                <span>{act.label}</span>
              )}
            </Button>
          );
        })}
      </div>
    </div>
  );
}
