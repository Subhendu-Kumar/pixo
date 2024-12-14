import { Post2 } from "@/types";
import { icons } from "@/constants";
import { View, Text, Image } from "react-native";

const PostCard = ({
  post: {
    title,
    image,
    description,
    users: { username, avatar },
  },
}: {
  post: Post2;
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
              numberOfLines={1}
              className="text-xs text-gray-500 font-psemibold"
            >
              {username}
            </Text>
          </View>
        </View>
        <View className="pt-2">
          <Image source={icons.menu} className="w-5 h-5" resizeMode="contain" />
        </View>
      </View>
      <View className="w-full h-60 rounded-xl mt-3 justify-center items-center">
        <Image
          resizeMode="cover"
          source={{ uri: image }}
          className="w-full h-full rounded-xl mt-3"
        />
      </View>
    </View>
  );
};

export default PostCard;
