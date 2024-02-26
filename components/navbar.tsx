import Image from "next/image";
import MainNav from "./main-nav";
import Logo from "@/public/logo.png";
import { SearchIcon } from "lucide-react";
import { Button } from "./ui/button";
import { db } from "@/lib/db";
import MobileNav from "./mobile-nav";
import Link from "next/link";

const Navbar = async () => {
  const categories = await db.category.findMany();
  const lembagas = await db.lembaga.findMany({
    where: {
      NOT: {
        id: "65d94f564a122b6a6b0b8337",
      },
    },
    select: {
      id: true,
      name: true,
      slug: true,
    },
  });

  return (
    <div className="z-50 fixed w-[100%] top-0 bg-white shadow-sm">
      <div className="flex justify-between items-center py-4 px-4 max-w-7xl mx-auto ">
        <div>
          <Link href="/">
            <div className="w-12 h-12">
              <Image
                src={Logo}
                alt="Assuruur logo"
                width={500}
                height={500}
                className="w-full h-full object-contain"
              />
            </div>
          </Link>
        </div>
        <MainNav categories={categories} lembagas={lembagas} />
        {/* <form>
          <div className="rounded-full hidden lg:flex border has-[:focused]:ring-black">
            <SearchIcon className="w-4 h-4" />
            <input
              type="text"
              placeholder="Search..."
              className="outline-none bg-transparent"
            />
          </div>
        </form> */}
      </div>
    </div>
  );
};

export default Navbar;
