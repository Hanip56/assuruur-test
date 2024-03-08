import { db } from "@/lib/db";
import { Metadata } from "next";
import Hero from "./_components/hero";
import { Suspense } from "react";
import LatestInfo from "./_components/latest-info";
import Loading from "./_components/loading";
import Lembagas from "./_components/lembagas";

export const metadata: Metadata = {
  title: "Beranda",
};

async function getBanner() {
  return await db.banner.findFirst({
    where: {
      at: "beranda",
    },
    include: {
      images: true,
    },
  });
}

const HomePage = async () => {
  const banner = await getBanner();

  return (
    <>
      <Hero banner={banner} />
      <Suspense fallback={<Loading />}>
        <LatestInfo />
        <Suspense>
          <Lembagas />
        </Suspense>
      </Suspense>
    </>
  );
};

export default HomePage;
