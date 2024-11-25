import React from "react";
import { Link, Stack } from "expo-router";
import { Text, View } from "react-native";

const NotFoundScreen = () => {
  return (
    <>
      <Stack.Screen options={{ title: "Oops!" }} />
      <View className="flex-1 items-center justify-center p-20">
        <Text>This screen doesn't exist.</Text>
        <Link href="/" className="mt-15 py-15">
          <Text>Go to home screen!</Text>
        </Link>
      </View>
    </>
  );
};

export default NotFoundScreen;
