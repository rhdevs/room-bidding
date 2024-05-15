import { type AppType } from "next/app";
import { api } from "~/utils/api";
import { Toaster } from "react-hot-toast";
import "~/styles/globals.css";
import Navbar from "~/components/Navbar";
import { useSearchParams } from "next/navigation";

const MyApp: AppType = ({ Component, pageProps }) => {
  const URLparams = useSearchParams();
  const userhash = URLparams.get("id") ?? "User not Signed In";

  const { data, isLoading } = api.user.getUserByHash.useQuery(userhash);
  if (isLoading) return <div>Loading...</div>;

  console.log(data);
  return (
    <>
      <Navbar />
      {JSON.stringify(data)}
      <Component {...pageProps} />
      <Toaster />
    </>
  );
};

export default api.withTRPC(MyApp);
