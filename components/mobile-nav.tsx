"use client";

import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { LayoutDashboard, Menu } from "lucide-react";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { usePathname } from "next/navigation";
import { Route } from "./main-nav";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "./ui/accordion";
import { useEffect, useState } from "react";

const LinkItem = ({
  href,
  label,
  pathname,
}: {
  href: string;
  label: string;
  pathname: string;
}) => (
  <Link href={href ?? ""} key={href}>
    <div
      className={cn(
        "py-3 px-4 flex gap-2 items-center font-semibold transition",
        pathname === href
          ? "text-black"
          : "text-gray-400 hover:text-black dark:hover:text-white"
      )}
    >
      <span className="text-sm">{label}</span>
    </div>
  </Link>
);

const MobileNav = ({ routes }: { routes: Route[] }) => {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  const handleChange = (open: boolean) => {
    if (!open) {
      setOpen(false);
    }
  };

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  return (
    <Sheet open={open} onOpenChange={handleChange}>
      <SheetTrigger className="lg:hidden" onClick={() => setOpen(true)}>
        <Menu />
      </SheetTrigger>
      <SheetContent side="left" className="p-0 w-[80%] sm:w-60">
        <nav className="my-6 px-3">
          <div className="font-bold text-sm pl-4 tracking-wide mb-3">
            Assuruur
          </div>
          {routes.map((route) => {
            return route.href ? (
              <Link href={route.href ?? ""} key={route.href}>
                <div
                  className={cn(
                    "py-3 px-4 flex gap-2 items-center font-semibold transition",
                    pathname === route.href
                      ? "ring-1 ring-slate-300 shadow-sm rounded-md"
                      : "text-gray-400 hover:text-black dark:hover:text-white"
                  )}
                >
                  <span className="text-sm">{route.label}</span>
                </div>
              </Link>
            ) : (
              <Accordion type="single" collapsible key={route.href}>
                <AccordionItem
                  value="item-1"
                  className="border-none py-1 px-4 text-sm text-gray-400 hover:text-black"
                >
                  <AccordionTrigger>{route.label}</AccordionTrigger>
                  <AccordionContent>
                    {route.sub?.map((sub) => (
                      <LinkItem
                        key={sub.href}
                        href={sub.href ?? ""}
                        label={sub.label}
                        pathname={pathname}
                      />
                    ))}
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            );
          })}
        </nav>
      </SheetContent>
    </Sheet>
  );
};

export default MobileNav;
