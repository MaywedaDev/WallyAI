import { Link } from "expo-router";
import React from "react";
import { ScrollView, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function Home() {
  return (
    <SafeAreaView className=" bg-primary h-full">
      <ScrollView contentContainerStyle={{ height: "100%" }}>
        <View className="flex flex-1 flex-col items-center justify-center">
          <Text className="text-red-600 text-3xl font-pblack">
            Hello World!
          </Text>
          <Link href="/home">
            <Text className="text-blue-600 text-2xl font-pblack">
              Go to Home
            </Text>
          </Link>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
