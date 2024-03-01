import { db } from "@/lib/db";
import Container from "../../../_components/container";
import Heading from "../../../_components/heading";
import { Separator } from "@/components/ui/separator";
import { isObjectId } from "@/lib/utils";
import UpdateForm from "./_components/update-form";
import CreateForm from "./_components/create-form";
import { redirect } from "next/navigation";

const DetailUserPage = async ({ params }: { params: { userId: string } }) => {
  let user;

  if (isObjectId(params.userId)) {
    user = await db.user.findUnique({
      where: {
        id: params.userId,
      },
    });
  }

  if (user && user.role === "SUPERADMIN") return redirect("../users");

  return (
    <Container>
      <Heading
        title={user && user.name ? user.name : "Create User"}
        description={user ? "Detail user" : "Add new user"}
      />
      <Separator className="my-4" />

      {user ? (
        // edit user
        <UpdateForm initialData={user} />
      ) : (
        // register user
        <CreateForm />
      )}
    </Container>
  );
};

export default DetailUserPage;
