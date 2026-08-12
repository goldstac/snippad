import { InputHTMLAttributes } from "react";

export default function Input({
  value,
  className,
  placeholder,
  onChange,
}: InputHTMLAttributes<HTMLInputElement>) {
  return (
    <input
      className={
        "bg-[--input-background] text-[--text-primary] border border-[--border-color] rounded-md text-lg p-1 " +
        className
      }
      placeholder={placeholder}
      onChange={onChange}
      value={value}
    />
  );
}
