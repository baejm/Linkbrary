"use client";

import Image from "next/image";
import styles from "./pagination.module.css";
import clsx from "clsx";
import ChevronLeft from "@/images/chevron-left.svg";
import ChevronLeftActive from "@/images/chevron-left_active.svg";
import ChevronRight from "@/images/chevron-right.svg";
import ChevronRightActive from "@/images/chevron-right_active.svg";

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

export default function Pagination({
  currentPage,
  totalPages,
  onPageChange,
}: PaginationProps) {
  if (totalPages <= 1) return null;

  const createPageArray = () => {
    const pages: (number | string)[] = [];

    const showLeftDots = currentPage > 3;
    const showRightDots = currentPage < totalPages - 2;

    pages.push(1);

    if (showLeftDots) pages.push("...");

    for (let p = currentPage - 1; p <= currentPage + 1; p++) {
      if (p > 1 && p < totalPages) pages.push(p);
    }

    if (showRightDots) pages.push("...");

    pages.push(totalPages);

    return pages;
  };

  const pages = createPageArray();

  // 화살표 이미지
  const leftIcon = currentPage === 1 ? ChevronLeft : ChevronLeftActive;
  const rightIcon =
    currentPage === totalPages ? ChevronRight : ChevronRightActive;

  return (
    <div className={styles.pagination}>
      {/* 이전 버튼 */}
      <button
        className={styles.arrowBtn}
        disabled={currentPage === 1}
        onClick={() => onPageChange(currentPage - 1)}
      >
        <Image
          src={leftIcon}
          alt="prev"
          width={20}
          height={20}
          className={styles.arrowIcon}
        />
      </button>

      {/* 페이지 번호 */}
      {pages.map((p, idx) =>
        p === "..." ? (
          <span key={idx} className={styles.dots}>
            ...
          </span>
        ) : (
          <button
            key={idx}
            className={clsx(styles.page, currentPage === p && styles.active)}
            onClick={() => onPageChange(p as number)}
          >
            {p}
          </button>
        )
      )}

      {/* 다음 버튼 */}
      <button
        className={styles.arrowBtn}
        disabled={currentPage === totalPages}
        onClick={() => onPageChange(currentPage + 1)}
      >
        <Image
          src={rightIcon}
          alt="next"
          width={20}
          height={20}
          className={styles.arrowIcon}
        />
      </button>
    </div>
  );
}
