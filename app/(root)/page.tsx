import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <>
      <section className="bg-primary-50 bg-dotted-pattern bg-contain py-5 md:py-10">
        <div className="wrapper grid grid-cols-1 gap-5 md:grid-cols-2 2xl:gap-0">
          <div className="flex flex-col justify-center gap-8">
            <h1 className="h1-bold">
              {/* Host, Connect, Celebrate: Your Events, Our Platform! */}
              Sự hài lòng của bạn là sứ mệnh của chúng tôi!
            </h1>
            <p className="p-regular-20 md:p-regular-24">
              An toàn, Uy tín và Chất lượng luôn là những tiêu chí hàng đầu của
              Bông Sen Vàng suốt hơn 10 năm xây dựng thương hiệu bền vững. Với
              mục tiêu mang tới những sản phẩm hiệu quả, hỗ trợ nông dân và cây
              trồng đạt được những vụ mùa bội thu!
            </p>
            <Button className="button w-full sm:w-fit" size={"lg"} asChild>
              <Link href={"#about"}>Tìm hiểu thêm</Link>
            </Button>
          </div>

          <Image
            src={"/assets/images/hero.png"}
            alt="hero"
            width={1000}
            height={1000}
            className="max-h-[70vh] object-contain object-center 2xl:max-h-[60vh]"
          />
        </div>
      </section>

      <section
        id="products"
        className="wrapper my-8 flex flex-col gap-8 md:gap-12"
      >
        <h2 className="h2-bold">
          Trusted by <br /> Thousands of Retailers
        </h2>
        <div className="flex w-full flex-col gap-5 md:flex-row">
          search categoryfilter
        </div>
      </section>
    </>
  );
}
