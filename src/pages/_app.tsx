import { type AppType } from "next/app";
import { useSearchParams } from "next/navigation";
import Navbar from "~/components/Navbar";
import { Toaster } from "~/components/ui/toaster";
import "~/styles/globals.css";
import { api } from "~/utils/api";

const MyApp: AppType = ({ Component, pageProps }) => {
  const { data, isSuccess } = useUser();

  if (!isSuccess) return <div>Loading...</div>;

  return (
    <>
      <Navbar />
      <Component {...pageProps} />
      <Toaster />
    </>
  );
};

export function useUser() {
  const URLparams = useSearchParams();
  const userhash = URLparams.get("id") ?? "User not Signed In";

  return api.user.getUserByHash.useQuery(userhash);
}

export default api.withTRPC(MyApp);
