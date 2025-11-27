"use client";

import { useSearchParams, useRouter } from "next/navigation";
import { useEffect } from "react";
import { signupWithKakao, signinWithKakao } from "@/lib/auth";

export default function KakaoCallbackPage() {
  const searchParams = useSearchParams();
  const router = useRouter();

  useEffect(() => {
    const code = searchParams.get("code");
    console.log("🔥 Kakao code:", code);

    if (!code) {
      alert("카카오 인가 코드가 없습니다.");
      router.replace("/login");
      return;
    }

    (async () => {
      try {
        // 🔥 1) 회원가입 여부 물어보기
        const ok = confirm("카카오 계정으로 회원가입을 진행할까요?");

        if (!ok) {
          alert("회원가입이 취소되었습니다.");
          router.replace("/login");
          return;
        }

        // 🔥 2) 사용자 이름은 Kakao 프로필을 백엔드에서 가져오므로 프론트는 임시로 전달
        const name = "카카오유저";

        // 🔥 3) 백엔드 회원가입 요청 (token = code)
        const signupRes = await signupWithKakao({
          name,
          token: code, // ← 여기!!
          redirectUri: process.env.NEXT_PUBLIC_KAKAO_REDIRECT_URI!,
        });

        console.log("📤 signup result:", signupRes);

        // 🔥 4) 로그인 요청 (token = code)
        const loginRes = await signinWithKakao({
          token: code,
          redirectUri: process.env.NEXT_PUBLIC_KAKAO_REDIRECT_URI!,
        });

        console.log("📥 login result:", loginRes);

        // 🔥 5) accessToken 저장 후 홈으로 이동
        if (loginRes?.accessToken) {
          alert("카카오 로그인 완료!");
          localStorage.setItem("authToken", loginRes.accessToken);
          router.replace("/");
        } else {
          alert("로그인 실패");
          router.replace("/login");
        }
      } catch (err) {
        console.error("❌ 카카오 인증 실패", err);
        alert("카카오 인증 중 문제가 발생했습니다.");
        router.replace("/login");
      }
    })();
  }, []);

  return <div>카카오 인증 처리중...</div>;
}
