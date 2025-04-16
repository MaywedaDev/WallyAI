import { View, Text, TouchableOpacity, Image, Alert } from "react-native";
import { TextInput } from "react-native";
import { icons } from "@/constants";
import { router, usePathname } from "expo-router";
import { useState } from "react";

type SearchInputProps = {
  placeholder: string;
  initialQuery?: string;
};

export default function SearchInput({
  placeholder,
  initialQuery,
}: SearchInputProps) {
  const [query, setQuery] = useState<string>(initialQuery || "");
  const pathName = usePathname();

  return (
    <View className="border-2 border-black-200 w-full h-16 px-4 bg-black-100 rounded-2xl focus:border-secondary items-center flex-row relative space-x-4">
      <TextInput
        className="flex-1 text-white font-pregular text-base"
        value={query}
        placeholder={placeholder}
        placeholderTextColor="#cdcde0"
        onChangeText={(e) => setQuery(e)}
      />

      <TouchableOpacity
        onPress={() => {
          if (!query) return Alert.alert("Please enter a search query");

          if (pathName.startsWith("/search")) {
            router.setParams({ query });
          } else router.push(`/search/${query}`);
        }}
      >
        <Image source={icons.search} className="w-5 h-5" resizeMode="contain" />
      </TouchableOpacity>
    </View>
  );
}
