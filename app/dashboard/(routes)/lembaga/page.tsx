import { db } from "@/lib/db";
import Container from "../../_components/container";
import Heading from "../../_components/heading";
import { Separator } from "@/components/ui/separator";
import ClientComp from "./_components/client-comp";

const LembagaPage = async () => {
  const lembagas = await db.lembaga.findMany({
    where: {
      isSplit: false,
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  const formattedLembagas = lembagas.map((lembaga) => ({
    id: lembaga.id,
    name: lembaga.name,
  }));

  return (
    <Container>
      <div className="flex items-center justify-between">
        <Heading title="Lembaga" description="Manage your lembaga" />
      </div>
      <Separator className="my-4" />

      <ClientComp data={formattedLembagas} />
    </Container>
  );
};

export default LembagaPage;
