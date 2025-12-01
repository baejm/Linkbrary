import { clsx } from "clsx";
import style from "./button.module.css";

interface ButtonProps {
  children: React.ReactNode;
  size?: "sm" | "md" | "lg" | "full";
  color?: string;
  ico?: boolean;
  num?: number;
  className?: string;
  disabled?: boolean;
  onClick?: () => void;
  type?: "button" | "submit";
  style?: React.CSSProperties;
}

export default function Button({
  children,
  size = "md",
  color = "white",
  ico = false,
  className,
  disabled,
  num,
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
      disabled={disabled}
      {...props}
    >
      {children}
      {num != null && <span className={style.num}>{num}</span>}
    </button>
  );
}
