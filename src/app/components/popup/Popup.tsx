import { useModal } from "@/states/modal/modal";
import { X } from "reicon-react";
import SettingsModal from "../modal/app/Settings";
import ThemesModal from "../modal/app/Themes";
import AboutModal from "../modal/meta/About";
import AnnouncementModal from "../modal/meta/Announcement";
import ChangelogModal from "../modal/meta/Changelog";
import DeleteSnipModal from "../modal/snips/DeleteSnip";
import EditSnipModal from "../modal/snips/EditSnip";
import FileActionModal from "../modal/snips/FileAction";
import NewFileModal from "../modal/snips/NewFile";
import NewSnipModal from "../modal/snips/NewSnip";
import { Button } from "../ui/Button";

export default function Popup() {
  const { type, closeModal, title } = useModal();

  if (type === null) return <></>;

  return (
    <div className="fixed z-50 h-screen w-screen backdrop-blur-[2px] rounded-lg flex items-center justify-center">
      <div className="p-6 gap-4 flex flex-col bg-[--overlay-color] min-w-96 max-w-[85%] max-h-[85%] rounded-md border border-[--border-color] shadow-2xl shadow-[--shadow]">
        <div className="w-full flex items-center justify-between">
          <h1 className="text-xl">{title}</h1>
          <Button size="sm" onClick={() => closeModal()}>
            <X size={22} />
          </Button>
        </div>
        {type === "about" && <AboutModal />}
        {type === "changelog" && <ChangelogModal />}
        {type === "announcement" && <AnnouncementModal />}

        {type === "themes" && <ThemesModal />}
        {type === "settings" && <SettingsModal />}

        {type === "newfile" && <NewFileModal />}
        {type === "fileaction" && <FileActionModal />}
        {type === "editsnip" && <EditSnipModal />}
        {type === "deleteconfirm" && <DeleteSnipModal />}
        {type === "newsnip" && <NewSnipModal />}
      </div>
    </div>
  );
}
