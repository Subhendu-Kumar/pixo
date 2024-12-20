import { View, FlatList, ImageBackground } from "react-native";
import { useState } from "react";
import { zoomIn, zoomOut } from "@/lib/utils";
import * as Animatable from "react-native-animatable";

const TrendingItem = ({ post, activeItem }: { post: any; activeItem: any }) => {
  return (
    <Animatable.View
      className="mr-5"
      animation={activeItem === post.$id ? zoomIn : zoomOut}
      duration={500}
    >
      <View className="justify-center items-center">
        <ImageBackground
          source={{ uri: post.image }}
          className="w-52 h-72 rounded-2xl my-5 overflow-hidden shadow-lg"
          resizeMode="cover"
        />
      </View>
    </Animatable.View>
  );
};

const Trending = ({ posts }: { posts: any[] }) => {
  const [activeItem, setActiveItem] = useState<any>(posts[1]);

  const viewChangeHandler = ({ viewableItems }: { viewableItems: any }) => {
    if (viewableItems.length > 0) {
      setActiveItem(viewableItems[0].key);
    }
  };

  return (
    <FlatList
      data={posts}
      keyExtractor={(item) => item.$id}
      renderItem={({ item }) => (
        <TrendingItem post={item} activeItem={activeItem} />
      )}
      onViewableItemsChanged={viewChangeHandler}
      viewabilityConfig={{
        itemVisiblePercentThreshold: 70,
      }}
      contentOffset={{ x: 170, y: 0 }}
      horizontal
    />
  );
};

export default Trending;
