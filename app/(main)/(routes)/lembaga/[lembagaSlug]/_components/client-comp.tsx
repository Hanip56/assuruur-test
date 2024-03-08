"use client";

import Section from "@/components/section";
import { Lembaga, Misi } from "@prisma/client";
import TiptapContent from "@/components/tiptap-content";

type LembagaWithRelation = Lembaga & {
  misi: Misi[];
};

type Props = {
  profil: LembagaWithRelation | null;
};

const ProfilClient = ({ profil }: Props) => {
  return (
    <div className="w-[100%]">
      {/* main */}
      <div className="my-20">
        {/* profil singkat */}
        <Section className="max-w-6xl" title="">
          <TiptapContent content={profil?.profile ?? ""} />
        </Section>

        {/* visi misi */}
        <section className="py-20 bg-black text-white my-20 space-y-20">
          {/* Visi */}
          <div className="max-w-7xl mx-auto px-2 sm:px-4" data-aos="fade-up">
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
          <div className="max-w-7xl mx-auto px-2 sm:px-4" data-aos="fade-up">
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
                          <span className="text-2xl sm:text-3xl absolute opacity-50 -top-12 -left-5">
                            0{i + 1}
                          </span>
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

export default ProfilClient;
