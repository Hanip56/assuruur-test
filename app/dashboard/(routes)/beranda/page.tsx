import { Separator } from "@/components/ui/separator";
import Container from "../../_components/container";
import Heading from "../../_components/heading";
import CreateForm from "./_components/create-form";
import { db } from "@/lib/db";

const BerandaPage = async () => {
  const banner = await db.banner.findFirst({
    where: {
      at: "beranda",
    },
    include: {
      images: true,
    },
  });

  return (
    <Container>
      <div className="flex items-center justify-between">
        <Heading
          title="Beranda dashboard"
          description="Manage your beranda content"
        />
      </div>
      <Separator className="my-4" />

      {banner ? (
        <CreateForm initialData={banner} />
      ) : (
        <p className="text-destructive">Something went wrong</p>
      )}
    </Container>
  );
};

export default BerandaPage;
