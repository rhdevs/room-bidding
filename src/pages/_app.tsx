import { type AppType } from "next/app";
import { api } from "~/utils/api";
import { Toaster } from "react-hot-toast";
import "~/styles/globals.css";
import Navbar from "~/components/Navbar";
import { useSearchParams } from "next/navigation";
import { createContext } from "react";
import { User } from "@prisma/client";

const MyApp: AppType = ({ Component, pageProps }) => {
  const { data, isSuccess } = useUser();

  if (!isSuccess) return <div>Loading...</div>;

  data;
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
