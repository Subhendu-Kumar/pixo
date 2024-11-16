import React from "react";
import { router } from "expo-router";
import { images } from "../constants";
import { StatusBar } from "expo-status-bar";
import CustomButton from "@/components/CustomButton";
import { Image, ScrollView, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const Home = () => {
  return (
    <SafeAreaView className="h-full">
      <ScrollView contentContainerStyle={{ height: "100%" }}>
        <View className="w-full min-h-[80vh] justify-center mt-6 items-center px-4">
          <View className="flex-row items-center justify-center">
            <Image
              source={images.logoSmall}
              className="w-8 h-8"
              resizeMode="contain"
            />
            <Text className="text-2xl font-pbold text-[#7a6a6a]">Pixo</Text>
          </View>
          <Image
            source={images.cards}
            className="max-w-[380px] w-full h-[300px]"
            resizeMode="contain"
          />
          <View className="relative mt-5">
            <Text className="text-3xl font-bold text-center text-[#a7a1a1]">
              Discover endless possibilities with{" "}
              <Text className="text-secondary-200">Pixo</Text>
            </Text>
            <Image
              source={images.path}
              className="w-[136px] h-[15px] absolute -bottom-2 -right-8"
              resizeMode="contain"
            />
          </View>
          <Text className="text-sm font-pregular text-center text-[#7a6a6a] mt-7">
            Where creativity meets innovation: embark on a journey of limitless
            exploration with pixo
          </Text>
          <CustomButton
            title="Get Started"
            handlePress={() => router.push(`/sign-in`)}
            containerStyles="w-full mt-7"
          />
        </View>
      </ScrollView>
      <StatusBar style="light" backgroundColor="#c9c8c5" />
    </SafeAreaView>
  );
};

export default Home;
