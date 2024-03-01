"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  Carousel,
  CarouselApi,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import { BASE_IMAGE_URL } from "@/constants";
import { Lembaga } from "@prisma/client";
import { ArrowLeft, ArrowRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import React from "react";

const LembagaCarousel = ({ lembagas }: { lembagas: Lembaga[] }) => {
  const [api, setApi] = React.useState<CarouselApi>();
  const [current, setCurrent] = React.useState(0);
  const [count, setCount] = React.useState(0);

  React.useEffect(() => {
    if (!api) {
      return;
    }

    setCount(api.scrollSnapList().length);
    setCurrent(api.selectedScrollSnap() + 1);

    api.on("select", () => {
      setCurrent(api.selectedScrollSnap() + 1);
    });
  }, [api]);

  return (
    <>
      <Carousel className="w-full" setApi={setApi}>
        <CarouselContent>
          {lembagas?.map((lembaga, index) => (
            <CarouselItem
              key={index}
              className="md:basis-1/2 lg:basis-1/3 pl-6"
            >
              <Link href={`/informasi/${lembaga.slug}`}>
                <div className="rounded-lg overflow-hidden shadow-lg border group">
                  <div className="relative flex aspect-video items-center justify-center overflow-hidden">
                    <div className="absolute top-0 left-0 inset-0 bg-black/30 opacity-0 group-hover:opacity-100 z-10 transition duration-300 flex items-center justify-center text-center">
                      <span className="text-white font-bold flex items-center gap-2">
                        Lihat{" "}
                        <ArrowRight className="w-4 h-4 pt-1" fontWeight={40} />
                      </span>
                    </div>
                    <Image
                      src={`${BASE_IMAGE_URL}/${lembaga.image}`}
                      alt=""
                      width={500}
                      height={500}
                      className="w-full h-full object-cover group-hover:scale-105 transition duration-300"
                    />
                  </div>
                  <div className="p-4 flex items-center justify-between">
                    <h4 className="font-medium">{lembaga.name}</h4>
                    <p className="underline font-medium text-sky-900">Lihat</p>
                  </div>
                </div>
              </Link>
            </CarouselItem>
          ))}
        </CarouselContent>
      </Carousel>
      {api && (
        <div className="flex items-center justify-center gap-6 w-full mt-8 text-gray-900">
          <button
            onClick={() => api.scrollPrev()}
            disabled={!api.canScrollPrev()}
            className="hover:opacity-90 disabled:opacity-70 rounded-full border border-gray-900 hover:bg-gray-100 transition p-3"
          >
            <ArrowLeft className="w-4 h-4" />
          </button>
          <button
            onClick={() => api.scrollNext()}
            disabled={!api.canScrollNext()}
            className="hover:opacity-90 disabled:opacity-70 rounded-full border border-gray-900 hover:bg-gray-100 transition p-3"
          >
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      )}
    </>
  );
};

export default LembagaCarousel;
