import { Tabs } from "expo-router";
import { House, ShoppingCart, User2Icon } from "lucide-react-native";
import { StatusBar } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useCartStore } from "@/store/cart";
export default function RootLayout() {
  const cartItems = useCartStore((s) => s.getTotalItems());

  return (
    <SafeAreaView className="flex-1 bg-primary">
      <StatusBar barStyle="light-content" />
      <Tabs
        screenOptions={{
          headerShown: false,
          tabBarShowLabel: false,
          tabBarActiveTintColor: "white",
          tabBarInactiveTintColor: "gray",
          tabBarStyle: {
            backgroundColor: "#0f172b",
          },
        }}
      >
        <Tabs.Screen
          name="home"
          options={{
            tabBarIcon: ({ color }) => <House color={color} />,
            title: "Home",
          }}
        />
        <Tabs.Screen
          name="account"
          options={{
            title: "Account",
            tabBarIcon: ({ color }) => <User2Icon color={color} />,
          }}
        />
        <Tabs.Screen
          name="cart"
          options={{
            title: "Cart",
            tabBarIcon: ({ color }) => <ShoppingCart color={color} />,
            tabBarBadge: cartItems > 0 ? cartItems : undefined,
          }}
        />
      </Tabs>
    </SafeAreaView>
  );
}
