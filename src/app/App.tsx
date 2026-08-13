import { useEffect } from "react";
import Form from "./components/auth/Form";
import Header from "./components/header/Header";
import Main from "./components/main/Main";
import Popup from "./components/popup/Popup";
import { Sidebar } from "./components/sidebar/main/Sidebar";
import { useWindowDimensions } from "./hooks/useWindowDimensions";
import { isUpdated } from "./lib/updates";
import { useModal } from "./states/modal/modal";
import { useSettings } from "./states/settings/settings";
import { useSidebarState } from "./states/sidebar/sidebar";
import { useSnip } from "./states/snips/snips";
import { useTheme } from "./states/theme/theme";

function MainApp() {
  return (
    <div className="h-full w-full bg-[--bg-primary] flex">
      <div>
        <Sidebar />
      </div>
      <div className="flex flex-col w-full">
        <Header />
        <Main />
      </div>
      <Popup />
    </div>
  );
}

export default function App() {
  const { loadTheme } = useTheme();
  const { loadSettings, settings } = useSettings();
  const { setSidebarState } = useSidebarState();
  const { width } = useWindowDimensions();
  const { loadSnips } = useSnip();
  const { openModal } = useModal();

  useEffect(() => {
    loadTheme();
  }, [loadTheme]);

  useEffect(() => {
    loadSettings();
  }, [loadSettings]);

  useEffect(() => {
    loadSnips();
  }, [loadSnips]);

  useEffect(() => {
    setSidebarState(width > 1000);
  }, [setSidebarState, width]);

  useEffect(() => {
    (async () => {
      const updated = await isUpdated();
      if (updated !== false) {
        openModal({
          type: "changelog",
          title: updated === null ? "New Release!" : "SnipPad Updated!",
        });
      }
    })();
  }, [openModal]);

  return settings?.name ? <MainApp /> : <Form />;
}
