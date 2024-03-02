import { db } from "@/lib/db";
import Container from "../../../_components/container";
import Heading from "../../../_components/heading";
import { Separator } from "@/components/ui/separator";
import { isObjectId } from "@/lib/utils";
import { redirect } from "next/navigation";
import { Misi } from "@prisma/client";
import LembagaForm from "@/app/dashboard/_components/lembaga-form";

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

  if (!lembaga) return redirect("../lembaga");

  return (
    <Container>
      <Heading
        title={lembaga ? lembaga.name : "Create Lembaga"}
        description={lembaga ? "Detail lembaga" : "Add new lembaga"}
      />
      <Separator className="my-4" />
      <LembagaForm
        initialData={lembaga}
        misis={misis}
        successRedirect="../lembaga"
      />
    </Container>
  );
};

export default DetailLembagaPage;
