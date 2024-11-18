import {
  View,
  Text,
  KeyboardTypeOptions,
  TextInput,
  TouchableOpacity,
  Image,
} from "react-native";
import React, { useState } from "react";
import { icons } from "../constants";

const FormField = ({
  title,
  value,
  handleChangeText,
  placeholder,
  otherStyles,
  keyBoardType,
  ...props
}: {
  title: string;
  value: string;
  handleChangeText: (e: string) => void;
  placeholder?: string;
  otherStyles?: string;
  keyBoardType?: KeyboardTypeOptions;
  [key: string]: any;
}) => {
  const [showPassword, setShowPassword] = useState<boolean>(false);

  return (
    <View className={`space-y-2 ${otherStyles}`}>
      <Text className="text-base text-gray-400 font-pmedium">{title}</Text>
      <View className="w-full h-16 px-4 border border-orange-400 rounded-lg bg-white focus:border-primary-100 items-center flex-row">
        <TextInput
          className="flex-1 font-psemibold text-base w-full h-full"
          value={value}
          placeholder={placeholder}
          onChangeText={handleChangeText}
          secureTextEntry={title === "Password" && !showPassword}
          {...props}
        />
        {title === "Password" && (
          <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
            <Image
              source={showPassword ? icons.eye : icons.eyeHide}
              className="w-6 h-6"
              resizeMode="contain"
            />
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
};

export default FormField;
