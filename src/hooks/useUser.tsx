import { useSearchParams } from "next/navigation";
import { api } from "~/utils/api";

export function useUser() {
  const URLparams = useSearchParams();
   const userhash = URLparams.get("id") ?? "User not Signed In";

  //const userhash = "e73addd6-192f-5";

  return api.user.getUserByHash.useQuery(userhash);
}
