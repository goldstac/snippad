import { getLangFromExt } from "@/lib/langMap";
import { useEditor } from "@/states/editor/editor";
import { useSettings } from "@/states/settings/settings";
import { useTheme } from "@/states/theme/theme";
import Editor, { loader, Monaco, OnMount } from "@monaco-editor/react";
import { useEffect, useRef } from "react";

const getMonacoPath = () => {
  if (import.meta.env.DEV) {
    // `/public/monaco/vs` - will be created automatically by postinstall script
    return "/monaco/vs";
  }
  // `file://...` - for electron (absolute path)
  return new URL("monaco/vs", window.location.href).href;
};

loader.config({
  paths: {
    vs: getMonacoPath(),
  },
});

export default function MonacoEditor() {
  const { theme } = useTheme();
  const { settings } = useSettings();
  const { content, setContent, activeFile } = useEditor();
  const lang = getLangFromExt(activeFile);
  const monacoRef = useRef<Monaco | null>(null);

  useEffect(() => {
    if (monacoRef.current && theme?.theme?.editor) {
      monacoRef.current.editor.defineTheme("custom-theme", theme.theme.editor);
      monacoRef.current.editor.setTheme("custom-theme");
    }
  }, [theme]);

  const handleMount: OnMount = (_, monacoInstance) => {
    monacoRef.current = monacoInstance;

    if (theme?.theme?.editor) {
      monacoInstance.editor.defineTheme("custom-theme", theme.theme.editor);
      monacoInstance.editor.setTheme("custom-theme");
    }
  };

  return (
    <div className="w-full h-full overflow-hidden">
      <Editor
        height="100%"
        width="100%"
        language={lang?.toLowerCase() ?? "plaintext"}
        theme={theme?.theme?.editor ? "custom-theme" : "vs-dark"}
        value={content}
        onChange={(val) => setContent(val ?? "")}
        onMount={handleMount}
        options={{
          ...settings?.editor,
        }}
      />
    </div>
  );
}
