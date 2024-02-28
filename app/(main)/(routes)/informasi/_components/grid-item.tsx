import { BASE_IMAGE_URL } from "@/constants";
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
  };
};

const GridItem = ({ article: { title, image, slug, createdAt } }: Props) => {
  return (
    <Link href={`/informasi/${slug}`}>
      <div className="w-full flex flex-col gap-3 group hover:opacity-75 transition">
        <div className="h-72 w-full overflow-hidden">
          <Image
            src={`${BASE_IMAGE_URL}/${image}`}
            alt=""
            className="w-full h-full object-cover transition group-hover:scale-110 duration-500"
            width={500}
            height={500}
          />
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
