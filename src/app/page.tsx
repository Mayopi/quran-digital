"use client";

import { BsFillMoonStarsFill, BsFastForwardFill } from "react-icons/bs";
import { BiRefresh } from "react-icons/bi";
import clsx from "clsx";
import useSWR from "swr";
import Link from "next/link";
import { useMemo, useState } from "react";
import search from "@/common/search";
import { fetcher } from "@/lib/fetcher";
import type { ApiDataResponse, Bookmark, SurahSummary } from "@/types/quran";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

type SurahCardProps = {
  name: string;
  revelation: string;
  ayahs: number;
  translation: string;
  color?: string;
  className?: string;
  number: number;
  arabName: string;
};

const SurahCard = ({ name, revelation, ayahs, translation, color, className, number, arabName }: SurahCardProps) => {
  return (
    <Link href={`/surah/${name}`} className="lg:w-[32.5%] w-full">
      <div className={clsx("w-full rounded-lg shadow-xl p-3 group flex border border-primary", className, color)}>
        <header className="flex items-center justify-center w-[20%]">
          <h1 className="font-display text-4xl text-mute">{number}</h1>
        </header>
        <div className="flex justify-between w-full">
          <div className="col w-1/2">
            <h2 className="font-display card-title text-2xl text-primary hover:underline">{name}</h2>
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
  const [searchValue, setSearchValue] = useState("");
  const [bookmark] = useState<Bookmark | null>(() => {
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

  const { data: surahResponse, error: surahError, isLoading } = useSWR<ApiDataResponse<SurahSummary[]>>(`${process.env.NEXT_PUBLIC_QURAN_API}/surat`, fetcher);

  const remoteSurah = useMemo(() => surahResponse?.data ?? [], [surahResponse?.data]);
  const filteredSurah = useMemo(() => {
    if (!searchValue.trim()) {
      return remoteSurah;
    }
    return search(remoteSurah, ["namaLatin", "arti", "tempatTurun"], searchValue);
  }, [remoteSurah, searchValue]);
  const searchNotFound = Boolean(searchValue.trim()) && filteredSurah.length === 0;

  return (
    <main>
      <header className="flex flex-col gap-2 justify-center items-center mt-10">
        <h1 className="font-display lg:text-4xl text-2xl">
          Welcome to Quran Digital <BsFillMoonStarsFill className="inline text-primary" />
        </h1>
        <p className="lg:text-lg text-mute">Learn Quran and Recite once everyday</p>

        <Input
          placeholder="Search"
          className="mt-3 max-w-xs rounded-full"
          onChange={({ target }) => setSearchValue(target.value)}
        />

        <div className="my-5 rounded-xl border bg-card px-8 py-6 text-center shadow-sm">
          <div className="max-w-md">
            <h1 className="font-display text-3xl font-bold">Last Read</h1>
            <h3 className="font-display text-lg py-3">{bookmark ? `${bookmark.name} - ${bookmark.ayat}` : "No Bookmark Record."}</h3>
            {bookmark ? (
              <Link href={`/surah/${bookmark.name}#${bookmark.ayat}`}>
                <Button className="text-lg">
                  Warp to Last Read <BsFastForwardFill />
                </Button>
              </Link>
            ) : (
              <Button className="text-lg" disabled>
                No Bookmark Record <BiRefresh />
              </Button>
            )}
            <p className="mt-2 text-sm text-amber-600 dark:text-amber-400">Warning, bookmark only rely on a local storage. If you clearing cache bookmark data will be lost.</p>
          </div>
        </div>
      </header>

      <section className="mx-5 my-16 flex flex-wrap gap-5 lg:gap-3 items-center justify-center">
        {isLoading || (!filteredSurah.length && !surahError && !searchNotFound) ? (
          <div className="h-10 w-10 animate-spin rounded-full border-4 border-primary/30 border-t-primary" />
        ) : surahError ? (
          <div className="text-destructive">
            <p>Something went wrong</p>
            <p>{surahError.message}</p>
          </div>
        ) : searchNotFound ? (
          <div className="text-destructive">Tidak ada pencarian yang cocok!</div>
        ) : (
          filteredSurah.map((surahItem) => (
            <SurahCard
              key={surahItem.nomor}
              name={surahItem.namaLatin}
              revelation={surahItem.tempatTurun}
              translation={surahItem.arti}
              ayahs={surahItem.jumlahAyat}
              number={surahItem.nomor}
              arabName={surahItem.nama}
            />
          ))
        )}
      </section>
    </main>
  );
}
