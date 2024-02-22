import Banner from "@/app/(main)/_components/banner";

const LembagaPage = ({ params }: { params: { lembagaSlug: string } }) => {
  return (
    <div>
      <Banner title={params.lembagaSlug} />
    </div>
  );
};

export default LembagaPage;
