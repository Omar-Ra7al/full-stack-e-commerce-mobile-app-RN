import { View, Text, Pressable } from "react-native";
import { useRouter } from "expo-router";

const GoogleAuthBtn = () => {
  const router = useRouter();

  const handleGoogleLogin = async () => {
    router.push("/home");
  };

  return (
    <View className="w-full">
      <Pressable
        className="w-full border border-zinc-300 rounded-xl px-4 py-3 items-center bg-white"
        onPress={handleGoogleLogin}
      >
        <View className="flex-row items-center gap-2">
          <Text className="text-base font-medium text-primaryr">
            Continue with Google
          </Text>
        </View>
      </Pressable>
    </View>
  );
};

export default GoogleAuthBtn;
