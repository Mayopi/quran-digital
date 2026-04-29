"use client";

import { useState } from "react";
import { useParams } from "next/navigation";
import useSWR from "swr";
import Link from "next/link";
import clsx from "clsx";
import { BsFillPlayFill, BsPauseFill, BsBookmark, BsFillBookmarkCheckFill } from "react-icons/bs";
import { MdNavigateNext, MdNavigateBefore } from "react-icons/md";
import { fetcher } from "@/lib/fetcher";
import type { ApiDataResponse, Bookmark, SurahDetail, SurahListData } from "@/types/quran";
import { Button } from "@/components/ui/button";

export default function SurahPage() {
  const params = useParams<{ name: string }>();
  const name = decodeURIComponent(params.name);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentAudioId, setCurrentAudioId] = useState<string | null>(null);
  const [audioFullOnLoad, setAudioFullOnLoad] = useState(true);
  const [isLoadingAudio, setIsLoadingAudio] = useState<Record<number, boolean>>({});
  const [bookmark, setBookmark] = useState<Bookmark | null>(() => {
    if (typeof window === "undefined") {
      return null;
    }

    try {
      const bookmarkValue = localStorage.getItem("bookmark");
      return bookmarkValue ? (JSON.parse(bookmarkValue) as Bookmark) : null;
    } catch {
      return null;
    }
  });

  const { data: listResponse, error: listError, isLoading: listLoading } = useSWR<ApiDataResponse<SurahListData>>(
    name ? `/api/surah/list?name=${encodeURIComponent(name)}` : null,
    fetcher,
  );

  const list = listResponse?.data;

  const { data: surahResponse, error: surahError, isLoading } = useSWR<ApiDataResponse<SurahDetail>>(
    list?.current?.number ? `${process.env.NEXT_PUBLIC_QURAN_API}/surat/${list.current.number}` : null,
    fetcher,
  );

  const surah = surahResponse?.data;

  const toggleAudio = (audioId: string, nomorAyat: number): void => {
    const audioElement = document.getElementById(audioId) as HTMLAudioElement | null;
    const fullAudioElement = document.getElementById("full-audio") as HTMLAudioElement | null;
    if (!audioElement) {
      return;
    }

    fullAudioElement?.pause();
    setAudioFullOnLoad(false);

    if (isPlaying && currentAudioId === audioId) {
      audioElement.pause();
      setIsPlaying(false);
      setCurrentAudioId(null);
      return;
    }

    if (currentAudioId) {
      const currentAudioElement = document.getElementById(currentAudioId) as HTMLAudioElement | null;
      currentAudioElement?.pause();
    }

    setIsLoadingAudio((prevState) => ({ ...prevState, [nomorAyat]: true }));
    setIsPlaying(true);
    setCurrentAudioId(audioId);
    void audioElement.play();
  };

  const toggleBookmark = (ayat: number): void => {
    if (!surah) {
      return;
    }

    if (bookmark?.name === surah.namaLatin && bookmark.ayat === ayat) {
      setBookmark(null);
      localStorage.removeItem("bookmark");
      return;
    }

    const nextBookmark: Bookmark = { name: surah.namaLatin, ayat };
    setBookmark(nextBookmark);
    localStorage.setItem("bookmark", JSON.stringify(nextBookmark));
  };

  return (
    <main>
      <header className="mx-auto mt-10 max-w-4xl rounded-xl bg-muted p-8 text-center">
        <h1 className="font-display text-4xl font-bold">
          {isLoading || listLoading ? "Loading" : surah?.namaLatin} {isLoading || listLoading ? "" : "-"} <span className="text-xl">{surah?.nama}</span>
        </h1>
        <p className="py-4 text-muted-foreground">
          {isLoading || listLoading ? "Loading" : surah?.arti} - {isLoading || listLoading ? "Loading" : surah?.jumlahAyat} Ayat
        </p>
        <p className="pb-6 text-justify">{isLoading || listLoading ? "Loading" : <span dangerouslySetInnerHTML={{ __html: surah?.deskripsi ?? "" }} />}.</p>

        <audio
          src={surah?.audioFull["05"]}
          className="w-full p-2"
          id="full-audio"
          onLoadedData={() => setAudioFullOnLoad(false)}
          controls
          onPlay={() => {
            if (currentAudioId) {
              const currentAudioElement = document.getElementById(currentAudioId) as HTMLAudioElement | null;
              currentAudioElement?.pause();
            }
            setIsPlaying(false);
            setCurrentAudioId(null);
          }}
          onCanPlayThrough={() => setAudioFullOnLoad(false)}
        ></audio>

        {audioFullOnLoad ? (
          <div className="mt-3 flex items-center justify-center gap-2 text-sm text-destructive">
            <span className="h-2 w-2 animate-pulse rounded-full bg-destructive" />
            <p>Audio belum selesai di unduh mohon tunggu sebentar.</p>
          </div>
        ) : null}
      </header>

      <section className="mx-auto my-10 flex max-w-6xl flex-col gap-5 px-4">
        {isLoading || listLoading ? (
          <div className="w-full text-center text-muted-foreground">Loading surah...</div>
        ) : surahError || listError ? (
          <div className="text-destructive">
            <p>Something went wrong</p>
            <p>{(surahError ?? listError)?.message}</p>
          </div>
        ) : (
          surah?.ayat.map((item) => {
            const isBookmarked = bookmark?.name === surah.namaLatin && bookmark?.ayat === item.nomorAyat;
            const audioId = `${item.nomorAyat}-audio`;
            const isCurrentAudio = isPlaying && currentAudioId === audioId;

            return (
              <div key={item.nomorAyat} id={String(item.nomorAyat)}>
                <Button
                  className={clsx("mb-5 rounded-full text-lg font-semibold", isBookmarked ? "bg-primary text-primary-foreground hover:bg-primary/90" : "bg-secondary text-secondary-foreground hover:bg-secondary/90")}
                  onClick={() => toggleBookmark(item.nomorAyat)}
                >
                  {isBookmarked ? <BsFillBookmarkCheckFill /> : <BsBookmark />}
                </Button>

                <h1 className="font-arabic text-right text-4xl">{item.teksArab}</h1>
                <p className="font-arabic mt-2 text-right">{item.teksLatin}</p>
                <div className="audio mt-5 flex justify-end">
                  <Button onClick={() => toggleAudio(audioId, item.nomorAyat)} className={clsx(isCurrentAudio ? "bg-primary hover:bg-primary/90" : "bg-accent text-accent-foreground hover:bg-accent/90")}>
                    {isCurrentAudio ? "Pause Audio" : "Play Audio"} {isCurrentAudio ? <BsPauseFill className="text-xl" /> : <BsFillPlayFill className="text-xl" />}
                  </Button>
                  <audio
                    id={audioId}
                    src={item.audio["05"]}
                    onEnded={() => {
                      if (audioId === currentAudioId) {
                        setCurrentAudioId(null);
                        setIsPlaying(false);
                      }
                    }}
                    onLoadedData={() => setIsLoadingAudio((prevState) => ({ ...prevState, [item.nomorAyat]: false }))}
                    onCanPlayThrough={() => setIsLoadingAudio((prevState) => ({ ...prevState, [item.nomorAyat]: false }))}
                  ></audio>
                </div>
                {isLoadingAudio[item.nomorAyat] ? (
                  <div className="mt-2 flex gap-2 text-sm text-destructive">
                    <span className="h-2 w-2 animate-pulse rounded-full bg-destructive" />
                    <p>Audio belum selesai di unduh mohon tunggu sebentar.</p>
                  </div>
                ) : null}
                <p className="py-6">
                  {item.nomorAyat}. {item.teksIndonesia}
                </p>
                <hr className="border-t-2" />
              </div>
            );
          })
        )}

        {list ? (
          <div className={clsx("flex", list.previous && !list.next ? "justify-start" : !list.previous && list.next ? "justify-end" : "justify-between")}>
            {list.previous ? (
              <Link href={`/surah/${list.previous.name}`}>
                <Button className="mt-10 min-w-[120px]">
                  <MdNavigateBefore className="inline text-xl" /> Previous {list.previous.name}
                </Button>
              </Link>
            ) : null}

            {list.next ? (
              <Link href={`/surah/${list.next.name}`}>
                <Button className="mt-10 min-w-[120px]">
                  Next {list.next.name} <MdNavigateNext className="inline text-xl" />
                </Button>
              </Link>
            ) : null}
          </div>
        ) : null}
      </section>
    </main>
  );
}
