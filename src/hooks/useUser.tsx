import { useSearchParams } from "next/navigation";
import { api } from "~/utils/api";

export function useUser() {
  const URLparams = useSearchParams();
  // const userhash = URLparams.get("id") ?? "User not Signed In";

  const userhash = "187f896b-ff48-5"


  return api.user.getUserByHash.useQuery(userhash);
}
