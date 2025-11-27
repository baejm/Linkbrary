"use client";

import styles from "./login.module.css";
import Image from "next/image";
import kakao from "@/images/kakao_sns.svg";
import logo from "@/images/logo.svg";
import { useEffect, useState } from "react";
import clsx from "clsx";
import Input from "@/components/Input";
import Button from "@/components/Button";
import { isValidEmail, isValidPassword } from "@/lib/validate";
import { fetchApi } from "@/lib/api";
import { saveToken } from "@/lib/token";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");

  const [checkValied, setCheckValid] = useState(false);
  const router = useRouter();

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setEmail(value);

    const validForm = isValidEmail(value) && isValidPassword(password);
    setCheckValid(validForm);
  };

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setPassword(value);
    const validForm = isValidEmail(email) && isValidPassword(value);
    setCheckValid(validForm);
  };

  const handleEmailBlur = () => {
    if (email.length >= 1 && !isValidEmail(email)) {
      setEmailError("이메일 형식으로 작성해 주세요.");
    } else {
      setEmailError("");
    }
  };

  const handlePasswordBlur = () => {
    if (password.length >= 1 && !isValidPassword(password)) {
      setPasswordError("8자 이상 작성해 주세요.");
    } else {
      setPasswordError("");
    }
  };

  const handleLogin = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const user = await fetchApi("/auth/sign-in", {
      method: "POST",
      body: JSON.stringify({ email, password }),
    });
    console.log("토큰", user.accessToken);

    saveToken(user.accessToken);
    router.push("/");
  };

  const handleSnsLogin = () => {
    signIn("kakao", {
      callbackUrl: "/", // 로그인 후 이동할 URL
    });
  };

  return (
    <div className={styles.background}>
      <div className={styles.box}>
        <h1 className={styles.logo}>
          {" "}
          <Image src={logo} alt="로고" fill loading="eager"></Image>
        </h1>

        <p className={clsx(styles.subText, "text_16_r")}>
          회원이 아니신가요? <a href="/signup">회원 가입하기</a>
        </p>
        <form onSubmit={handleLogin}>
          <label className={styles.label}>이메일</label>
          <Input
            className={styles.input}
            size="login"
            placeholder="codeit@codeit.com"
            type="email"
            error={emailError}
            value={email}
            onBlur={handleEmailBlur}
            onChange={handleEmailChange}
          />

          <label className={styles.label}>비밀번호</label>
          <div className={styles.passwordBox}>
            <Input
              className={styles.input}
              type="password"
              placeholder="********"
              size="login"
              error={passwordError}
              value={password}
              onBlur={handlePasswordBlur}
              onChange={handlePasswordChange}
            />
          </div>

          <Button
            disabled={!checkValied}
            className={styles.loginBtn}
            size="full"
            color="black"
            type="submit"
          >
            로그인
          </Button>
        </form>

        <div className={styles.socialSection}>
          <span className={clsx(styles.socialTitle, "text_14_r")}>
            소셜 로그인
          </span>

          <Button
            className={styles.kakaoBtn}
            color=""
            onClick={() => handleSnsLogin()}
          >
            <Image src={kakao} width={42} height={42} alt="kakao" />
          </Button>
        </div>
      </div>
    </div>
  );
}
