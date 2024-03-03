import Image from "next/image";
import Link from "next/link";
import logo from "@/public/logo-footer-white.png";

export default function NotFound() {
  return (
    <div className="w-[100%] h-screen flex flex-col gap-3 items-center justify-center bg-blueAssuruur text-white text-center">
      <div className="mx-auto w-40 mb-8">
        <Image
          src={logo}
          alt="Logo Assuruur"
          className="w-full"
          width={500}
          height={500}
        />
      </div>
      <h2 className="text-2xl sm:text-3xl">
        <b>404 </b>Not Found
      </h2>
      <p>Could not find requested resource</p>
      <Link href="/" className="underline text-sky-500">
        Return Home
      </Link>
    </div>
  );
}
