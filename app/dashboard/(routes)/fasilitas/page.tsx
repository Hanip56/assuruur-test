import { db } from "@/lib/db";
import Container from "../../_components/container";
import Heading from "../../_components/heading";
import { Separator } from "@/components/ui/separator";
import ClientComp from "./_components/client-comp";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { PlusIcon } from "lucide-react";

const FasilitasPage = async () => {
  const fasilitass = await db.fasilitas.findMany({
    orderBy: {
      createdAt: "desc",
    },
    include: {
      type: true,
    },
  });

  const formattedFasilitass = fasilitass.map((fasilitas) => ({
    id: fasilitas.id,
    name: fasilitas.name,
    url: "https://utfs.io/f/" + fasilitas.image,
    type: fasilitas.type.name,
  }));

  return (
    <Container>
      <div className="flex items-center justify-between">
        <Heading title="Fasilitas" description="Manage your fasilitas" />
        <Link href="fasilitas/new">
          <Button>
            <PlusIcon className="w-4 h-4 mr-4" />
            <span>Add fasilitas</span>
          </Button>
        </Link>
      </div>
      <Separator className="my-4" />

      <ClientComp data={formattedFasilitass} />
    </Container>
  );
};

export default FasilitasPage;
