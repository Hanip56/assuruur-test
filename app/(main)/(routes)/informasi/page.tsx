import React from "react";
import Banner from "../../_components/banner";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import GridItem from "./_components/grid-item";

const InformasiPage = ({
  searchParams,
}: {
  searchParams: { type: string };
}) => {
  const tabs = ["semua", "berita", "pengumuman", "artikel"];

  return (
    <div>
      <Banner title="Informasi" />

      {/* main */}
      <div className="max-w-7xl mx-auto my-16 px-2 sm:px-4">
        {/* navigation */}
        <div className="flex gap-4 flex-wrap" data-aos="fade">
          {tabs.map((tab) => (
            <Link key={tab} href={`/informasi?type=${tab}`}>
              <Button
                variant={tab === searchParams.type ? "default" : "outline"}
              >
                {tab.charAt(0).toUpperCase() + tab.slice(1)}
              </Button>
            </Link>
          ))}
        </div>

        {/* informasi grid */}
        <div
          data-aos="fade"
          className="my-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2 gap-y-8 sm:gap-4 md:gap-8"
        >
          {Array(9)
            .fill("")
            .map((_, i) => (
              <GridItem key={i} />
            ))}
        </div>
      </div>
    </div>
  );
};

export default InformasiPage;
