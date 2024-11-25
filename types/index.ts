import React from "react";
import { KeyboardTypeOptions } from "react-native";

export interface FormStateSignIn {
  email: string;
  password: string;
}

export interface FormStateSignUp {
  email: string;
  username: string;
  password: string;
}

export interface Post {
  title: string;
  image: string;
  users: string;
  description: string;
}

export interface CustomButtonProps {
  title: string;
  textStyles?: string;
  isLoading?: boolean;
  uploading?: boolean;
  handlePress: () => void;
  containerStyles?: string;
}

export interface EmptyStateProps {
  title: string;
  subTitle: string;
}

export interface FormFieldProps {
  title: string;
  value: string;
  [key: string]: any;
  placeholder?: string;
  otherStyles?: string;
  keyBoardType?: KeyboardTypeOptions;
  handleChangeText: (e: string) => void;
}

interface User {
  avatar: string;
  username: string;
}

export interface Post2 {
  users: User;
  title: string;
  image: string;
  description: string;
}

export interface UserInfoProps {
  title?: string;
  subTitle?: string;
  titleStyle?: string;
  containerStyle?: string;
}

export interface AuthContextType {
  user: any | null;
  isLoading: boolean;
  isLoggedIn: boolean;
  setUser: React.Dispatch<React.SetStateAction<any | null>>;
  setIsLoggedIn: React.Dispatch<React.SetStateAction<boolean>>;
}

export interface TabIconProps {
  icon: any;
  color: string;
  focused: boolean;
}

export interface FormStateCreatePost {
  title: string;
  image: string;
  description: string;
}
