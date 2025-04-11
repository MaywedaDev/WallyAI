import { View, Text, TextInput, TouchableOpacity, Image } from "react-native";
import React, { useState } from "react";
import { icons } from "@/constants";

type FormFieldProps = {
  title: string;
  value: string;
  handleTextChange: (text: string) => void;
  otherStyles?: string;
  placeholder?: string;
  keyboardType?: "default" | "email-address" | "numeric" | "phone-pad";
};

export default function FormField({
  title,
  value,
  handleTextChange,
  otherStyles,
  placeholder,
  keyboardType,
  ...props
}: FormFieldProps) {
  const [showPassword, setShowPassword] = useState<boolean>(false);
  return (
    <View className={`${otherStyles}`} {...props}>
      <Text className="text-base text-gray-100 font-pmedium mb-2">{title}</Text>
      <View className="border-2 border-black-200 w-full h-16 px-4 bg-black-100 rounded-2xl focus:border-secondary items-center flex-row relative">
        <TextInput
          value={value}
          onChangeText={handleTextChange}
          placeholder={placeholder}
          className="text-base text-white font-semibold w-full flex-1"
          placeholderTextColor="#7b7b8b"
          secureTextEntry={title === "Password" && !showPassword}
        />
        {title === "Password" && (
          <TouchableOpacity
            className="absolute right-4"
            onPress={() => setShowPassword((prev) => !prev)}
          >
            <Image
              source={!showPassword ? icons.eye : icons.eyeHide}
              className="w-6 h-6"
              resizeMode="contain"
            />
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
}
