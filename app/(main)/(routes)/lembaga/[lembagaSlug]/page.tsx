import Banner from "@/app/(main)/_components/banner";
import { BASE_IMAGE_URL } from "@/constants";
import { db } from "@/lib/db";
import { redirect } from "next/navigation";
import ClientComp from "./_components/client-comp";

const LembagaPage = async ({ params }: { params: { lembagaSlug: string } }) => {
  const lembaga = await db.lembaga.findFirst({
    where: {
      slug: params.lembagaSlug,
    },
    include: {
      misi: true,
      pimpinan: true,
    },
  });

  if (!lembaga) return redirect("/");

  return (
    <div>
      <Banner
        title={lembaga.name}
        image={`${BASE_IMAGE_URL}/${lembaga.image}`}
      />
      <ClientComp profil={lembaga} />
    </div>
  );
};

export default LembagaPage;
