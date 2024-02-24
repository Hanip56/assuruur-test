import { db } from "@/lib/db";
import Container from "../../../_components/container";
import Heading from "../../../_components/heading";
import { Separator } from "@/components/ui/separator";
import ClientForm from "./_components/client-form";
import { isObjectId } from "@/lib/utils";

const DetailFasilitasTypePage = async ({
  params,
}: {
  params: { fasilitasTypeId: string };
}) => {
  let fasilitasType;

  if (isObjectId(params.fasilitasTypeId)) {
    fasilitasType = await db.fasilitasType.findUnique({
      where: {
        id: params.fasilitasTypeId,
      },
    });
  }

  return (
    <Container>
      <Heading
        title={fasilitasType ? fasilitasType.name : "Create Fasilitas"}
        description={
          fasilitasType ? "Detail Fasilitas Type" : "Add new Fasilitas Type"
        }
      />
      <Separator className="my-4" />
      <ClientForm initialData={fasilitasType} />
    </Container>
  );
};

export default DetailFasilitasTypePage;
