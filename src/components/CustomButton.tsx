import { View, Text, TouchableOpacity } from "react-native";
import React from "react";

type btnTypes = {
  title: string;
  handlePress?: () => void;
  containerStyles?: string;
  textStyles?: string;
  isLoading?: boolean;
};

export default function CustomButton({
  title,
  handlePress,
  containerStyles,
  textStyles,
  isLoading,
}: btnTypes) {
  return (
    <TouchableOpacity
      className={`bg-secondary rounded-xl min-h-[62px] justify-center items-center ${containerStyles} ${
        isLoading ? "opacity-50" : ""
      }`}
      onPress={handlePress}
      disabled={isLoading}
    >
      <Text className={`text-primary font-psemibold ${textStyles}`}>
        {title}
      </Text>
    </TouchableOpacity>
  );
}
