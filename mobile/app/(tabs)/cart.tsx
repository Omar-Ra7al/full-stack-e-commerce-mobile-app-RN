import { View, Text, FlatList, TouchableOpacity } from "react-native";
import React from "react";
import { useCartStore } from "@/store/cart";
import { Image } from "expo-image";
import CardActions from "@/components/shared/CardActions";
import { ProductType } from "@/lib/client/dbCollections";
import { SafeAreaView } from "react-native-safe-area-context";

export default function CartScreen() {
  const cart = useCartStore((state) => state.cart);
  const totalPrice = useCartStore((state) => state.getTotalPrice());
  const totalItems = useCartStore((state) => state.getTotalItems());

  if (cart.length === 0) {
    return (
      <SafeAreaView className="flex-1 bg-primary">
        <View className="flex-1 items-center justify-center px-6">
          <Text className="text-secondary text-2xl font-bold mb-4">
            Your Cart is Empty
          </Text>
          <Text className="text-secondary/60 text-center">
            Add some products to your cart to see them here
          </Text>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView className="flex-1 bg-primary">
      <View className="flex-1">
        {/* Header */}
        <View className="px-4 py-4 border-b border-secondary/10">
          <Text className="text-secondary text-2xl font-bold">
            Shopping Cart
          </Text>
          <Text className="text-secondary/60 text-sm mt-1">
            {totalItems} {totalItems === 1 ? "item" : "items"}
          </Text>
        </View>

        {/* Cart Items */}
        <FlatList
          data={cart}
          keyExtractor={(item) => item.id}
          contentContainerStyle={{ padding: 16 }}
          showsVerticalScrollIndicator={false}
          renderItem={({ item }) => (
            <View className="mb-4 bg-secondary/10 rounded-xl overflow-hidden border border-secondary/20">
              <View className="flex-row p-4">
                {/* Product Image */}
                <View className="w-24 h-24 rounded-lg overflow-hidden bg-secondary/5 mr-4">
                  <Image
                    source={{ uri: item.image }}
                    style={{ width: "100%", height: "100%" }}
                    contentFit="cover"
                    transition={200}
                  />
                </View>

                {/* Product Info */}
                <View className="flex-1 justify-between">
                  <View>
                    <Text
                      className="text-secondary text-base font-semibold uppercase"
                      numberOfLines={2}
                    >
                      {item.name}
                    </Text>
                    {item.description && (
                      <Text
                        className="text-secondary/60 text-xs mt-1"
                        numberOfLines={2}
                      >
                        {item.description}
                      </Text>
                    )}
                  </View>

                  <View className="flex-row items-center justify-between mt-2">
                    <Text className="text-secondary text-lg font-bold">
                      ${(item.price * item.quantity).toFixed(2)}
                    </Text>
                    <Text className="text-secondary/60 text-xs">
                      ${item.price.toFixed(2)} each
                    </Text>
                  </View>
                </View>
              </View>

              {/* Actions */}
              <View className="px-4 pb-4">
                <CardActions
                  product={
                    {
                      id: item.id,
                      name: item.name,
                      price: item.price,
                      image: item.image,
                      description: item.description,
                      stock: item.stock,
                    } as ProductType
                  }
                />
              </View>
            </View>
          )}
        />

        {/* Footer - Total & Checkout */}
        <View className="border-t border-secondary/10 px-4 py-4 bg-primary">
          <View className="flex-row justify-between items-center mb-4">
            <Text className="text-secondary text-lg font-semibold">
              Subtotal
            </Text>
            <Text className="text-secondary text-2xl font-bold">
              ${totalPrice.toFixed(2)}
            </Text>
          </View>

          <View className="gap-3">
            <TouchableOpacity
              className="bg-accent py-4 rounded-full"
              activeOpacity={0.8}
            >
              <Text className="text-secondary text-center text-base font-bold">
                Proceed to Checkout
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
}
