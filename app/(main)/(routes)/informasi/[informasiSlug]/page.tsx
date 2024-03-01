import TiptapContent from "@/components/tiptap-content";
import { BASE_IMAGE_URL, excludeArticles } from "@/constants";
import { db } from "@/lib/db";
import { cutString } from "@/lib/utils";
import { ChevronLeft, ChevronRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { redirect } from "next/navigation";
import GridItem from "../_components/grid-item";
import ShareSosmed from "@/app/(main)/_components/share-sosmed";
import { Metadata } from "next";
import Comments from "./_components/comments";

type Props = {
  params: { informasiSlug: string };
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const slug = params.informasiSlug;

  const article = await db.article.findFirst({
    where: { slug },
  });

  return {
    title: article?.title,
    openGraph: {
      images: ["https://utfs.io/f/" + article?.image],
    },
  };
}

const DetailInformasiPage = async ({ params }: Props) => {
  const article = await db.article.findFirst({
    where: {
      slug: params.informasiSlug,
    },
    include: {
      tags: true,
    },
  });

  if (!article) {
    return redirect("../informasi");
  }

  const prevPost = await db.article.findFirst({
    where: {
      createdAt: { lt: article.createdAt },
      NOT: {
        id: {
          in: excludeArticles,
        },
      },
    },
    select: {
      id: true,
      title: true,
      slug: true,
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  const nextPost = await db.article.findFirst({
    where: {
      createdAt: { gt: article.createdAt },
      NOT: {
        id: {
          in: excludeArticles,
        },
      },
    },
    select: {
      id: true,
      title: true,
      slug: true,
    },
  });

  const relatedArticles = await db.article.findMany({
    where: {
      OR: [
        {
          tags: {
            some: {
              OR: [...article.tags.map((tag) => ({ tagId: tag.tagId }))],
            },
          },
        },
      ],
      NOT: {
        id: {
          in: [article.id, ...excludeArticles],
        },
      },
    },
    take: 3,
    include: {
      category: true,
    },
  });

  return (
    <div>
      {/* main content */}
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
              <ShareSosmed quote={article.title} />
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
            {prevPost && (
              <Link href={`/informasi/${prevPost.slug}`} className="mr-auto">
                <div className="flex gap-2 sm:gap-4 items-center hover:opacity-80 p-1 sm:p-4 rounded-lg hover:bg-secondary">
                  <ChevronLeft className="border rounded-full border-black w-10 h-10 p-2 flex-shrink-0" />
                  <div>
                    <small className="text-xs sm:text-sm text-gray-500">
                      Informasi sebelumnya
                    </small>
                    <p className="hidden sm:block font-semibold">
                      {cutString(prevPost.title, 20)}
                    </p>
                  </div>
                </div>
              </Link>
            )}
            {nextPost && (
              <Link href={`/informasi/${nextPost.slug}`} className="ml-auto">
                <div className="flex gap-2 sm:gap-4 items-center text-right hover:opacity-80 p-1 sm:p-4 rounded-lg hover:bg-secondary">
                  <div>
                    <small className="text-xs sm:text-sm text-gray-500">
                      Informasi selanjutnya
                    </small>
                    <p className="hidden sm:block font-semibold">
                      {cutString(nextPost.title, 20)}
                    </p>
                  </div>
                  <ChevronRight className="border rounded-full border-black w-10 h-10 p-2 flex-shrink-0" />
                </div>
              </Link>
            )}
          </div>
        </div>
      </div>
      {/* related articles */}
      <div className="w-full bg-blue-50/50 mb-28">
        <div className="max-w-5xl mx-auto py-20 px-2 sm:px-4">
          <h2 className="font-bold text-center text-2xl sm:text-3xl md:text-4xl mb-16">
            Informasi Terkait
          </h2>
          <div>
            {relatedArticles?.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 sm:gap-4 md:gap-8">
                {relatedArticles.map((article) => (
                  <GridItem key={article.id} article={article} />
                ))}
              </div>
            ) : (
              <p>Tidak ada informasi terkait</p>
            )}
          </div>
        </div>
      </div>
      {/* comments */}
      <Comments article={article} />
    </div>
  );
};

export default DetailInformasiPage;
