import { Metadata } from "next";
import Sidebar from "./_components/sidebar";
import Topbar from "./_components/topbar";
import { auth } from "@/auth";
import { redirect } from "next/navigation";

export const metadata: Metadata = {
  title: "Dashboard",
};

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await auth();

  if (!session || !session.user) return redirect("/");

  return (
    <div className="flex">
      <Topbar />
      <div className="hidden h-screen md:block w-60 flex-shrink-0">
        <div className="fixed h-full w-60 border-r">
          <Sidebar />
        </div>
      </div>
      <main className="w-full h-full pt-14">{children}</main>
    </div>
  );
}
