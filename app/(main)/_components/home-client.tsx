"use client";

import Section from "@/components/section";
import Slideshow from "@/components/slideshow";
import { Button } from "@/components/ui/button";
import { BASE_IMAGE_URL } from "@/constants";
import { cn } from "@/lib/utils";
import { Article, Banner, BannerImage, Lembaga } from "@prisma/client";
import Image from "next/image";
import Link from "next/link";
import LembagaCarousel from "./lembaga-carousel";

type Props = {
  latestInfo: Article[];
  lembagas: Lembaga[];
  banner?: (Banner & { images: BannerImage[] }) | null;
};

const HomeClient = ({ latestInfo, lembagas, banner }: Props) => {
  const latestInfoRow1 = [...latestInfo.slice(0, 3)];
  const latestInfoRow2 = [...latestInfo.slice(3, 6)];

  return (
    <div>
      {/* hero */}
      <section className="relative h-[90vh] overflow-x-hidden w-[100%]">
        <div className="-z-10 absolute w-full h-full">
          <div className="absolute top-0 left-0 inset-0 bg-black opacity-30 z-50" />
          <Slideshow
            images={
              banner?.images
                ? banner.images.map((image) => `${BASE_IMAGE_URL}/` + image.key)
                : []
            }
          />
        </div>

        {/* content */}
        <div
          className="max-w-7xl h-full mx-auto flex items-end text-white px-4 py-10 sm:py-16"
          data-aos="fade-left"
        >
          <div>
            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold  leading-10 sm:leading-normal md:leading-normal lg:leading-normal mb-4 max-w-3xl">
              {`${banner?.title}` ?? (
                <>
                  Pondok <br /> Pesantren Assuruur
                </>
              )}
            </h1>
            <p className="max-w-2xl text-sm sm:text-base">
              {banner?.description ?? ``}
            </p>
            <Link href={"/profil"}>
              <Button variant={"assuruur"} className="mt-6 bg-sky-900">
                Kunjungi Profil
              </Button>
            </Link>
          </div>
        </div>
      </section>

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

      <Section title="Lembaga">
        <LembagaCarousel lembagas={lembagas} />
      </Section>
    </div>
  );
};

export default HomeClient;
