"use client";

import React, { ReactNode, useState } from "react";
import { clsx } from "clsx";
import style from "./input.module.css";
import eyevisible from "@/images/eyevisible.svg";
import eyeinvisible from "@/images/eyeinvisible.svg";
import Image from "next/image";
import { InputSize } from "./type";

type InputProps = Omit<React.InputHTMLAttributes<HTMLInputElement>, "size"> & {
  iconLeft?: ReactNode;
  iconRight?: ReactNode;
  type?: string;
  size?: InputSize;
};

const Input = ({
  iconLeft,
  iconRight,
  type = "text",
  size = "sm",
  ...props
}: InputProps) => {
  const [visible, setVisible] = useState(false);
  const isPassword = type === "password";
  const checkedType = isPassword ? (visible ? "text" : "password") : type;

  return (
    <div className={clsx(style.input_wrap)}>
      {iconLeft && <span className={style.icon_left}>{iconLeft}</span>}

      {type === "password" ? (
        <span
          className={style.icon_right}
          onClick={() => setVisible((p) => !p)}
        >
          {visible ? (
            <Image src={eyevisible} alt="비밀번호 보이기" />
          ) : (
            <Image src={eyeinvisible} alt="비밀번호 감추기" />
          )}
        </span>
      ) : (
        iconRight && <span className={style.icon_right}>{iconRight}</span>
      )}

      <input
        className={clsx(style.input, style[`input_${size}`])}
        {...props}
        type={checkedType}
      />
    </div>
  );
};

export default Input;
