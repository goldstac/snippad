import { useGists } from "../../hooks/useGists";
import { Spinner } from "../ui/misc/Sipnner";
import { GistCard } from "./GistCard";

export default function Sidebar() {
  const {
    filteredGists,
    selectedGist,
    selectGist,
    loading,
    searchQuery,
    selectedFilter,
  } = useGists();

  if (loading && filteredGists.length === 0) {
    return (
      <div className="flex items-center justify-center h-full">
        <Spinner size={24} />
      </div>
    );
  }

  if (filteredGists.length === 0) {
    return (
      <div className="h-full w-full flex flex-col items-center justify-center gap-4">
        <h1 className="text-5xl">
          {searchQuery ? "No matches" : "No gists yet"}
        </h1>
        <span className="text-[--text-muted] text-md">
          {searchQuery
            ? "Try a different search term."
            : selectedFilter === "starred"
              ? "Star gists to see them here."
              : "Create a new gist to get started."}
        </span>
      </div>
    );
  }

  return (
    <div className="overflow-y-auto overflow-x-hidden h-full w-80 bg-[--background-primary] p-3 flex flex-col border-r border-[--border-color] gap-2">
      {filteredGists.map((gist) => (
        <GistCard
          key={gist.id}
          gist={gist}
          active={selectedGist?.id === gist.id}
          onClick={() => selectGist(gist)}
        />
      ))}
    </div>
  );
}
