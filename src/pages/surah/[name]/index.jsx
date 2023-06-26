import React from "react";
import Head from "next/head";
import Navbar from "@/components/Navbar";
import { Raleway } from "next/font/google";
import { useRouter } from "next/router";

const raleway = Raleway({ subsets: ["latin"] });

const Surah = () => {
  const router = useRouter();
  const { name } = router.query;
  return (
    <main className={raleway.className}>
      <Head>
        <title>Quran - {name}</title>
      </Head>
      <header>
        <Navbar />
      </header>
    </main>
  );
};

export default Surah;
