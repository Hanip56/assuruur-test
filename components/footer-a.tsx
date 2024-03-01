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
      <div className="grid grid-cols-1 md:grid-cols-8 max-w-6xl mx-auto px-2 sm:px-4 py-16 gap-8">
        {/* left */}
        <div className="md:col-span-3 flex justify-center items-center">
          <div className="w-60 h-60">
            <Image
              src={Logo}
              alt="Assuruur Logo"
              width={500}
              height={500}
              className="w-full h-full object-contain"
            />
          </div>
        </div>
        {/* right */}
        <div className="md:col-span-5 grid grid-cols-1 md:grid-cols-2 gap-4 pt-8">
          {/* alamat */}
          <div>
            <h6 className="font-bold mb-2">Alamat</h6>
            <p>{baseInfo.alamat}</p>
          </div>
          {/* sosmed */}
          <div>
            <h6 className="font-bold mb-2">Sosial media</h6>
            <div className="flex gap-4 flex-wrap">
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

          {/* telpon */}
          <div>
            <h6 className="font-bold mb-2">Telepon</h6>
            <p>(022) 8593 0310 / 0813 2261 0259</p>
          </div>
        </div>
      </div>

      <div className="py-6 text-sm text-gray-500">
        <p className="text-center">
          Copyright © {new Date().getFullYear()} PPWS Ngabar | Assuruur
        </p>
      </div>
    </footer>
  );
};

export default Footer;
