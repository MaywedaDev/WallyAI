import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Image,
  StyleSheet,
} from "react-native";
import React, { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { useVideoPlayer, VideoView } from "expo-video";
import FormField from "@/components/FormField";
import { icons, images } from "@/constants";
import CustomButton from "@/components/CustomButton";

export default function Create() {
  const [form, setForm] = useState({
    title: "",
    video: null,
    thumbnail: null,
    prompt: "",
  });

  const [uploading, setUploading] = useState(false);

  const player = useVideoPlayer(form.video || "", (player) => {
    player.pause;
    player.loop = true;
  });

  const handleSubmit = () => {};

  const openPicker = (selectType: string) => {};
  return (
    <SafeAreaView className="bg-primary h-full">
      <ScrollView className="px-4 my-6 ">
        <Text className="text-2xl text-white font-psemibold">Upload Video</Text>
        <FormField
          title="Video Title"
          value={form.title}
          placeholder="Give your video a catchy title..."
          otherStyles="mt-10 "
          handleTextChange={(e) => setForm({ ...form, title: e })}
        />

        <View className="mt-7 space-y-2">
          <Text className="text-base text-gray-100 font-pmedium">
            Upload Video
          </Text>

          <TouchableOpacity
            className="mt-3 border-black-200 border-2 rounded-2xl"
            onPress={() => openPicker("video")}
          >
            {form.video ? (
              <VideoView style={styles.video} player={player} />
            ) : (
              <View className="w-full h-40 px-4 bg-black-100 rounded-2xl justify-center items-center">
                <View className="w-14 h-14 border border-dashed border-secondary-100 justify-center items-center">
                  <Image
                    source={icons.upload}
                    resizeMode="contain"
                    className="w-1/2 h-1/2"
                  />
                </View>
              </View>
            )}
          </TouchableOpacity>
        </View>

        <View className="mt-7 space-y-2">
          <Text className="text-base text-gray-100 font-pmedium">
            Thumbnail Image
          </Text>

          <TouchableOpacity
            className="mt-3 border-black-200 border-2 rounded-2xl"
            onPress={() => openPicker("image")}
          >
            {form.thumbnail ? (
              <Image
                source={{ uri: form.thumbnail.uri }}
                resizeMode="cover"
                className="w-full h-64 rounded-2xl"
              />
            ) : (
              <View className="w-full h-16 px-4 bg-black-100 rounded-2xl justify-center items-center flex-row gap-x-2">
                <Image
                  source={icons.upload}
                  resizeMode="contain"
                  className="w-5 h-5"
                />
                <Text className="text-sm text-gray-100 font-pmedium">
                  Choose a file
                </Text>
              </View>
            )}
          </TouchableOpacity>
        </View>

        <FormField
          title="Prompt "
          value={form.prompt}
          placeholder="The prompt that you used to create this video"
          otherStyles="mt-7 "
          handleTextChange={(e) => setForm({ ...form, prompt: e })}
        />

        <CustomButton
          title="Submit & Publish"
          containerStyles="mt-7"
          isLoading={uploading}
          handlePress={handleSubmit}
        />
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  video: {
    width: "100%",
    height: 320,
    borderRadius: 16,
  },
});
