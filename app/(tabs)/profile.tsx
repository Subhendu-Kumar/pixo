import { icons } from "@/constants";
import { router } from "expo-router";
import useAppWrite from "@/lib/useAppWrite";
import PostCard from "@/components/PostCard";
import { useAuth } from "@/context/provider";
import UserInfo from "@/components/UserInfo";
import EmptyState from "@/components/EmptyState";
import { getPostByUserId, signOut } from "@/lib/appWrite";
import { SafeAreaView } from "react-native-safe-area-context";
import { View, Image, Alert, FlatList, TouchableOpacity } from "react-native";

const Profile = () => {
  const { user, setUser, setIsLoggedIn } = useAuth();
  const { data: posts, isLoading } = useAppWrite(() =>
    getPostByUserId(user?.$id)
  );

  const logout = async () => {
    const session = await signOut();
    if (session) {
      setUser(null);
      setIsLoggedIn(false);
      router.replace("/sign-in");
    } else {
      Alert.alert("Logout failed");
    }
  };

  return (
    <SafeAreaView>
      {isLoading ? (
        <View className="w-full h-full justify-center items-center">
          <Image
            source={icons.loader}
            className="w-20 h-20 animate-spin"
            resizeMode="contain"
          />
        </View>
      ) : (
        <FlatList
          data={posts}
          keyExtractor={(item) => item.$id.toString()}
          renderItem={({ item }) => <PostCard post={item} />}
          ListEmptyComponent={() => (
            <EmptyState
              title="No images found"
              subTitle={`No images found with this userId: ${user?.$id}`}
            />
          )}
          ListHeaderComponent={() => (
            <View className="w-full justify-center items-center mt-6 mb-12 px-4">
              <TouchableOpacity
                className="w-full items-end mb-8"
                onPress={logout}
              >
                <Image
                  source={icons.logout}
                  resizeMode="contain"
                  className="w-6 h-6"
                />
              </TouchableOpacity>
              <View className="w-16 h-16 border border-secondary rounded-lg justify-center items-center">
                <Image
                  source={{ uri: user?.avatar }}
                  className="w-full h-full rounded-lg"
                  resizeMode="cover"
                />
              </View>
              <UserInfo
                title={user?.username}
                containerStyle="mt-5"
                titleStyle="text-lg font-psemibold text-gray-700"
              />
              <View className="mt-5 flex-row justify-between">
                <UserInfo
                  title={posts?.length.toString() || "0"}
                  containerStyle="mr-5"
                  subTitle="Posts"
                  titleStyle="text-xl font-psemibold text-gray-700"
                />
                <UserInfo
                  title="1.2k"
                  containerStyle="ml-5"
                  subTitle="Followers"
                  titleStyle="text-xl font-psemibold text-gray-700"
                />
              </View>
            </View>
          )}
        />
      )}
    </SafeAreaView>
  );
};

export default Profile;
