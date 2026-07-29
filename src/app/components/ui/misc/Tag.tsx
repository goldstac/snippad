interface TagProps {
  tag: string;
  onClick?: () => void;
  active?: boolean;
  space?: boolean;
}

export function Tag({ tag, onClick, active = false, space = true }: TagProps) {
  return (
    <button
      onClick={onClick}
      className={`inline-flex code items-center gap-1 px-1.5 py-0.5 rounded text-xs font-mono transition-colors duration-150 ${
        active
          ? "bg-[--accent-color-muted] text-[--accent-color]"
          : "text-[--text-muted] hover:text-[--tag-text]"
      }`}
    >
      {space ? <span>#</span> : "#"}
      {tag}
    </button>
  );
}
