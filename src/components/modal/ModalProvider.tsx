"use client";

import { createContext, useContext, useState } from "react";
import { ModalState, ModalType } from "../../../types/type";
import ModalLayout from "./ModalLayout";
import AddFolderModal from "./AddFolderModal";
import EditLinkModal from "./EditLinkModal";
import AddLinkToFolderModal from "./AddLinkToFolderModal"; // 🔥 추가

const ModalContext = createContext<any>(null);

export function ModalProvider({ children }) {
  const [modal, setModal] = useState<ModalState>({ type: null });

  const openModal = (type: ModalType, data?: any) => {
    setModal({ type, data });
  };

  const closeModal = () => {
    setModal({ type: null, data: null });
  };

  return (
    <ModalContext.Provider value={{ openModal, closeModal }}>
      {children}

      {/* 전역 모달 렌더링 */}
      {modal.type && (
        <ModalLayout onClose={closeModal}>
          {modal.type === "addFolder" && (
            <AddFolderModal
              onClose={closeModal}
              onSubmit={modal.data.onSubmit}
            />
          )}

          {modal.type === "editLink" && (
            <EditLinkModal
              initialUrl={modal.data?.url}
              onClose={closeModal}
              onSubmit={modal.data.onSubmit}
            />
          )}

          {modal.type === "addLinkToFolder" && (
            <AddLinkToFolderModal
              link={modal.data.link}
              folders={modal.data.folders}
              onSubmit={modal.data.onSubmit}
              onClose={closeModal}
            />
          )}
        </ModalLayout>
      )}
    </ModalContext.Provider>
  );
}

export const useModal = () => useContext(ModalContext);
