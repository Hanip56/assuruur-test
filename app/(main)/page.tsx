import { db } from "@/lib/db";
import HomeClient from "./_components/home-client";
import { contentIds } from "@/constants";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Beranda",
};

const HomePage = async () => {
  const latestInfo = await db.article.findMany({
    where: {
      NOT: [
        {
          id: contentIds.pendaftaran,
        },
        {
          id: contentIds.sejarah,
        },
      ],
    },
    take: 6,
    orderBy: {
      createdAt: "desc",
    },
  });

  const lembagas = await db.lembaga.findMany({
    where: {
      NOT: {
        id: contentIds.profil,
      },
    },
  });

  return <HomeClient latestInfo={latestInfo} lembagas={lembagas} />;
};

export default HomePage;
