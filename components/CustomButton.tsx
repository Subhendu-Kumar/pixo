import { TouchableOpacity, Text } from "react-native";
import React from "react";

interface CustomButtonProps {
  title: string;
  handlePress: () => void;
  containerStyles?: string;
  textStyles?: string;
  isLoading?: boolean;
}

const CustomButton = ({
  title,
  handlePress,
  containerStyles,
  textStyles,
  isLoading,
}: CustomButtonProps) => {
  return (
    <TouchableOpacity
      activeOpacity={0.7}
      className={`bg-secondary-200 rounded-xl min-h-[62px] justify-center items-center p-3 ${containerStyles} ${
        isLoading ? "opacity-50" : "opacity-100"
      }`}
      disabled={isLoading}
      onPress={handlePress}
    >
      <Text
        className={`text-white text-center font-psemibold text-lg ${textStyles}`}
      >
        {title}
      </Text>
    </TouchableOpacity>
  );
};

export default CustomButton;
