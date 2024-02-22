"use client";

import { Button } from "@/components/ui/button";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import GridItem from "./grid-item";

const FasilitasCLient = () => {
  const searchParams = useSearchParams();
  const type = searchParams.get("type");

  console.log(type);

  const tabs = [
    {
      label: "Semua",
      href: "semua",
    },
    {
      label: "Asrama",
      href: "asrama",
    },
    {
      label: "Kelas",
      href: "kelas",
    },
    {
      label: "Olahraga",
      href: "olahraga",
    },
    {
      label: "Kantor & Hall",
      href: "kantor-dan-hall",
    },
    {
      label: "Kebersihan & Kesehatan",
      href: "kebersihan-dan-kesehatan",
    },
  ];

  return (
    <div className="max-w-7xl mx-auto my-16 px-2 sm:px-4">
      {/* navigation */}
      <div className="flex gap-4 flex-wrap" data-aos="fade">
        {tabs.map((tab) => (
          <Link key={tab.href} href={`/fasilitas?type=${tab.href}`}>
            <Button variant={tab.href === type ? "default" : "outline"}>
              {tab.label}
            </Button>
          </Link>
        ))}
      </div>

      {/* informasi grid */}
      <div
        data-aos="fade"
        className="my-12 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2 sm:gap-4 md:gap-8"
      >
        {Array(9)
          .fill("")
          .map((_, i) => (
            <GridItem key={i} />
          ))}
      </div>
    </div>
  );
};

export default FasilitasCLient;
