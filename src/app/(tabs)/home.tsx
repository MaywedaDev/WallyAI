import { View, Text, FlatList, Image, useWindowDimensions } from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { TabView, SceneMap, TabBar } from "react-native-tab-view";

const TempComponent = () => {
  return (
    <View className="flex-1 items-center justify-center">
      <Text className="text-white font-psemibold text-lg">Hey there!</Text>
    </View>
  );
};

export default function Home() {
  const [refreshing, setRefreshing] = React.useState(false);

  const renderScene = SceneMap({
    feed: TempComponent,
    popular: TempComponent,
    recent: TempComponent,
    collections: TempComponent,
  });

  const [index, setIndex] = React.useState(0);
  const [routes] = React.useState([
    { key: "feed", title: "Your Feed" },
    { key: "popular", title: "Popular" },
    { key: "recent", title: "Recent" },
    { key: "collections", title: "Collections" },
  ]);

  const layout = useWindowDimensions();

  const renderTabBar = (props) => (
    <TabBar
      {...props}
      indicatorStyle={{ backgroundColor: "#ffa001" }}
      style={{ backgroundColor: "#161622" }}
      labelStyle={{ color: "#cdcde0", fontFamily: "Poppins-Regular" }}
      activeColor="#ffa001"
      inactiveColor="#cdcde0"
      scrollEnabled
      tabStyle={{ width: layout.width / routes.length }}
    />
  );

  // const { data: posts, loading, error, refresh } = useAppwrite(getAllPosts);
  // const { data: latestPosts } = useAppwrite(getLatestPosts);

  const onRefresh = async () => {
    setRefreshing(true);
    // await refresh();
    setRefreshing(false);
  };

  return (
    <SafeAreaView className="bg-primary flex-1">
      {/* <View className="px-4 my-6">
        <Image source={images.logo} resizeMode="contain" className="w-32 h-8" />
      </View> */}
      <TabView
        navigationState={{ index, routes }}
        renderScene={renderScene}
        onIndexChange={setIndex}
        initialLayout={{ width: layout.width }}
        style={{ backgroundColor: "#161622" }}
        renderTabBar={renderTabBar}
        color="#161622"
      />
    </SafeAreaView>
  );
}
