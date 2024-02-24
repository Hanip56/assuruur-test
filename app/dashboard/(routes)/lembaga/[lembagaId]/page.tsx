import { db } from "@/lib/db";
import Container from "../../../_components/container";
import Heading from "../../../_components/heading";
import { Separator } from "@/components/ui/separator";
import ClientForm from "./_components/client-form";
import { isObjectId } from "@/lib/utils";
import { redirect } from "next/navigation";
import { Misi } from "@prisma/client";

const DetailLembagaPage = async ({
  params,
}: {
  params: { lembagaId: string };
}) => {
  let lembaga;
  let misis: Misi[] = [];

  if (isObjectId(params.lembagaId)) {
    lembaga = await db.lembaga.findUnique({
      where: {
        id: params.lembagaId,
      },
    });

    misis = await db.misi.findMany({
      where: {
        lembagaId: params.lembagaId,
      },
    });
  }

  return (
    <Container>
      <Heading
        title={lembaga ? lembaga.name : "Create Lembaga"}
        description={lembaga ? "Detail lembaga" : "Add new lembaga"}
      />
      <Separator className="my-4" />
      <ClientForm initialData={lembaga} misis={misis} />
    </Container>
  );
};

export default DetailLembagaPage;
