import { db } from "@/lib/db";
import Container from "../../_components/container";
import Heading from "../../_components/heading";
import { Separator } from "@/components/ui/separator";
import ClientComp from "./_components/client-comp";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { PlusIcon } from "lucide-react";

const CategoryPage = async () => {
  const categories = await db.category.findMany({
    orderBy: {
      createdAt: "desc",
    },
  });

  const formattedCategory = categories.map((category) => ({
    id: category.id,
    name: category.name,
    description: category?.description,
  }));

  return (
    <Container>
      <div className="flex items-center justify-between">
        <Heading title="Category" description="Manage your categories" />
        <Link href="categories/new">
          <Button>
            <PlusIcon className="w-4 h-4 mr-4" />
            <span>Add category</span>
          </Button>
        </Link>
      </div>
      <Separator className="my-4" />

      <ClientComp data={formattedCategory} />
    </Container>
  );
};

export default CategoryPage;
