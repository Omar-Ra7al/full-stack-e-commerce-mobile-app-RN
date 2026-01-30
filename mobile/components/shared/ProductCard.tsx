import { View, Text, TouchableOpacity } from "react-native";
import React, { useState } from "react";
import { Image } from "expo-image";
import { ProductType } from "@/lib/client/dbCollections";
import ProductModal from "../screens/home/ProductModal";
import CardActions from "./CardActions";

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
