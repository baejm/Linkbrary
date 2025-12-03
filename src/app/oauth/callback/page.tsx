"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useEffect } from "react";
import { saveToken } from "@/lib/token";

export default function OAuthCallbackPage() {
  const params = useSearchParams();
  const router = useRouter();

  useEffect(() => {
    const access = params.get("access");

    if (access) {
      saveToken(access);
      router.push("/");
    } else {
      router.push("/login");
    }
  }, []);

  return null;
}
