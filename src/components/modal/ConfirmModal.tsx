"use client";

import styles from "./confirmModal.module.css";

interface ConfirmModalProps {
  message: string;
  onConfirm: () => void | Promise<void>;
  onClose: () => void;
}

export default function ConfirmModal({
  message,
  onConfirm,
  onClose,
}: ConfirmModalProps) {
  return (
    <div className={styles.modal}>
      <p className={styles.message}>{message}</p>

      <div className={styles.actions}>
        <button className={styles.cancel} onClick={onClose}>
          취소
        </button>
        <button className={styles.danger} onClick={onConfirm}>
          삭제
        </button>
      </div>
    </div>
  );
}
