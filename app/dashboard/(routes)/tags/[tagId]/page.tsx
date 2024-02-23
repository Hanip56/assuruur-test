import { db } from "@/lib/db";
import Container from "../../../_components/container";
import Heading from "../../../_components/heading";
import { Separator } from "@/components/ui/separator";
import ClientForm from "./_components/client-form";
import { isObjectId } from "@/lib/utils";

const DetailTagPage = async ({ params }: { params: { tagId: string } }) => {
  let tag;

  if (isObjectId(params.tagId)) {
    tag = await db.tag.findUnique({
      where: {
        id: params.tagId,
      },
    });
  }

  return (
    <Container>
      <Heading
        title={tag ? tag.name : "Create Tag"}
        description={tag ? "Detail tag" : "Add new tag"}
      />
      <Separator className="my-4" />
      <ClientForm initialData={tag} />
    </Container>
  );
};

export default DetailTagPage;
