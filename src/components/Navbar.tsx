import Link from "next/link";
import { FaQuran } from "react-icons/fa";
import { BsGithub } from "react-icons/bs";
import { Button } from "@/components/ui/button";
import ThemeToggle from "@/components/ThemeToggle";

const Navbar = () => {
  return (
    <div className="flex items-center justify-between bg-primary px-4 py-3 text-primary-foreground">
      <div>
        <Link href="/" className="inline-flex items-center gap-2 text-xl font-semibold">
          <FaQuran className="inline" />
          Quran Digital
        </Link>
      </div>
      <div className="flex items-center gap-2">
        <ThemeToggle />
        <Link href="https://github.com/Mayopi/quran-digital" target="_blank" rel="noreferrer">
          <Button variant="secondary" className="h-9 px-3">
            Github <BsGithub className="inline" />
          </Button>
        </Link>
      </div>
    </div>
  );
};

export default Navbar;
