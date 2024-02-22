import { cn } from "@/lib/utils";

type SectionProps = {
  title: string;
  children: React.ReactNode;
  className?: string;
};

const Section = ({ children, title, className }: SectionProps) => {
  return (
    <section
      className={cn("max-w-7xl mx-auto px-2 sm:px-4 py-20", className)}
      data-aos="fade-up"
    >
      {/* heading */}
      <div className="mb-6">
        <h3 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold leading-normal sm:leading-normal md:leading-normal lg:leading-normal">
          {title}
        </h3>
      </div>

      {/* main */}
      <main>{children}</main>
    </section>
  );
};

export default Section;
