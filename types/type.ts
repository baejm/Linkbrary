export type InputSize = "sm" | "md" | "lg" | "login" | "search";

export type ModalType =
  | "addFolder"
  | "editLink"
  | "deleteLink"
  | "editFolder"
  | "addLinkToFolder"
  | null;

export interface ModalState {
  type: ModalType;
  data?: any | null;
}

export interface AddFolderModalProps {
  onClose: () => void | null;
  onSubmit: (name: string) => void | Promise<void> | null;
}
export interface EditLinkModalProps extends AddFolderModalProps {
  initialUrl: string;
}

export interface LinkItem {
  id: number;
  url: string;
  title: string;
  description: string;
  imageSource: string | null;
  createdAt: string;
  favorite: boolean;
}
