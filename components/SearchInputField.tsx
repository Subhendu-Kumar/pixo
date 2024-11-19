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

const SearchInputField = ({
  value,
  handleChangeText,
  placeholder,
  otherStyles,
  keyBoardType,
}: {
  value: string;
  handleChangeText: (e: string) => void;
  placeholder?: string;
  otherStyles?: string;
  keyBoardType?: KeyboardTypeOptions;
}) => {
  return (
    <View className="w-full h-16 px-4 border border-orange-400 rounded-lg bg-zinc-200 focus:border-primary-100 items-center flex-row">
      <TextInput
        className="flex-1 font-psemibold text-base w-full h-full"
        value={value}
        placeholder={placeholder}
        onChangeText={handleChangeText}
      />
      <TouchableOpacity>
        <Image source={icons.search} className="w-6 h-6" resizeMode="contain" />
      </TouchableOpacity>
    </View>
  );
};

export default SearchInputField;
