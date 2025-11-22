"use client";

import { clsx } from "clsx";
import Input from "./Input";
import Button from "./Button";
import style from "./inputGroup.module.css";
import { InputSize } from "./type";

interface InputGroupProps {
  input: React.ComponentProps<typeof Input>;
  button?: Omit<React.ComponentProps<typeof Button>, "children"> & {
    text: string;
  };
  className?: string;
}

export default function InputGroup({
  input,
  button,
  className,
}: InputGroupProps) {
  return (
    <div className={clsx(style.wrap, className)}>
      <Input {...input} />
      <Button {...button}>{button?.text}</Button>
    </div>
  );
}
