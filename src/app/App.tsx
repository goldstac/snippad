"use strict";

import { useEffect } from "react";
import LoginScreen from "./components/auth/LoginScreen";
import Header from "./components/header/Header";
import Main from "./components/main/Main";
import Sidebar from "./components/sidebar/Sidebar";
import Loading from "./components/ui/overlays/Loading";
import { useAuth } from "./hooks/useAuth";
import { useGists } from "./hooks/useGists";
import { AuthProvider } from "./providers/AuthProvider";
import { GistProvider } from "./providers/GistProvider";
import { useSidebarState } from "./states/sidebar/sidebar";
import { useTheme } from "./states/theme/theme";

function MainApp() {
  // const [isSidebarOpen, setIsSidebarOpen] = useState(window.innerWidth <= 768);
  const { setSidebarState } = useSidebarState();
  const { refresh } = useGists();
  useEffect(() => {
    refresh();
  }, [refresh]);

  useEffect(() => {
    setSidebarState(window.innerWidth <= 768);
  }, [setSidebarState]);

  return (
    <div className="h-full bg-[--background-primary] flex">
      <Sidebar />

      <div className="flex flex-col w-full">
        <Header />

        <Main />
      </div>
    </div>
  );
}

function AppInner() {
  const { status } = useAuth();
  if (status === "validating" || status === "idle") return <Loading />;
  if (status === "unauthenticated") return <LoginScreen />;
  return (
    <GistProvider>
      <MainApp />
    </GistProvider>
  );
}

export default function App() {
  const { loadTheme } = useTheme();

  useEffect(() => {
    loadTheme();
  }, [loadTheme]);

  return (
    <AuthProvider>
      <AppInner />
    </AuthProvider>
  );
}
