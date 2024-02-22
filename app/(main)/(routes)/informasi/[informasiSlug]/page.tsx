import { Button } from "@/components/ui/button";
import { InstagramLogoIcon } from "@radix-ui/react-icons";
import { ChevronLeft, ChevronRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

const DetailInformasiPage = ({
  params,
}: {
  params: { informasiSlug: string };
}) => {
  return (
    <div
      data-aos="fade"
      className="py-28 max-w-6xl mx-auto px-2 sm:px-4 flex gap-8 relative"
    >
      <div className="flex-1">
        {/* title */}
        <h1 className="font-bold text-3xl lg:text-4xl mb-6">
          Ujian Tulis KMI: Pentingnya Kecerdasan Naluri dan Nurani
        </h1>
        {/* header */}
        <div className="flex justify-between">
          <div className="space-y-3">
            {/* breadcrumbs */}
            <div className="flex gap-1 items-center text-sm text-gray-500">
              <Link href={"/informasi"}>
                <span className="hover:text-blue-500 transition">
                  informasi
                </span>
              </Link>
              <ChevronRight className="w-2 h-2" />
              <span>{params.informasiSlug}</span>
            </div>
            <p className="text-sm">
              Oleh <strong>Humas</strong>
            </p>
          </div>
          {/* share */}
          <div className="text-gray-500 space-y-2">
            <small>Share:</small>
            <div className="flex gap-1">
              <button>
                <InstagramLogoIcon className="w-5 h-5" />
              </button>
              <button>
                <InstagramLogoIcon className="w-5 h-5" />
              </button>
              <button>
                <InstagramLogoIcon className="w-5 h-5" />
              </button>
              <button>
                <InstagramLogoIcon className="w-5 h-5" />
              </button>
              <button>
                <InstagramLogoIcon className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>

        {/* thumbnail image */}
        <div className="w-full mt-4 mb-6">
          <Image
            src="https://images.unsplash.com/photo-1527192491265-7e15c55b1ed2?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
            alt=""
            className="w-full h-full object-cover transition group-hover:scale-110 duration-500"
            width={2000}
            height={2000}
          />
        </div>
        {/* content */}
        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Unde iusto
          rem impedit ad ipsam, maiores inventore totam. Necessitatibus deleniti
          vel blanditiis enim quae. Aliquam, doloribus quisquam. In eos
          molestiae ipsum ipsam, nostrum fuga deleniti labore iusto maiores
          veniam, facere excepturi exercitationem iure earum nam nulla itaque
          deserunt dignissimos, optio eius ullam nobis reprehenderit animi.
          Maxime obcaecati dolore officiis, autem illo asperiores quam eligendi
          molestias quisquam fuga placeat praesentium consequatur ut. Maxime
          magni veritatis in debitis nostrum autem rem consequatur? Quis eum,
          voluptatum libero nulla sapiente exercitationem accusamus mollitia
          iure, quae pariatur a doloremque aliquam architecto, perferendis
          quaerat dolorem veniam quasi?
        </p>
        {/* prev & next post */}
        <div className="mt-12 flex justify-between items-center gap-16">
          {/* prev */}
          <Link href="#">
            <div className="flex gap-4 items-center hover:opacity-80 p-4 rounded-lg hover:bg-secondary">
              <ChevronLeft className="border rounded-full border-black w-10 h-10 p-2 flex-shrink-0" />
              <div>
                <small className="text-gray-500">Artikel sebelumnya</small>
                <p className="hidden sm:block font-semibold">
                  Lorem ipsum dolor sit amet.
                </p>
              </div>
            </div>
          </Link>
          {/* next */}
          <Link href="#">
            <div className="flex gap-4 items-center text-right hover:opacity-80 p-4 rounded-lg hover:bg-secondary">
              <div>
                <small className="text-gray-500">Artikel selanjutnya</small>
                <p className="hidden sm:block font-semibold">
                  Lorem ipsum dolor sit amet.
                </p>
              </div>
              <ChevronRight className="border rounded-full border-black w-10 h-10 p-2 flex-shrink-0" />
            </div>
          </Link>
        </div>
      </div>
      <div className="hidden md:block basis-[30%] sticky">
        <h3 className="text-xl md:text-2xl font-bold text-blue-900 mb-8">
          Related Articles
        </h3>
        {/* related articles */}
        <div className="space-y-6">
          {Array(5)
            .fill("")
            .map((_, i) => (
              <div key={i} className="flex gap-4">
                <div className="w-1/2 h-28">
                  <Image
                    src="https://images.unsplash.com/photo-1682687982029-edb9aecf5f89?q=80&w=1471&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDF8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                    alt=""
                    className="w-full h-full object-cover"
                    width={500}
                    height={500}
                  />
                </div>
                <div>
                  <h5 className="font-semibold">Lorem ipsum dolor sit amet.</h5>
                </div>
              </div>
            ))}
        </div>
      </div>
    </div>
  );
};

export default DetailInformasiPage;
