import Logo from "@/public/logo-footer-white.png";
import Image from "next/image";
import instagramIcon from "@/public/icon/instagram.svg";
import youtubeIcon from "@/public/icon/youtube.svg";
import facebookIcon from "@/public/icon/facebook.svg";
import tiktokIcon from "@/public/icon/tiktok.svg";
import { baseInfo } from "@/constants";

const Footer = () => {
  const sosmeds = [
    {
      icon: instagramIcon,
      href: baseInfo.instagram,
    },
    {
      icon: youtubeIcon,
      href: baseInfo.youtube,
    },
    {
      icon: tiktokIcon,
      href: baseInfo.tiktok,
    },
    {
      icon: facebookIcon,
      href: baseInfo.facebook,
    },
  ];

  return (
    <footer
      className="text-sm sm:text-base w-[100%] border-t text-white bg-blueAssuruur"
      data-aos="fade"
    >
      <div className="max-w-5xl mx-auto px-2 sm:px-4 py-8 gap-4 flex flex-col items-center justify-center">
        {/* left */}
        <div>
          <div className="w-48 h-48 sm:w-60 sm:h-60">
            <Image
              src={Logo}
              alt="Assuruur Logo"
              width={500}
              height={500}
              className="w-full h-full object-contain"
            />
          </div>
        </div>
        <div className="text-center text-sm sm:text-base">
          {/* alamat */}
          <div className="leading-7 sm:leading-8 text-gray-300">
            <p>{baseInfo.alamat}</p>{" "}
            <p className="mt-2 font-medium">(022) 8593 0310 / 0813 2261 0259</p>
          </div>
        </div>
        {/* sosmed */}
        <div className="flex gap-4 flex-wrap mt-4">
          {sosmeds.map((sosmed) => (
            <a href={sosmed.href} key={sosmed.href} target="_blank">
              <Image
                src={sosmed.icon}
                alt=""
                width={200}
                height={200}
                className="w-5 h-5 hover:opacity-80"
              />
            </a>
          ))}
        </div>
      </div>

      <div className="py-6 text-sm text-gray-500 border-t border-gray-500/50">
        <p className="text-center">
          Copyright © {new Date().getFullYear()} | Assuruur Ponpes
        </p>
      </div>
    </footer>
  );
};

export default Footer;
