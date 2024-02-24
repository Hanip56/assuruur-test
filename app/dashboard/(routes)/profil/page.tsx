import { Separator } from "@/components/ui/separator";
import Container from "../../_components/container";
import Heading from "../../_components/heading";
import Link from "next/link";
import { Button } from "@/components/ui/button";

const Item = ({
  children,
  title,
  href,
}: {
  children?: React.ReactNode;
  title: string;
  href: string;
}) => {
  return (
    <div className="w-full rounded-xl border">
      {/* header */}
      <div className="px-6 py-4 flex justify-between items-center border-b">
        <h3 className="text-base md:text-lg font-medium">{title}</h3>
        <Link href={href}>
          <Button>Edit</Button>
        </Link>
      </div>
      <div className="px-6 py-4">{children}</div>
    </div>
  );
};

const BerandaPage = () => {
  return (
    <Container>
      <div className="flex items-center justify-between">
        <Heading
          title="Profil dashboard"
          description="Manage your profil singkat"
        />
      </div>
      <Separator className="my-4" />

      <div className="space-y-6">
        {/* pendiri dan wakif */}
        <Item title="Pendiri dan Wakif" href="profil/pendiri">
          <div className="flex flex-wrap gap-2 sm:gap-4">
            {Array(3)
              .fill("")
              .map((_, i) => (
                <div key={i} className="w-40 h-40 rounded-lg bg-black" />
              ))}
          </div>
        </Item>
        {/* profil singkat */}
        <Item
          title="Profil Singkat Pondok Pesantren Assuruur"
          href="profil/deskripsi"
        ></Item>
        <Item title="Visi Misi" href="profil/visi-misi"></Item>
        <Item title="Panca Jiwa Pondok" href="profil/panca-jiwa"></Item>
        <Item
          title="Arah & Tujuan Pendidikan"
          href="profil/arah-dan-tujuan"
        ></Item>
      </div>
    </Container>
  );
};

export default BerandaPage;
