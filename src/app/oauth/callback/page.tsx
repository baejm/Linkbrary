"use client";

import { useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { saveToken } from "@/lib/token";

export default function OAuthCallbackPage() {
  const router = useRouter();
  const params = useSearchParams();

  useEffect(() => {
    const token = params.get("access");

    if (token) {
      saveToken(token);
      router.push("/");
    } else {
      router.push("/login");
    }
  }, []);

  return <div>로그인 처리중...</div>;
}
