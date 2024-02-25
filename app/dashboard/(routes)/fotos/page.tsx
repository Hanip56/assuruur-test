import { db } from "@/lib/db";
import Container from "../../_components/container";
import Heading from "../../_components/heading";
import { Separator } from "@/components/ui/separator";
import ClientComp from "./_components/client-comp";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { PlusIcon } from "lucide-react";

const FotosPage = async () => {
  const fotos = await db.foto.findMany({
    orderBy: {
      createdAt: "desc",
    },
  });

  const formattedFotos = fotos.map((foto) => ({
    id: foto.id,
    description: foto.description ?? "",
  }));

  return (
    <Container>
      <div className="flex items-center justify-between">
        <Heading title="Foto" description="Manage your foto" />
        <Link href="fotos/new">
          <Button>
            <PlusIcon className="w-4 h-4 mr-4" />
            <span>Add foto</span>
          </Button>
        </Link>
      </div>
      <Separator className="my-4" />

      <ClientComp data={formattedFotos} />
    </Container>
  );
};

export default FotosPage;
