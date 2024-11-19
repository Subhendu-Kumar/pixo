import React from "react";
import { router } from "expo-router";
import { images } from "../constants";
import CustomButton from "./CustomButton";
import { View, Text, Image } from "react-native";

const EmptyState = ({
  title,
  subTitle,
}: {
  title: string;
  subTitle: string;
}) => {
  return (
    <View className="justify-center items-center px-4">
      <Image
        source={images.empty}
        className="w-[270px] h-[215px] opacity-40"
        resizeMode="contain"
      />
      <Text className="text-xl font-pregular text-gray-700">{title}</Text>
      <Text className="text-base font-pregular text-gray-500">{subTitle}</Text>
      <CustomButton
        title="Upload Video"
        handlePress={() => router.push("/create")}
        containerStyles="w-full mt-4"
      />
    </View>
  );
};

export default EmptyState;
