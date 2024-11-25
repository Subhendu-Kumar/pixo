import { UserInfoProps } from "@/types";
import { View, Text } from "react-native";

const UserInfo = ({
  title,
  subTitle,
  titleStyle,
  containerStyle,
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
