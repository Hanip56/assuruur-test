"use client";
import Image from "next/image";
import Section from "@/components/section";
import { useEffect, useState } from "react";

const ProfilClient = () => {
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
          <h3
            className="text-3xl sm:text-4xl lg:text-5xl font-bold text-center mb-12"
            data-aos="fade-up"
          >
            Pendiri dan Wakif
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 gap-y-8 sm:gap-6 md:gap-8">
            {Array(3)
              .fill("")
              .map((_, i) => (
                <div key={i} data-aos="fade-up" data-aos-delay={i * 200}>
                  <div className="p-4 shadow-lg rounded-2xl">
                    <div className="relative pb-[120%] bg-black rounded-2xl overflow-hidden">
                      <Image
                        src="https://images.unsplash.com/photo-1557862921-37829c790f19?q=80&w=1471&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                        alt=""
                        className="absolute top-0 left-0 w-full h-full object-cover"
                        width={1000}
                        height={1000}
                      />
                    </div>
                  </div>
                  <div className="mt-2 sm:mt-6 text-center">
                    <h5 className="font-bold text-xl">Prof. Someone</h5>
                    <p>Lorem ipsum dolor sit amet.</p>
                  </div>
                </div>
              ))}
          </div>
        </section>

        {/* profil singkat */}
        <Section
          className="max-w-6xl"
          title="Profil Singkat Pondok Pesantren Assuruur"
        >
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Neque
          architecto nihil, ut animi dolorem a veritatis consequuntur deleniti
          assumenda, odio excepturi tenetur iusto, temporibus quos! Rerum earum
          voluptatum ullam? Eius illo ea odit totam molestias aliquid, fugit
          laudantium velit, maxime ad, sunt eum dolorem reiciendis. Tempora
          voluptate est eos nobis, amet quo error neque alias numquam eveniet
          facere qui consequuntur saepe eaque, explicabo quam ipsam corrupti
          maxime quia ducimus officiis incidunt inventore vitae delectus!
          Consequatur, debitis consequuntur inventore error reprehenderit rerum
          temporibus. Repudiandae expedita eaque nam nobis. Modi in, sed
          repellat mollitia ut expedita non asperiores ad iste sint soluta rerum
          aut tempora! Aspernatur blanditiis obcaecati odio dolore dolores atque
          eos ducimus aliquam! Accusantium officia voluptatem labore, deleniti
          quidem porro?
        </Section>

        {/* visi misi */}
        <section className="py-20 bg-black text-white my-20">
          <div className="max-w-7xl mx-auto px-2 sm:px-4" data-aos="fade">
            {/* heading */}
            <div className="mb-6">
              <h3 className="text-3xl md:text-4xl lg:text-5xl font-bold leading-normal sm:leading-normal md:leading-normal lg:leading-normal text-center">
                Visi Misi
              </h3>
            </div>

            {/* main */}
            <div className="flex flex-wrap justify-center w-full">
              {Array(5)
                .fill("")
                .map((_, i) => (
                  <div
                    key={i}
                    className="w-full sm:w-1/2 md:w-1/3 min-h-96 p-4"
                  >
                    <div className="w-full h-full border border-white/40 p-8 pl-14">
                      <h4 className="text-3xl font-bold my-8 mt-12 relative">
                        Visi
                        <h5 className="text-2xl sm:text-3xl absolute opacity-50 -top-12 -left-5">
                          0{i + 1}
                        </h5>
                      </h4>
                      <p>
                        Lorem ipsum dolor, sit amet consectetur adipisicing
                        elit. Ut doloremque, veniam debitis maiores nisi
                        similique est dolorum illo assumenda culpa.
                      </p>
                    </div>
                  </div>
                ))}
            </div>
          </div>
        </section>

        {/* Panca Jiwa pondok */}
        <section className="max-w-6xl mx-auto px-2 sm:px-4 py-20 flex flex-col sm:flex-row sm:items-center gap-6 sm:gap-16">
          {/* img */}
          <div className="flex-1 h-60" data-aos="fade-right">
            <Image
              src="https://images.unsplash.com/photo-1527192491265-7e15c55b1ed2?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
              alt=""
              className="w-full h-full object-cover"
              width={500}
              height={500}
            />
          </div>
          {/* desc */}
          <div className="basis-[40%]" data-aos="fade-left">
            <h3 className="font-bold text-2xl sm:text-3xl mb-6">
              Panca Jiwa Pondok
            </h3>
            <ul>
              <li>1. Keikhlasan</li>
              <li>2. Kesederhanaan</li>
              <li>3. Berdikari</li>
              <li>4. Ukhuwah Islamiyah</li>
              <li>5. Kebebasan</li>
            </ul>
          </div>
        </section>

        {/* Arah & Tujuan Pendidikan */}
        <section className="max-w-6xl mx-auto px-2 sm:px-4 py-20 flex flex-col-reverse sm:flex-row sm:items-center gap-6 sm:gap-16">
          {/* desc */}
          <div className="basis-[40%]" data-aos="fade-right">
            <h3 className="font-bold text-2xl sm:text-3xl mb-6">
              Arah & Tujuan Pendidikan
            </h3>
            <ul>
              <li>1. Bertakwa kepada Allah</li>
              <li>2. Beramal shalih</li>
              <li>3. Berbudi luhur</li>
              <li>4. Berbadan sehat</li>
              <li>5. Berpengetahuan luas</li>
            </ul>
          </div>
          {/* img */}
          <div className="flex-1 h-60" data-aos="fade-left">
            <Image
              src="https://images.unsplash.com/photo-1527192491265-7e15c55b1ed2?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
              alt=""
              className="w-full h-full object-cover"
              width={500}
              height={500}
            />
          </div>
        </section>
      </div>
    </div>
  );
};

export default ProfilClient;
