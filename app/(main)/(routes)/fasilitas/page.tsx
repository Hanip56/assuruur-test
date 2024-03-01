import React from "react";
import Banner from "../../_components/banner";
import FasilitasCLient from "./_components/fasilitas-client";
import { db } from "@/lib/db";
import { Metadata } from "next";
import PaginationCustom from "@/components/pagination-custom";

export const metadata: Metadata = {
  title: "Fasilitas",
};

const FasilitasPage = async ({
  searchParams,
}: {
  searchParams: { type: string; page: string };
}) => {
  const fasilitasTypes = await db.fasilitasType.findMany();

  const index = fasilitasTypes.findIndex((ft) => ft.slug === searchParams.type);

  // pagination
  const totalFasilitas = await db.fasilitas.count({
    where: {
      fasilitasTypeId: index < 0 ? undefined : fasilitasTypes[index].id,
    },
  });
  const perPage = 9;
  const currentPage = searchParams.page ? Number(searchParams.page) : 1;

  const fasilitass = await db.fasilitas.findMany({
    where: {
      fasilitasTypeId: index < 0 ? undefined : fasilitasTypes[index].id,
    },
    orderBy: { createdAt: "desc" },
    take: perPage,
    skip: perPage * (currentPage - 1),
  });

  return (
    <div>
      <Banner title="Fasilitas" />

      <FasilitasCLient
        fasilitasTypes={fasilitasTypes}
        fasilitass={fasilitass}
      />

      <PaginationCustom
        totalItem={totalFasilitas}
        viewPerPage={perPage}
        currentPage={currentPage}
      />
    </div>
  );
};

export default FasilitasPage;
