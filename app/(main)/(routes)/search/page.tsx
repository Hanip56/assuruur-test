import { FormError } from "@/components/ui/form-error-alert";
import { db } from "@/lib/db";
import ClientForm from "./_components/client-form";
import { excludeArticles } from "@/constants";
import Link from "next/link";

const SearchPage = async ({
  searchParams,
}: {
  searchParams: { q: string; page: string };
}) => {
  const q = searchParams.q;

  const totalSearchedArticle = await db.article.count({
    where: {
      OR: [
        {
          title: {
            contains: q,
            mode: "insensitive",
          },
        },
        {
          content: {
            contains: q,
            mode: "insensitive",
          },
        },
      ],
      NOT: {
        id: {
          in: excludeArticles,
        },
      },
    },
  });

  const perPage = 9;
  const currentPage = searchParams.page ? Number(searchParams.page) : 1;

  const searchedArticle = await db.article.findMany({
    where: {
      OR: [
        {
          title: {
            contains: q,
            mode: "insensitive",
          },
        },
        {
          content: {
            contains: q,
            mode: "insensitive",
          },
        },
      ],
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

  return (
    <div className="pt-8 sm:pt-16">
      <div className="py-28 max-w-5xl mx-auto px-2 sm:px-4">
        <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-8 sm:mb-12">
          Hasil Pencarian
        </h1>
        <div>
          <ClientForm defaultValue={q ?? ""} />
        </div>
        {/* searched */}
        <div className="mt-16">
          {searchedArticle.length > 0 ? (
            <div>
              {searchedArticle.map((article) => (
                <Link
                  href={`/informasi/${article.slug}`}
                  key={article.id}
                  className="border-t py-10 flex flex-col sm:flex-row gap-4 hover:bg-gray-50 transition"
                >
                  <div className="w-40 break-words flex-shrink-0 sm:px-2">
                    <h5 className="text-lg font-semibold text-gray-500">
                      {article.category.name}
                    </h5>
                  </div>
                  <h4 className="font-bold text-xl sm:text-2xl">
                    {article.title}
                  </h4>
                </Link>
              ))}
            </div>
          ) : (
            <FormError message="Tidak ada hasil yang ditemukan" />
          )}
        </div>
      </div>
    </div>
  );
};

export default SearchPage;