import { Spinner } from "@/components/ui/misc/Sipnner";

export default function Loading() {
  return (
    <div className="h-full bg-[--background-primary] flex items-center justify-center">
      <Spinner size={150} />
    </div>
  );
}
