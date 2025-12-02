"use client";

import styles from "./login.module.css";
import Image from "next/image";
import logo from "@/images/logo.svg";
import { useState } from "react";
import clsx from "clsx";
import Input from "@/components/Input";
import Button from "@/components/Button";
import { isValidEmail, isValidPassword } from "@/lib/validate";
import { fetchApi } from "@/lib/api";
import { saveToken } from "@/lib/token";
import { useRouter } from "next/navigation";
import { useMutation, useQuery } from "@tanstack/react-query";
import { LoadingSpinner } from "@/components/loading/LoadingSpinner";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [checkValid, setCheckValid] = useState(false);

  const router = useRouter();

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setEmail(value);
    setCheckValid(isValidEmail(value) && isValidPassword(password));
  };

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setPassword(value);
    setCheckValid(isValidEmail(email) && isValidPassword(value));
  };

  const handleEmailBlur = () => {
    if (email && !isValidEmail(email)) {
      setEmailError("이메일 형식으로 작성해 주세요.");
    } else setEmailError("");
  };

  const handlePasswordBlur = () => {
    if (password && !isValidPassword(password)) {
      setPasswordError("8자 이상 작성해 주세요.");
    } else setPasswordError("");
  };

  const loginMutation = useMutation({
    mutationFn: (body: { email: string; password: string }) =>
      fetchApi("/auth/sign-in", {
        method: "POST",
        body: JSON.stringify(body),
      }),
    onSuccess: (user) => {
      saveToken(user.accessToken);
      router.push("/");
    },
    onError: () => alert("이메일 또는 비밀번호 오류"),
  });

  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    loginMutation.mutate({ email, password });
  };

  return (
    <div className={styles.background}>
      <div className={styles.box}>
        <h1 className={styles.logo}>
          <Image src={logo} alt="로고" fill loading="eager" />
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
            disabled={!checkValid || loginMutation.isPending}
            className={styles.loginBtn}
            size="full"
            color="black"
            type="submit"
          >
            {loginMutation.isPending ? "로그인 중 ..." : "로그인"}
          </Button>
        </form>
      </div>
    </div>
  );
}
