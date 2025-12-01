"use client";

import { useEffect, useState } from "react";
import { getJwtRemainTime } from "@/lib/jwt";
import { getToken, logoutAll } from "@/lib/token";

export function useJwtCountdown() {
  const [remain, setRemain] = useState<number | null>(null);

  useEffect(() => {
    const token = getToken();
    if (!token) return;

    const update = () => {
      const sec = getJwtRemainTime(token);
      setRemain(sec);

      if (sec <= 0) {
        logoutAll();
        window.location.href = "/login";
      }
    };

    update();
    const id = setInterval(update, 1000);

    return () => clearInterval(id);
  }, []);

  // remain이 아직 계산 안된 초기 상태라면
  if (remain === null) {
    return {
      remain: null,
      hours: null,
      minutes: null,
      seconds: null,
    };
  }

  // 🔥 시·분·초 변환
  const hours = Math.floor(remain / 3600);
  const minutes = Math.floor((remain % 3600) / 60);
  const seconds = remain % 60;

  return {
    remain,
    hours,
    minutes,
    seconds,
  };
}
