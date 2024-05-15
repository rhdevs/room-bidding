import { type AppType } from "next/app";
import { api } from "~/utils/api";
import { Toaster } from "react-hot-toast";
import "~/styles/globals.css";
import Navbar from "~/components/Navbar";
import { useSearchParams } from "next/navigation";

const MyApp: AppType = ({ Component, pageProps }) => {
  const URLparams = useSearchParams();

  const userhash = URLparams.get("id") ?? "User not Signed In";
  return (
    <>
      <Navbar />
      {userhash}
      <Component {...pageProps} />
      <Toaster />
    </>
  );
};

export default api.withTRPC(MyApp);
