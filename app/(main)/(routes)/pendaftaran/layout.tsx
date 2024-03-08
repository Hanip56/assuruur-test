import Banner from "../../_components/banner";
import { Metadata } from "next";
import React, { Suspense } from "react";
import Loading from "../../_components/loading";

export const metadata: Metadata = {
  title: "Pendaftaran",
  description: "Pendaftaran Pondok Pesantren Modern Assuruur",
  openGraph: {
    title: "Pendaftaran",
  },
};

const PendaftaranLayoutPage = async ({
  children,
}: {
  children: React.ReactNode;
}) => {
  return (
    <div>
      <Banner title="Pendaftaran" />

      <Suspense fallback={<Loading />}>{children}</Suspense>
    </div>
  );
};

export default PendaftaranLayoutPage;
