import {
  FlatList,
  ImageBackground,
  TouchableOpacity,
} from "react-native";
import React, { useState } from "react";
import * as Animatable from "react-native-animatable";

const zoomIn = {
  0: {
    scale: 0.9,
    opacity: 0.7,
  },
  1: {
    scale: 1,
    opacity: 1,
  },
};

const zoomOut = {
  0: {
    scale: 1,
    opacity: 1,
  },
  1: {
    scale: 0.9,
    opacity: 0.7,
  },
};

const TrendingItem = ({ post, activeItem }: { post: any; activeItem: any }) => {
  return (
    <Animatable.View
      className="mr-5"
      animation={activeItem === post.$id ? zoomIn : zoomOut}
      duration={500}
    >
      <TouchableOpacity
        className="justify-center items-center"
        activeOpacity={0.7}
      >
        <ImageBackground
          source={{ uri: post.image }}
          className="w-52 h-72 rounded-2xl my-5 overflow-hidden shadow-lg"
          resizeMode="cover"
        />
      </TouchableOpacity>
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
