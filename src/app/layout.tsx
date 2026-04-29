import type { Metadata } from "next";
import type { ReactNode } from "react";
import "@/styles/globals.css";
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import ThemeSync from "@/components/ThemeSync";
import SmoothScroll from "@/components/SmoothScroll";

export const metadata: Metadata = {
  title: "Quran Digital - Mayopi",
  description: "Quran digital app to read, listen, and bookmark verses.",
};

export default function RootLayout({ children }: Readonly<{ children: ReactNode }>) {
  return (
    <html lang="en" suppressHydrationWarning className="font-sans">
      <body className="min-h-screen bg-background text-foreground">
        <SmoothScroll />
        <ThemeSync />
        <Navbar />
        {children}
        <Footer />
      </body>
    </html>
  );
}
