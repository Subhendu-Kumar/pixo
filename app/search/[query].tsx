import { useEffect } from "react";
import { icons } from "@/constants";
import useAppWrite from "@/lib/useAppWrite";
import { searchPosts } from "@/lib/appWrite";
import PostCard from "@/components/PostCard";
import EmptyState from "@/components/EmptyState";
import { useLocalSearchParams } from "expo-router";
import { View, Text, FlatList, Image } from "react-native";
import SearchInputField from "@/components/SearchInputField";
import { SafeAreaView } from "react-native-safe-area-context";

const SearchPage = () => {
  const { query } = useLocalSearchParams();
  const {
    data: posts,
    isLoading,
    reFetch,
  } = useAppWrite(() => searchPosts(Array.isArray(query) ? query[0] : query));

  useEffect(() => {
    reFetch();
  }, [query]);

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
          ListEmptyComponent={() => (
            <EmptyState
              title="No images found"
              subTitle={`No images found with this query: ${query}`}
            />
          )}
          ListHeaderComponent={() => (
            <View className="my-6 px-4">
              <Text className="font-pmedium text-sm text-gray-500">
                Search results for
              </Text>
              <Text className="text-2xl  font-psemibold text-gray-700">
                {query}
              </Text>
              <View className="w-full mt-3">
                <SearchInputField
                  initialValue={Array.isArray(query) ? query[0] : query}
                />
              </View>
            </View>
          )}
        />
      )}
    </SafeAreaView>
  );
};

export default SearchPage;
