"use client";

import { useEffect } from "react";

export default function ThemeSync(): null {
  useEffect(() => {
    const savedTheme = localStorage.getItem("theme");
    const isDark = savedTheme ? savedTheme === "dark" : true;

    if (isDark) {
      document.documentElement.classList.add("dark");
      return;
    }

    document.documentElement.classList.remove("dark");
  }, []);

  return null;
}
