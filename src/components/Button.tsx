import { clsx } from "clsx";
import style from "./button.module.css";

interface ButtonProps {
  children: React.ReactNode;
  size?: "sm" | "md" | "lg" | "full";
  color?: string;
  ico?: boolean;
  className?: string;
  onClick?: () => void;
  type?: "button" | "submit";
}

export default function Button({
  children,
  size = "md",
  color = "white",
  ico = false,
  className,
  ...props
}: ButtonProps) {
  return (
    <button
      className={clsx(
        style.btn,
        style[size],
        style[color],
        ico && style.ico,
        className
      )}
      {...props}
    >
      {children}
    </button>
  );
}
