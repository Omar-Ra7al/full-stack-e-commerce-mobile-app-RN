import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import Link from "next/link";
import { adminDb } from "@/lib/admin";
import Image from "next/image";
import DeleteProduct from "@/components/products/deleteProduct";

export default async function Products() {
  // const products = await getAllSortedProducts();

  const res = await adminDb.getDocs("products");

  console.log(res);
  return (
    <div className="flex flex-col section-items-gap">
      <Button
        asChild
        size="sm"
        variant="outline"
        className="ms-auto min-w-fit w-fit"
      >
        <Link href="/products/add">
          Add New <Plus className="ml-2" />
        </Link>
      </Button>

      <div className="flex items-center justify-center flex-wrap gap-10 p-10">
        {res.success && res.data ? (
          res.data.map((product) => {
            return (
              <div
                key={product.id}
                className="w-80 h-120 bg-primary/10 rounded-2xl flex flex-col items-center overflow-hidden"
              >
                <Image
                  className="w-full h-60 object-cover"
                  src={
                    product.url ||
                    "https://images.squarespace-cdn.com/content/v1/5ed6e10fb011a123217ba702/1727139534806-K219WNSVFLFTG6QOO2I3/unsplash-image-164_6wVEHfI.jpg"
                  }
                  alt=""
                  width={1000}
                  height={1000}
                />
                <div className="w-full flex-1 p-3 flex flex-col justify-between">
                  <div>
                    <h1 className="text-2xl font-extrabold uppercase w-full">
                      {product.name}
                    </h1>
                    <p>{product.description}</p>
                  </div>
                  <span>${product.price}</span>

                  {/* ACTIONS */}
                  <div className="w-full flex justify-between items-center">
                    <Button
                      asChild
                      size="sm"
                      variant="outline"
                      className="min-w-fit w-fit"
                    >
                      <Link href={`/products/${product.id}`}>Edit</Link>
                    </Button>

                    <DeleteProduct id={product.id} />
                  </div>
                </div>
              </div>
            );
          })
        ) : (
          <div className="text-center py-8 text-secondary">
            No products available.
          </div>
        )}
      </div>
    </div>
  );
}
