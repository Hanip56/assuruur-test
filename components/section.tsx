import { cn } from "@/lib/utils";
import { Button } from "./ui/button";
import Link from "next/link";

type SectionProps = {
  title: string;
  children: React.ReactNode;
  className?: string;
  buttonLabel?: string;
  buttonHref?: string;
};

const Section = ({
  children,
  title,
  className,
  buttonLabel,
  buttonHref,
}: SectionProps) => {
  return (
    <section
      className={cn("max-w-7xl mx-auto px-2 sm:px-4 py-20", className)}
      data-aos="fade-up"
    >
      {/* heading */}
      <div className="mb-6 flex items-center justify-between">
        <h3 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold leading-normal sm:leading-normal md:leading-normal lg:leading-normal">
          {title}
        </h3>

        {buttonHref && buttonLabel && (
          <Link href={buttonHref}>
            <Button variant={"assuruur"} size={"sm"}>
              {buttonLabel}
            </Button>
          </Link>
        )}
      </div>

      {/* main */}
      <main>{children}</main>
    </section>
  );
};

export default Section;
