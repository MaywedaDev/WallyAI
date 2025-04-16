import { View, Text, FlatList, Image, RefreshControl } from "react-native";
import React, { useEffect } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { images } from "@/constants";
import SearchInput from "@/components/SearchInput";
import Trending from "@/components/Trending";
import EmptyState from "@/components/EmptyState";
import useAppwrite from "lib/useAppwrite";
import { getAllPosts, getLatestPosts, searchPosts } from "lib/appwrite";
import VideoCard from "@/components/VideoCard";
import VideoScreen from "@/components/VideoExample";
import { useLocalSearchParams } from "expo-router";

export default function Search() {
  const [refreshing, setRefreshing] = React.useState(false);
  const { query } = useLocalSearchParams<{ query: string }>();

  const {
    data: results,
    loading,
    error,
    refresh,
  } = useAppwrite(() => searchPosts(query));

  const onRefresh = async () => {
    setRefreshing(true);
    await refresh();
    setRefreshing(false);
  };

  useEffect(() => {
    if (!query) return;
    refresh();
  }, [query]);
  return (
    <SafeAreaView className="bg-primary flex-1">
      <FlatList
        // data={[{ id: 1 }, { id: 2 }, { id: 3 }]}
        data={results}
        keyExtractor={(item) => item.$id.toString()}
        renderItem={({ item }) => <VideoCard video={item} />}
        ListHeaderComponent={() => (
          <View className="my-6 px-4 space-y-6">
            <View className="justify-between items-start flex-row mb-6">
              <View>
                <Text className="text-sm text-gray-100 font-pmedium">
                  Search Results
                </Text>
                <Text className="text-2xl text-gray-100 font-psemibold">
                  {query}
                </Text>
              </View>
              <View className="mt-1.5">
                <Image
                  source={images.logoSmall}
                  className="w-9 h-10"
                  resizeMode="contain"
                />
              </View>
            </View>
            <SearchInput
              initialQuery={query}
              placeholder="Search for a video topic"
            />

            {/* <VideoScreen />
            <VideoScreen /> */}
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
