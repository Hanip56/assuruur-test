import { db } from "@/lib/db";
import Container from "../../../_components/container";
import Heading from "../../../_components/heading";
import { Separator } from "@/components/ui/separator";
import ClientForm from "./_components/client-form";
import { isObjectId } from "@/lib/utils";

const DetailArticlePage = async ({
  params,
}: {
  params: { informasiId: string };
}) => {
  let article;
  const categories = await db.category.findMany({});
  const tags = await db.tag.findMany({});

  if (isObjectId(params.informasiId)) {
    article = await db.article.findUnique({
      where: {
        id: params.informasiId,
      },
      include: {
        tags: true,
      },
    });

  }
  return (
    <Container>
      <Heading
        title={article ? article.title : "Create Informasi"}
        description={article ? "Detail informasi" : "Add new informasi"}
      />
      <Separator className="my-4" />
      <ClientForm initialData={article} categories={categories} tags={tags} />
    </Container>
  );
};

export default DetailArticlePage;
