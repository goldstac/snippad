import { Button } from "@/components/ui/Button";
import { useModal } from "@/states/modal/modal";
import { useSnip } from "@/states/snips/snips";
import { CheckCircle, XCircle } from "reicon-react";

export default function DeleteSnipModal() {
  const { activeSnip, delete: deleteSnip } = useSnip();
  const { closeModal } = useModal();

  if (!activeSnip) return <></>;

  return (
    <div className="flex flex-col gap-3">
      <h1 className="text-lg">Are you sure you want to delete this snip?</h1>
      <div className="flex items-center justify-end w-full gap-3">
        <Button variant="primary" onClick={() => closeModal()} icon={XCircle}>
          Cancel
        </Button>
        <Button
          variant="danger"
          onClick={() => {
            deleteSnip(activeSnip);
            closeModal();
          }}
          icon={CheckCircle}
        >
          Yes
        </Button>
      </div>
    </div>
  );
}
