import React, { useState } from "react";
import Head from "next/head";
import Navbar from "@/components/Navbar";
import { Raleway, Ysabeau, Noto_Naskh_Arabic } from "next/font/google";
import { useRouter } from "next/router";
import useSWR from "swr";
import Button from "@/components/Button";
import { BsFillPlayFill, BsPauseFill } from "react-icons/bs";
import clsx from "clsx";
import Footer from "@/components/Footer";

const raleway = Raleway({ subsets: ["latin"] });
const ysabeau = Ysabeau({ subsets: ["cyrillic-ext"] });
const NotoNaskhArabic = Noto_Naskh_Arabic({ subsets: ["arabic"] });

const fetcher = (url) => fetch(url, { cache: "no-store", next: { revalidate: 0 } }).then((r) => r.json());

const Surah = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentAudioId, setCurrentAudioId] = useState(null);
  const router = useRouter();
  const { name } = router.query;

  const { data: { data: surah } = {}, error: surah_error, isLoading } = useSWR(name ? `/api/surah/${name}` : null, fetcher);

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

  if (surah_error) return <div>Something went wrong.</div>;
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
              <h1 className="text-5xl font-bold">{isLoading ? "Loading" : surah?.name}</h1>
              <p className="py-6 text-opacity-50">
                {isLoading ? "Loading" : surah?.translation} - {isLoading ? "Loading" : surah?.numberOfAyahs} Ayat
              </p>
              <p className="py-6 text-justify">{isLoading ? "Loading" : surah?.description.split(".")[0]}.</p>

              <audio src={surah ? surah.audio : null} className="w-full p-2" controls></audio>
            </div>
          </div>
        </div>
      </header>

      <section className="mx-5 flex flex-col gap-5 my-10">
        {isLoading ? (
          <div className="w-full flex justify-center">
            <span className="loading loading-bars loading-lg"></span>
          </div>
        ) : (
          surah?.ayahs?.map((item) => (
            <div key={item.number.inSurah}>
              <h1 className={`text-4xl text-right ${NotoNaskhArabic.className}`}>{item.arab}</h1>
              <div className="audio flex justify-end mt-5">
                <Button onClick={() => toggleAudio(item.number.inSurah + " Audio")} color={isPlaying && currentAudioId === item.number.inSurah + " Audio" ? clsx("bg-primary") : clsx("bg-accent")} className={"hover:bg-slate-900"}>
                  {isPlaying && currentAudioId === item.number.inSurah + " Audio" ? "Pause Audio" : "Play Audio"}{" "}
                  {isPlaying && currentAudioId === item.number.inSurah + " Audio" ? <BsPauseFill className="text-xl" /> : <BsFillPlayFill className="text-xl" />}
                </Button>
                <audio
                  id={item.number.inSurah + " Audio"}
                  src={item.audio.alafasy || item.audio.ahmedajamy || item.audio.husarymujawwad || item.audio.minshawi || item.audio.muhammadayyoub || item.audio.muhammadjibreel}
                  onEnded={() => {
                    if (item.number.inSurah + " Audio" === currentAudioId) {
                      setCurrentAudioId(null);
                      setIsPlaying(false);
                    }
                  }}
                ></audio>
              </div>
              <p className="py-6">
                {item.number.inSurah}. {item.translation}
              </p>
              <hr className="border-t-2" />
            </div>
          ))
        )}
      </section>
      <Footer />
    </main>
  );
};

export default Surah;
