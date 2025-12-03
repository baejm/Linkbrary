"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useEffect } from "react";
import { saveToken } from "@/lib/token";

export default function OAuthRedirectClient() {
  const params = useSearchParams();
  const router = useRouter();

  useEffect(() => {
    const access = params.get("access");

    if (access) {
      saveToken(access);
      router.replace("/");
    } else {
      router.replace("/login");
    }
  }, []);

  return null;
}
