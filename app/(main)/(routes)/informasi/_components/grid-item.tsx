import Image from "next/image";
import Link from "next/link";
import React from "react";

const GridItem = () => {
  return (
    <Link href="/informasi/slug">
      <div className="w-full flex flex-col gap-3 group hover:opacity-75 transition">
        <div className="h-72 w-full overflow-hidden">
          <Image
            src="https://images.unsplash.com/photo-1527192491265-7e15c55b1ed2?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
            alt=""
            className="w-full h-full object-cover transition group-hover:scale-110 duration-500"
            width={500}
            height={500}
          />
        </div>
        <div>
          <h5 className="text-lg sm:text-xl font-semibold">
            Ujian Tulis KMI: Pentingnya Kecerdasan Naluri dan Nurani
          </h5>
          <small>25 Februari 2024</small>
        </div>
      </div>
    </Link>
  );
};

export default GridItem;
