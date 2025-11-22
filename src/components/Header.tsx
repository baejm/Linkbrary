"use client";
import React from "react";
import Nav from "./Nav";
import style from "./header.module.css";
import { clsx } from "clsx";
import InputGroup from "./InputGroup";
import Image from "next/image";
import link_wh from "@/images/link_wh.svg";
import { usePathname, useRouter } from "next/navigation";
import Button from "./Button";
import { getToken, saveToken } from "@/lib/token";

const Header = () => {
  const pathname = usePathname();
  const router = useRouter();

  const handleClickLink = () => {
    const isGetToken = getToken();
    if (isGetToken) {
      router.push("/share");
    } else {
      router.push("/login");
    }
  };
  return (
    <div>
      <header
        className={clsx(
          style.header_wrap,
          pathname === "/" && style.header_wrap_big
        )}
      >
        <Nav />
        {pathname === "/" && (
          <section>
            <h2 className={clsx(style.title, "title txt_56")}>
              <span className="txt_56_b">세상의 모든 정보</span>
              <br />를 쉽게 저장하고 관리해 보세요
            </h2>
            <Button color="black" onClick={() => handleClickLink()}>
              링크 추가하기
            </Button>
          </section>
        )}
        {pathname === "/links" && (
          <section>
            <h2 className={clsx(style.title, "title txt_32")}>
              세상의 모든 정보, 필요한 순간에
            </h2>
            <div className="input_with_button">
              <InputGroup
                input={{
                  size: "lg",
                  placeholder: "링크를 추가해 보세요",
                  iconLeft: (
                    <Image src={link_wh} alt="" width={28} height={28} />
                  ),
                }}
                button={{
                  size: "lg",
                  color: "black",
                  className: "txt_18_sm",
                  text: "추가하기",
                  onClick: () => console.log("추가 클릭!"),
                }}
              />
            </div>
          </section>
        )}
      </header>
    </div>
  );
};

export default Header;
