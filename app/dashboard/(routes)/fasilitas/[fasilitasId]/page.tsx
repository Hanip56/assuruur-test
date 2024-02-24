import { db } from "@/lib/db";
import Container from "../../../_components/container";
import Heading from "../../../_components/heading";
import { Separator } from "@/components/ui/separator";
import ClientForm from "./_components/client-form";
import { isObjectId } from "@/lib/utils";

const DetailFasilitasPage = async ({
  params,
}: {
  params: { fasilitasId: string };
}) => {
  let fasilitas;
  const fasilitasTypes = await db.fasilitasType.findMany({});

  if (isObjectId(params.fasilitasId)) {
    fasilitas = await db.fasilitas.findUnique({
      where: {
        id: params.fasilitasId,
      },
    });
  }
  return (
    <Container>
      <Heading
        title={fasilitas ? fasilitas.name : "Create Fasilitas"}
        description={fasilitas ? "Detail fasilitas" : "Add new fasilitas"}
      />
      <Separator className="my-4" />
      <ClientForm initialData={fasilitas} fasilitasTypes={fasilitasTypes} />
    </Container>
  );
};

export default DetailFasilitasPage;
