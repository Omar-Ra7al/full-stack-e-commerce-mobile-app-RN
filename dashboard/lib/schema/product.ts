import { FieldType } from "@/components/shared/formBuilder/fields";
import { z } from "zod";

export const ProductSchema = z.object({
  name: z.string().min(3, "Name must be at least 3 characters").meta({
    type: FieldType.text,
    label: "Name",
    placeholder: "Enter product name",
  }),
  price: z.number().min(1, "Price must be at least 1").meta({
    type: FieldType.number,
    label: "Price",
    placeholder: "Enter product price",
  }),
  description: z
    .string()
    .min(3, "Description must be at least 3 characters")
    .meta({
      type: FieldType.textarea,
      label: "Description",
      placeholder: "Enter product description",
    }),
  stock: z.number().min(0, "Stock must be at least 0").meta({
    type: FieldType.number,
    label: "Stock",
    placeholder: "Enter product stock",
  }),
});

export type Product = z.infer<typeof ProductSchema> & { id: string };
