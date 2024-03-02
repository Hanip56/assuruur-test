import { Separator } from "@/components/ui/separator";
import Container from "../../_components/container";
import Heading from "../../_components/heading";
import InformasiForm from "../../_components/informasi-form";
import { db } from "@/lib/db";
import { contentIds } from "@/constants";

const SejarahPage = async () => {
  const informasi = await db.article.findUnique({
    where: {
      id: contentIds.sejarah,
    },
    include: {
      tags: true,
    },
  });

  const categories = await db.category.findMany({});
  const tags = await db.tag.findMany({});

  return (
    <Container>
      <div className="flex items-center justify-between">
        <Heading title="Sejarah dashboard" description="Manage your sejarah" />
      </div>
      <Separator className="my-4" />

      <InformasiForm
        initialData={informasi}
        categories={categories}
        tags={tags}
        successRedirect="../dashboard"
        isSplit={true}
      />
    </Container>
  );
};

export default SejarahPage;
