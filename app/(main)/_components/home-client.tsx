"use client";

import Footer from "@/components/footer";
import Section from "@/components/section";
import Image from "next/image";
import React from "react";

const HomeClient = () => {
  return (
    <div>
      {/* hero */}
      <section className="relative h-[40rem] overflow-x-hidden w-[100%]">
        <div className="-z-10 absolute w-full h-full">
          <div className="absolute top-0 left-0 inset-0 bg-black opacity-30" />

          <Image
            src={
              "https://plus.unsplash.com/premium_photo-1683880731561-f0cceb0ad405?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
            }
            alt="Hero-image"
            className="w-full h-full object-cover"
            width={2000}
            height={2000}
          ></Image>
        </div>

        {/* content */}
        <div
          className="max-w-7xl h-full mx-auto flex items-end text-white px-4 py-16"
          data-aos="fade-left"
        >
          <div>
            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold  leading-normal sm:leading-normal md:leading-normal lg:leading-normal mb-4">
              Trusted Islamic <br /> Boarding School
            </h1>
            <p className="max-w-2xl">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Amet
              delectus praesentium quod ullam, officia labore harum neque porro
              qui nobis.
            </p>
          </div>
        </div>
      </section>

      <Section title="Latest News">
        <div className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
            <div className="w-full h-60 sm:h-80 bg-black md:col-span-2" />
            <div className="w-full h-60 sm:h-80 bg-black" />
            <div className="w-full h-60 sm:h-80 bg-black" />
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
            <div className="w-full h-60 sm:h-80 bg-black" />
            <div className="w-full h-60 sm:h-80 bg-black" />
            <div className="w-full h-60 sm:h-80 bg-black md:col-span-2" />
          </div>
        </div>
      </Section>
    </div>
  );
};

export default HomeClient;
