import { Separator } from "@/components/ui/separator";
import Container from "../../_components/container";
import Heading from "../../_components/heading";

const BerandaPage = () => {
  return (
    <Container>
      <div className="flex items-center justify-between">
        <Heading
          title="Beranda dashboard"
          description="Manage your beranda content"
        />
      </div>
      <Separator className="my-4" />

      {/* <ClientComp data={formattedTags} /> */}
    </Container>
  );
};

export default BerandaPage;
