"use client";

import { useState } from "react";
import styles from "./folderHeader.module.css";

interface FolderHeaderProps {
  folderId: string;
  folderName: string;
  onRename: (folderId: string, newName: string) => void | Promise<void>;
  onDelete: (folderId: string) => void | Promise<void>;
}

export default function FolderHeader({
  folderId,
  folderName,
  onRename,
  onDelete,
}: FolderHeaderProps) {
  const [editing, setEditing] = useState(false);
  const [name, setName] = useState(folderName);

  const handleShare = () => {
    const url = window.location.href;
    navigator.clipboard.writeText(url);
    alert("링크가 복사되었습니다!");
  };

  const handleRename = async () => {
    if (!name.trim()) return;
    await onRename(folderId, name);
    setEditing(false);
  };

  return (
    <div className={styles.header}>
      {/* 폴더 이름 / 수정 상태 */}
      {!editing ? (
        <h2 className={styles.name}>{folderName}</h2>
      ) : (
        <div className={styles.editBox}>
          <input
            className={styles.input}
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <button className={styles.saveBtn} onClick={handleRename}>
            저장
          </button>
          <button
            className={styles.cancelBtn}
            onClick={() => setEditing(false)}
          >
            취소
          </button>
        </div>
      )}

      <div className={styles.actions}>
        <button onClick={handleShare}>🔗 공유</button>
        <button onClick={() => setEditing(true)}>✏️ 이름 변경</button>
        <button className={styles.delete} onClick={() => onDelete(folderId)}>
          🗑 삭제
        </button>
      </div>
    </div>
  );
}
