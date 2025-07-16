import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Image,
  StyleSheet,
  Alert,
} from "react-native";
import React, { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";

export default function Bookmarks() {
  return (
    <SafeAreaView className="bg-primary h-full">
      <ScrollView className="px-4 my-6 ">
        <Text className="text-2xl text-white font-psemibold">Favorites</Text>

        <View className="mt-4">
          <Text className="text-gray-400 font-pregular text-sm">
            You have no favorites yet.
          </Text>
        </View>

        <View className="mt-6">
          <TouchableOpacity
            onPress={() => Alert.alert("Add to Favorites")}
            className="bg-blue-500 p-4 rounded-lg"
          >
            <Text className="text-white font-psemibold text-center">
              Add to Favorites
            </Text>
          </TouchableOpacity>
        </View>
        <View className="mt-6">
          <Text className="text-gray-400 font-pregular text-sm">
            Your favorite items will appear here.
          </Text>
        </View>
        <View className="mt-6">
          <Image
            source={{ uri: "https://via.placeholder.com/150" }}
            style={styles.image}
          />
          <Text className="text-white font-pregular text-sm mt-2">
            Example Favorite Item
          </Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  image: {
    width: 150,
    height: 150,
    borderRadius: 10,
    marginBottom: 10,
  },
});
