import Sidebar from "./_components/sidebar";
import Topbar from "./_components/topbar";
import { ThemeProvider } from "@/components/theme-provider";

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ThemeProvider
      attribute="class"
      defaultTheme="system"
      enableSystem
      disableTransitionOnChange
    >
      <div className="flex">
        <Topbar />
        <div className="hidden h-screen md:block w-60 flex-shrink-0">
          <div className="fixed h-full w-60 border-r">
            <Sidebar />
          </div>
        </div>
        <main className="w-full h-full pt-14">{children}</main>
      </div>
    </ThemeProvider>
  );
}
