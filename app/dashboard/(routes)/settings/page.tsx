import { Separator } from "@/components/ui/separator";
import Container from "../../_components/container";
import Heading from "../../_components/heading";
import { auth } from "@/auth";
import Image from "next/image";
import { BASE_IMAGE_URL } from "@/constants";
import { db } from "@/lib/db";
import ClientForm from "./_components/client-form";
import { redirect } from "next/navigation";

const SettingsPage = async () => {
  const session = await auth();

  if (session?.user.role !== "ADMIN") return redirect("/dashboard");

  const user = await db.user.findUnique({
    where: {
      id: session?.user.id,
    },
  });

  if (!user) return null;

  return (
    <Container>
      <div className="flex items-center justify-between">
        <Heading title="Settings" description="Manage your user settings" />
      </div>
      <Separator className="my-4" />

      <ClientForm initialData={user} />
    </Container>
  );
};

export default SettingsPage;
