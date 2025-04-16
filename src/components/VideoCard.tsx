import { View, Text, Image, TouchableOpacity } from "react-native";
import React from "react";
import { icons } from "@/constants";
import { useVideoPlayer, VideoView } from "expo-video";
import { useEvent } from "expo";

type VideoCardProps = {
  video: {
    $id: string;
    title: string;
    thumbnail: string;
    video: string;
    creator: {
      userName: string;
      avatar: string;
    };
  };
};

export default function VideoCard({ video }: VideoCardProps) {
  const player = useVideoPlayer(video.video, (player) => player.pause());
  const { isPlaying } = useEvent(player, "playingChange", {
    isPlaying: player.playing,
  });

  return (
    <View className="flex-col items-center px-4 mb-14">
      <View className="flex-row gap-3 items-start">
        <View className="justify-center items-center flex-row flex-1">
          <View className="w-[46px] h-[46px] rounded-xl border border-secondary justify-center items-center p-0.5">
            <Image
              source={{ uri: video.creator.avatar }}
              className="w-full h-full rounded-lg"
              resizeMode="cover"
            />
          </View>
          <View className="justify-center flex-1 ml-3 gap-y-1">
            <Text
              className="text-white font-psemibold text-sm"
              numberOfLines={1}
            >
              {video.title}
            </Text>
            <Text
              className="text-xs text-gray-100 font-pregular"
              numberOfLines={1}
            >
              {video.creator.userName}
            </Text>
          </View>
          <View className="pt-2">
            <Image
              source={icons.menu}
              className="w-5 h-5"
              resizeMode="contain"
            />
          </View>
        </View>
      </View>
      {isPlaying ? (
        <VideoView style={{ width: "100%", height: 300 }} player={player} />
      ) : (
        <TouchableOpacity
          className="w-full h-60 rounded-xl mt-3 raltive justify-center items-center"
          activeOpacity={0.7}
          onPress={() => {
            player.loop = true;
            player.play();
          }}
        >
          <Image
            source={{ uri: video.thumbnail }}
            className="w-full h-full rounded-xl mt-3"
            resizeMode="cover"
          />
          <Image
            className="w-12 h-12 absolute"
            source={icons.play}
            resizeMode="contain"
          />
        </TouchableOpacity>
      )}
    </View>
  );
}
