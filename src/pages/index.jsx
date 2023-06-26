import { Inter, Noto_Naskh_Arabic, Amiri, Lateef, Ysabeau, Raleway } from "next/font/google";
import Navbar from "@/components/Navbar";
import Button from "@/components/Button";
import { BsFillMoonStarsFill, BsBookFill, BsSearch } from "react-icons/bs";
import clsx from "clsx";
import Head from "next/head";
import useSWR from "swr";
import Link from "next/link";
import Image from "next/image";

const inter = Inter({ subsets: ["latin"] });
const ysabeau = Ysabeau({ subsets: ["latin"] });
const raleway = Raleway({ subsets: ["latin"] });
const NotoNaskhArabic = Noto_Naskh_Arabic({ subsets: ["arabic"] });

const fetcher = (url) => fetch(url).then((r) => r.json());

const SurahCard = ({ name, revelation, ayahs, translation, color, className }) => {
  return (
    <Link href={`/surah/${name}`} className="lg:w-[32.5%] w-full">
      <div className={`w-full rounded-lg shadow-xl p-3 dark:bg-white dark:text-slate-900 bg-slate-800 ${className} ${color} group`}>
        <div className="flex justify-between">
          <div className="col w-1/2">
            <h2 className="card-title text-primary hover:link">{name}</h2>
            <p className="text-mute group-hover:text-opacity-100 group-hover:text-inherit transition">{translation}</p>
          </div>
          <div className="col w-1/2 relative">
            <p className="absolute bottom-0 text-right">
              {revelation} - {ayahs} Ayat
            </p>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default function Home() {
  const { data: { data: surah } = {}, error: surah_error, isLoading } = useSWR("/api/surah", fetcher);

  return (
    <main className={raleway.className}>
      <Head>
        <title>Quran Digital - Mayopi</title>
      </Head>
      <Navbar />

      <header className="flex flex-col gap-2 justify-center items-center mt-10">
        <h1 className="lg:text-4xl text-2xl">
          Welcome to Quran Digital <BsFillMoonStarsFill className={"inline text-primary"} />
        </h1>
        <p className="lg:text-lg text-mute">Learn Quran and Recite once everyday</p>

        <input type="text" placeholder={`Search`} className="input input-bordered input-primary w-full max-w-xs rounded-full mt-3" />

        <div className="hero mt-10 bg-base-200 rounded-lg">
          <div className="hero-content text-center">
            <div className="max-w-md">
              <h1 className="text-5xl font-bold">
                <BsBookFill className="inline" /> Last Read
              </h1>

              <h1 className="text-lg font-semibold py-6">Al-Fatihah - 7</h1>

              <button className="btn btn-secondary mt-2">Forward to Last Read</button>
            </div>
          </div>
        </div>
      </header>

      <section className="mx-5 my-16 flex flex-wrap gap-3 items-center justify-center">
        {isLoading ? (
          <span className={`loading loading-ring loading-lg ${clsx("bg-primary")}`}></span>
        ) : surah_error ? (
          <div>Somethiing went wrong.</div>
        ) : (
          surah.map((data) => <SurahCard key={data.number} name={data.name} revelation={data.revelation} translation={data.translation} ayahs={data.numberOfAyahs} />)
        )}
      </section>
    </main>
  );
}
