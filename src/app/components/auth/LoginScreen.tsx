import { useAuth } from "@/hooks/useAuth";
import TokenInput from "./TokenInput";

export default function LoginScreen() {
  const { login, status, authError } = useAuth();
  const isAuthenticating = status === "validating";

  return (
    <div className="h-full bg-[--background-primary] overflow-y-auto flex items-center justify-center">
      <div className="h-96 w-[30rem] flex items-center justify-center rounded-2xl overflow-hidden flex-col gap-6">
        <img src="../../../assets/icon.svg" width={200} />
        <TokenInput
          onSubmit={login}
          isAuthenticating={isAuthenticating}
          error={authError}
        />
      </div>
    </div>
  );
}
