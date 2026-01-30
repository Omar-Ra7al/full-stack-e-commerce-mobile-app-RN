import { View, Text, TouchableOpacity, Pressable } from "react-native";
import React, { useState } from "react";
import { Image } from "expo-image";
import { ProductType } from "@/lib/client/dbCollections";
import ProductModal from "../screens/home/ProductModal";
import { useCartStore } from "@/store/cart";
import { ShoppingCartIcon, TrashIcon } from "lucide-react-native";

interface ProductCardProps {
  product: ProductType;
  onPress?: () => void;
}

const ProductCard = ({ product, onPress }: ProductCardProps) => {
  const [modalVisible, setModalVisible] = useState(false);

  return (
    <TouchableOpacity
      onPress={() => {
        onPress && onPress();
        setModalVisible(true);
      }}
      activeOpacity={0.7}
      className="flex-1 h-full rounded-xl overflow-hidden bg-secondary/10 border border-secondary/20"
      style={{ minWidth: 100, maxWidth: 180 }}
    >
      {/* Product Image */}
      <View className="w-full h-32 bg-secondary/5">
        <Image
          source={{ uri: product.image }}
          style={{ width: "100%", height: "100%" }}
          className="w-full h-full"
          contentFit="cover"
          transition={200}
          placeholder={require("../../assets/images/partial-react-logo.png")}
        />
      </View>

      {/* Product Info */}
      <View className="p-2.5 gap-2 flex flex-1 justify-between flex-col">
        {/* Product Name */}
        <Text
          className="text-secondary uppercase text-sm font-semibold"
          numberOfLines={2}
          ellipsizeMode="tail"
        >
          {product.name}
        </Text>

        {/* Product Price */}
        <View className="flex-row items-center justify-between">
          <Text className="text-secondary/90 text-base font-bold">
            ${product.price.toFixed(2)}
          </Text>
        </View>

        {/* Description Preview (optional) */}
        {product.description && (
          <Text
            className="text-secondary/60 text-xs mt-0.5"
            numberOfLines={2}
            ellipsizeMode="tail"
          >
            {product.description}
          </Text>
        )}

        <CardActions product={product} />
      </View>

      {modalVisible && (
        <ProductModal
          selectedProduct={product}
          modalVisible={modalVisible}
          setModalVisible={setModalVisible}
        />
      )}
    </TouchableOpacity>
  );
};

export default ProductCard;

const CardActions = ({ product }: { product: ProductType }) => {
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
          className="bg-primary px-3 py-1.5 rounded-full"
        >
          <Text className="text-secondary text-sm font-semibold text-center">
            Add to Cart <ShoppingCartIcon size={13} color={"white"} />
          </Text>
        </Pressable>
      ) : (
        <View className="flex-1 flex-nowrap flex flex-row justify-between gap-2">
          <View className="flex-1 w-[80%] flex-row justify-between items-center gap-2 bg-primary rounded-full">
            <Pressable
              onPress={() => decrementQuantity(product.id!)}
              className="bg-primary px-3 py-1.5 rounded-full"
            >
              <Text className="text-secondary text-sm font-semibold text-center">
                -
              </Text>
            </Pressable>

            <Text className="text-secondary text-sm font-semibold text-center">
              {cartItem?.quantity ?? 0}
            </Text>

            <Pressable
              onPress={() => incrementQuantity(product.id!)}
              className="bg-primary px-3 py-1.5 rounded-full"
            >
              <Text className="text-secondary text-sm font-semibold text-center">
                +
              </Text>
            </Pressable>
          </View>

          <Pressable
            onPress={handleRemoveFromCart}
            className="bg-primary px-3 py-1.5 rounded-full w-[25%]"
          >
            <TrashIcon size={13} color={"red"} />
          </Pressable>
        </View>
      )}
    </View>
  );
};
