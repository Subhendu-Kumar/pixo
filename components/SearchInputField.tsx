import {
  View,
  Image,
  Alert,
  TextInput,
  TouchableOpacity,
} from "react-native";
import { icons } from "../constants";
import React, { useState } from "react";
import { router, usePathname } from "expo-router";

const SearchInputField = ({ initialValue }: { initialValue?: string }) => {
  const pathname = usePathname();
  const [query, setQuery] = useState(initialValue || "");

  return (
    <View className="w-full h-16 px-4 border border-orange-400 rounded-lg bg-zinc-200 focus:border-primary-100 items-center flex-row">
      <TextInput
        className="flex-1 font-psemibold text-base w-full h-full"
        value={query}
        placeholder="Search images"
        onChangeText={(e) => setQuery(e)}
      />
      <TouchableOpacity
        onPress={() => {
          if (!query) {
            return Alert.alert(
              "Query missing! please specify a query to search"
            );
          }
          if (pathname.startsWith("/search")) {
            router.setParams({ query });
            setQuery("");
          } else {
            router.push(`/search/${query}`);
            setQuery("");
          }
        }}
      >
        <Image source={icons.search} className="w-6 h-6" resizeMode="contain" />
      </TouchableOpacity>
    </View>
  );
};

export default SearchInputField;
