import { Link, Redirect, router } from "expo-router";
import React from "react";
import { Image, ScrollView, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { images } from "../constants/";
import CustomButton from "@/components/CustomButton";
import { StatusBar } from "expo-status-bar";
import { useGlobalContext } from "context/GlobalProvider";

export default function Home() {
  const { isLoading, isLoggedIn } = useGlobalContext();

  // console.log("isLoggedIn", isLoggedIn);
  // console.log("isLoading", isLoading);
  if (!isLoading && isLoggedIn) {
    return <Redirect href="/home" />;
  }
  return (
    <SafeAreaView className=" bg-primary h-full">
      <ScrollView contentContainerStyle={{ height: "100%" }}>
        <View className="w-full h-full p-4 items-center justify-center min-h-[95vh]">
          <Image
            source={images.logo}
            className="w-[130px] h-[84px]"
            resizeMode="contain"
          />
          <Image
            source={images.cards}
            className="max-w-[380px] w-full h-[300px]"
            resizeMode="contain"
          />
          <View className="relative mt-5">
            <Text className="text-3xl text-white font-psemibold text-center">
              Discover Endless Possibilities with{" "}
              <Text className="text-secondary-200">Aora</Text>
            </Text>
            <Image
              source={images.path}
              className="w-[136px] h-[15px] absolute -bottom-2 -right-8"
              resizeMode="contain"
            />
          </View>
          <Text className="text-sm font-pregular text-gray-100 mt-7 text-center">
            Where Creativity Meets Innovation: Embark on a Journey of Limitless
            Exploration with Aora
          </Text>
          <CustomButton
            title="Continue with Email"
            handlePress={() => {
              router.replace("/sign-in");
            }}
            containerStyles="w-full mt-7"
            textStyles="text-lg"
          />
          <StatusBar backgroundColor="#161622" style="light" />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
