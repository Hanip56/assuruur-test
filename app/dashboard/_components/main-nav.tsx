"use client";

import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  TagIcon,
  TicketMinus,
  InfoIcon,
  School,
  Building,
  Building2,
  ImageIcon,
  Users,
  MessageSquareText,
  Settings,
} from "lucide-react";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { useSession } from "next-auth/react";

const MainNav = () => {
  const pathname = usePathname();
  const { data: session } = useSession();

  const routes = [
    {
      label: "Overview",
      path: "/dashboard",
      icon: <LayoutDashboard />,
      active: pathname === "/dashboard",
    },
    {
      label: "Tags",
      path: "/dashboard/tags",
      icon: <TagIcon />,
      active: pathname === "/dashboard/tags",
    },
    {
      label: "Category",
      path: "/dashboard/categories",
      icon: <TicketMinus />,
      active: pathname === "/dashboard/categories",
    },
    {
      label: "Informasi",
      path: "/dashboard/informasi",
      icon: <InfoIcon />,
      active: pathname === "/dashboard/informasi",
    },
    {
      label: "Comments",
      path: "/dashboard/comments",
      icon: <MessageSquareText />,
      active: pathname === "/dashboard/comments",
    },
    {
      label: "Lembaga",
      path: "/dashboard/lembaga",
      icon: <School />,
      active: pathname === "/dashboard/lembaga",
    },
    {
      label: "Fasilitas Type",
      path: "/dashboard/fasilitas-type",
      icon: <Building2 />,
      active: pathname === "/dashboard/fasilitas-type",
    },
    {
      label: "Fasilitas",
      path: "/dashboard/fasilitas",
      icon: <Building />,
      active: pathname === "/dashboard/fasilitas",
    },
    {
      label: "Fotos",
      path: "/dashboard/fotos",
      icon: <ImageIcon />,
      active: pathname === "/dashboard/fotos",
    },
  ];

  if (session?.user.role === "SUPERADMIN") {
    routes.push({
      label: "Users",
      path: "/dashboard/users",
      icon: <Users />,
      active: pathname === "/dashboard/users",
    });
  } else {
    routes.push({
      label: "Settings",
      path: "/dashboard/settings",
      icon: <Settings />,
      active: pathname === "/dashboard/settings",
    });
  }

  return (
    <nav className="my-6 px-3">
      <div className="font-semibold text-sm pl-4 text-gray-400 tracking-wide mb-3">
        Assuruur
      </div>
      {routes.map((route) => (
        <Link href={route.path} key={route.path}>
          <div
            className={cn(
              "py-3 px-4 flex gap-2 items-center font-semibold transition ",
              route.active
                ? "ring-1 ring-slate-300 shadow-sm rounded-md"
                : "text-gray-400 hover:text-black dark:hover:text-white"
            )}
          >
            <span className="[&>*]:w-5 [&>*]:h-5">{route.icon}</span>
            <span className="text-sm">{route.label}</span>
          </div>
        </Link>
      ))}
    </nav>
  );
};

export default MainNav;
