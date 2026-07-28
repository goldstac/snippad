"use strict";

import { useEffect, useState } from "react";
import LoginScreen from "./components/auth/LoginScreen";
import Header from "./components/header/Header";
import Main from "./components/main/Main";
import Sidebar from "./components/sidebar/Sidebar";
import Loading from "./components/ui/overlays/Loading";
import { useAuth } from "./hooks/useAuth";
import { useGists } from "./hooks/useGists";
import { AuthProvider } from "./providers/AuthProvider";
import { GistProvider } from "./providers/GistProvider";
import ThemeProvider from "./providers/ThemeProvider";
import { ViewTypes } from "./types/app";

function MainApp() {
  const [activeView, setActiveView] = useState<ViewTypes>("all");
  const [isSidebarOpen, setIsSidebarOpen] = useState(window.innerWidth <= 768);
  const { refresh } = useGists();
  useEffect(() => {
    refresh();
  }, [refresh]);

  return (
    <div className="h-full bg-[--background-primary] flex">
      <Sidebar
        activeView={activeView}
        setActiveView={setActiveView}
        isSidebarOpen={isSidebarOpen}
      />

      <div className="flex flex-col w-full">
        <Header
          isSidebarOpen={isSidebarOpen}
          setIsSidebarOpen={setIsSidebarOpen}
          activeView={activeView}
        />

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
  return (
    <ThemeProvider>
      <AuthProvider>
        <AppInner />
      </AuthProvider>
    </ThemeProvider>
  );
}
