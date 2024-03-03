import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Toaster } from "react-hot-toast";
import { SessionProvider } from "next-auth/react";
import { auth } from "@/auth";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: {
    template: "%s | Pondok Pesantren Modern Assuruur",
    default: "Pondok Pesantren Modern Assuruur",
  },
  description: "The official Assuruur website",
  metadataBase: new URL(process.env.NEXT_PUBLIC_BASE_URL!),
  openGraph: {
    title: {
      template: "%s | Pondok Pesantren Modern Assuruur",
      default: "Pondok Pesantren Modern Assuruur",
    },
    description: "The official Pondok Pesantren Modern Assuruur website",
    siteName: "Pondok Pesantren Modern Assuruur",
    type: "website",
    url: `${process.env.NEXT_PUBLIC_BASE_URL}/`,
    images: [
      {
        url: "https://utfs.io/f/5d159a3d-ca34-4a67-afd1-2cea6600467a-cdr5vb.jpg",
        width: 640,
        height: 425,
        alt: "",
      },
    ],
    locale: "id_ID",
  },
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await auth();

  return (
    <html lang="en">
      <body className={inter.className}>
        <SessionProvider session={session}>
          <Toaster />
          {children}
        </SessionProvider>
      </body>
    </html>
  );
}
