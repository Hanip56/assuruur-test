"use client";
import Image from "next/image";
import Section from "@/components/section";
import { useEffect, useState } from "react";
import { Lembaga, Misi, Pimpinan } from "@prisma/client";
import TiptapContent from "@/components/tiptap-content";
import { BASE_IMAGE_URL } from "@/constants";

type LembagaWithRelation = Lembaga & {
  misi: Misi[];
  pimpinan: Pimpinan[];
};

type Props = {
  profil: LembagaWithRelation | null;
};

const ClientComp = ({ profil }: Props) => {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) return null;

  return (
    <div className="w-[100%] overflow-x-hidden">
      {/* main */}
      <div className="my-20">
        {/* pendiri dan wakif */}
        <section className="mb-16 max-w-6xl px-2 sm:px-4 mx-auto">
          {/* <h3
            className="text-3xl sm:text-4xl lg:text-5xl font-bold text-center mb-12"
            data-aos="fade-up"
          >
            Pendiri dan Wakif
          </h3> */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 gap-y-8 sm:gap-6 md:gap-8">
            {profil?.pimpinan.map((tokoh, i) => (
              <div key={tokoh.id} data-aos="fade-up" data-aos-delay={i * 200}>
                <div className="p-4 shadow-lg rounded-2xl">
                  <div className="relative pb-[120%] bg-black rounded-2xl overflow-hidden">
                    <Image
                      src={`${BASE_IMAGE_URL}/${tokoh.image}`}
                      alt=""
                      className="absolute top-0 left-0 w-full h-full object-cover"
                      width={1000}
                      height={1000}
                    />
                  </div>
                </div>
                <div className="mt-2 sm:mt-6 text-center">
                  <h5 className="font-bold text-xl">{tokoh.name}</h5>
                  <p>{tokoh.title}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* profil singkat */}
        <Section className="max-w-6xl" title="">
          <TiptapContent content={profil?.profile ?? ""} />
        </Section>

        {/* visi misi */}
        <section className="py-20 bg-black text-white my-20 space-y-20">
          {/* Visi */}
          <div className="max-w-7xl mx-auto px-2 sm:px-4" data-aos="fade">
            {/* heading */}
            <div className="mb-6">
              <h3 className="text-3xl md:text-4xl lg:text-5xl font-bold leading-normal sm:leading-normal md:leading-normal lg:leading-normal text-center">
                Visi
              </h3>
            </div>

            {/* main */}
            <div className="max-w-3xl text-center mx-auto">
              <h5 className="text-lg md:text-xl">{profil?.visi}</h5>
            </div>
          </div>
          {/* Misi */}
          <div className="max-w-7xl mx-auto px-2 sm:px-4" data-aos="fade">
            {/* heading */}
            <div className="mb-6">
              <h3 className="text-3xl md:text-4xl lg:text-5xl font-bold leading-normal sm:leading-normal md:leading-normal lg:leading-normal text-center">
                Misi
              </h3>
            </div>

            {/* main */}
            <div className="flex flex-wrap justify-center w-full">
              {profil?.misi?.map(
                (misi, i) =>
                  misi.content !== "" && (
                    <div
                      key={misi.id}
                      className="w-full sm:w-1/2 md:w-1/3 min-h-96 p-4"
                    >
                      <div className="w-full h-full border border-white/40 p-8 pl-14">
                        <h4 className="text-3xl font-bold my-8 mt-12 relative">
                          Misi
                          <h5 className="text-2xl sm:text-3xl absolute opacity-50 -top-12 -left-5">
                            0{i + 1}
                          </h5>
                        </h4>
                        <p>{misi.content}</p>
                      </div>
                    </div>
                  )
              )}
            </div>
          </div>
        </section>

        {/* More Info */}
        {profil?.moreInfo && (
          <Section className="max-w-6xl" title="">
            <TiptapContent content={profil.moreInfo} />
          </Section>
        )}
      </div>
    </div>
  );
};

export default ClientComp;
