"use client";

import { ReactNode } from "react";
import styles from "./modalLayout.module.css";

interface ModalProps {
  title?: string;
  children: ReactNode;
  onClose: () => void;
}

export default function ModalLayout({ children, onClose }: ModalProps) {
  return (
    <div className={styles.overlay}>
      <div className={styles.modalBox}>
        <button className={styles.closeBtn} onClick={onClose}>
          X
        </button>
        {children}
      </div>
    </div>
  );
}
