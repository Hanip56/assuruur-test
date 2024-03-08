import { auth } from "@/auth";
import { AOSInit } from "@/components/aos-init";
import Footer from "@/components/footer";
import Navbar from "@/components/navbar";
import { Suspense } from "react";

export default async function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      {/* aos init */}
      <AOSInit />
      {/* navbar */}
      <Navbar />
      <Suspense>
        <main>{children}</main>
        <Footer />
      </Suspense>
    </>
  );
}
