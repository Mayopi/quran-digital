import React, { useState } from "react";
import Head from "next/head";
import Navbar from "@/components/Navbar";
import { Raleway, Ysabeau, Noto_Naskh_Arabic } from "next/font/google";
import { useRouter } from "next/router";
import useSWR from "swr";
import Button from "@/components/Button";
import { BsFillPlayFill, BsPauseFill } from "react-icons/bs";
import { MdNavigateNext, MdNavigateBefore } from "react-icons/md";
import clsx from "clsx";
import Footer from "@/components/Footer";
import Link from "next/link";

const raleway = Raleway({ subsets: ["latin"] });
const ysabeau = Ysabeau({ subsets: ["cyrillic-ext"] });
const NotoNaskhArabic = Noto_Naskh_Arabic({ subsets: ["arabic"] });

const fetcher = (url) => fetch(url, { cache: "no-store", next: { revalidate: 0 } }).then((r) => r.json());

const Surah = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentAudioId, setCurrentAudioId] = useState(null);
  const router = useRouter();
  const { name } = router.query;

  const { data: { data: list } = {}, error: list_error, isLoading: list_loading } = useSWR(name ? `/api/surah/list?name=${name}` : null, fetcher);

  const { data: { data: surah } = {}, error: surah_error, isLoading } = useSWR(list ? `${process.env.NEXT_PUBLIC_QURAN_API}/surat/${list.current.number}` : null, fetcher);

  const toggleAudio = (audioId) => {
    const audioElement = document.getElementById(audioId);

    if (isPlaying && currentAudioId === audioId) {
      setIsPlaying(false);
      setCurrentAudioId(null);
      audioElement.pause();
    } else {
      // Hentikan audio yang sedang diputar sebelumnya (jika ada)
      const currentAudioElement = document.getElementById(currentAudioId);
      if (currentAudioElement) {
        currentAudioElement.pause();
      }

      setIsPlaying(true);
      setCurrentAudioId(audioId);
      audioElement.play();
    }
  };

  return (
    <main className={raleway.className}>
      <Head>
        <title>{`Quran - ${name ? name : "Loading"}`}</title>
      </Head>
      <header>
        <Navbar />

        <div className={`hero bg-base-200 mt-10 ${ysabeau.className}`}>
          <div className="hero-content text-center">
            <div className="max-w-md">
              <h1 className="text-5xl font-bold">
                {isLoading || list_loading ? "Loading" : surah?.namaLatin} {isLoading || list_loading ? "" : "-"} <span className="text-xl">{surah?.nama}</span>
              </h1>
              <p className="py-6 text-opacity-50">
                {isLoading || list_loading ? "Loading" : surah?.arti} - {isLoading || list_loading ? "Loading" : surah?.jumlahAyat} Ayat
              </p>
              <p className="py-6 text-justify">{isLoading || list_loading ? "Loading" : surah?.deskripsi}.</p>

              <audio src={surah ? surah.audioFull["05"] : null} className="w-full p-2" controls></audio>
            </div>
          </div>
        </div>
      </header>

      <section className="mx-5 flex flex-col gap-5 my-10">
        {isLoading || list_loading ? (
          <div className="w-full flex justify-center">
            <span className="loading loading-bars loading-lg"></span>
          </div>
        ) : surah_error || list_error ? (
          <div className="text-error">
            <p>Something went wrong</p>
            <p>{surah_error.message}</p>
          </div>
        ) : (
          surah?.ayat?.map((item) => (
            <div key={item.nomorAyat}>
              <h1 className={`text-4xl text-right ${NotoNaskhArabic.className}`}>{item.teksArab}</h1>
              <p className={`${NotoNaskhArabic.className} text-right mt-2`}>{item.teksLatin}</p>
              <div className="audio flex justify-end mt-5">
                <Button onClick={() => toggleAudio(item.nomorAyat + " Audio")} color={isPlaying && currentAudioId === item.nomorAyat + " Audio" ? clsx("bg-primary") : clsx("bg-accent")} className={"hover:bg-slate-900"}>
                  {isPlaying && currentAudioId === item.nomorAyat + " Audio" ? "Pause Audio" : "Play Audio"}{" "}
                  {isPlaying && currentAudioId === item.nomorAyat + " Audio" ? <BsPauseFill className="text-xl" /> : <BsFillPlayFill className="text-xl" />}
                </Button>
                <audio
                  id={item.nomorAyat + " Audio"}
                  src={item.audio["05"]}
                  onEnded={() => {
                    if (item.nomorAyat + " Audio" === currentAudioId) {
                      setCurrentAudioId(null);
                      setIsPlaying(false);
                    }
                  }}
                ></audio>
              </div>
              <p className="py-6">
                {item.nomorAyat}. {item.teksIndonesia}
              </p>
              <hr className="border-t-2" />
            </div>
          ))
        )}

        <div className={`next-prev-button flex ${list?.previous?.name && !list?.next?.name ? "justify-start" : !list?.previous?.name && list?.next?.name ? "justify-end" : "justify-between"}`}>
          {!list?.previous?.name ? (
            ""
          ) : (
            <>
              <Link href={`/surah/${list?.previous?.name}`}>
                <Button color={clsx("bg-primary")} className={"mt-10 min-w-[120px] btn-sm"}>
                  <MdNavigateBefore className="inline text-xl" /> Previous {list?.previous?.name}
                </Button>
              </Link>
            </>
          )}

          {!list?.next?.name ? (
            ""
          ) : (
            <>
              <Link href={`/surah/${list?.next?.name}`}>
                <Button color={clsx("bg-primary")} className={"mt-10 min-w-[120px] btn-sm"}>
                  Next {list?.next?.name} <MdNavigateNext className="inline text-xl" />
                </Button>
              </Link>
            </>
          )}
        </div>
      </section>
      <Footer />
    </main>
  );
};

export default Surah;
