import Section from "@/components/section";
import { BASE_IMAGE_URL } from "@/constants";
import { db } from "@/lib/db";
import { cn } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";

async function getLatestInfo() {
  return await db.article.findMany({
    where: {
      isSplit: false,
    },
    take: 6,
    orderBy: {
      createdAt: "desc",
    },
  });
}

const LatestInfo = async () => {
  const latestInfo = await getLatestInfo();

  const latestInfoRow1 = [...latestInfo.slice(0, 3)];
  const latestInfoRow2 = [...latestInfo.slice(3, 6)];

  return (
    <Section
      title="Info Terbaru"
      buttonLabel="berita lainnya"
      buttonHref="/informasi?type=semua"
    >
      <div className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          {latestInfoRow1?.map((info, i) => (
            <Link
              href={`/informasi/${info?.slug}`}
              key={info.id}
              className={cn(
                "relative w-full h-60 sm:h-80 bg-black transition group overflow-hidden",
                i == 0 && "md:col-span-2"
              )}
            >
              {/* desc */}
              <div className="absolute left-0 bottom-0 w-full h-[50%] bg-gradient-to-b from-transparent to-black/70 group-hover:to-black/80 text-white flex items-end p-6 z-10">
                <p className="text-sm">{info?.title}</p>
              </div>
              <Image
                src={`${BASE_IMAGE_URL}/${info?.image}`}
                alt={info?.title}
                width={500}
                height={500}
                className="w-full h-full object-cover group-hover:scale-110 transition duration-300"
              />
            </Link>
          ))}
        </div>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          {latestInfoRow2?.map((info, i) => (
            <Link
              href={`/informasi/${info?.slug}`}
              key={info.id}
              className={cn(
                "relative w-full h-60 sm:h-80 bg-black transition group overflow-hidden",
                i == 2 && "md:col-span-2"
              )}
            >
              {/* desc */}
              <div className="absolute left-0 bottom-0 w-full h-[50%] bg-gradient-to-b from-transparent to-black/70 group-hover:to-black/80 text-white flex items-end p-6 z-10">
                <p className="text-sm">{info?.title}</p>
              </div>
              <Image
                src={`${BASE_IMAGE_URL}/${info?.image}`}
                alt={info?.title}
                width={500}
                height={500}
                className="w-full h-full object-cover group-hover:scale-110 transition duration-300"
              />
            </Link>
          ))}
        </div>
      </div>
    </Section>
  );
};

export default LatestInfo;
