import React from "react";
import Banner from "../../_components/banner";
import Fotos from "@/components/fotos";
import { db } from "@/lib/db";
import PaginationCustom from "@/components/pagination-custom";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Foto",
};

const FotoPage = async ({
  searchParams,
}: {
  searchParams: { page: string };
}) => {
  const totalFotos = await db.foto.count();
  const perPage = 9;
  const currentPage = searchParams.page ? Number(searchParams.page) : 1;

  const fotos = await db.foto.findMany({
    orderBy: { createdAt: "desc" },
    take: perPage,
    skip: perPage * (currentPage - 1),
  });

  return (
    <div>
      <Banner title="Foto" />

      <div className="my-20 max-w-6xl mx-auto px-2 sm:px-4">
        <Fotos fotos={fotos} />

        <PaginationCustom
          totalItem={totalFotos}
          viewPerPage={perPage}
          currentPage={currentPage}
        />
      </div>
    </div>
  );
};

export default FotoPage;
