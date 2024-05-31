import { useSearchParams } from "next/navigation";
import { api } from "~/utils/api";

export function useRoom() {
  const URLparams = useSearchParams();
  const userhash = URLparams.get("id") ?? "User not Signed In";

  return api.user.getUserByHash.useQuery(userhash);
}
