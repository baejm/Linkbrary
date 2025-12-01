"use client";

import SkeletonList from "@/components/loading/SkeletonList";
import { fetchApi } from "@/lib/api";
import { useQuery } from "@tanstack/react-query";
import styles from "./favorite.module.css";
import React, { useEffect, useState } from "react";
import LinkCard from "@/components/LinkCard";
import EmptyState from "@/components/EmptyState";
import { LinkItem } from "../../../../types/type";

const Favorite = () => {
  const { data, isLoading, refetch } = useQuery({
    queryKey: ["favorites"],
    queryFn: () => fetchApi("/favorites"),
  });
  console.log("data", data);

  if (isLoading)
    return (
      <div className={styles.cardGrid}>
        {Array.from({ length: 4 }).map((_, i) => (
          <SkeletonList key={i} />
        ))}
      </div>
    );

  if (data.list.length === 0) return <EmptyState txt="즐겨찾기" />;

  return (
    <div className={styles.cardGrid}>
      {data &&
        data.list.map((item: LinkItem) => (
          <LinkCard
            key={item.id}
            item={item}
            onEdit={() => {}}
            onDelete={() => {}}
          />
        ))}
    </div>
  );
};

export default Favorite;
