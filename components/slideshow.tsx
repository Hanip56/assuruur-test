import { Fade } from "react-slideshow-image";
import "react-slideshow-image/dist/styles.css";

const Slideshow = () => {
  const images = [
    "https://images.unsplash.com/photo-1509721434272-b79147e0e708?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1500&q=80",
    "https://images.unsplash.com/photo-1506710507565-203b9f24669b?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1536&q=80",
    "https://images.unsplash.com/photo-1536987333706-fc9adfb10d91?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1500&q=80",
  ];

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
