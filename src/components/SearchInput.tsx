import { View, Text, TouchableOpacity, Image } from "react-native";
import { TextInput } from "react-native";
import { icons } from "@/constants";

type SearchInputProps = {
  value: string;
  placeholder: string;
  handleChangeText: (text: string) => void;
};

export default function SearchInput({
  value,
  placeholder,
  handleChangeText,
}: SearchInputProps) {
  return (
    <View className="border-2 border-black-200 w-full h-16 px-4 bg-black-100 rounded-2xl focus:border-secondary items-center flex-row relative space-x-4">
      <TextInput
        className="flex-1 text-white font-pregular text-base"
        value={value}
        placeholder={placeholder}
        placeholderTextColor="#7b7b8b"
        onChangeText={handleChangeText}
      />

      <TouchableOpacity>
        <Image source={icons.search} className="w-5 h-5" resizeMode="contain" />
      </TouchableOpacity>
    </View>
  );
}
