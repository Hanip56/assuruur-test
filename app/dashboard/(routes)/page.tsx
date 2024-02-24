import Heading from "../_components/heading";
import { Separator } from "@/components/ui/separator";
import Container from "../_components/container";
import { ChevronRightIcon } from "lucide-react";
import Link from "next/link";

const fixContents = [
  {
    name: "Beranda",
    description: "Manage your beranda",
    href: "/dashboard/beranda",
  },
  {
    name: "Profil",
    description: "Manage your profil singkat",
    href: "/dashboard/profil",
  },
];

const DashboardPage = async () => {
  return (
    <Container>
      <Heading title="Overview" description="Manage your content" />
      <Separator className="my-4" />

      {/* contents */}
      <div className="flex flex-col gap-4 sm:gap-6 lg:gap-8">
        {fixContents.map((content, i) => (
          <Link href={content.href} key={`content-${i}`}>
            <div className="w-full flex gap-4 items-center rounded-xl border hover:bg-black hover:text-white transition dark:hover:bg-white dark:hover:text-black">
              <div className="py-10 min-w-40 text-center border-r">
                <h3 className="font-medium text-xl">{content.name}</h3>
              </div>
              <div className="flex-1">
                <p>{content.description}</p>
              </div>
              <div className="p-10 border-l">
                <ChevronRightIcon />
              </div>
            </div>
          </Link>
        ))}
      </div>
    </Container>
  );
};

export default DashboardPage;
