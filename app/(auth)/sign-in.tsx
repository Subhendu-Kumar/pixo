import { View, Text, ScrollView, Image } from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { images } from "../../constants";
import FormField from "@/components/FormField";

const SignIn = () => {
  return (
    <SafeAreaView className="h-full bg-primary-100">
      <ScrollView>
        <View className="w-full h-full my-6 px-4 justify-center">
          <View className="flex-row items-center">
            <Image
              source={images.logoSmall}
              className="w-8 h-8"
              resizeMode="contain"
            />
            <Text className="text-2xl font-pbold text-[#7a6a6a]">Pixo</Text>
          </View>
          <Text className="text-2xl font-psemibold mt-10 text-[#7a6a6a]">
            Log in to Pixo
          </Text>
          <FormField />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default SignIn;
