"use client";

import { Suspense, useState } from "react";
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
import { useDebounce } from "@/hooks/useDebounce";
import Pagination from "@/components/Pagination";

interface LinksPageProps {
  searchParams: {
    folder?: string;
    name?: string;
  };
}

function LinksPageClient() {
  const [searchLink, setsearchLink] = useState("");
  const [selectedFolderId, setSelectedFolderId] = useState<number | "all">(
    "all"
  );

  const debounceSearch = useDebounce(searchLink); //검색어 디반스용

  const searchParams = useSearchParams();
  const { openModal, closeModal } = useModal();
  const router = useRouter();

  const folderId = searchParams.get("folder");
  const folderName = searchParams.get("name");

  const {
    data: folders,
    isLoading: foldersLoading,
    isFetching: foldersFetching,
    refetch: refetchFolders,
  } = useFolders(); // 전체폴더

  const {
    data: linksData,
    isLoading: linksLoading,
    isFetching: linksFetching,
    refetch: refetchLinks,
  } = useLinks(folderId); // 특정 폴더

  const { data: allLinksData } = useLinks(null); //전체 링크들
  const allTotalCount = allLinksData?.totalCount ?? 0; // 전체 링크수 확인

  const links = linksData?.list ?? [];

  const filterLinks = links.filter((item) => {
    if (!debounceSearch) return true;
    const text = debounceSearch.toLowerCase();

    return (
      item.url?.toLowerCase().includes(text) ||
      item.title?.toLowerCase().includes(text) ||
      item.description?.toLowerCase().includes(text)
    );
  });

  //페이지네이션 관련
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 3;

  const start = (currentPage - 1) * itemsPerPage;
  const end = start + itemsPerPage;
  const paginatedLinks = filterLinks.slice(start, end);

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
    openModal("confirmDelete", {
      message: "정말 삭제하시겠어요?",
      onConfirm: async () => {
        await fetchApi(`/folders/${folderId}`, { method: "DELETE" });
        router.push("/links");
        refetchFolders();
        refetchLinks();
        closeModal();
      },
    });
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
          &nbsp; 폴더 추가하기
        </Button>
      </div>
      {folderId && (
        <FolderHeader
          folderId={folderId}
          folderName={folderName ?? ""}
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
      ) : filterLinks.length === 0 ? (
        <EmptyState />
      ) : (
        <div className={styles.cardGrid}>
          {paginatedLinks.map((item) => (
            <LinkCard
              key={item.id}
              item={item}
              onEdit={handleEdit}
              onDelete={handleDelete}
            />
          ))}
        </div>
      )}
      <Pagination
        currentPage={currentPage}
        totalPages={Math.ceil(filterLinks.length / itemsPerPage)}
        onPageChange={setCurrentPage}
      />
    </div>
  );
}

export default function LinksPage() {
  return (
    <Suspense fallback={<LoadingSpinner />}>
      <LinksPageClient />
    </Suspense>
  );
}
