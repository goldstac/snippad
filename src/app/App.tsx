"use strict";

import LoginScreen from "./components/auth/LoginScreen";
import Loading from "./components/ui/overlays/Loading";
import { useAuth } from "./hooks/useAuth";
import { AuthProvider } from "./providers/AuthProvider";
import { GistProvider } from "./providers/GistProvider";
import ThemeProvider from "./providers/ThemeProvider";

function MainApp() {
  return <div className="h-full bg-[--background-primary]"></div>;
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
