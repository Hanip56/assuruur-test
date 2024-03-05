import { db } from "@/lib/db";
import Container from "../../_components/container";
import Heading from "../../_components/heading";
import { Separator } from "@/components/ui/separator";
import ClientComp from "./_components/client-comp";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { PlusIcon } from "lucide-react";

const ArticlePage = async () => {
  const articles = await db.article.findMany({
    where: {
      isSplit: false,
    },
    orderBy: {
      createdAt: "desc",
    },
    include: {
      category: true,
      author: true,
    },
  });

  const formattedArticles = articles.map((article) => ({
    id: article.id,
    author: article.author.name ?? "",
    title: article.title,
    category: article.category.name,
  }));

  return (
    <Container>
      <div className="flex items-center justify-between">
        <Heading title="Informasi" description="Manage your informasi" />
        <Link href="informasi/new">
          <Button>
            <PlusIcon className="w-4 h-4 mr-4" />
            <span>Add informasi</span>
          </Button>
        </Link>
      </div>
      <Separator className="my-4" />

      <ClientComp data={formattedArticles} />
    </Container>
  );
};

export default ArticlePage;
