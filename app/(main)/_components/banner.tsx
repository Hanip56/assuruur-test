import Image from "next/image";

type Props = {
  title: string;
  image?: string | null;
};

const Banner = ({ title, image }: Props) => {
  return (
    <section className="relative h-72 sm:h-80 md:h-96 overflow-x-hidden w-[100%]">
      <div className="-z-10 absolute w-full h-full">
        <div className="absolute top-0 left-0 inset-0 bg-black opacity-50" />

        <Image
          src={
            image ??
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
