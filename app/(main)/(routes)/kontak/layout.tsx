import React, { Suspense } from "react";
import Banner from "../../_components/banner";
import { Metadata } from "next";
import Loading from "../../_components/loading";

export const metadata: Metadata = {
  title: "Kontak & Alamat",
  description: "Kontak & Alamat Pondok Pesantren Modern Assuruur",
  openGraph: {
    title: "Kontak & Alamat",
  },
};
const KontakLayoutPage = ({ children }: { children: React.ReactNode }) => {
  return (
    <div>
      <Banner title="Kontak & Alamat" />

      <Suspense fallback={<Loading />}>{children}</Suspense>
    </div>
  );
};

export default KontakLayoutPage;
