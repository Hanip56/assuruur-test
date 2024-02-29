import Banner from "@/app/(main)/_components/banner";
import { BASE_IMAGE_URL } from "@/constants";
import { db } from "@/lib/db";
import { redirect } from "next/navigation";
import ClientComp from "./_components/client-comp";
import { Metadata, ResolvingMetadata } from "next";

type Props = { params: { lembagaSlug: string } };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const slug = params.lembagaSlug;

  const lembaga = await db.lembaga.findFirst({
    where: { slug },
  });

  return {
    title: lembaga?.name,
    openGraph: {
      images: ["https://utfs.io/f/" + lembaga?.image],
    },
  };
}

const LembagaPage = async ({ params }: Props) => {
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
