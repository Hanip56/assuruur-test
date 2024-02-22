import Heading from "../_components/heading";
import { Separator } from "@/components/ui/separator";
import Container from "../_components/container";
const DashboardPage = async () => {
  return (
    <Container>
      <Heading title="Dashboard" description="Overview of your store" />
      <Separator className="my-4" />
    </Container>
  );
};

export default DashboardPage;
