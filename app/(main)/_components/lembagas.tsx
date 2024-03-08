import Section from "@/components/section";
import React from "react";
import LembagaCarousel from "./lembaga-carousel";
import { db } from "@/lib/db";

async function getLembagas() {
  return await db.lembaga.findMany({
    where: {
      isSplit: false,
    },
    orderBy: {
      createdAt: "desc",
    },
  });
}

const Lembagas = async () => {
  const lembagas = await getLembagas();

  return (
    <Section title="Lembaga">
      <LembagaCarousel lembagas={lembagas} />
    </Section>
  );
};

export default Lembagas;
