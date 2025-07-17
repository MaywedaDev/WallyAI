import { View, Text, FlatList, Image, RefreshControl } from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { images } from "@/constants";
import SearchInput from "@/components/SearchInput";
import Trending from "@/components/Trending";
import EmptyState from "@/components/EmptyState";
import useAppwrite from "lib/useAppwrite";
import { getAllPosts, getLatestPosts } from "lib/appwrite";
import VideoCard from "@/components/VideoCard";
import VideoScreen from "@/components/VideoExample";

export default function Home() {
  const [refreshing, setRefreshing] = React.useState(false);

  const { data: posts, loading, error, refresh } = useAppwrite(getAllPosts);
  const { data: latestPosts } = useAppwrite(getLatestPosts);

  const onRefresh = async () => {
    setRefreshing(true);
    await refresh();
    setRefreshing(false);
  };
  return <SafeAreaView className="bg-primary flex-1"></SafeAreaView>;
}
