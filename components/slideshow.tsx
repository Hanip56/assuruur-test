import { Fade } from "react-slideshow-image";
import "react-slideshow-image/dist/styles.css";

type Props = {
  images: string[];
};

const Slideshow = ({ images }: Props) => {
  const properties = {
    prevArrow: <button style={{ display: "none" }}></button>,
    nextArrow: <button style={{ display: "none" }}></button>,
  };

  return (
    <Fade {...properties} pauseOnHover={false}>
      {images.map((image, i) => (
        <div key={`image-${i}`} className="each-slide-effect">
          <div
            className="flex items-center justify-center bg-cover w-full h-[90vh]"
            style={{ backgroundImage: `url(${image})` }}
          ></div>
        </div>
      ))}
    </Fade>
  );
};

export default Slideshow;
