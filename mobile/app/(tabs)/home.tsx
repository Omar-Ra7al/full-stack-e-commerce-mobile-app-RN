import {
  FlatList,
  RefreshControl,
  Text,
  View,
  ActivityIndicator,
} from "react-native";
import { clientDb } from "@/lib/client";
import { useState } from "react";
import ProductCard from "@/components/shared/ProductCard";
import useFetch from "@/hooks/useFetch";
import { ShoppingBag } from "lucide-react-native";
import ScreenWraper from "@/components/shared/ScreenWraper";

const fetchProductsData = async () => {
  try {
    const res = await clientDb.getDocs("products");
    console.log("Fetched products:", res);
    if (!res.success) throw new Error("Failed to fetch products");
    return res.data;
  } catch (error) {
    console.error("Error fetching products:", error);
    throw error;
  }
};

export default function HomeScreen() {
  const {
    data: products,
    loading: productsLoading,
    error: productsError,
    refetch,
  } = useFetch(() => fetchProductsData());

  // Refresh Products
  const [refresh, setRefresh] = useState(false);
  const handleRefresh = async () => {
    setRefresh(true);
    await refetch();
    setRefresh(false);
  };
  // >>

  // Header Component
  const ListHeader = () => (
    <View className="pt-16 pb-6">
      <View className="flex-row items-center gap-3 mb-2">
        <ShoppingBag size={32} color="#f1f5f9" />
        <Text className="text-secondary text-3xl font-bold">Store</Text>
      </View>
      <Text className="text-secondary/70 text-base">
        Discover our latest products
      </Text>
    </View>
  );

  // Empty State Component
  const EmptyState = () => {
    if (productsLoading) {
      return (
        <View className="flex-1 items-center justify-center py-20">
          <ActivityIndicator size="large" color="#f1f5f9" />
          <Text className="text-secondary/70 mt-4 text-base">
            Loading products...
          </Text>
        </View>
      );
    }

    if (productsError) {
      return (
        <View className="flex-1 items-center justify-center py-20">
          <Text className="text-red-400 text-center text-base mb-2">
            Error loading products
          </Text>
          <Text className="text-secondary/60 text-center text-sm">
            {productsError.message}
          </Text>
        </View>
      );
    }

    return (
      <View className="flex-1 items-center justify-center py-20">
        <ShoppingBag size={64} color="#f1f5f9" opacity={0.3} />
        <Text className="text-secondary/70 mt-4 text-lg">
          No products available
        </Text>
        <Text className="text-secondary/50 text-sm mt-2">
          Check back later for new items
        </Text>
      </View>
    );
  };

  return (
    <ScreenWraper>
      <FlatList
        className="w-full flex-1"
        data={products && Array.isArray(products) ? products : []}
        renderItem={({ item }) => <ProductCard product={item} />}
        keyExtractor={(item, index) => item.id?.toString() || index.toString()}
        numColumns={2}
        contentContainerStyle={{ gap: 6 }}
        ListHeaderComponent={ListHeader}
        ListEmptyComponent={EmptyState}
        refreshControl={
          <RefreshControl refreshing={refresh} onRefresh={handleRefresh} />
        }
        showsVerticalScrollIndicator={false}
      />
    </ScreenWraper>
  );
}
