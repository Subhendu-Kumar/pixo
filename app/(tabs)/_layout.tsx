import { Tabs } from "expo-router";
import { TabIconProps } from "@/types";
import { icons } from "../../constants";
import { View, Image } from "react-native";

const TabIcon = ({ icon, color }: TabIconProps) => {
  return (
    <View className="items-center justify-center">
      <Image
        source={icon}
        resizeMode="contain"
        tintColor={color}
        className="w-6 h-6"
      />
    </View>
  );
};

const TabsLayout = () => {
  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: "#FFA001",
        tabBarInactiveTintColor: "#CDCDE0",
      }}
    >
      <Tabs.Screen
        name="home"
        options={{
          headerShown: false,
          tabBarIcon: ({ color }) => (
            <TabIcon icon={icons.home} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="create"
        options={{
          headerShown: false,
          tabBarIcon: ({ color }) => (
            <TabIcon icon={icons.plus} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          headerShown: false,
          tabBarIcon: ({ color }) => (
            <TabIcon icon={icons.profile} color={color} />
          ),
        }}
      />
    </Tabs>
  );
};

export default TabsLayout;
