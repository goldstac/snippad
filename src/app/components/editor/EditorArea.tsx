import { useSnip } from "@/states/snips/snips";
import MonacoEditor from "./MonacoEditor";
import Panel from "./Panel";

export default function EditorArea() {
  const { activeSnip, snips } = useSnip();

  if (!snips || snips.length === 0) return <></>;

  if (!activeSnip)
    return (
      <div className="flex items-center justify-center w-full">
        <h1 className="text-2xl whitespace-nowrap">
          Select a snip to get started!
        </h1>
      </div>
    );

  return (
    <div className="w-full flex flex-col">
      <Panel />
      <MonacoEditor />
    </div>
  );
}
