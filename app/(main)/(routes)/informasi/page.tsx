import Banner from "../../_components/banner";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import GridItem from "./_components/grid-item";
import { db } from "@/lib/db";
import { excludeArticles } from "@/constants";
import { Metadata } from "next";
import PaginationCustom from "@/components/pagination-custom";

export const metadata: Metadata = {
  title: "Informasi",
};

const InformasiPage = async ({
  searchParams,
}: {
  searchParams: { type: string; page: string };
}) => {
  const categories = await db.category.findMany();
  const currentCategory = searchParams.type;

  const currentCategoryIndex = categories.findIndex(
    (c) => c.slug === currentCategory
  );

  // pagination
  const totalArticles = await db.article.count({
    where: {
      categoryId:
        currentCategoryIndex < 0
          ? undefined
          : categories[currentCategoryIndex].id,
      NOT: {
        id: {
          in: excludeArticles,
        },
      },
    },
  });
  const perPage = 9;
  const currentPage = searchParams.page ? Number(searchParams.page) : 1;

  const articles = await db.article.findMany({
    where: {
      categoryId:
        currentCategoryIndex < 0
          ? undefined
          : categories[currentCategoryIndex].id,
      NOT: {
        id: {
          in: excludeArticles,
        },
      },
    },
    include: {
      category: true,
    },
    orderBy: { createdAt: "desc" },
    take: perPage,
    skip: perPage * (currentPage - 1),
  });

  const tabs = [
    { label: "Semua", slug: "semua" },
    ...categories.map((category) => ({
      label: category.name,
      slug: category.slug,
    })),
  ];

  return (
    <div>
      <Banner title="Informasi" />

      {/* main */}
      <div className="max-w-7xl mx-auto my-16 px-2 sm:px-4">
        {/* navigation */}
        <div className="flex gap-4 flex-wrap" data-aos="fade">
          {tabs.map((tab) => (
            <Link key={tab.slug} href={`/informasi?type=${tab.slug}`}>
              <Button
                variant={tab.slug === currentCategory ? "default" : "outline"}
              >
                {tab.label}
              </Button>
            </Link>
          ))}
        </div>

        {/* informasi grid */}
        <div
          data-aos="fade"
          className="my-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2 gap-y-8 sm:gap-4 md:gap-8"
        >
          {articles?.map((article, i) => (
            <GridItem key={i} article={article} />
          ))}
        </div>
        <PaginationCustom
          totalItem={totalArticles}
          viewPerPage={perPage}
          currentPage={currentPage}
        />
      </div>
    </div>
  );
};

export default InformasiPage;
