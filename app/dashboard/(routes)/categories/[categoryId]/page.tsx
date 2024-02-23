import { db } from "@/lib/db";
import Container from "../../../_components/container";
import Heading from "../../../_components/heading";
import { Separator } from "@/components/ui/separator";
import ClientForm from "./_components/client-form";
import { isObjectId } from "@/lib/utils";

const DetailCategoryPage = async ({
  params,
}: {
  params: { categoryId: string };
}) => {
  let category;

  if (isObjectId(params.categoryId)) {
    category = await db.category.findUnique({
      where: {
        id: params.categoryId,
      },
    });
  }

  return (
    <Container>
      <Heading
        title={category ? category.name : "Create Category"}
        description={category ? "Detail category" : "Add new category"}
      />
      <Separator className="my-4" />
      <ClientForm initialData={category} />
    </Container>
  );
};

export default DetailCategoryPage;
