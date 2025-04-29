import React from "react";
import { TouchableOpacity, StyleSheet } from "react-native";
import { useRouter } from "expo-router";
import { CaretCircleLeft } from "phosphor-react-native";
import { verticalScale } from "@/utils/styling";
import { COLORS } from "@/constants/theme";

type BackButtonProps = {
  style?: object;
  iconSize?: number;
  icon?: React.ElementType; 
  iconColor?: string;
    iconWeight?: "bold" | "duotone" | "fill" | "light" | "regular" | "thin";
   onPress?: () => void;
}

const CustomIcon: React.FC<BackButtonProps> = ({
  style,
  iconSize = 26,
  icon: Icon = CaretCircleLeft, 
  iconColor = COLORS.primaryLightGreyHex,
    iconWeight = "fill",
  onPress
}) => {
  const router = useRouter();

  return (
    <TouchableOpacity onPress={onPress} style={[style]}>
      <Icon size={verticalScale(iconSize)} color={iconColor} weight={iconWeight} iconWeight={ iconWeight} />
    </TouchableOpacity>
  );
};

export default CustomIcon;

const styles = StyleSheet.create({});
