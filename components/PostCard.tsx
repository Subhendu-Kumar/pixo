import React from "react";
import { icons } from "@/constants";
import { View, Text, Image, TouchableOpacity } from "react-native";

interface User {
  username: string;
  avatar: string;
}

interface Post {
  title: string;
  image: string;
  description: string;
  users: User;
}

const PostCard = ({
  post: {
    title,
    image,
    description,
    users: { username, avatar },
  },
}: {
  post: Post;
}) => {
  return (
    <View className="flex-col items-center px-4 mb-14 ">
      <View className="flex-row gap-3 items-start">
        <View className="justify-center items-center flex-1 flex-row">
          <View className="w-[46px] h-[46px] rounded-lg border border-secondary justify-center items-center p-0.5">
            <Image
              source={{ uri: avatar }}
              className="w-full h-full rounded-lg"
              resizeMode="cover"
            />
          </View>
          <View className="justify-center flex-1 gap-y-1 ml-3">
            <Text
              className="font-psemibold text-sm text-gray-700"
              numberOfLines={1}
            >
              {title}
            </Text>
            <Text
              className="text-xs text-gray-500 font-psemibold"
              numberOfLines={1}
            >
              {username}
            </Text>
          </View>
        </View>
        <View className="pt-2">
          <Image source={icons.menu} className="w-5 h-5" resizeMode="contain" />
        </View>
      </View>
      <TouchableOpacity
        className="w-full h-60 rounded-xl mt-3 justify-center items-center"
        activeOpacity={0.7}
      >
        <Image
          source={{ uri: image }}
          className="w-full h-full rounded-xl mt-3"
          resizeMode="cover"
        />
      </TouchableOpacity>
    </View>
  );
};

export default PostCard;
