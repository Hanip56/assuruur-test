import React from "react";
import Banner from "../../_components/banner";
import Fotos from "@/components/fotos";

const FotoPage = () => {
  return (
    <div>
      <Banner title="Foto" />

      <div className="my-20 max-w-6xl mx-auto px-2 sm:px-4">
        <Fotos />
      </div>
    </div>
  );
};

export default FotoPage;
