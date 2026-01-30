"use server";
import { adminDb } from "@/lib/admin";

export const addProduct = async (
  name: string,
  price: number,
  description: string,
) => {
  return await adminDb.createDoc("products", {
    description,
    name,
    price,
    id: "",
    url: "https://images.squarespace-cdn.com/content/v1/5ed6e10fb011a123217ba702/1727139534806-K219WNSVFLFTG6QOO2I3/unsplash-image-164_6wVEHfI.jpg",
  });
};

export const getSingleProduct = async (id: string) => {
  return await adminDb.getDoc("products", id);
};

export const deleteProduct = async (id: string) => {
  return await adminDb.deleteDoc("products", id);
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const updateProduct = async (id: string, data: any) => {
  return await adminDb.updateDoc("products", id, data);
};
