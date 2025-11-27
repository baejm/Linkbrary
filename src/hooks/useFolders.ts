import { useQuery } from "@tanstack/react-query";
import { fetchApi } from "@/lib/api";

export function useFolders() {
  return useQuery({
    queryKey: ["folders"],
    queryFn: async () => {
      const result = await fetchApi("/folders", { method: "GET" });
      console.log("폴더", result);

      return result ?? [];
    },
  });
}
