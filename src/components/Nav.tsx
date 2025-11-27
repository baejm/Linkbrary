"use client";

import React, { useState } from "react";
import Image from "next/image";
import style from "./nav.module.css";
import Button from "./Button";
import logo from "@/images/logo.svg";
import Link from "next/link";
import { logoutAll, isLoggedIn } from "@/lib/token";
import { useRouter } from "next/navigation";

const Nav = () => {
  const [loggedIn, setLoggedIn] = useState(() => isLoggedIn());
  const router = useRouter();

  // useEffect(() => {
  //   setLoggedIn(isLoggedIn());
  // }, []);

  const handleLogin = () => {
    router.push("/login");
    // signIn("kakao", {
    //   callbackUrl: "/",
    //   redirect: false,
    // });
  };

  const handleLogout = () => {
    logoutAll();
    setLoggedIn(false);
    router.push("/");
  };

  const handleClickLink = () => {
    router.push("/share");
  };

  return (
    <nav className={style.gnb}>
      <div className={style.gnb_top}>
        <h1>
          <Link href="/" scroll={false}>
            <Image src={logo} alt="로고" />
          </Link>
        </h1>

        <div className="header">
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

              <Button
                className="txt_18_sm"
                size="sm"
                color="gray800"
                onClick={handleLogout}
                style={{ marginLeft: "12px" }}
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
