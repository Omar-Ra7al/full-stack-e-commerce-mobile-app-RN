import ScreenWraper from "@/components/shared/ScreenWraper";
import { Text, View, TouchableOpacity, Image, ScrollView, ActivityIndicator } from "react-native";
import { useEffect, useState } from "react";
import { clientAuth } from "@/lib/client";
import { auth } from "@/lib/client/config";
import { router } from "expo-router";
import { onAuthStateChanged, User } from "firebase/auth";

export default function Account() {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setLoading(false);
      
      // Redirect to login if not authenticated
      if (!currentUser) {
        router.replace("/welcome");
      }
    });

    return () => unsubscribe();
  }, []);

  const handleSignOut = async () => {
    try {
      await clientAuth.logout();
      router.replace("/welcome");
    } catch (error) {
      console.error("Error signing out:", error);
    }
  };

  if (loading) {
    return (
      <ScreenWraper>
        <View className="flex-1 items-center justify-center">
          <ActivityIndicator size="large" color="#0000ff" />
        </View>
      </ScreenWraper>
    );
  }

  if (!user) {
    return (
      <ScreenWraper>
        <View className="flex-1 items-center justify-center">
          <Text className="text-lg">No user found</Text>
        </View>
      </ScreenWraper>
    );
  }

  return (
    <ScreenWraper>
      <ScrollView className="flex-1">
        <View className="p-6">
          {/* Profile Header */}
          <View className="items-center mb-8">
            {user.photoURL ? (
              <Image
                source={{ uri: user.photoURL }}
                className="w-24 h-24 rounded-full mb-4"
              />
            ) : (
              <View className="w-24 h-24 rounded-full bg-gray-300 items-center justify-center mb-4">
                <Text className="text-4xl text-gray-600">
                  {user.displayName?.charAt(0).toUpperCase() || user.email?.charAt(0).toUpperCase()}
                </Text>
              </View>
            )}
            <Text className="text-2xl font-bold mb-2">
              {user.displayName || "User"}
            </Text>
            <Text className="text-gray-600">{user.email}</Text>
          </View>

          {/* User Information */}
          <View className="bg-white rounded-lg shadow-sm p-4 mb-4">
            <Text className="text-lg font-semibold mb-4">Account Information</Text>
            
            <View className="mb-3">
              <Text className="text-gray-500 text-sm">Display Name</Text>
              <Text className="text-base">{user.displayName || "Not set"}</Text>
            </View>

            <View className="mb-3">
              <Text className="text-gray-500 text-sm">Email</Text>
              <Text className="text-base">{user.email}</Text>
            </View>

            <View className="mb-3">
              <Text className="text-gray-500 text-sm">Email Verified</Text>
              <Text className="text-base">{user.emailVerified ? "Yes" : "No"}</Text>
            </View>

            <View className="mb-3">
              <Text className="text-gray-500 text-sm">User ID</Text>
              <Text className="text-xs">{user.uid}</Text>
            </View>

            {user.phoneNumber && (
              <View className="mb-3">
                <Text className="text-gray-500 text-sm">Phone Number</Text>
                <Text className="text-base">{user.phoneNumber}</Text>
              </View>
            )}

            <View>
              <Text className="text-gray-500 text-sm">Account Created</Text>
              <Text className="text-base">
                {user.metadata.creationTime 
                  ? new Date(user.metadata.creationTime).toLocaleDateString()
                  : "Unknown"}
              </Text>
            </View>
          </View>

          {/* Sign Out Button */}
          <TouchableOpacity
            onPress={handleSignOut}
            className="bg-red-500 rounded-lg py-4 items-center"
          >
            <Text className="text-white font-semibold text-base">Sign Out</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </ScreenWraper>
  );
}
