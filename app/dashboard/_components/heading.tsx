type HeadingProps = {
  title: string;
  description: String;
};

const Heading = ({ description, title }: HeadingProps) => {
  return (
    <div>
      <h1 className="font-bold text-2xl leading-10">{title}</h1>
      <p className="text-gray-400">{description}</p>
    </div>
  );
};

export default Heading;
