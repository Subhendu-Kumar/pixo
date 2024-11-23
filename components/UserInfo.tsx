import React from "react";
import { View, Text } from "react-native";

interface UserInfoProps {
  title?: string;
  subTitle?: string;
  titleStyle?: string;
  containerStyle?: string;
}

const UserInfo = ({
  title,
  containerStyle,
  titleStyle,
  subTitle,
}: UserInfoProps) => {
  return (
    <View className={containerStyle}>
      <Text className={`${titleStyle} text-center capitalize`}>{title}</Text>
      {subTitle && (
        <Text className="text-sm font-psmall text-gray-500">{subTitle}</Text>
      )}
    </View>
  );
};

export default UserInfo;
