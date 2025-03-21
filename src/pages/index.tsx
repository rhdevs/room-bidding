import Head from "next/head";
import Link from "next/link";

import { api } from "~/utils/api";

export default function Home() {
  return (
    <>
      <Head>
        <title>RoomReg</title>
        <meta name="description" content="Generated by create-t3-app" />
        {/* <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@100&family=Merriweather+Sans:wght@700;800&family=Merriweather:wght@900&display=swap"
          rel="stylesheet"
        /> */}
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="flex min-h-screen flex-col items-center justify-center">
        <div className="container flex flex-col items-center justify-center gap-12 px-4 py-16 ">
          <h1 className="font-merriweather text-5xl tracking-tight text-primary sm:text-[5rem]">
            Room<span className="text-muted-foreground">Reg</span>
          </h1>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:gap-8">
            <Link
              className="flex max-w-xs flex-col gap-4 rounded-xl bg-muted-foreground/10 p-4 text-primary hover:bg-muted-foreground/20"
              href="/rooms"
              target="_blank"
            >
              <h3 className="text-2xl font-bold">View Rooms→</h3>
              <div className="text-lg">
                View all the available rooms and bid for them
              </div>
            </Link>
            <Link
              className="flex max-w-xs flex-col gap-4 rounded-xl bg-muted-foreground/10 p-4 text-primary hover:bg-muted-foreground/20"
              href="/ranking"
              target="_blank"
            >
              <h3 className="text-2xl font-bold">Rank Room→</h3>
              <div className="text-lg">
                Rank the rooms and get the best room for you
              </div>
            </Link>
          </div>
        </div>
      </main>
    </>
  );
}
