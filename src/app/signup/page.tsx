"use client";

import styles from "./signup.module.css";
import Image from "next/image";
import logo from "@/images/logo.svg";
import Input from "@/components/Input";
import Button from "@/components/Button";
import Link from "next/link";
import clsx from "clsx";
import { useState } from "react";
import { fetchApi } from "@/lib/api";
import { isValidEmail, isValidPassword } from "@/lib/validate";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import kakaoIcon from "@/images/kakao_sns.svg";

export default function SignupPage() {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState(""); //비밀번호
  const [passwordCheck, setPasswordCheck] = useState(""); //비밀번호 확인

  const [isEmailVaild, setIsEmailVaild] = useState(false);
  const [errorText, setErrorText] = useState(""); //이메일 중복 확인용 에러 txt
  const [passwordError, setPasswordError] = useState(""); //비밀번호 에러 txt
  const [passwordCheckError, setPasswordCheckError] = useState(""); //비밀번호 확인 txt

  const router = useRouter();

  const handleCheckEmail = async () => {
    try {
      const result = await fetchApi("/users/check-email", {
        method: "POST",
        body: JSON.stringify({ email }),
      });
      setIsEmailVaild(true);
      if (result.isUsableEmail) {
        setErrorText("");
        toast.success("가입 가능한 메일입니다.");
      }
    } catch (error: any) {
      setIsEmailVaild(false);
      setErrorText(error.body?.message || "에러가 발생했습니다.");
      // toast.error(error.body?.message || "에러가 발생했습니다.");
    }
  };

  const handlePasswordBlur = () => {
    if (password && !isValidPassword(password)) {
      setPasswordError("8자 이상 작성해 주세요.");
    } else setPasswordError("");
  };

  const handlePasswordCheckBlur = () => {
    if (
      passwordCheck.length >= 1 &&
      isValidPassword(password) &&
      !(password === passwordCheck)
    ) {
      setPasswordCheckError("비밀번호가 일치하지 않습니다.");
      return;
    }
    setPasswordCheckError("");
  };

  const handleSignup = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!isEmailVaild) {
      toast.error("이메일 중복 확인을 완료해주세요.");
      return;
    }

    if (!name) {
      toast.error("이름을 입력해 주세요.");
      return;
    }

    if (isValidPassword(password) && !(password === passwordCheck)) {
      toast.error("비밀번호를 확인해 주세요.");
      return;
    }

    setPasswordCheckError("");

    try {
      console.log("성공");
      const result = fetchApi(`/auth/sign-up`, {
        method: "POST",
        body: JSON.stringify({ email, password, name }),
      });
      console.log("가입결과", result);
    } catch (error) {
      console.error("가입중에러", error);
    }
    router.push("/login");
  };

  const handleKakaoLogin = () => {
    const REST_API_KEY = process.env.NEXT_PUBLIC_KAKAO_REST_API!;
    const redirectUri = process.env.NEXT_PUBLIC_KAKAO_REDIRECT_URI!;
    // const redirectUri = `https://linkbrary-api.vercel.app/12/oauth/kakao`;

    const kakaoURL = `https://kauth.kakao.com/oauth/authorize?response_type=code&client_id=${REST_API_KEY}&redirect_uri=${redirectUri}`;

    window.location.href = kakaoURL;
  };

  return (
    <div className={styles.background}>
      <div className={styles.box}>
        <h1 className={styles.logo}>
          <Image src={logo} alt="로고" fill />
        </h1>

        <p className={clsx(styles.subText, "text_16_r")}>
          이미 회원이신가요?{" "}
          <Link href="/login" scroll={false}>
            로그인 하기
          </Link>
        </p>
        <form onSubmit={handleSignup}>
          <label className={styles.label}>이메일</label>
          <div className={styles.input_width_btn}>
            <Input
              className={styles.input}
              size="login"
              placeholder="이메일을 입력해주세요"
              value={email}
              error={errorText}
              onChange={(e) => setEmail(e.target.value)}
            />
            <Button color="black" onClick={handleCheckEmail} type="button">
              중복 확인
            </Button>
          </div>

          <label className={styles.label}>이름</label>
          <Input
            className={styles.input}
            size="login"
            placeholder="이름을 입력해주세요"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />

          <label className={styles.label}>비밀번호</label>
          <Input
            className={styles.input}
            size="login"
            placeholder="비밀번호를 입력해주세요"
            type="password"
            value={password}
            error={passwordError}
            onChange={(e) => setPassword(e.target.value)}
            onBlur={handlePasswordBlur}
          />

          <label className={styles.label}>비밀번호 확인</label>
          <Input
            className={styles.input}
            size="login"
            placeholder="비밀번호를 다시 입력해주세요"
            type="password"
            value={passwordCheck}
            error={passwordCheckError}
            onChange={(e) => setPasswordCheck(e.target.value)}
            onBlur={handlePasswordCheckBlur}
          />
          <Button
            className={styles.loginBtn}
            size="full"
            color="black"
            type="submit"
          >
            회원가입
          </Button>
        </form>
        <div className={styles.socialSection}>
          <span className={clsx(styles.socialTitle, "text_14_r")}>
            소셜 로그인
          </span>

          <Button
            className={styles.kakaoBtn}
            color=""
            onClick={handleKakaoLogin}
          >
            <Image src={kakaoIcon} width={42} height={42} alt="kakao" />
          </Button>
        </div>
      </div>
    </div>
  );
}
