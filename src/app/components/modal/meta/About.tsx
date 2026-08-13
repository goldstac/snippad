import { useModal } from "@/states/modal/modal";
import pkg from "@pkg" with { type: "json" };
import { Code, FileText, Global, IconComponent } from "reicon-react";
import { Button } from "../../ui/Button";

export default function AboutModal() {
  const { openModal } = useModal();

  const buttons: {
    icon: IconComponent;
    label: string;
    link?: string;
    onClick?: () => void;
  }[] = [
    {
      icon: Global,
      label: "Website",
      link: "https://snippad.github.io",
    },
    {
      icon: Code,
      label: "Repo",
      link: "https://github.com/snippad/snippad",
    },
    {
      icon: FileText,
      label: "Changelog",
      onClick: () =>
        openModal({
          type: "changelog",
          title: "Changelog",
        }),
    },
  ];

  return (
    <div className="w-full items-center justify-center flex flex-col gap-2">
      <img
        src="./icon.svg"
        className="w-16 p-1 border border-[--border-color] rounded-md"
      />
      <h1 className="text-lg">{pkg.name}</h1>
      <span className="text-[--text-muted]">{pkg.description}</span>
      <span className="text-[--accent-color]">v{pkg.version}</span>
      <div className="flex items-center gap-3 p-2">
        {buttons.map((btn) => {
          return (
            <a
              key={btn.label}
              href={btn.link}
              target="_blank"
              rel="noopener noreferrer"
            >
              <Button size="sm" onClick={btn.onClick} icon={btn.icon}>
                <span>{btn.label}</span>
              </Button>
            </a>
          );
        })}
      </div>
    </div>
  );
}
