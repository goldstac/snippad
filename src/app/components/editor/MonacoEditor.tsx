import { getLangFromExt } from "@/lib/langMap";
import { useEditor } from "@/states/editor/editor";
import { useSettings } from "@/states/settings/settings";
import { useTheme } from "@/states/theme/theme";
import Editor, { loader, Monaco } from "@monaco-editor/react";
import type { editor as MonacoEditorNS } from "monaco-editor";
import { useCallback, useEffect, useRef } from "react";

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

  const handleBeforeMount = useCallback(
    (monacoInstance: Monaco): void => {
      if (theme?.theme?.editor) {
        monacoInstance.editor.defineTheme(
          "custom-theme",
          theme.theme.editor as MonacoEditorNS.IStandaloneThemeData,
        );
      }
    },
    [theme],
  );

  const handleMount = useCallback(
    (
      _editor: MonacoEditorNS.IStandaloneCodeEditor,
      monacoInstance: Monaco,
    ): void => {
      monacoRef.current = monacoInstance;
    },
    [],
  );

  useEffect(() => {
    if (monacoRef.current && theme?.theme?.editor) {
      monacoRef.current.editor.defineTheme(
        "custom-theme",
        theme.theme.editor as MonacoEditorNS.IStandaloneThemeData,
      );
      monacoRef.current.editor.setTheme("custom-theme");
    }
  }, [theme]);

  return (
    <div className="w-full h-full overflow-hidden">
      <Editor
        height="100%"
        width="100%"
        language={lang?.toLowerCase() ?? "plaintext"}
        theme={theme?.theme?.editor ? "custom-theme" : "vs-dark"}
        value={content}
        onChange={(val) => setContent(val ?? "")}
        beforeMount={handleBeforeMount}
        onMount={handleMount}
        options={{
          ...settings?.editor,
        }}
      />
    </div>
  );
}
