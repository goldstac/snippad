import { Button } from "@/components/ui/Button";
import Markdown from "react-markdown";
import CHANGELOG from "../../../../../CHANGELOG.md?raw";

function getLatestChangelog() {
  const match = CHANGELOG.match(/(##\s+[`v\d].*?)(?=\n##\s+[`v\d]|$)/s);

  return match ? match[1].trim() : CHANGELOG;
}

export default function ChangelogModal() {
  return (
    <div className="flex flex-col w-full gap-3">
      <div className="popup-markdown max-w-[33rem] max-h-[33rem] overflow-y-auto flex flex-col gap-3 p-3">
        <Markdown>{getLatestChangelog()}</Markdown>
      </div>
      <div className="flex items-center justify-between w-full">
        <div></div>
        <a href="https://github.com/snippad/snippad/blob/main/CHANGELOG.md">
          <Button variant="primary">
            <span>View All</span>
          </Button>
        </a>
      </div>
    </div>
  );
}
