import React from "react";
import Banner from "../../_components/banner";
import FasilitasCLient from "./_components/fasilitas-client";
import { db } from "@/lib/db";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Fasilitas",
};

const FasilitasPage = async ({
  searchParams,
}: {
  searchParams: { type: string };
}) => {
  const fasilitasTypes = await db.fasilitasType.findMany();

  const index = fasilitasTypes.findIndex((ft) => ft.slug === searchParams.type);

  const fasilitass = await db.fasilitas.findMany({
    where: {
      fasilitasTypeId: index < 0 ? undefined : fasilitasTypes[index].id,
    },
  });

  return (
    <div>
      <Banner title="Fasilitas" />

      <FasilitasCLient
        fasilitasTypes={fasilitasTypes}
        fasilitass={fasilitass}
      />
    </div>
  );
};

export default FasilitasPage;
