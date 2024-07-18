import BasicInfo from "@/components/shared/BasicInfo";
import CategoryFilter from "@/components/shared/CategoryFilter";
import Collection from "@/components/shared/Collection";
import Search from "@/components/shared/Search";
import SectionContent from "@/components/shared/SectionContent";
import { Button } from "@/components/ui/button";
import { getAllProducts } from "@/lib/actions/product.actions";
import { SearchParamProps } from "@/types";
import Link from "next/link";

export default async function Home({ searchParams }: SearchParamProps) {
  const companyYear = new Date().getFullYear() - 2009;
  const page = Number(searchParams?.page) || 1;
  const searchText = (searchParams?.query as string) || "";
  const category = (searchParams?.category as string) || "";

  const products = await getAllProducts({
    query: searchText,
    category,
    page,
    limit: 6,
  });

  return (
    <>
      <section className="relative overflow-hidden w-full h-[100vh]">
        <div className="overlay flex items-center justify-start w-full h-full object-cover -z-10 overflow-hidden">
          <video
            className="w-full h-full object-cover fixed top-0 left-0 -z-50 opacity-[0.8]"
            autoPlay
            loop
            muted
            playsInline
          >
            <source src="/assets/images/hero.mp4" type="video/mp4" />
          </video>
          <div className="wrapper grid grid-cols-1 gap-5 md:grid-cols-2 2xl:gap-0 translate-y-4 text-white">
            <div className="flex flex-col justify-center gap-8">
              <h1 className="h1-bold animate-[appear_1s]">
                Sự hài lòng của bạn là sứ mệnh của chúng tôi!
              </h1>
              <p className="p-regular-20 md:p-regular-24 text-justify animate-[appear_3s]">
                An Toàn, Uy Tín và Chất Lượng luôn là những tiêu chí hàng đầu
                của
                <span className="text-logoYellow highlighter">
                  {" "}
                  Bông Sen Vàng{" "}
                </span>{" "}
                {/* trong suốt{" "}
                <span className="text-logoYellow highlighter">
                  {" "}
                  {companyYear} năm{" "}
                </span> */}
                khi xây dựng thương hiệu bền vững.
                {/* Với mục tiêu mang tới những sản
                phẩm hiệu quả, hỗ trợ nông dân và cây trồng đạt được những vụ
                mùa bội thu! */}
              </p>
              <Button
                className="button w-full sm:w-fit bg-logoYellow text-black animate-[appear_5s] hover:bg-logoYellow/70"
                size={"lg"}
                asChild
              >
                <Link href={"#introduction"}>Tìm hiểu thêm</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      <BasicInfo companyYear={companyYear} />

      <SectionContent
        bgColor={"green"}
        flexDirection="invert"
        buttonLink="/"
        header="Đội ngũ nhân viên thân thiện - chuyên nghiệp"
        desc="Lorem, ipsum dolor sit amet consectetur adipisicing elit. Sequi
                rerum voluptates cum consequatur. Architecto quae delectus
                maiores natus ducimus est vitae quis quo ipsa, eius qui,
                eligendi placeat. Error, ducimus?"
      />
      <SectionContent
        bgColor={"black"}
        flexDirection="revert"
        buttonLink="/products"
        header="Sản phẩm an toàn - chất lượng cao"
        desc="Lorem, ipsum dolor sit amet consectetur adipisicing elit. Sequi
                rerum voluptates cum consequatur. Architecto quae delectus
                maiores natus ducimus est vitae quis quo ipsa, eius qui,
                eligendi placeat. Error, ducimus?"
      />
      <SectionContent
        bgColor={"green"}
        flexDirection="invert"
        buttonLink="/news"
        header="Nhiều chính sách, sự kiện ưu đãi - hỗ trợ nông dân"
        desc="Lorem, ipsum dolor sit amet consectetur adipisicing elit. Sequi
                rerum voluptates cum consequatur. Architecto quae delectus
                maiores natus ducimus est vitae quis quo ipsa, eius qui,
                eligendi placeat. Error, ducimus?"
      />

      {/* <section id="products" className="bg-white py-8">
        <div className="wrapper flex flex-col gap-8 md:gap-12">
          <h2 className="h2-bold">
            Được tin dùng bởi <br /> Hàng trăm đại lý khắp Việt Nam
          </h2>
          <div className="flex w-full flex-col gap-5 md:flex-row">
            <Search />
            <CategoryFilter />
          </div>

          <Collection
            data={products?.data}
            emptyTitle="Không tìm thấy sản phẩm"
            emptyStateSubtext="Vui lòng quay lại sau"
            collectionType="All_Products"
            limit={6}
            page={page}
            totalPages={products?.totalPages}
          />
        </div>
      </section> */}
    </>
  );
}
