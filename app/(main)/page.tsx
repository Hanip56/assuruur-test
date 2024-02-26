import { db } from "@/lib/db";
import HomeClient from "./_components/home-client";
import { contentIds } from "@/constants";

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
  });

  return <HomeClient latestInfo={latestInfo} />;
};

export default HomePage;
