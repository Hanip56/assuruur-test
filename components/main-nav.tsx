"use client";

import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";
import Link from "next/link";
import NavItem from "./nav-item";
import { Category } from "@prisma/client";

type Route = {
  label: string;
  href?: string;
  sub?: {
    label: string;
    href: string;
  }[];
};

type Props = {
  categories: Category[];
};

const MainNav = ({ categories }: Props) => {
  const routes: Route[] = [
    {
      label: "Beranda",
      href: "/",
    },
    {
      label: "Tentang Assuruur",
      sub: [
        {
          label: "Profil Singkat",
          href: "/profil",
        },
        {
          label: "Sejarah",
          href: "/sejarah",
        },
        {
          label: "Fasilitas",
          href: "/fasilitas?type=semua",
        },
        {
          label: "Foto",
          href: "/foto",
        },
      ],
    },
    {
      label: "Lembaga",
      sub: [
        {
          label: "KULLYATUL MU’ALII,IIM AL-ISLAMIYYAH",
          href: "/lembaga/kulliyatul-mualiiiim-al-islamiyah",
        },
        {
          label: "MADRASAH ALIYAH",
          href: "/lembaga/madrasah-aliyah",
        },
        {
          label: "MADRASAH TSANAWIYAH",
          href: "/lembaga/madrasah-tsanawiyah",
        },
        {
          label: "MADRASAH Ibtidaiyah",
          href: "/lembaga/madrasah-ibtidaiyah",
        },
      ],
    },
    {
      label: "Informasi",
      sub: categories?.map((category) => ({
        label: category.name,
        href: `/informasi?type=${category.slug}`,
      })),
    },
    {
      label: "Pendaftaran",
      href: "/pendaftaran",
    },
    {
      label: "Kontak & Alamat",
      href: "/kontak",
    },
  ];

  return (
    <NavigationMenu>
      <NavigationMenuList>
        {routes.map((route) =>
          route.href ? (
            <NavigationMenuItem key={route.label}>
              <Link href={route.href} legacyBehavior passHref>
                <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                  {route.label}
                </NavigationMenuLink>
              </Link>
            </NavigationMenuItem>
          ) : (
            <NavigationMenuItem key={route.label}>
              <NavigationMenuTrigger>{route.label}</NavigationMenuTrigger>
              <NavigationMenuContent>
                <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px] ">
                  {route.sub?.map((r) => (
                    <NavItem
                      key={r.label}
                      title={r.label}
                      href={r.href}
                    ></NavItem>
                  ))}
                </ul>
              </NavigationMenuContent>
            </NavigationMenuItem>
          )
        )}
      </NavigationMenuList>
    </NavigationMenu>
  );
};

export default MainNav;
