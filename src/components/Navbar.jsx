import React from "react";
import Link from "next/link";
import Button from "./Button";
import { SiAtom } from "react-icons/si";
import { FaQuran } from "react-icons/fa";

const Navbar = () => {
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
  return (
    <div className="navbar bg-base-100">
      <div className="flex-1">
        <Link href={"/"} className="btn btn-ghost normal-case text-xl">
          <FaQuran className="inline" />
          Quran Digital
        </Link>
      </div>
      <div className="flex-none">
        <Link href={"/themes"}>
          <Button>
            Themes <SiAtom className="inline" />
          </Button>
        </Link>
      </div>
    </div>
  );
};

export default Navbar;
