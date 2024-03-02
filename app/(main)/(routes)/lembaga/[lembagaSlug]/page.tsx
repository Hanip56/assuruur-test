import Banner from "@/app/(main)/_components/banner";
import { BASE_IMAGE_URL } from "@/constants";
import { db } from "@/lib/db";
import { redirect } from "next/navigation";
import ClientComp from "./_components/client-comp";
import { Metadata } from "next";

type Props = { params: { lembagaSlug: string } };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const slug = params.lembagaSlug;

  const lembaga = await db.lembaga.findFirst({
    where: { slug },
  });

  return {
    title: lembaga?.name,
    description: lembaga?.description,
    openGraph: {
      title: lembaga?.name,
      description: lembaga?.description ?? "",
      type: "article",
      url: `${process.env.NEXT_PUBLIC_BASE_URL}/lembaga/${lembaga?.slug}`,
      images: [
        {
          url: "https://utfs.io/f/" + lembaga?.image,
          width: 1060,
          height: 717,
          alt: "",
        },
      ],
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
