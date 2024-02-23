import Image from "next/image";
import MainNav from "./main-nav";
import Logo from "@/public/logo.png";
import { SearchIcon } from "lucide-react";
import { Button } from "./ui/button";
import { db } from "@/lib/db";

const Navbar = async () => {
  const categories = await db.category.findMany();

  return (
    <div className="z-50 fixed w-[100%] top-0 bg-white shadow-sm">
      <div className="flex justify-between items-center py-4 px-4 max-w-7xl mx-auto ">
        <div>
          <div className="w-12 h-12">
            <Image
              src={Logo}
              alt="Assuruur logo"
              width={500}
              height={500}
              className="w-full h-full object-contain"
            />
          </div>
        </div>
        <MainNav categories={categories} />
        <Button size="icon" variant="ghost" className="rounded-full">
          <SearchIcon className="w-4 h-4" />
        </Button>
      </div>
    </div>
  );
};

export default Navbar;
