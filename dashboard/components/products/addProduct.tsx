"use client";

import { ProductSchema } from "@/lib/schema/product";
import { FormBuilder } from "../shared/formBuilder/form";
import { addProduct } from "@/app/actions/products";
import { toast } from "sonner";
const CreateProduct = () => {
  return (
    <div className="mx-auto max-w-4xl">
      <FormBuilder
        schema={ProductSchema}
        onSubmit={async (data) => {
          const res = await addProduct(
            data.name,
            data.price,
            data.description,
            data.stock,
          );
          if (res.success) {
            toast.success("Product added successfully");
          } else {
            toast.error("Failed to add product");
          }
        }}
      />
    </div>
  );
};

export default CreateProduct;
