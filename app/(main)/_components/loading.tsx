import Image from "next/image";

const Loading = () => {
  return (
    <div className="max-w-7xl mx-auto flex items-center justify-center text-center h-96 text-gray-500">
      <div className="opacity-80 flex flex-col items-center gap-1">
        <div className="w-10 h-10">
          <Image
            src={"/Book.gif"}
            alt=""
            width={500}
            height={500}
            className="opacity-60"
          />
        </div>
        <p>Please wait...</p>
      </div>
    </div>
  );
};

export default Loading;
