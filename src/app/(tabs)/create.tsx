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
import { useVideoPlayer, VideoView } from "expo-video";
import FormField from "@/components/FormField";
import { icons, images } from "@/constants";
import CustomButton from "@/components/CustomButton";
import * as DocumentPicker from "expo-document-picker";
import { router } from "expo-router";
import { createVideo } from "lib/appwrite";
import { useGlobalContext } from "context/GlobalProvider";

export default function Create() {
  const { user } = useGlobalContext();
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

  const handleSubmit = async () => {
    if (!form.prompt || !form.title || !form.thumbnail) {
      return Alert.alert("Please fill in all the fields");
    }

    try {
      await createVideo({ ...form, userId: user.$id });
      Alert.alert("Success", "Post Uploaded sucessfully");
      router.push("/home");
    } catch (err) {
    } finally {
      setForm({
        title: "",
        video: null,
        thumbnail: null,
        prompt: "",
      });
    }
  };

  const openPicker = async (selectType: string) => {
    const result = await DocumentPicker.getDocumentAsync({
      type:
        selectType === "image"
          ? ["image/png", "image/jpg", "image/jpeg"]
          : ["video/mp4", "video/gif"],
    });

    if (!result.canceled) {
      if (selectType === "image") {
        setForm({ ...form, thumbnail: result.assets[0] });
      }

      if (selectType === "video") {
        setForm({ ...form, video: result.assets[0] });
      }
    } else {
      setTimeout(() => {
        Alert.alert("Document Picked", JSON.stringify(result, null, 2));
      }, 100);
    }
  };
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
