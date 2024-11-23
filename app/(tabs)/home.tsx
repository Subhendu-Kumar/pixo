import { images } from "@/constants";
import React, { useState } from "react";
import Trending from "@/components/Trending";
import EmptyState from "@/components/EmptyState";
import SearchInputField from "@/components/SearchInputField";
import { SafeAreaView } from "react-native-safe-area-context";
import { View, Text, FlatList, Image, RefreshControl } from "react-native";
import { getAllPosts, getLatestPosts } from "@/lib/appWrite";
import useAppWrite from "@/lib/useAppWrite";
import PostCard from "@/components/PostCard";

const HomePage = () => {
  const { data: posts, isLoading, reFetch } = useAppWrite(getAllPosts);
  const { data: latestPosts } = useAppWrite(getLatestPosts);
  const [refreshing, setRefreshing] = useState<boolean>(false);

  const onRefresh = async () => {
    setRefreshing(true);
    reFetch();
    setRefreshing(false);
  };

  return (
    <SafeAreaView>
      <FlatList
        data={posts}
        keyExtractor={(item) => item.$id.toString()}
        renderItem={({ item }) => <PostCard post={item} />}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
        ListEmptyComponent={() => (
          <EmptyState
            title="No images found"
            subTitle="Be the first one to upload image!"
          />
        )}
        ListHeaderComponent={() => (
          <View className="my-6 px-4 space-y-6">
            <View className="justify-between flex-row items-start mb-6">
              <View>
                <Text className="font-pmedium text-sm text-gray-500">
                  Welcome back
                </Text>
                <Text className="text-2xl  font-psemibold text-gray-700">
                  Subhendu
                </Text>
              </View>
              <Image
                source={images.logoSmall}
                className="w-9 h-10"
                resizeMode="contain"
              />
            </View>
            <SearchInputField />
            <View className="w-full flex-1 pt-5 pb-8">
              <Text className="text-lg mb-3 font-pregular text-gray-700">
                Trending Images
              </Text>
              <Trending posts={latestPosts} />
            </View>
          </View>
        )}
      />
    </SafeAreaView>
  );
};

export default HomePage;
