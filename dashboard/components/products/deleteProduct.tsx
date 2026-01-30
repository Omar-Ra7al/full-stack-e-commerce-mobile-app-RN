"use client";

/* eslint-disable @typescript-eslint/no-explicit-any */
import { Button } from "../ui/button";
import { deleteProduct } from "@/app/actions/products";
import { toast } from "sonner";

const DeleteProduct = (id: any) => {
  return (
    <Button
      size="sm"
      variant="destructive"
      className="min-w-fit w-fit"
      onClick={async () => {
        const res = await deleteProduct(id.id);
        console.log(id);
        console.log(res);
        if (res.success) {
          toast.success("Product deleted successfully");
        } else {
          toast.error("Failed to delete product");
        }
      }}
    >
      Delete
    </Button>
  );
};

export default DeleteProduct;
