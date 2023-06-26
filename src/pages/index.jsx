import { Inter, Noto_Naskh_Arabic, Amiri, Lateef, Ysabeau, Raleway } from "next/font/google";
import Navbar from "@/components/Navbar";
import Button from "@/components/Button";
import { BsFillMoonStarsFill, BsBookFill } from "react-icons/bs";
import clsx from "clsx";
import Head from "next/head";

const inter = Inter({ subsets: ["latin"] });
const ysabeau = Ysabeau({ subsets: ["latin"] });
const raleway = Raleway({ subsets: ["latin"] });
const NotoNaskhArabic = Noto_Naskh_Arabic({ subsets: ["arabic"] });

const SurahCard = ({ name, revelation, ayahs, translation, color, className }) => {
  return (
    <div className={`card lg:w-[32%] bg-base-100 shadow-xl ${className} ${color}`}>
      <div className="card-body flex">
        <div className="col">
          <h2 className="card-title">{name}</h2>
          <p className="text-mute">{translation}</p>
        </div>
        <div className="col">
          <p className="text-right">
            {revelation} - {ayahs} Ayat
          </p>
        </div>
      </div>
    </div>
  );
};

export default function Home() {
  return (
    <main className={raleway.className}>
      <Head>
        <title>Quran Digital - Mayopi</title>
      </Head>
      <Navbar />

      <header className="flex flex-col gap-2 justify-center items-center mt-10">
        <h1 className="lg:text-4xl text-2xl">
          Welcome to Quran Digital <BsFillMoonStarsFill className={"inline"} />
        </h1>
        <p className="lg:text-lg">Learn Quran and Recite once everyday</p>

        <div className="container mt-10">
          <div className="last-read p-5 rounded-lg bg-gradient-to-r from-primary-500 to-primary-700 text-white w-full">
            <h1 className="font-bold text-xl">
              <BsBookFill className="inline" /> Last Read
            </h1>

            <div className="row w-full">
              <div className="col w-full">
                <h1 className="text-xl font-bold tracking-widest uppercase">Al - Fatihah</h1>
                <p>Ayat No : 7</p>
                <Button color={clsx("bg-secondary-500")} className={"hover:bg-secondary-500/30"}>
                  Forward To Last Read
                </Button>
              </div>
              <div className="col"></div>
            </div>
          </div>
        </div>
      </header>

      <section className="container mt-16 flex flex-wrap gap-3 items-center justify-center">
        <SurahCard name={"Al-Fatihah"} revelation={"Makkiyah"} translation={"Pembukaan"} ayahs={7} className={"text-slate-800 bg-white"} />
      </section>
    </main>
  );
}
