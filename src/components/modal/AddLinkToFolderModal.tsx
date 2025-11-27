"use client";

import { useState } from "react";
import styles from "./addLinkToFolderModal.module.css";
import Button from "../Button";

interface Props {
  link: string;
  folders: { id: number; name: string; linkCount: number }[];
  onSubmit: (folderId: number) => void | Promise<void>;
  onClose: () => void;
}

export default function AddLinkToFolderModal({
  link,
  folders,
  onSubmit,
  onClose,
}: Props) {
  const [selected, setSelected] = useState<number | null>(null);

  return (
    <div className={styles.overlay}>
      <div className={styles.modalBox}>
        <button className={styles.close} onClick={onClose}>
          ×
        </button>

        <h2 className={styles.title}>폴더에 추가</h2>
        <p className={styles.linkText}>{link}</p>

        <div className={styles.folderList}>
          {folders.map((f) => (
            <button
              key={f.id}
              className={`${styles.folderItem} ${
                selected === f.id ? styles.active : ""
              }`}
              onClick={() => setSelected(f.id)}
            >
              {f.name} <span>{f.linkCount}개 링크</span>
              {selected === f.id && <span className={styles.check}>✔</span>}
            </button>
          ))}
        </div>

        <Button
          color="black"
          className={styles.submit}
          onClick={() => selected && onSubmit(selected)}
        >
          링크 추가하기
        </Button>
      </div>
    </div>
  );
}
