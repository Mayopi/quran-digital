import React, { useState, useEffect } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Head from "next/head";
import { Raleway } from "next/font/google";
import Button from "@/components/Button";
import clsx from "clsx";

const raleway = Raleway({ subsets: ["latin"] });

const ThemeChangePage = () => {
  const [currentTheme, setCurrentTheme] = useState("light");

  const themes = [
    "light",
    "dark",
    "cupcake",
    "bumblebee",
    "emerald",
    "corporate",
    "synthwave",
    "retro",
    "cyberpunk",
    "valentine",
    "halloween",
    "garden",
    "forest",
    "aqua",
    "lofi",
    "pastel",
    "fantasy",
    "wireframe",
    "black",
    "luxury",
    "dracula",
    "cmyk",
    "autumn",
    "business",
    "acid",
    "lemonade",
    "night",
    "coffee",
    "winter",
  ];

  const toggleTheme = (theme) => {
    setCurrentTheme(theme);
    localStorage.setItem("theme", theme);
    applyTheme(theme);
  };

  const applyTheme = (theme) => {
    document.documentElement.setAttribute("data-theme", theme);
  };

  useEffect(() => {
    const savedTheme = localStorage.getItem("theme");
    if (savedTheme && themes.includes(savedTheme)) {
      setCurrentTheme(savedTheme);
      applyTheme(savedTheme);
    }
  }, []);

  return (
    <main className={raleway.className}>
      <Head>
        <title>Quran - Themes</title>
      </Head>

      <header>
        <Navbar />
        <div className="w-full text-center my-10">
          <h1 className="text-2xl font-semibold">Select Your Theme Preferences!</h1>
          <h1 className="text-2xl font-semibold">
            Current Theme <span className="text-primary">{currentTheme}</span>
          </h1>
        </div>
      </header>

      <section className="flex justify-center items-center flex-wrap gap-3 rounded">
        {themes.map((theme, index) => (
          <div key={index} className="card lg:w-[250px] rounded-lg bg-base-100 shadow-xl" data-theme={theme}>
            <div className="card-body">
              <h2 className="card-title">{theme}</h2>
              <div className="flex gap-2">
                <h1 className="text-xl bg-primary p-2 text-white rounded font-bold uppercase">A</h1>
                <h1 className="text-xl bg-secondary p-2 text-white rounded font-bold uppercase">A</h1>
                <h1 className="text-xl bg-accent p-2 text-white rounded font-bold uppercase">A</h1>
                <h1 className="text-xl bg-error p-2 text-white rounded font-bold uppercase">A</h1>
              </div>
              <div className="card-actions justify-end mt-5">
                <Button className="btn" color={clsx("bg-primary")} onClick={() => toggleTheme(theme)}>
                  Apply Theme
                </Button>
              </div>
            </div>
          </div>
        ))}
      </section>
      <Footer />
    </main>
  );
};

export default ThemeChangePage;
