import { db } from "@/lib/db";
import Container from "../../_components/container";
import Heading from "../../_components/heading";
import { Separator } from "@/components/ui/separator";
import ClientComp from "./_components/client-comp";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { PlusIcon } from "lucide-react";

const TagPage = async () => {
  const tags = await db.tag.findMany({
    orderBy: {
      createdAt: "desc",
    },
  });

  const formattedTags = tags.map((tag) => ({
    id: tag.id,
    name: tag.name,
  }));

  return (
    <Container>
      <div className="flex items-center justify-between">
        <Heading title="Tags" description="Manage your tags" />
        <Link href="tags/new">
          <Button>
            <PlusIcon className="w-4 h-4 mr-4" />
            <span>Add tag</span>
          </Button>
        </Link>
      </div>
      <Separator className="my-4" />

      <ClientComp data={formattedTags} />
    </Container>
  );
};

export default TagPage;
