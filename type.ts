import { ImageProps } from "expo-image";
import { Coffee } from "phosphor-react-native";
import { ReactNode } from "react";
import {
  ImageSourcePropType,
  TextInput,
  TextInputProps,
  TextProps,
  TextStyle,
  ViewStyle,
} from "react-native";

export type ScreenWrapperProps = {
  style?: ViewStyle;
  children: React.ReactNode;
};

export type Coffee = {
  id: string;
  name: string;
  description: string;
  roasted: string;
  imagelink_square?: ImageSourcePropType;
  imagelink_portrait?: ImageSourcePropType;
  ingredients: string;
  special_ingredient: string;
  prices: Price[];
  average_rating: number;
  ratings_count: string;
  favourite: boolean;
  type: string;
  index: number;
  buttonPressHandler: any;
};

export type Price = {
  size: "S" | "M" | "L";
  price: string;
  currency: string;
};

export type HeaderProps = {
  title?: string;
  style?: ViewStyle;
  leftIcon?: ReactNode;
  rightIcon?: ReactNode;
};

export type TypoProps = {
  size?: number;
  color?: string;
  fontWeight?: TextStyle["fontWeight"];
  children: any | null;
  style?: TextStyle | TextStyle[];
  textProps?: TextProps;
};

export type GradientButtonProps = {
  style?: ViewStyle;
  iconSize?: number;
  color: string;
  icon: React.ElementType | null;
  onPress?: () => void;
};
export interface InputProps extends TextInputProps {
  icon?: React.ElementType | null;
  containerStyle?: ViewStyle;
  inputStyle?: TextStyle;
  inputRef?: React.RefObject<TextInput>;
  color?: string;
  size: number;
  searchText: string;
  onPress:()=> void
  //   label?: string;
  //   error?: string;
}
