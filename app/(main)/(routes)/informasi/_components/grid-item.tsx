import { BASE_IMAGE_URL } from "@/constants";
import { Category } from "@prisma/client";
import { format } from "date-fns";
import Image from "next/image";
import Link from "next/link";
import React from "react";

type Props = {
  article: {
    title: string;
    slug: string | null;
    image: string;
    createdAt: Date;
    category: Category;
  };
};

const GridItem = ({
  article: { title, image, slug, createdAt, category },
}: Props) => {
  return (
    <Link href={`/informasi/${slug}`}>
      <div className="w-full flex flex-col gap-3 group hover:opacity-75 transition">
        <div className="h-72 w-full overflow-hidden relative">
          <Image
            src={`${BASE_IMAGE_URL}/${image}`}
            alt=""
            className="w-full h-full object-cover transition group-hover:scale-110 duration-500"
            width={500}
            height={500}
          />
          <div className="absolute top-3 left-3 text-x py-1 px-3 rounded-full bg-blueAssuruur/80 text-white text-xs font-medium">
            {category?.name}
          </div>
        </div>
        <div>
          <h5 className="text-lg sm:text-xl font-semibold">
            {title.length > 50 ? title.slice(0, 50) + "..." : title}
          </h5>
          <small>{format(new Date(createdAt), "dd MMMM yyyy")}</small>
        </div>
      </div>
    </Link>
  );
};

export default GridItem;
