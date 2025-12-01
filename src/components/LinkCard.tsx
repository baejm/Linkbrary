"use client";

import Image from "next/image";
import styles from "./linkCard.module.css";
import { LinkItem } from "../../types/type";
import starWhite from "@/images/star_white.svg";
import star from "@/images/star.svg";
import { useEffect, useRef, useState } from "react";
import defaultThumb from "@/images/default_thumb.jpg";
import Button from "./Button";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { fetchApi } from "@/lib/api";

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

  const queryClient = useQueryClient();

  const { mutate, isPending } = useMutation({
    mutationFn: (id: number) =>
      fetchApi(`/links/${id}/favorite`, {
        method: "PUT",
        body: JSON.stringify({ favorite: !item.favorite }),
      }),
    onSuccess: () => {
      //  페이지 새로고침
      queryClient.invalidateQueries({ queryKey: ["favorites"] });

      // links 페이지 데이터도 갱신
      queryClient.invalidateQueries({ queryKey: ["links"] });
    },
  });

  const [isFavorite, setIsFavorite] = useState(item.favorite);

  const onToggleFavorite = (id: number) => {
    setIsFavorite((prev) => !prev);
    mutate(id);
  };

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
        <Button
          onClick={() => {
            onToggleFavorite(item.id);
          }}
          aria-label="즐겨찾기 토글"
        >
          {isFavorite ? (
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
        </Button>
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
