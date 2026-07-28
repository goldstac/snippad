import { Star } from "reicon-react";
import { useGists } from "../../hooks/useGists";
import type { Gist } from "../../types/gist";

interface GistCardProps {
  gist: Gist;
  active: boolean;
  onClick: () => void;
}

function relativeTime(iso: string): string {
  const diff = Date.now() - new Date(iso).getTime();
  const minutes = Math.floor(diff / 60000);
  if (minutes < 1) return "just now";
  if (minutes < 60) return `${minutes}m ago`;
  const hours = Math.floor(minutes / 60);
  if (hours < 24) return `${hours}h ago`;
  const days = Math.floor(hours / 24);
  if (days < 30) return `${days}d ago`;
  const months = Math.floor(days / 30);
  if (months < 12) return `${months}mo ago`;
  return `${Math.floor(months / 12)}y ago`;
}

function titleFromDescription(
  description: string | null | undefined,
  fallback: string,
): string {
  const title = (description || "")
    .split(" ")
    .filter((word) => !word.startsWith("#"))
    .join(" ")
    .trim();
  return title || fallback;
}

export function GistCard({ gist, active, onClick }: GistCardProps) {
  const { starredIds } = useGists();
  const isStarred = starredIds.has(gist.id);

  const filenames = Object.keys(gist.files);
  const primaryFile = filenames[0];
  const file = primaryFile ? gist.files[primaryFile] : undefined;

  // useEffect(() => {
  //   loadGistContent(gist);
  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, [gist.id]);

  const lang = file?.language;

  const title = titleFromDescription(
    gist.description,
    primaryFile ?? "Untitled",
  );

  return (
    <button
      onClick={onClick}
      className={`p-4 flex flex-col gap-2 rounded-md text-left transition-colors ${
        active ? "bg-[--background-tertiary]" : "bg-[--background-primary]"
      }`}
    >
      <div className="flex items-start justify-between gap-2">
        <h1 className="text-[0.89rem]">{title}</h1>
        <span className="text-[--text-muted] shrink-0 text-xs flex items-center justify-center gap-1.5">
          {isStarred && (
            <span className="text-xs text-[--accent-color]">
              <Star weight="Filled" size={12} />
            </span>
          )}
          {relativeTime(gist.updated_at)}
        </span>
      </div>

      <div className="text-[--text-secondary]">{lang}</div>

      {(gist.tags.length > 0 || isStarred) && (
        <div className="flex items-center gap-2 mt-1">
          {gist.tags.map((tag) => (
            <span key={tag} className="text-xs text-[--text-muted]">
              #{tag}
            </span>
          ))}
        </div>
      )}
    </button>
  );
}
