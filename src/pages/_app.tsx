import { type AppType } from "next/app";
import Navbar from "~/components/Navbar";
import { Toaster } from "~/components/ui/toaster";
import "~/styles/globals.css";
import { api } from "~/utils/api";
import { useUser } from "../hooks/useUser";

const MyApp: AppType = ({ Component, pageProps }) => {
  const { data, isSuccess } = useUser();

  if (!isSuccess) return <div>Loading...</div>;

  return (
    <>
      <Navbar />
      <Component {...pageProps } userid={data?.id || -1} />
      <Toaster />
    </>
  );
};

export default api.withTRPC(MyApp);
