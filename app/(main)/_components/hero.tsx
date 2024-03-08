"use client";

import Slideshow from "@/components/slideshow";
import { Button } from "@/components/ui/button";
import { BASE_IMAGE_URL } from "@/constants";
import { Banner, BannerImage } from "@prisma/client";
import Link from "next/link";

type Props = {
  banner?: (Banner & { images: BannerImage[] }) | null;
};

const Hero = ({ banner }: Props) => {
  return (
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
  );
};

export default Hero;
