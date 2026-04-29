export type QuranAudio = Record<string, string>;

export type SurahSummary = {
  nomor: number;
  nama: string;
  namaLatin: string;
  jumlahAyat: number;
  tempatTurun: string;
  arti: string;
};

export type SurahAyat = {
  nomorAyat: number;
  teksArab: string;
  teksLatin: string;
  teksIndonesia: string;
  audio: QuranAudio;
};

export type SurahDetail = SurahSummary & {
  deskripsi: string;
  audioFull: QuranAudio;
  ayat: SurahAyat[];
};

export type SurahListEntry = {
  number: number;
  name: string;
};

export type SurahListData = {
  previous: SurahListEntry | null;
  current: SurahListEntry | null;
  next: SurahListEntry | null;
};

export type Bookmark = {
  name: string;
  ayat: number;
};

export type ApiDataResponse<T> = {
  data: T;
};
