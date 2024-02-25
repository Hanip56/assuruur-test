"use client";

import { useEffect, useState } from "react";
import ImagePicker from "./image-picker";
import { getImageSize } from "@/lib/utils";

const Fotos = () => {
  const [open, setOpen] = useState(false);
  const [file, setFile] = useState<File>();

  useEffect(() => {
    getImageSize(
      "https://utfs.io/f/fabf1d65-d443-4702-a005-d5a1711a6114-jlkjti.jpg"
    ).then((e) => console.log(e));
  }, []);

  console.log({ file });

  // const galleries = [
  //   {
  //     url: "https://utfs.io/f/fabf1d65-d443-4702-a005-d5a1711a6114-jlkjti.jpg",
  //   },
  //   {
  //     url: "https://utfs.io/f/641fbe2d-668b-4d92-80d6-c22b720be0e2-hc4tul.jpg",
  //   },
  //   {
  //     url: "https://utfs.io/f/76efc71b-64df-45af-82da-ece8b70095fa-kvu00e.jpg",
  //   },
  // ];

  return (
    <ImagePicker
      onChange={(e) => e instanceof File && setFile(e)}
      isEmpty={false}
    />
  );
};

export default Fotos;
