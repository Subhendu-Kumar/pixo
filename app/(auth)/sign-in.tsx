import { View, Text, ScrollView, Image, Alert } from "react-native";
import React, { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { images } from "../../constants";
import FormField from "@/components/FormField";
import CustomButton from "@/components/CustomButton";
import { Link, router } from "expo-router";
import { signIn } from "@/lib/appWrite";

const SignIn = () => {
  const [form, setForm] = useState({
    email: "",
    password: "",
  });
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

  const submit = async () => {
    if (!form.email || !form.password) {
      Alert.alert("Error", "Please fill all the fields");
      return;
    }
    setIsSubmitting(true);
    try {
      const res = await signIn(form.email, form.password);
      router.replace("/home");
    } catch (error) {
      Alert.alert(
        "Error",
        error instanceof Error ? error.message : String(error)
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <SafeAreaView className="h-full bg-primary-100">
      <ScrollView>
        <View className="w-full min-h-[85vh] my-6 px-4 justify-center">
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
          <FormField
            title="Email"
            value={form.email}
            handleChangeText={(e: string) => setForm({ ...form, email: e })}
            otherStyles="mt-7"
            keyBoardType="email-address"
            placeholder="Enter your email"
          />
          <FormField
            title="Password"
            value={form.password}
            handleChangeText={(e: string) => setForm({ ...form, password: e })}
            otherStyles="mt-7"
            placeholder="Enter your password"
          />
          <CustomButton
            title="Sign in"
            containerStyles="mt-10"
            handlePress={submit}
            isLoading={isSubmitting}
          />
          <View className="flex-row justify-center pt-5 gap-2">
            <Text className="text-lg text-gray-400 font-pregular">
              Don't have an account?
            </Text>
            <Link
              href="/sign-up"
              className="text-lg font-psemibold text-secondary"
            >
              Sign up
            </Link>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default SignIn;
