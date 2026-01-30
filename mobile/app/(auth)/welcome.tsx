import React, { useRef, useState } from "react";
import { View, Text, Pressable, Animated } from "react-native";
import { useRouter } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";

export default function Welcome() {
  const router = useRouter();

  const [isNavigating, setIsNavigating] = useState(false);

  // Smooth transition (fade out + scale)
  const fade = useRef(new Animated.Value(1)).current;
  const scale = useRef(new Animated.Value(1)).current;

  const handleStart = () => {
    if (isNavigating) return;
    setIsNavigating(true);

    // 1) save in store

    // 2) animate then navigate
    Animated.parallel([
      Animated.timing(fade, {
        toValue: 0,
        duration: 260,
        useNativeDriver: true,
      }),
      Animated.timing(scale, {
        toValue: 0.96,
        duration: 260,
        useNativeDriver: true,
      }),
    ]).start(() => {
      router.replace("/signup");
    });
  };

  return (
    <SafeAreaView className="flex-1 bg-primary">
      <Animated.View
        style={{ opacity: fade, transform: [{ scale }] }}
        className="flex-1 px-6"
      >
        {/* Top space */}
        <View className="flex-1 justify-center">
          {/* Creative header */}
          <View className="items-center">
            {/* Logo bubble / decorative */}
            <View className="w-20 h-20 rounded-3xl bg-secondary/10 items-center justify-center mb-5">
              <Text className="text-3xl">🛍️</Text>
            </View>

            <Text className="text-secondary text-3xl font-extrabold tracking-tight text-center">
              Welcome 👋
            </Text>

            <Text className="text-secondary/70 text-center mt-3 leading-6">
              Discover fresh products, smooth checkout, and a clean experience —
              built for you.
            </Text>
          </View>

          {/* Features pills */}
          <View className="mt-8 flex-row flex-wrap justify-center gap-2">
            <View className="px-3 py-2 rounded-full bg-secondary/10">
              <Text className="text-secondary/80 text-sm">Fast</Text>
            </View>
            <View className="px-3 py-2 rounded-full bg-secondary/10">
              <Text className="text-secondary/80 text-sm">Secure</Text>
            </View>
            <View className="px-3 py-2 rounded-full bg-secondary/10">
              <Text className="text-secondary/80 text-sm">Modern UI</Text>
            </View>
          </View>
        </View>

        {/* Bottom CTA */}
        <View className="pb-8">
          <Pressable
            onPress={handleStart}
            disabled={isNavigating}
            className="bg-secondary rounded-2xl py-4 items-center active:opacity-90"
          >
            <Text className="text-primary font-bold text-base">
              Get Started
            </Text>
          </Pressable>

          <Text className="text-secondary/50 text-center text-xs mt-3">
            By continuing, you agree to our terms & privacy policy.
          </Text>
        </View>
      </Animated.View>
    </SafeAreaView>
  );
}
