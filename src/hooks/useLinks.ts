import { useQuery } from "@tanstack/react-query";
import { fetchApi } from "@/lib/api";
import { LinkItem } from "../../types/type";

interface LinksResponse {
  totalCount: number;
  list: LinkItem[];
}

export function useLinks(folderId: string | null) {
  const endpoint = folderId
    ? `/folders/${folderId}/links`
    : `/links?page=1&pageSize=10`;

  return useQuery<LinksResponse>({
    queryKey: ["links", folderId],
    queryFn: async () => {
      const result = await fetchApi(endpoint);
      console.log("links개수", result);

      return {
        totalCount: result?.totalCount ?? 0,
        list: result?.list ?? [],
      };
    },
  });
}
