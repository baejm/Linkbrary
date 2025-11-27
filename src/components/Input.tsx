"use client";

import React, { useState } from "react";
import { clsx } from "clsx";
import style from "./input.module.css";
import eyevisible from "@/images/eyevisible.svg";
import eyeinvisible from "@/images/eyeinvisible.svg";
import Image from "next/image";
import { StaticImport } from "next/dist/shared/lib/get-img-props";
import { InputSize } from "../../types/type";

type InputProps = Omit<React.InputHTMLAttributes<HTMLInputElement>, "size"> & {
  iconLeft?: string | StaticImport;
  iconRight?: string | StaticImport;
  type?: string;
  size?: InputSize;
  error?: string;
};

const Input = ({
  iconLeft,
  iconRight,
  type = "text",
  size = "sm",
  error,
  ...props
}: InputProps) => {
  const [visible, setVisible] = useState(false);
  const isPassword = type === "password";
  const checkedType = isPassword ? (visible ? "text" : "password") : type;

  return (
    <div className={clsx(style.input_wrap, style[`input_${size}`])}>
      {iconLeft && (
        <span className={style.icon_left}>
          <Image src={iconLeft} alt="left icon" width={20} height={20} />
        </span>
      )}

      {!isPassword && iconRight && (
        <span className={style.icon_right}>
          <Image src={iconRight} alt="right icon" width={20} height={20} />
        </span>
      )}

      {isPassword && (
        <span
          className={style.icon_right}
          onClick={() => setVisible((v) => !v)}
        >
          <Image
            src={visible ? eyevisible : eyeinvisible}
            width={16}
            height={16}
            alt="toggle password"
          />
        </span>
      )}

      <input
        {...props}
        type={checkedType}
        className={clsx(style.input, {
          [style.errorBorder]: error,
        })}
      />

      {error && <p className={style.errorText}>{error}</p>}
    </div>
  );
};

export default Input;
