import TiptapContent from "@/components/tiptap-content";
import { BASE_IMAGE_URL } from "@/constants";
import { db } from "@/lib/db";
import { InstagramLogoIcon } from "@radix-ui/react-icons";
import { ChevronLeft, ChevronRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { redirect } from "next/navigation";

const DetailInformasiPage = async ({
  params,
}: {
  params: { informasiSlug: string };
}) => {
  const article = await db.article.findFirst({
    where: {
      slug: params.informasiSlug,
    },
  });

  if (!article) {
    return redirect("../informasi");
  }

  return (
    <div
      data-aos="fade"
      className="py-28 max-w-5xl mx-auto px-2 sm:px-4 flex gap-8 relative"
    >
      <div className="flex-1">
        {/* header */}
        <div className="flex flex-col sm:flex-row sm:items-center gap-y-4 justify-between mb-6">
          <div className="space-y-3">
            {/* breadcrumbs */}
            <div className="flex gap-1 items-center text-xs text-gray-500">
              <Link href={"/informasi"}>
                <span className="hover:text-blue-500 transition">
                  informasi
                </span>
              </Link>
              <ChevronRight className="w-2 h-2" />
              <span className="max-w-sm">
                {params?.informasiSlug?.length > 20
                  ? params?.informasiSlug.slice(0, 20) + "..."
                  : params?.informasiSlug}
              </span>
            </div>
            {/* <p className="text-xs sm:text-sm">
              Oleh <strong>Humas</strong>
            </p> */}
          </div>
          {/* share */}
          <div className="flex items-center gap-2 text-gray-500">
            <small>Bagikan:</small>
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
        {/* title */}
        <h1 className="font-bold text-2xl md:text-3xl lg:text-4xl mb-6 leading-normal lg:leading-normal">
          {article?.title}
        </h1>

        {/* thumbnail image */}
        <div className="w-full mt-4 mb-16">
          <Image
            src={`${BASE_IMAGE_URL}/${article?.image}`}
            alt=""
            className="w-full h-full object-cover transition group-hover:scale-110 duration-500"
            width={2000}
            height={2000}
          />
        </div>
        {/* content */}
        <TiptapContent content={article.content} />
        {/* prev & next post */}
        <div className="mt-16 flex justify-between items-center gap-1 sm:gap-16">
          {/* prev */}
          <Link href="#">
            <div className="flex gap-2 sm:gap-4 items-center hover:opacity-80 p-1 sm:p-4 rounded-lg hover:bg-secondary">
              <ChevronLeft className="border rounded-full border-black w-10 h-10 p-2 flex-shrink-0" />
              <div>
                <small className="text-xs sm:text-sm text-gray-500">
                  Artikel sebelumnya
                </small>
                <p className="hidden sm:block font-semibold">
                  Lorem ipsum dolor sit amet.
                </p>
              </div>
            </div>
          </Link>
          {/* next */}
          <Link href="#">
            <div className="flex gap-2 sm:gap-4 items-center text-right hover:opacity-80 p-1 sm:p-4 rounded-lg hover:bg-secondary">
              <div>
                <small className="text-xs sm:text-sm text-gray-500">
                  Artikel selanjutnya
                </small>
                <p className="hidden sm:block font-semibold">
                  Lorem ipsum dolor sit amet.
                </p>
              </div>
              <ChevronRight className="border rounded-full border-black w-10 h-10 p-2 flex-shrink-0" />
            </div>
          </Link>
        </div>
      </div>
      {/* related articles */}
      {/* <div className="hidden md:block basis-[30%] sticky">
        <h3 className="text-xl md:text-2xl font-bold text-blue-900 mb-8">
          Related Articles
        </h3>
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
      </div> */}
    </div>
  );
};

export default DetailInformasiPage;
