"use client";
import React, { useEffect, useState } from "react";
import Nav from "./Nav";
import style from "./header.module.css";
import { clsx } from "clsx";
import InputGroup from "./InputGroup";
import Image from "next/image";
import link_wh from "@/images/link_wh.svg";
import { usePathname, useRouter } from "next/navigation";
import Button from "./Button";
import { getToken, saveToken } from "@/lib/token";
import { isLoggedIn } from "@/lib/token";
import { useModal } from "./modal/ModalProvider";
import { fetchApi } from "@/lib/api";

const Header = () => {
  const pathname = usePathname();
  const router = useRouter();
  const [login, setLogin] = useState(false);
  const [linkValue, setLinkValue] = useState("");
  const { openModal } = useModal();

  useEffect(() => {
    setLogin(isLoggedIn());
  }, []);

  const handleClickLink = () => {
    if (login) {
      router.push("/links");
    } else {
      router.push("/login");
    }
  };

  const handleAddLink = async () => {
    let url = linkValue.trim();

    // http 자동 보정
    if (!/^https?:\/\//i.test(url)) {
      url = "https://" + url;
    }

    // URL 형태 + 최소 도메인 검사
    try {
      new URL(url);
      if (!url.includes(".")) {
        throw new Error("invalid");
      }
    } catch {
      alert("유효한 링크 형식이 아닙니다.");
      return;
    }

    const folders = await fetchApi(`/folders`, { method: "GET" });

    openModal("addLinkToFolder", {
      link: url,
      folders,
      onSubmit: async (folderId: number) => {
        try {
          await fetchApi(`/links`, {
            method: "POST",
            body: JSON.stringify({ url, folderId }),
          });

          alert("링크가 추가되었습니다!");
          window.location.reload();
        } catch (e) {
          alert("존재하지 않거나 접근할 수 없는 링크입니다.");
        }
      },
    });
  };

  return (
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
                iconLeft: link_wh,
                value: linkValue,
                onChange: (e) => setLinkValue(e.target.value),
              }}
              button={{
                size: "lg",
                color: "black",
                className: "txt_18_sm",
                text: "추가하기",
                onClick: handleAddLink,
              }}
            />
          </div>
        </section>
      )}
    </header>
  );
};

export default Header;
