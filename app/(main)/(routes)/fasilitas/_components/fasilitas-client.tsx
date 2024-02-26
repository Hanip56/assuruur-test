"use client";

import { Button } from "@/components/ui/button";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import GridItem from "./grid-item";
import { Fasilitas, FasilitasType } from "@prisma/client";
import Fotos from "@/components/fotos";

type Props = {
  fasilitasTypes: FasilitasType[];
  fasilitass: Fasilitas[];
};

const FasilitasCLient = ({ fasilitasTypes, fasilitass }: Props) => {
  const searchParams = useSearchParams();
  const type = searchParams.get("type");

  const fts = fasilitasTypes?.map((ft) => ({ label: ft.name, href: ft.slug }));

  const tabs = [
    {
      label: "Semua",
      href: "semua",
    },
    ...fts,
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
      <div className="my-20 max-w-7xl mx-auto px-2 sm:px-4">
        <Fotos fotos={fasilitass} />
      </div>
    </div>
  );
};

export default FasilitasCLient;
