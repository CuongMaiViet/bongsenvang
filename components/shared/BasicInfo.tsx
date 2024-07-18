"use client";

import React from "react";
import CountUp from "react-countup";

const BasicInfo = ({ companyYear }: { companyYear: number }) => {
  return (
    <section id="introduction" className="bg-white py-20">
      <div className="wrapper flex flex-col gap-16 items-center justify-center w-full">
        <div className="flex flex-col gap-3 justify-center items-center">
          <h1 className="h1-bold text-logoGreen">
            <CountUp end={companyYear} enableScrollSpy />{" "}
            <span className="h3-bold text-logoGreen">năm</span>
          </h1>{" "}
          <p className="h2-bold text-black text-center md:text-justify">
            Cùng nông dân phát triển bền vững
          </p>
        </div>

        <div className="p-regular-20 text-justify md:p-regular-24 md:text-center ">
          Thành lập từ năm 2009, công ty{" "}
          <span className="text-logoYellow"> Bông Sen Vàng </span> luôn gắn bó
          với người nông dân và đóng góp vào sự phát triển bền vững của nền nông
          nghiệp Việt Nam. Với{" "}
          <span className="text-logoYellow"> mục tiêu </span> mang tới những sản
          phẩm{" "}
          <span className="text-logoGreen underline underline-offset-4 decoration-logoGreen">
            {" "}
            an toàn và hiệu quả{" "}
          </span>{" "}
          giúp cây trồng đạt được những vụ mùa bội thu. Đồng thời
          <span className="text-logoGreen underline underline-offset-4 decoration-logoGreen">
            {" "}
            hỗ trợ và nâng cao{" "}
          </span>{" "}
          chất lượng cuộc sống của người nông dân, chính là{" "}
          <span className="text-logoYellow"> tầm nhìn </span> của công ty.
        </div>

        <div className="grid grid-cols-2 justify-center items-center gap-10 md:grid-cols-4 w-full">
          <div className="basic-info-card flex flex-col items-center justify-center">
            <h1 className="h1-bold">
              <CountUp end={1} enableScrollSpy />
            </h1>
            <p className="p-medium-24 text-black">Quốc gia</p>
          </div>
          <div className="basic-info-card flex flex-col items-center justify-center">
            <h1 className="h1-bold">
              <CountUp end={25} enableScrollSpy />
            </h1>
            <p className="p-medium-24 text-black">Tỉnh Thành</p>
          </div>
          <div className="basic-info-card flex flex-col items-center justify-center">
            <h1 className="h1-bold">
              <CountUp end={500} enableScrollSpy suffix=" +" />
            </h1>
            <p className="p-medium-24 text-black">Đối tác</p>
          </div>
          <div className="basic-info-card flex flex-col items-center justify-center">
            <h1 className="h1-bold">
              <CountUp end={900} enableScrollSpy suffix=" +" />
            </h1>
            <p className="p-medium-24 text-black">Khách Hàng</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default BasicInfo;
