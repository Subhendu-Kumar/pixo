import { useState } from "react";
import useAppWrite from "@/lib/useAppWrite";
import { icons, images } from "@/constants";
import PostCard from "@/components/PostCard";
import Trending from "@/components/Trending";
import { useAuth } from "@/context/provider";
import EmptyState from "@/components/EmptyState";
import SearchInputField from "@/components/SearchInputField";
import { getAllPosts, getLatestPosts } from "@/lib/appWrite";
import { SafeAreaView } from "react-native-safe-area-context";
import { View, Text, FlatList, Image, RefreshControl } from "react-native";

const HomePage = () => {
  const { user } = useAuth();
  const { data: latestPosts } = useAppWrite(getLatestPosts);
  const { data: posts, isLoading, reFetch } = useAppWrite(getAllPosts);

  const [refreshing, setRefreshing] = useState<boolean>(false);

  const onRefresh = async () => {
    setRefreshing(true);
    reFetch();
    setRefreshing(false);
  };

  return (
    <SafeAreaView>
      {isLoading ? (
        <View className="w-full h-full justify-center items-center">
          <Image
            source={icons.loader}
            className="w-20 h-20 animate-spin"
            resizeMode="contain"
          />
        </View>
      ) : (
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
                    Welcome back,
                  </Text>
                  <Text className="text-2xl  font-psemibold text-gray-700 capitalize">
                    {user?.username.split(" ").slice(0, 2).join(" ")}
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
      )}
    </SafeAreaView>
  );
};

export default HomePage;
