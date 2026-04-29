"use client";

import { SunMoon } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function ThemeToggle() {
  const toggleTheme = () => {
    const isDark = document.documentElement.classList.contains("dark");
    const nextIsDark = !isDark;
    document.documentElement.classList.toggle("dark", nextIsDark);
    localStorage.setItem("theme", nextIsDark ? "dark" : "light");
  };

  return (
    <Button variant="secondary" size="sm" onClick={toggleTheme} aria-label="Toggle theme">
      <SunMoon className="size-4" />
      Toggle Theme
    </Button>
  );
}
