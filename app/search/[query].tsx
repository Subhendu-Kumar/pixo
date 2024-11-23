import React, { useEffect } from "react";
import EmptyState from "@/components/EmptyState";
import SearchInputField from "@/components/SearchInputField";
import { SafeAreaView } from "react-native-safe-area-context";
import { View, Text, FlatList } from "react-native";
import { searchPosts } from "@/lib/appWrite";
import useAppWrite from "@/lib/useAppWrite";
import PostCard from "@/components/PostCard";
import { useLocalSearchParams } from "expo-router";

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
    </SafeAreaView>
  );
};

export default SearchPage;
