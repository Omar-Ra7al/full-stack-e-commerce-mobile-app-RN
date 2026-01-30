import { View, Text, Pressable } from "react-native";
import React from "react";
import { ProductType } from "@/lib/client/dbCollections";
import { useCartStore } from "@/store/cart";
import { ShoppingCartIcon, TrashIcon } from "lucide-react-native";

const CardActions = ({
  product,
  className,
}: {
  product: ProductType;
  className?: string;
}) => {
  const addItem = useCartStore((s) => s.addItem);
  const removeItem = useCartStore((s) => s.removeItem);
  const incrementQuantity = useCartStore((s) => s.incrementQuantity);
  const decrementQuantity = useCartStore((s) => s.decrementQuantity);

  const inCart = useCartStore((s) =>
    product.id ? s.cart.some((i) => i.id === product.id) : false,
  );

  const cartItem = useCartStore((s) =>
    product.id ? s.cart.find((i) => i.id === product.id) : undefined,
  );

  const handleAddToCart = () => {
    if (!product.id) return;
    if (inCart) return;

    addItem({
      id: product.id,
      price: product.price,
      image: product.image,
      quantity: 1,
      stock: product.stock,
      name: product.name,
      description: product.description ?? "",
    });
  };

  const handleRemoveFromCart = () => {
    if (!product.id) return;
    removeItem(product.id);
  };

  return (
    <View>
      {!inCart ? (
        <Pressable
          onPress={handleAddToCart}
          className="bg-primary px-3 py-1.5 rounded-full items-center justify-center"
        >
          <Text className="text-secondary text-sm font-semibold text-center">
            Add to Cart <ShoppingCartIcon size={13} color={"white"} />
          </Text>
        </Pressable>
      ) : (
        <View
          className={`flex-row justify-between items-center gap-2 rounded-full ${className}`}
        >
          <View className="flex-1 flex-row justify-between items-center bg-primary rounded-full px-3 py-1.5">
            <Pressable
              className="px-2 h-full"
              onPress={() => decrementQuantity(product.id!)}
            >
              <Text className="text-secondary text-lg font-semibold text-center">
                -
              </Text>
            </Pressable>

            <Text className="text-secondary text-sm font-semibold text-center">
              {cartItem?.quantity ?? 0}
            </Text>

            <Pressable
              className="px-2 h-full"
              onPress={() => incrementQuantity(product.id!)}
            >
              <Text className="text-secondary text-lg font-semibold text-center">
                +
              </Text>
            </Pressable>
          </View>

          <Pressable
            onPress={handleRemoveFromCart}
            className="bg-primary px-4 py-2.5 rounded-full items-center justify-center"
          >
            <TrashIcon size={16} color={"red"} />
          </Pressable>
        </View>
      )}
    </View>
  );
};

export default CardActions;
