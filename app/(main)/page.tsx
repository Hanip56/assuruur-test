import { db } from "@/lib/db";
import HomeClient from "./_components/home-client";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Beranda",
};

const HomePage = async () => {
  const banner = await db.banner.findFirst({
    where: {
      at: "beranda",
    },
    include: {
      images: true,
    },
  });

  const latestInfo = await db.article.findMany({
    where: {
      isSplit: false,
    },
    take: 6,
    orderBy: {
      createdAt: "desc",
    },
  });

  const lembagas = await db.lembaga.findMany({
    where: {
      isSplit: false,
    },
  });

  return (
    <HomeClient latestInfo={latestInfo} lembagas={lembagas} banner={banner} />
  );
};

export default HomePage;
