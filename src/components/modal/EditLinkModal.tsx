// components/modal/EditLinkModal.tsx
"use client";
import { useState } from "react";
import ModalLayout from "./ModalLayout";
import Input from "../Input";
import Button from "../Button";
import { EditLinkModalProps } from "../../../types/type";

export default function EditLinkModal({
  onClose,
  initialUrl,
  onSubmit,
}: EditLinkModalProps) {
  const [url, setUrl] = useState(initialUrl ?? "");

  return (
    <ModalLayout onClose={onClose}>
      <h2>링크 수정</h2>

      <Input
        value={url ?? ""}
        placeholder={initialUrl || "주소를 입력해 주세요."}
        onChange={(e) => setUrl(e.target.value)}
      />

      <Button onClick={() => onSubmit(url)}>수정하기</Button>
    </ModalLayout>
  );
}
