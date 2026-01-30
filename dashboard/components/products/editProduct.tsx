"use client";

import { Product, ProductSchema } from "@/lib/schema/product";
import { FormBuilder } from "../shared/formBuilder/form";
import { updateProduct } from "@/app/actions/products";
import { toast } from "sonner";

const EditProduct = ({ product }: { product: Partial<Product> }) => {
  console.log(product);
  return (
    <div className="mx-auto max-w-4xl">
      <FormBuilder
        defaultValues={product}
        schema={ProductSchema}
        onSubmit={async (data) => {
          if (!product.id) return;
          const res = await updateProduct(product.id, data);
          if (res.success) {
            toast.success("Product updated successfully");
          } else {
            toast.error("Failed to update product");
          }
        }}
      />
    </div>
  );
};

export default EditProduct;
