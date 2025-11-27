"use client";

import { useState } from "react";
import { fetchApi } from "@/lib/api";
import EmptyState from "@/components/EmptyState";
import searchIco from "@/images/search_ico.svg";
import Input from "@/components/Input";
import styles from "./link.module.css";
import Button from "@/components/Button";
import Image from "next/image";
import more from "@/images/more_wh.svg";
import clsx from "clsx";
import { useModal } from "@/components/modal/ModalProvider";
import { useRouter, useSearchParams } from "next/navigation";
import LinkCard from "@/components/LinkCard";
import FolderHeader from "@/components/FolderHeader";
import SkeletonList from "@/components/loading/SkeletonList";
import { LoadingSpinner } from "@/components/loading/LoadingSpinner";

import { useFolders } from "@/hooks/useFolders";
import { useLinks } from "@/hooks/useLinks";

export default function LinksPage() {
  const [searchLink, setsearchLink] = useState("");
  const [selectedFolderId, setSelectedFolderId] = useState<number | "all">(
    "all"
  );

  const { openModal, closeModal } = useModal();
  const router = useRouter();

  const searchParams = useSearchParams();
  const folderId = searchParams.get("folder");
  const folderName = searchParams.get("name") || "";

  const {
    data: folders,
    isLoading: foldersLoading,
    isFetching: foldersFetching,
    refetch: refetchFolders,
  } = useFolders();

  const {
    data: linksData,
    isLoading: linksLoading,
    isFetching: linksFetching,
    refetch: refetchLinks,
  } = useLinks(folderId);

  const { data: allLinksData } = useLinks(null);
  const allTotalCount = allLinksData?.totalCount ?? 0;

  const links = linksData?.list ?? [];

  /** 폴더 선택 */
  const handleSelectFolder = (id: number | string) => {
    if (typeof id === "number") {
      router.push(`/links?folder=${id}`);
      setSelectedFolderId(id);
      console.log("/links?folder", links);
    } else {
      setSelectedFolderId("all");
      router.push("/links");
      console.log("all", links);
    }
  };

  /** 폴더 삭제 */
  const handleDeleteFolder = async (folderId: string) => {
    await fetchApi(`/folders/${folderId}`, { method: "DELETE" });
    router.push("/links");
    refetchFolders();
    refetchLinks();
  };

  /** 폴더 이름 변경 */
  const handleRenameFolder = async (folderId: string, newName: string) => {
    await fetchApi(`/folders/${folderId}`, {
      method: "PUT",
      body: JSON.stringify({ name: newName }),
    });
    refetchFolders();
  };

  /** 폴더 추가 */
  const handleAddFolder = () => {
    openModal("addFolder", {
      onSubmit: async (name: string) => {
        await fetchApi("/folders", {
          method: "POST",
          body: JSON.stringify({ name }),
        });
        await refetchFolders();
        closeModal();
      },
    });
  };

  /** 링크 삭제 */
  const handleDelete = async (id: number) => {
    await fetchApi(`/links/${id}`, { method: "DELETE" });
    refetchLinks();
  };

  const handleEdit = (item: any) => {
    openModal("editLink", { item });
  };

  return (
    <div className={clsx(styles.links_wrap)}>
      {/* 검색 입력 */}
      <Input
        iconLeft={searchIco}
        className={styles.input}
        size="search"
        placeholder="링크를 검색해 보세요."
        value={searchLink}
        onChange={(e) => setsearchLink(e.target.value)}
      />

      {/* 폴더 리스트 */}
      <div className={clsx(styles.list_wrap)}>
        <ul>
          <li>
            <Button
              className={selectedFolderId === "all" ? styles.activeFolder : ""}
              num={allTotalCount}
              color="list"
              onClick={() => handleSelectFolder("all")}
            >
              전체
            </Button>
          </li>

          {foldersLoading && <LoadingSpinner />}

          {!foldersLoading &&
            folders?.map((folder: any) => (
              <li key={folder.id}>
                <Button
                  className={
                    selectedFolderId === folder.id ? styles.activeFolder : ""
                  }
                  num={folder.linkCount}
                  color="list"
                  onClick={() => handleSelectFolder(folder.id)}
                >
                  {folder.name}
                </Button>
              </li>
            ))}
        </ul>

        <Button ico color="white" onClick={handleAddFolder}>
          <Image src={more} alt="" />
          폴더 추가하기
        </Button>
      </div>

      {folderId && (
        <FolderHeader
          folderId={folderId}
          folderName={folderName}
          onRename={handleRenameFolder}
          onDelete={handleDeleteFolder}
        />
      )}

      {/* 링크 로딩중이면 스켈레톤 */}
      {linksLoading ? (
        <div className={styles.cardGrid}>
          {Array.from({ length: 4 }).map((_, i) => (
            <SkeletonList key={i} />
          ))}
        </div>
      ) : links.length === 0 ? (
        <EmptyState />
      ) : (
        <div className={styles.cardGrid}>
          {links.map((item) => (
            <LinkCard
              key={item.id}
              item={item}
              onEdit={handleEdit}
              onDelete={handleDelete}
            />
          ))}
        </div>
      )}

      {/* 백그라운드 로딩 표시 */}
      {/* {linksFetching && !linksLoading && (
        <div className={styles.fetchingSpinner}>
          <LoadingSpinner />
        </div>
      )} */}
    </div>
  );
}
