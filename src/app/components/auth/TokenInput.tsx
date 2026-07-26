import { Eye, EyeOff } from "lucide-react";
import { useState } from "react";
import { Button } from "../ui/misc/Button";
import { Spinner } from "../ui/misc/Sipnner";

interface TokenInputProps {
  onSubmit: (token: string) => Promise<boolean>;
  isAuthenticating: boolean;
  error: string | null;
}

export default function TokenInput({
  onSubmit,
  isAuthenticating,
  error,
}: TokenInputProps) {
  const [token, setToken] = useState("");
  const [show, setShow] = useState(false);

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    if (token.trim()) onSubmit(token.trim());
  };

  return (
    <form onSubmit={submit} className="flex flex-col gap-3">
      <div className="flex align-center gap-2 rounded-md overflow-hidden justify-center bg-[--background-secondary] p-4">
        <input
          type={show ? "text" : "password"}
          value={token}
          onChange={(e) => setToken(e.target.value)}
          placeholder="ghp_..."
          className="w-72 bg-transparent focus:outline-none"
          autoFocus
        />
        <button
          onClick={(e) => {
            e.preventDefault();
            setShow(!show);
          }}
        >
          {show ? <EyeOff size={16} /> : <Eye size={16} />}
        </button>
      </div>

      <Button
        type="submit"
        variant="secondary"
        className="w-full h-12"
        disabled={isAuthenticating || !token.trim()}
        onClick={submit}
      >
        {isAuthenticating ? <Spinner size={14} /> : "Connect"}
      </Button>
      {error && <span className="text-[--danger]">{error}</span>}
    </form>
  );
}
