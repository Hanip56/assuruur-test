import React from "react";
import Banner from "../../_components/banner";
import { ChevronRight } from "lucide-react";
import Link from "next/link";
import TiptapContent from "@/components/tiptap-content";
import Image from "next/image";
import { BASE_IMAGE_URL, contentIds } from "@/constants";
import { db } from "@/lib/db";
import { redirect } from "next/navigation";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Sejarah",
};

const SejarahPage = async () => {
  const article = await db.article.findUnique({
    where: {
      id: contentIds.sejarah,
    },
  });

  if (!article) return redirect("/");

  return (
    <div>
      <Banner title="Sejarah" />

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
                <Link href={"/"}>
                  <span className="hover:text-blue-500 transition">Home</span>
                </Link>
                <ChevronRight className="w-2 h-2" />
                <span className="max-w-sm">Sejarah</span>
              </div>
              {/* <p className="text-xs sm:text-sm">
              Oleh <strong>Humas</strong>
            </p> */}
            </div>
            {/* share */}
            {/* <div className="flex items-center gap-2 text-gray-500">
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
            </div> */}
          </div>

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
        </div>
      </div>
    </div>
  );
};

export default SejarahPage;
