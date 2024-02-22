import { AOSInit } from "@/components/aos-init";
import Footer from "@/components/footer";
import Navbar from "@/components/navbar";

export default function MainLayout({
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
      <main>{children}</main>
      <Footer />
    </>
  );
}
