"use client";

import Image from "next/image";
import styles from "./linkCard.module.css";
import { LinkItem } from "../../types/type";
import starWhite from "@/images/star_white.svg";
import star from "@/images/star.svg";
import { useEffect, useRef, useState } from "react";
import defaultThumb from "@/images/default_thumb.jpg";

interface LinkCardProps {
  item: LinkItem;
  onEdit: (item: LinkItem) => void;
  onDelete: (id: number) => void | Promise<void>;
}

export default function LinkCard({ item, onEdit, onDelete }: LinkCardProps) {
  const [openMenu, setOpenMenu] = useState(false);
  const menuRef = useRef<HTMLDivElement | null>(null);
  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setOpenMenu(false);
      }
    }

    if (openMenu) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [openMenu]);
  return (
    <div className={styles.card}>
      <div className={styles.thumbnailWrap}>
        <Image
          src={item.imageSource || defaultThumb}
          alt=""
          fill
          className={styles.thumbnail}
        />
        <div className={styles.overlayTop} />
        <div className={styles.overlayBottom} />
        {item.favorite ? (
          <span className={styles.starIcon}>⭐️</span>
        ) : (
          <Image
            src={starWhite}
            alt="star"
            width={22}
            height={22}
            className={styles.starIcon}
          />
        )}
      </div>

      <div className={styles.info}>
        <span className={styles.time}>10 minutes ago</span>
        <h3 className={styles.title}>{item.title}</h3>
        <p className={styles.desc}>{item.description}</p>
        <span className={styles.date}>
          {new Date(item.createdAt).toLocaleString("ko-KR")}
        </span>
        <button
          className={styles.moreBtn}
          onClick={() => setOpenMenu((prev) => !prev)}
        >
          ...
        </button>
        {openMenu && (
          <div className={styles.popupMenu} ref={menuRef}>
            <button onClick={() => onEdit(item)}>수정하기</button>
            <button onClick={() => onDelete(item.id)}>삭제하기</button>
          </div>
        )}
      </div>
    </div>
  );
}
