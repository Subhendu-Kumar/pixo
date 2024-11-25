import {
  View,
  Text,
  Image,
  Alert,
  ScrollView,
  SafeAreaView,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import axios from "axios";
import { useState } from "react";
import { icons } from "@/constants";
import { BASE_URL } from "@/lib/utils";
import { createPost } from "@/lib/appWrite";
import { useAuth } from "@/context/provider";
import { FormStateCreatePost } from "@/types";
import FormField from "@/components/FormField";
import CustomButton from "@/components/CustomButton";
import * as DocumentPicker from "expo-document-picker";

const Create = () => {
  const { user } = useAuth();
  const [uploading, setUploading] = useState<boolean>(false);
  const [imageUploading, setImageUploading] = useState<boolean>(false);
  const [form, setForm] = useState<FormStateCreatePost>({
    title: "",
    image: "",
    description: "",
  });

  const openImagePicker = async () => {
    try {
      console.log("inside openImagePicker");
      const res = await DocumentPicker.getDocumentAsync({
        type: ["image/*"],
        copyToCacheDirectory: true,
      });
      console.log("document picker response", res);
      if (res.canceled) {
        return Alert.alert("No image selected");
      }
      const file = res.assets[0];
      if (!file) {
        return Alert.alert("No file selected");
      }
      setImageUploading(true);
      const image = new FormData();
      image.append("image", {
        uri: file.uri,
        name: file.name,
        type: file.mimeType ?? "application/octet-stream",
      } as any);
      console.log("uploading image");
      const response = await axios.post(`${BASE_URL}/upload/image`, image, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      console.log("response received");
      console.log(response);
      if (response.status === 200) {
        setForm({ ...form, image: response.data.data.url });
        Alert.alert(response.data.message);
      }
      if (response.status === 400) {
        return Alert.alert("Error", response.data.message);
      }
      if (response.status === 500) {
        return Alert.alert("Error", response.data.message);
      }
    } catch (error) {
      console.log("error", error);
      Alert.alert("Error", (error as Error).message);
    } finally {
      setImageUploading(false);
    }
  };

  const handleCreatePost = async () => {
    if (!form.title || !form.image || !form.description) {
      return Alert.alert("Please fill in all fields");
    }
    setUploading(true);
    try {
      const newPost = await createPost({ ...form, users: user.$id });
      if (!newPost) {
        throw new Error("Something went wrong");
      }
      Alert.alert("Post created successfully");
    } catch (error) {
      Alert.alert("Error", (error as Error).message);
    } finally {
      setUploading(false);
      setForm({
        title: "",
        image: "",
        description: "",
      });
    }
  };

  return (
    <SafeAreaView className="w-full h-full">
      <ScrollView className="px-4 py-6">
        <Text className="text-2xl font-psemibold text-center text-gray-600">
          Create post
        </Text>
        <FormField
          title="Image title:"
          value={form.title}
          handleChangeText={(value) => setForm({ ...form, title: value })}
          placeholder="Give your image a meaningful title"
          otherStyles="mt-7"
        />
        <View className="mt-7 space-y-2">
          <Text className="text-base text-gray-400 font-pmedium">
            Upload image:
          </Text>
          <TouchableOpacity
            activeOpacity={0.7}
            className="w-full h-60"
            onPress={openImagePicker}
          >
            {imageUploading ? (
              <View className="w-full h-full bg-white rounded-lg border border-secondary justify-center items-center">
                <ActivityIndicator size="large" />
              </View>
            ) : form.image ? (
              <View className="w-full h-full bg-white rounded-lg border border-secondary justify-center items-center">
                <Image
                  source={{ uri: form.image }}
                  className="w-full h-full rounded-lg"
                  resizeMode="cover"
                />
              </View>
            ) : (
              <View className="w-full h-full bg-white rounded-lg border border-secondary justify-center items-center">
                <View className="w-16 h-16 border border-dashed border-secondary justify-center items-center rounded-full">
                  <Image
                    source={icons.upload}
                    className="w-1/2 h-1/2"
                    resizeMode="contain"
                  />
                </View>
              </View>
            )}
          </TouchableOpacity>
        </View>
        <FormField
          title="Image description:"
          value={form.description}
          handleChangeText={(value) => setForm({ ...form, description: value })}
          placeholder="Describe your image"
          otherStyles="mt-7"
        />
        <View className="mt-7 w-full h-auto">
          <Text className="text-sm text-red-500 text-center font-pmedium">
            NOTE: All fields are required to create a post
          </Text>
        </View>
        <CustomButton
          title="Create Post"
          uploading={uploading}
          handlePress={handleCreatePost}
          isLoading={
            uploading ||
            imageUploading ||
            !form.title ||
            !form.image ||
            !form.description
          }
          containerStyles="mt-7"
        />
      </ScrollView>
    </SafeAreaView>
  );
};

export default Create;
