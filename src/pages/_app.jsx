import "@/styles/globals.css";
import NextNProgress from "nextjs-progressbar";
import { useEffect, useState } from "react";

export default function App({ Component, pageProps }) {
  const [savedTheme, setSavedTheme] = useState(null);

  useEffect(() => {
    setSavedTheme(localStorage.getItem("theme"));
  }, []);

  useEffect(() => {
    applyTheme(savedTheme);
  }, [savedTheme]);

  const applyTheme = (theme) => {
    document.documentElement.setAttribute("data-theme", theme);
  };

  return (
    <>
      <NextNProgress color={"#CBBDEA"} />
      <Component {...pageProps} />
    </>
  );
}
