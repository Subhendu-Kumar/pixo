import { View, Text, FlatList, Image } from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { images } from "@/constants";

const HomePage = () => {
  return (
    <SafeAreaView>
      <FlatList
        data={[{ id: 1 }]}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => <Text>{item.id}</Text>}
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
          </View>
        )}
      />
    </SafeAreaView>
  );
};

export default HomePage;
