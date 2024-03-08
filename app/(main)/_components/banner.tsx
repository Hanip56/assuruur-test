import { BASE_IMAGE_URL } from "@/constants";
import { db } from "@/lib/db";
import Image from "next/image";
import { Suspense } from "react";

type Props = {
  title: string;
  image?: string | null;
};

const Banner = async ({ title, image }: Props) => {
  if (!image) {
    const banner = await db.banner.findFirst({
      where: {
        at: "default",
      },
      include: {
        images: true,
      },
    });

    if (banner && banner?.images[0]?.key) {
      image = BASE_IMAGE_URL + "/" + banner?.images[0]?.key;
    }
  }

  return (
    <section className="relative h-72 sm:h-80 md:h-96 overflow-x-hidden w-[100%]">
      <div className="-z-10 absolute w-full h-full">
        <Suspense
          fallback={
            <div className="absolute top-0 left-0 inset-0 bg-gray-300" />
          }
        >
          <div className="absolute top-0 left-0 inset-0 bg-black opacity-50" />
          {image && (
            <Image
              src={image}
              alt="Hero-image"
              className="w-full h-full object-cover"
              width={2000}
              height={2000}
            ></Image>
          )}
        </Suspense>
      </div>

      {/* content */}
      <div
        className="max-w-7xl h-full mx-auto flex items-end text-white px-4 py-4 md:py-8"
        data-aos="fade-left"
      >
        <div>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold  leading-normal sm:leading-normal md:leading-normal lg:leading-normal mb-4">
            {title}
          </h2>
        </div>
      </div>
    </section>
  );
};

export default Banner;
