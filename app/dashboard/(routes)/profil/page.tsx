import { Separator } from "@/components/ui/separator";
import Container from "../../_components/container";
import Heading from "../../_components/heading";
import LembagaForm from "../../_components/lembaga-form";
import { redirect } from "next/navigation";
import { db } from "@/lib/db";
import { contentIds } from "@/constants";

const ProfilPage = async () => {
  let lembaga = await db.lembaga.findUnique({
    where: {
      id: contentIds.profil,
    },
    include: {
      misi: true,
    },
  });

  if (!lembaga) return redirect("../lembaga");

  return (
    <Container>
      <div className="flex items-center justify-between">
        <Heading
          title="Profil dashboard"
          description="Manage your profil singkat"
        />
      </div>
      <Separator className="my-4" />

      <LembagaForm
        successRedirect="../dashboard"
        initialData={lembaga}
        misis={lembaga.misi}
      />
    </Container>
  );
};

export default ProfilPage;
