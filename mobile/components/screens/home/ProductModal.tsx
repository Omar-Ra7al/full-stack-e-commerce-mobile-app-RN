import { Modal, View, Text, Pressable } from "react-native";
import React from "react";
import { Image } from "expo-image";
import { SafeAreaView } from "react-native-safe-area-context";

const ProductModal = ({
  modalVisible,
  setModalVisible,
  selectedProduct,
}: {
  modalVisible: boolean;
  setModalVisible: (v: boolean) => void;
  selectedProduct: any;
}) => {
  return (
    <SafeAreaView className="flex-1">
      <Modal
        visible={modalVisible}
        presentationStyle="overFullScreen"
        animationType="slide"
        transparent
        onRequestClose={() => setModalVisible(false)}
      >
        {/* Overlay */}
        <View className="flex-1 bg-black/50">
          {/* ✅ Safe area INSIDE modal */}
          {/* Sheet */}
          <View className="flex-1 bg-primary rounded-t-3xl pt-4">
            {/* Drag Indicator */}
            <View className="w-12 h-1 bg-secondary/40 rounded-full self-center mb-4" />

            <View className="w-full h-64 bg-secondary/5">
              <Image
                source={{ uri: selectedProduct?.image }}
                style={{ width: "100%", height: "100%" }}
                contentFit="cover"
              />
            </View>

            <View className="flex-1 p-5">
              <Text className="text-secondary text-2xl font-bold mb-2">
                {selectedProduct?.name}
              </Text>
              <Text className="text-secondary/80 mb-4">
                {selectedProduct?.description}
              </Text>
            </View>

            <Pressable
              onPress={() => setModalVisible(false)}
              className="p-4 border-t border-secondary/20"
            >
              <Text className="text-center text-secondary font-semibold">
                Close
              </Text>
            </Pressable>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
};

export default ProductModal;
