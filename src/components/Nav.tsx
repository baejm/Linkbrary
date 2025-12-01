"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import style from "./nav.module.css";
import Button from "./Button";
import logo from "@/images/logo.svg";
import Link from "next/link";
import { logoutAll, isLoggedIn, getToken } from "@/lib/token";
import { useRouter } from "next/navigation";
import { fetchApi } from "@/lib/api";
import { useJwtCountdown } from "@/hooks/useJwtCountdown";
import clsx from "clsx";

const Nav = () => {
  const router = useRouter();
  const [loggedIn, setLoggedIn] = useState(false);
  const [user, setUser] = useState<any>(null);
  const { remain, hours, minutes, seconds } = useJwtCountdown();

  // 최초 로딩 + 새로고침 시 로그인 상태 반영
  useEffect(() => {
    const hasToken = isLoggedIn();
    setLoggedIn(hasToken);

    // 토큰이 있으면 유저 정보를 불러옴
    if (hasToken) {
      fetchApi(`/users`)
        .then((data) => {
          setUser(data);
        })
        .catch((err) => {
          console.error("유저 정보 가져오기 실패:", err);
        });
    }
  }, []);

  const handleLogin = () => {
    router.push("/login");
  };

  const handleLogout = () => {
    logoutAll();
    setLoggedIn(false);
    setUser(null);
    router.push("/");
  };

  const handleClickLink = () => {
    router.push("/favorite");
  };

  return (
    <nav className={style.gnb}>
      <div className={style.gnb_top}>
        <h1>
          <Link href="/" scroll={false}>
            <Image src={logo} alt="로고" />
          </Link>
        </h1>

        <div className={style.header}>
          {!loggedIn && (
            <Button
              className="txt_18_sm"
              size="sm"
              color="gray800"
              onClick={handleLogin}
            >
              로그인
            </Button>
          )}

          {loggedIn && (
            <>
              <Button
                className="txt_18_sm"
                size="sm"
                color="gray800"
                onClick={handleClickLink}
              >
                ⭐ 즐겨찾기
              </Button>
              {user && (
                <div className={style.user_info}>
                  <Image
                    src={user.imageSource}
                    alt="유저이미지"
                    width={20}
                    height={20}
                  />
                  {user.name} 님
                </div>
              )}
            </>
          )}
        </div>
        <div className={style.nav_info}>
          {loggedIn && remain !== null && (
            <>
              <div className={style.session_warning}>
                <b>
                  {hours > 0 && `${hours}시간 `}
                  {minutes}분 {seconds.toString().padStart(2, "0")}초
                </b>
              </div>

              <Button
                className={clsx(style.logout, "txt_18_sm")}
                size="sm"
                color="trans"
                onClick={handleLogout}
              >
                로그아웃
              </Button>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Nav;
