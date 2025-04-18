import { StyleSheet, Text, TextStyle, View } from "react-native";
import React from "react";
import { COLORS, FONTSIZE } from "@/constants/theme";
import { TypoProps } from "@/type";
import { verticalScale } from "@/utils/styling";

const Typo = ({
  size,
  color = COLORS.primaryWhiteHex,
  fontWeight = "400",
  children,
  numberOfLines,
  style,
  textProps={},
}: TypoProps) => {
    const textStyle: TextStyle = {
        fontSize: size? verticalScale(size) : FONTSIZE.size_16,
        color,
        fontWeight,
    }
    return <Text numberOfLines={numberOfLines} style={[textStyle, style]} {...textProps}>{children }</Text>;
};

export default Typo;

const styles = StyleSheet.create({});
