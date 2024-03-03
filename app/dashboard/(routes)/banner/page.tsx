import { db } from "@/lib/db";
import { Separator } from "@/components/ui/separator";
import ClientForm from "./_components/client-form";
import Container from "../../_components/container";
import Heading from "../../_components/heading";
import { redirect } from "next/navigation";

const DetailBannerPage = async () => {
  const banner = await db.banner.findFirst({
    where: {
      at: "default",
    },
    include: {
      images: true,
    },
  });

  if (!banner) return redirect("../dashboard");

  return (
    <Container>
      <Heading title={"Edit banner"} description={"Detail banner"} />
      <Separator className="my-4" />
      <ClientForm initialData={banner} />
    </Container>
  );
};

export default DetailBannerPage;
