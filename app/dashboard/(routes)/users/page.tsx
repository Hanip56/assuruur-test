import { db } from "@/lib/db";
import Container from "../../_components/container";
import Heading from "../../_components/heading";
import { Separator } from "@/components/ui/separator";
import ClientComp from "./_components/client-comp";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { PlusIcon } from "lucide-react";

const UserPage = async () => {
  const users = await db.user.findMany({
    orderBy: {
      createdAt: "desc",
    },
  });

  const formattedUsers = users.map((user) => ({
    id: user.id,
    name: user.name ?? "",
    role: user.role,
  }));

  return (
    <Container>
      <div className="flex items-center justify-between">
        <Heading title="Users" description="Manage your users" />
        <Link href="users/new">
          <Button>
            <PlusIcon className="w-4 h-4 mr-4" />
            <span>Add user</span>
          </Button>
        </Link>
      </div>
      <Separator className="my-4" />

      <ClientComp data={formattedUsers} />
    </Container>
  );
};

export default UserPage;
