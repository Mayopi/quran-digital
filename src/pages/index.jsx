import { Ysabeau, Raleway } from "next/font/google";
import Navbar from "@/components/Navbar";
import { BsFillMoonStarsFill } from "react-icons/bs";
import clsx from "clsx";
import Head from "next/head";
import useSWR from "swr";
import Link from "next/link";
import { useEffect, useState } from "react";
import search from "@/common/search";
import Footer from "@/components/Footer";

const ysabeau = Ysabeau({ subsets: ["cyrillic-ext"] });
const raleway = Raleway({ subsets: ["latin"] });

const fetcher = (url) => fetch(url).then((r) => r.json());

const SurahCard = ({ name, revelation, ayahs, translation, color, className, number, arabName }) => {
  return (
    <Link href={`/surah/${name}`} className="lg:w-[32.5%] w-full">
      <div className={`w-full rounded-lg shadow-xl p-3  ${className} ${color} group flex border border-primary`}>
        <header className="flex items-center justify-center w-[20%]">
          <h1 className={`${ysabeau.className} text-4xl text-mute`}>{number}</h1>
        </header>
        <div className="flex justify-between w-full">
          <div className="col w-1/2">
            <h2 className={`card-title text-2xl text-primary hover:link ${ysabeau.className}`}>{name}</h2>
            <p className="text-mute group-hover:text-opacity-100 group-hover:text-inherit transition text-xs">{translation}</p>
          </div>
          <div className="col w-1/2 flex flex-col justify-between">
            <h3 className="text-right text-xl text-mute">{arabName}</h3>
            <p className="text-right">
              {revelation} - {ayahs} Ayat
            </p>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default function Home() {
  const [surah, setSurah] = useState([]);
  const [searchValue, setSearchValue] = useState(null);

  let { data: { data } = {}, error: surah_error, isLoading } = useSWR(`${process.env.NEXT_PUBLIC_QURAN_API}/surat`, fetcher);

  useEffect(() => {
    setSurah(data);
    if (searchValue) {
      setSurah(search(surah, ["namaLatin", "arti", "tempatTurun"], searchValue));
    } else if (!searchValue) {
      setSurah(data);
    }
  }, [data, searchValue, surah]);

  return (
    <main className={raleway.className}>
      <Head>
        <title>Quran Digital - Mayopi</title>
      </Head>
      <Navbar />

      <header className="flex flex-col gap-2 justify-center items-center mt-10">
        <h1 className={`lg:text-4xl text-2xl ${ysabeau.className}`}>
          Welcome to Quran Digital <BsFillMoonStarsFill className={"inline text-primary"} />
        </h1>
        <p className="lg:text-lg text-mute">Learn Quran and Recite once everyday</p>

        <input
          type="text"
          placeholder={`Search`}
          className="input input-bordered input-primary w-full max-w-xs rounded-full mt-3"
          onChange={({ target }) => {
            setSearchValue(target.value);
          }}
        />
      </header>

      <section className="mx-5 my-16 flex flex-wrap gap-5 lg:gap-3 items-center justify-center">
        {isLoading || (!surah && !surah_error) ? (
          <span className={`loading loading-ring loading-lg ${clsx("bg-primary")}`}></span>
        ) : surah_error ? (
          <div className="text-error">
            <p>Something went wrong</p>
            <p>{surah_error.message}</p>
          </div>
        ) : surah.length == 0 ? (
          <div className="text-error">Tidak ada pencarian yang cocok!</div>
        ) : (
          surah.map((data) => <SurahCard key={data.nomor} name={data.namaLatin} revelation={data.tempatTurun} translation={data.arti} ayahs={data.jumlahAyat} number={data.nomor} arabName={data.nama} />)
        )}
      </section>

      <Footer />
    </main>
  );
}
