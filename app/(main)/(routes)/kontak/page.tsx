import React, { useMemo } from "react";
import dynamic from "next/dynamic";
import { Mail, MapIcon, Phone } from "lucide-react";
import { baseInfo } from "@/constants";

const KontakPage = () => {
  const Map = useMemo(
    () =>
      dynamic(() => import("@/components/map"), {
        ssr: false,
      }),
    []
  );

  const infos = [
    {
      label: "Alamat",
      icon: MapIcon,
      content: baseInfo.alamat,
    },
    {
      label: "Telepon",
      icon: Phone,
      content: baseInfo.telepon,
    },
    {
      label: "Email",
      icon: Mail,
      content: baseInfo.email,
    },
  ];
  return (
    <div className="my-32 max-w-6xl mx-auto px-2 sm:px-4 space-y-16">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 sm:gap-8 text-center">
        {infos.map((info, i) => (
          <div
            key={i}
            className="flex flex-col items-center gap-4 p-4 sm:p-8"
            data-aos="fade-up"
            data-aos-delay={i * 200}
          >
            <info.icon className="w-10 h-10 text-blue-900" />
            <h4 className="text-xl sm:text-2xl font-medium">{info.label}</h4>
            <p className="text-sm">{info.content}</p>
          </div>
        ))}
      </div>
      <div data-aos="fade">
        <Map center={[-7.0177532973688646, 107.59186415767232]} />
      </div>
    </div>
  );
};

export default KontakPage;
