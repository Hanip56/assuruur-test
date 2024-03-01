import Image from "next/image";
import MainNav from "./main-nav";
import Logo from "@/public/logo-header.png";
import { db } from "@/lib/db";
import Link from "next/link";
import SearchDialog from "./search-dialog";

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
            <div className="w-40 sm:w-48 py-1">
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
        <div className="flex">
          <MainNav categories={categories} lembagas={lembagas} />
          <div className="hidden lg:block">
            <SearchDialog />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
