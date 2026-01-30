import { getSingleProduct } from "@/app/actions/products";
import EditProduct from "@/components/products/editProduct";

interface EditProductProps {
  params: Promise<{ id: string }>;
}

const Page = async ({ params }: EditProductProps) => {
  const { id } = await params;
  const product = await getSingleProduct(id);

  // console.log(product);

  if (!product.success) return <div>Product not found</div>;

  return (
    <EditProduct
      product={{
        id: product.data.id,
        name: product.data.name,
        price: product.data.price,
        description: product.data.description,
        stock: product.data.stock,
      }}
    />
  );
};

export default Page;
