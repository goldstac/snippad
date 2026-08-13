import { useModal } from "@/states/modal/modal";
import { useSettings } from "@/states/settings/settings";
import Markdown from "react-markdown";
import { Bell } from "reicon-react";

export default function AnnouncementModal() {
  const { data } = useModal();
  const { settings } = useSettings();

  if (!data?.announcement)
    return (
      <div className="flex flex-col items-center justify-center p-6 text-center">
        <div className="mb-3 rounded-full bg-[--bg-secondary] p-3 text-[--text-secondary]">
          <Bell
            weight={
              settings?.client?.icons?.fill === true ? "Filled" : "Outline"
            }
          />
        </div>
        <h3 className="text-sm font-medium text-[--text-primary]">
          You're all caught up!
        </h3>
        <p className="mt-1 text-xs text-[--text-secondary]">
          There are no active announcements right now.
        </p>
      </div>
    );

  return (
    <div className="flex flex-col w-full gap-3">
      <div className="popup-markdown max-w-[33rem] max-h-[33rem] overflow-y-auto p-2">
        <Markdown>{data.announcement}</Markdown>
      </div>
    </div>
  );
}
