import {
  View,
  Text,
  FlatList,
  Image,
  RefreshControl,
  TouchableOpacity,
} from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { icons } from "@/constants";
import EmptyState from "@/components/EmptyState";
import useAppwrite from "lib/useAppwrite";
import { getUserPosts, signOut } from "lib/appwrite";
import VideoCard from "@/components/VideoCard";
import { useGlobalContext } from "context/GlobalProvider";
import InfoBox from "@/components/InfoBox";
import { router } from "expo-router";

export default function Profile() {
  const [refreshing, setRefreshing] = React.useState(false);
  const { user, setUser, isLoggedIn, setIsLoggedIn } = useGlobalContext();

  const {
    data: posts,
    loading,
    error,
    refresh,
  } = useAppwrite(() => getUserPosts(user.$id));

  const onRefresh = async () => {
    setRefreshing(true);
    await refresh();
    setRefreshing(false);
  };

  const logout = async () => {
    await signOut();
    setUser(null);
    setIsLoggedIn(false);

    router.replace("/sign-in");
  };

  return (
    <SafeAreaView className="bg-primary flex-1">
      <FlatList
        // data={[{ id: 1 }, { id: 2 }, { id: 3 }]}
        data={posts}
        keyExtractor={(item) => item.$id.toString()}
        renderItem={({ item }) => <VideoCard video={item} />}
        ListHeaderComponent={() => (
          <View className="w-full justify-center items-center mt-6 mb-12 px-4">
            <TouchableOpacity
              className="w-full items-end mb-10"
              onPress={logout}
            >
              <Image className="w-8 h-8" source={icons.logout} />
            </TouchableOpacity>

            <View className="w-16 h-16 border border-secondary rounded-lg justify-center items-center">
              <Image
                source={{ uri: user?.avatar }}
                className="w-[90%] h-[90%] rounded-lg"
                resizeMode="cover"
              />
            </View>
            <InfoBox
              title={user.userName}
              containerStyles="mt-5"
              titleStyles="text-lg"
            />

            <View className="mt-5 flex-row">
              <InfoBox
                title={posts?.length || 0}
                subtitle="Posts"
                containerStyles="mr-10"
                titleStyles="text-xl"
              />
              <InfoBox
                title="1.2k"
                subtitle="followers"
                titleStyles="text-xl"
              />
            </View>
          </View>
        )}
        ListEmptyComponent={
          <EmptyState
            title="No Videos Found"
            subtitle="No videos found for this search query"
          />
        }
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      />
    </SafeAreaView>
  );
}
