import { useSnip } from "@/states/snips/snips";
import ActionRow from "./ActionRow";
import Tabs from "./Tabs";

export default function Panel() {
  const { activeSnip, snips } = useSnip();

  const snip = snips?.find((s) => s.metadata.id === activeSnip);

  if (!snip) return null;

  return (
    <div className="flex flex-col w-full">
      <ActionRow />
      <Tabs />
    </div>
  );
}
