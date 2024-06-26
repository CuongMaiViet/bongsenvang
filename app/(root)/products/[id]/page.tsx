import Collection from "@/components/shared/Collection";
import InfoDisplay from "@/components/shared/InfoDisplay";
import {
  getProductById,
  getRelatedProductsByCategory,
} from "@/lib/actions/product.actions";
import { capitalize } from "@/lib/utils";
import { SearchParamProps } from "@/types";
import Image from "next/image";
import React from "react";

const ProductDetails = async ({
  params: { id },
  searchParams,
}: SearchParamProps) => {
  const product = await getProductById(id);

  const relatedProduct = await getRelatedProductsByCategory({
    categoryId: product.category._id,
    productId: product._id,
    page: searchParams.page as string,
  });

  return (
    <>
      <section className="flex justify-center bg-primary-50 bg-dotted-pattern bg-contain md:max-h-[630px]">
        <div className="grid grid-cols-1 md:grid-cols-2 2xl:max-w-7xl">
          <Image
            src={product.imageUrl}
            alt="hero image"
            width={500}
            height={500}
            className="h-full min-h-[300px] object-contain object-top md:object-center"
          />
          <div className="flex w-full flex-col gap-8 p-5 md:py-10 md:max-h-full md:overflow-y-auto">
            <div className="flex flex-col gap-6">
              <h2 className="h2-bold">{product.title}</h2>

              <div className="flex  flex-col gap-3 sm:flex-row sm:items-center">
                <div className="flex gap-3">
                  <p className="p-bold-20 rounded-full bg-green-500/10 px-5 py-2 text-green-700">
                    <span className="uppercase line-clamp-1">
                      {product.slogan}
                    </span>
                  </p>
                  <p className="p-medium-16 rounded-full bg-grey-500/10 px-4 py-2.5 text-grey-500">
                    {product.price === "0 VNĐ" ? (
                      <span className="line-clamp-1">
                        {capitalize(product.category.title)}
                      </span>
                    ) : (
                      `${product.price}`
                    )}
                  </p>
                </div>
              </div>
            </div>

            {/* BUTTON */}

            <div className="flex flex-col gap-5">
              {product.registrationNumber && (
                <p className="p-medium-18 ml-2 mt-2 sm:mt-0">
                  SĐK:{" "}
                  <span className="text-primary-500 uppercase">
                    {product.registrationNumber}
                  </span>
                </p>
              )}

              <div className="flex items-center gap-2 md:gap-3">
                <Image
                  src="/assets/icons/calendar.svg"
                  alt="calendar"
                  width={0}
                  height={0}
                  className="w-[32px] h-auto"
                />
                {product.exp && (
                  <div className="p-medium-16 lg:p-regular-20">
                    <p>{`Hạn sử dụng: ${product.exp}`}</p>
                  </div>
                )}
              </div>

              <div className="flex items-center gap-2 md:gap-3">
                <Image
                  src={"/assets/icons/location.svg"}
                  alt="location"
                  width={0}
                  height={0}
                  className="w-[32px] h-auto"
                />
                <p className="p-medium-16 lg:p-regular-20">
                  {product.formulation.abbreviation} -{" "}
                  {capitalize(product.formulation.title)}
                </p>
              </div>
            </div>

            {product.manual.intro && (
              <InfoDisplay title="Tổng quan">
                {product.manual.intro}
              </InfoDisplay>
            )}

            {product.benefit.length > 0 && (
              <InfoDisplay title="Lợi ích">
                {product.benefit.map((p: string, i: number) => (
                  <div className="flex gap-2 items-center" key={i}>
                    <Image
                      src={"/assets/icons/handright.png"}
                      alt="handright"
                      width={32}
                      height={32}
                    />
                    <span className="">{p}</span>
                  </div>
                ))}
              </InfoDisplay>
            )}

            {product.manual.useHow && (
              <InfoDisplay title="Cách dùng">
                {product.manual.useHow}
              </InfoDisplay>
            )}

            {product.manual.note && (
              <InfoDisplay title="Chú ý" titleSize="p-bold-16">
                {product.manual.note}
              </InfoDisplay>
            )}

            {product.manual.useWhen && (
              <InfoDisplay title="Thời điểm sử dụng">
                {product.manual.useWhen}
              </InfoDisplay>
            )}

            {product.manual.quarantine !== " ngày" && (
              <InfoDisplay title="Thời gian cách ly">
                {product.manual.quarantine}
              </InfoDisplay>
            )}

            <InfoDisplay title="Hướng dẫn an toàn chung">
              {product.manual.safetyInstruction}
            </InfoDisplay>
            <InfoDisplay title="Cất giữ, sử dụng và xử lý bao gói sau sử dụng">
              {product.manual.afterUse}
            </InfoDisplay>
            <InfoDisplay title="Sơ cấp cứu">
              {product.manual.firstAid}
            </InfoDisplay>
          </div>
        </div>
      </section>

      {/* <!-- Sản phẩm thuộc cùng category --> */}
      <section className="wrapper my-8 flex flex-col gap-8 md:gap-12">
        <h2 className="h2-bold">Các sản phẩm khác</h2>

        <Collection
          data={relatedProduct?.data}
          emptyTitle="Không tìm thấy sản phẩm"
          emptyStateSubtext="Vui lòng quay lại sau"
          collectionType="All_Products"
          limit={3}
          page={searchParams.page as string}
          totalPages={relatedProduct?.totalPages}
        />
      </section>
    </>
  );
};

export default ProductDetails;
