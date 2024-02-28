import { db } from "@/lib/db";
import Container from "../../_components/container";
import Heading from "../../_components/heading";
import { Separator } from "@/components/ui/separator";
import ClientComp from "./_components/client-comp";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { PlusIcon } from "lucide-react";

const FasilitasTypePage = async () => {
  const fasilitasTypes = await db.fasilitasType.findMany();

  const formattedFasilitasTypes = fasilitasTypes.map((fasilitasType) => ({
    id: fasilitasType.id,
    name: fasilitasType.name,
  }));

  return (
    <Container>
      <div className="flex items-center justify-between">
        <Heading
          title="Fasilitas Types"
          description="Manage your fasilitas types"
        />
        <Link href="fasilitas-type/new">
          <Button>
            <PlusIcon className="w-4 h-4 mr-4" />
            <span>Add Fasilitas Type</span>
          </Button>
        </Link>
      </div>
      <Separator className="my-4" />

      <ClientComp data={formattedFasilitasTypes} />
    </Container>
  );
};

export default FasilitasTypePage;
