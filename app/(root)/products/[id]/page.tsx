import { getProductById } from "@/lib/actions/product.actions";
import { SearchParamProps } from "@/types";
import React from "react";

const ProductDetails = async ({ params: { id } }: SearchParamProps) => {
  const product = await getProductById(id);
  console.log(product);

  return <div>ProductDetails</div>;
};

export default ProductDetails;
