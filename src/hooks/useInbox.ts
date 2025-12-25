import { useQuery } from "@tanstack/react-query";
import { fetchInbox } from "@/lib/api";

export const useInbox = () => {
  return useQuery({
    queryKey: ["inbox"],
    queryFn: fetchInbox,
  });
};
