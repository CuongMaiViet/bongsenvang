import Image from "next/image";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { cn } from "@/lib/utils";

type ContentProps = {
  bgColor: "green" | "black";
  flexDirection: "invert" | "revert";
  imgUrl?: string;
  header: string;
  desc: string;
  buttonLink: string;
};

const SectionContent = ({
  bgColor,
  flexDirection,
  imgUrl = "/assets/images/hero.png",
  header,
  desc,
  buttonLink,
}: ContentProps) => {
  return (
    <section
      className={cn(
        `py-20`,
        bgColor === "green" && "bg-logoGreen text-white",
        bgColor === "black" && "bg-white text-black"
      )}
    >
      <div
        className={cn(
          `wrapper flex flex-col gap-16 justify-center items-center md:gap-32`,
          flexDirection === "invert" && "md:flex-row",
          flexDirection === "revert" && "md:flex-row-reverse"
        )}
      >
        <Image
          src={imgUrl}
          width={550}
          height={700}
          alt={imgUrl}
          className="rounded-lg object-cover object-center"
        />
        <div className="flex flex-col justify-center gap-5">
          <h2 className="h2-bold animate-[appear_1s]">{header}</h2>
          <p className="p-regular-18 md:p-regular-20 text-justify animate-[appear_3s]">
            {desc}
          </p>
          <Button
            className="button w-full sm:w-fit bg-black text-white animate-[appear_5s] hover:bg-black/70"
            size={"lg"}
            asChild
          >
            <Link href={buttonLink}>Tìm hiểu thêm</Link>
          </Button>
        </div>
      </div>
    </section>
  );
};

export default SectionContent;
