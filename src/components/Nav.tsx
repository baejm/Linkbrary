"use client";
import React from "react";
import Image from "next/image";
import style from "./nav.module.css";
import Button from "./Button";
import logo from "@/images/logo.svg";
import Link from "next/link";
import { useRouter } from "next/navigation";

const Nav = () => {
  const router = useRouter();

  return (
    <nav className={style.gnb}>
      <div className={style.gnb_top}>
        <h1>
          <Link href="/" scroll={false}>
            <Image src={logo} alt="로고"></Image>
          </Link>
        </h1>
        <div className="header">
          <Button
            className="txt_18_sm"
            size="sm"
            color="gray800"
            onClick={() => router.push("/login")}
          >
            로그인{""}
          </Button>
        </div>
      </div>
    </nav>
  );
};

export default Nav;
