import { auth } from "@/auth";
import { AOSInit } from "@/components/aos-init";
import Footer from "@/components/footer";
import Navbar from "@/components/navbar";
import { SessionProvider } from "next-auth/react";

export default async function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await auth();

  return (
    <SessionProvider session={session}>
      {/* aos init */}
      <AOSInit />
      {/* navbar */}
      <Navbar />
      <main>{children}</main>
      <Footer />
    </SessionProvider>
  );
}
