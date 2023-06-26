import React from "react";
import Link from "next/link";
import Button from "./Button";
import { SiAtom } from "react-icons/si";
import { FaQuran } from "react-icons/fa";
import { BsGithub } from "react-icons/bs";
import clsx from "clsx";

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
      <div className="flex-none gap-2">
        <Link href={"https://github.com/Mayopi/quran-digital"}>
          <Button color={clsx("bg-primary")} className={"lg:btn-md btn-sm hover:bg-slate-900"}>
            Github <BsGithub className="inline" />
          </Button>
        </Link>
        <Link href={"/themes"}>
          <Button color={clsx("bg-secondary")} className={"lg:btn-md btn-sm hover:bg-slate-900"}>
            Themes <SiAtom className="inline" />
          </Button>
        </Link>
      </div>
    </div>
  );
};

export default Navbar;
