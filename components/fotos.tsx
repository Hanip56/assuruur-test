"use client";

import { BASE_IMAGE_URL } from "@/constants";
import { Foto, Fasilitas } from "@prisma/client";
import "photoswipe/dist/photoswipe.css";

import { Gallery, Item } from "react-photoswipe-gallery";

type Props = {
  fotos: Fasilitas[] | Foto[];
};

const Fotos = ({ fotos }: Props) => (
  <Gallery>
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 md:gap-8">
      {fotos?.map((foto) => (
        <div
          key={foto.id}
          className="w-full pb-[100%] relative overflow-hidden cursor-pointer group"
        >
          <Item
            original={`${BASE_IMAGE_URL}/${foto.image}`}
            width={foto.width}
            height={foto.height}
          >
            {({ ref, open }) => (
              <div
                className="absolute top-0 left-0 w-full h-full group"
                onClick={open}
              >
                {/* overlay */}
                <div className="absolute top-0 left-0 inset-0 bg-gradient-to-b from-transparent to-black z-10 opacity-0 transition group-hover:opacity-70" />
                <p className="text-sm absolute bottom-0 left-0 p-[10%] z-20 opacity-0 group-hover:opacity-100 text-white transition">
                  {foto.description}
                </p>
                <img
                  ref={ref}
                  src={`${BASE_IMAGE_URL}/${foto.image}`}
                  alt=""
                  className="absolute top-0 left-0 w-full h-full object-cover"
                />
              </div>
            )}
          </Item>
        </div>
      ))}
    </div>
  </Gallery>
);

export default Fotos;
