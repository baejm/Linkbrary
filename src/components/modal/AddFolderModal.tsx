"use client";
import { useState } from "react";
import ModalLayout from "./ModalLayout";
import Input from "../Input";
import Button from "../Button";
import { AddFolderModalProps } from "../../../types/type";

export default function AddFolderModal({
  onClose,
  onSubmit,
}: AddFolderModalProps) {
  const [name, setName] = useState("");

  return (
    <ModalLayout onClose={onClose}>
      <h2>폴더 추가</h2>

      <Input
        value={name}
        placeholder="폴더명 입력"
        onChange={(e) => setName(e.target.value)}
      />
      {<Button onClick={() => onSubmit(name)}>추가하기</Button>}
    </ModalLayout>
  );
}
