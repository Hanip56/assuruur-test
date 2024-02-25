import { db } from "@/lib/db";
import Container from "../../../_components/container";
import Heading from "../../../_components/heading";
import { Separator } from "@/components/ui/separator";
import ClientForm from "./_components/client-form";
import { isObjectId } from "@/lib/utils";

const DetailFotoPage = async ({ params }: { params: { fotoId: string } }) => {
  let foto;

  if (isObjectId(params.fotoId)) {
    foto = await db.foto.findUnique({
      where: {
        id: params.fotoId,
      },
    });
  }

  return (
    <Container>
      <Heading
        title={foto ? "Edit foto" : "Create Foto"}
        description={foto ? "Detail foto" : "Add new foto"}
      />
      <Separator className="my-4" />
      <ClientForm initialData={foto} />
    </Container>
  );
};

export default DetailFotoPage;
