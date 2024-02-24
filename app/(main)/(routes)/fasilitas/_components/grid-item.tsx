import { BASE_IMAGE_URL } from "@/constants";
import { Fasilitas } from "@prisma/client";
import Image from "next/image";

type Props = {
  fasilitas: Fasilitas;
};

const GridItem = ({ fasilitas }: Props) => {
  return (
    <div className="w-full pb-[100%] relative">
      <Image
        src={`${BASE_IMAGE_URL}/${fasilitas.image}`}
        alt=""
        className="absolute top-0 left-0 w-full h-full object-cover"
        width={500}
        height={500}
      />
    </div>
  );
};

export default GridItem;
