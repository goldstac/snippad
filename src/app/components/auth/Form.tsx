import { useSettings } from "@/states/settings/settings";
import React, { useState } from "react";

export default function Form() {
  const [name, setName] = useState<string | null>(null);
  const { settings, setSettings } = useSettings();

  const onSubmit = async (e: React.SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!name) return;
    const updatedSettings = { ...settings, name: name };
    setSettings(updatedSettings);
  };
  return (
    <div className="bg-[--bg-primary] text-[--text-primary] h-full flex items-center justify-center flex-col gap-6">
      <h1 className="text-5xl">What's your name?</h1>
      <form onSubmit={onSubmit}>
        <input
          onChange={(c) => setName(c.target.value)}
          className="bg-transparent border-b border-[--accent-color] w-96 p-2 text-2xl bricolage text-center"
        />
      </form>
    </div>
  );
}
