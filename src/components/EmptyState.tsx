// components/EmptyState.tsx
"use client";

import Image from "next/image";
import styles from "./empty.module.css";

export default function EmptyState() {
  return (
    <div className={styles.container}>
      <div className={styles.iconBox}>
        <Image
          src="/images/empty-link.png"
          width={120}
          height={120}
          alt="empty"
        />
      </div>

      <h2 className={styles.title}>
        저장된 <span className={styles.highlight}>링크</span>가 없어요
      </h2>

      <p className={styles.desc}>
        <span className={styles.highlight}>링크</span>를 추가해 여러 곳에 있는
        정보들을 한 곳에서 관리해 보세요
      </p>
    </div>
  );
}
