import { TextareaHTMLAttributes } from "react";

export default function TextArea({
  value,
  className,
  placeholder,
  onChange,
}: TextareaHTMLAttributes<HTMLTextAreaElement>) {
  return (
    <textarea
      className={
        "bg-(--input-background) text-(--text-primary) border border-(--border-color) rounded-md text-lg p-1 " +
        className
      }
      placeholder={placeholder}
      onChange={onChange}
      value={value}
    />
  );
}
