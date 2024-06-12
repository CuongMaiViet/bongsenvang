"use client";

import { useRouter, useSearchParams } from "next/navigation";
import React from "react";
import { Button } from "../ui/button";
import { formUrlQuery } from "@/lib/utils";

type PaginationProps = {
  page: number | string;
  totalPages: number;
  urlParamName?: string;
};
const Pagination = ({ urlParamName, page, totalPages }: PaginationProps) => {
  const router = useRouter();
  const searchParams = useSearchParams();

  const onBtnClick = (btnType: string) => {
    const pageValue = btnType === "next" ? Number(page) + 1 : Number(page) - 1;
    const newUrl = formUrlQuery({
      params: searchParams.toString(),
      key: urlParamName || "page",
      value: pageValue.toString(),
    });
    router.push(newUrl, { scroll: false });
  };

  return (
    <div className="flex gap-2">
      <Button
        size={"lg"}
        variant={"outline"}
        className="w-28"
        onClick={() => onBtnClick("prev")}
        disabled={Number(page) <= 1}
      >
        Trước
      </Button>
      <Button
        size={"lg"}
        variant={"outline"}
        className="w-28"
        onClick={() => onBtnClick("next")}
        disabled={Number(page) >= totalPages}
      >
        Sau
      </Button>
    </div>
  );
};

export default Pagination;
