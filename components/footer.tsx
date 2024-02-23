import Logo from "@/public/logo.png";
import { InstagramLogoIcon } from "@radix-ui/react-icons";
import Image from "next/image";

const Footer = () => {
  return (
    <footer className="text-sm sm:text-base w-[100%] border-t" data-aos="fade">
      <div className="grid grid-cols-1 md:grid-cols-3 max-w-7xl mx-auto px-2 sm:px-4 py-16 gap-12">
        {/* left */}
        <div>
          <div className="w-20 h-20 mb-4">
            <Image
              src={Logo}
              alt="Assuruur Logo"
              width={500}
              height={500}
              className="w-full h-full object-contain"
            />
          </div>
          <p>
            Lorem ipsum dolor sit, amet consectetur adipisicing elit. Dolorem,
            tempora esse.
          </p>
        </div>
        {/* right */}
        <div className="md:col-span-2 grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* alamat */}
          <div>
            <h6 className="font-bold mb-4">Alamat</h6>
            <p>
              Jl.Sindangreret No.72 Ds.Sukasari Kec. Pameungpeuk Kab. Bandung
              40376
            </p>
          </div>
          {/* sosmed */}
          <div>
            <h6 className="font-bold mb-4">Sosial media</h6>
            <div className="flex gap-4 flex-wrap">
              <a href="#">
                <InstagramLogoIcon className="w-6 h-6 hover:opacity-80" />
              </a>
              <a href="#">
                <InstagramLogoIcon className="w-6 h-6 hover:opacity-80" />
              </a>
              <a href="#">
                <InstagramLogoIcon className="w-6 h-6 hover:opacity-80" />
              </a>
              <a href="#">
                <InstagramLogoIcon className="w-6 h-6 hover:opacity-80" />
              </a>
              <a href="#">
                <InstagramLogoIcon className="w-6 h-6 hover:opacity-80" />
              </a>
            </div>
          </div>

          {/* telpon */}
          <div>
            <h6 className="font-bold mb-4">Telepon</h6>
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
