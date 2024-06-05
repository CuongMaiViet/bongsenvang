import ProductForm from "@/components/shared/ProductForm";
import { getProductById } from "@/lib/actions/product.actions";
import { auth } from "@clerk/nextjs";

type UpdateProductProps = {
  params: {
    id: string;
  };
};

const UpdateProduct = async ({ params: { id } }: UpdateProductProps) => {
  const { sessionClaims } = auth();
  const product = await getProductById(id);
  const userId = sessionClaims?.userId as string;

  return (
    <>
      <section className="bg-primary-50 bg-dotted-pattern bg-cover bg-center py-5 md:py-10">
        <h3 className="wrapper h3-bold text-center sm:text-left">
          Cập nhật sản phẩm
        </h3>
      </section>

      <div className="wrapper my-8">
        <ProductForm
          userId={userId}
          product={product}
          productId={product._id}
          type="Update"
        />
      </div>
    </>
  );
};

export default UpdateProduct;
