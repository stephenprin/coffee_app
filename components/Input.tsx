import { StyleSheet, Text, TextInput, View } from "react-native";
import React, { useRef } from "react";
import { InputProps } from "@/type";
import { COLORS, BORDERRADIUS, spacingX, FONTSIZE } from "@/constants/theme";
import { verticalScale } from "@/utils/styling";
import CustomIcon from "./CustomIcon";

const Input = (props: InputProps) => {
  return (
    <View
      style={[styles.container, props.containerStyle && props.containerStyle]}
    >
      {props.icon && (
        <CustomIcon
          iconSize={props.size}
          icon={props.icon}
          iconWeight="fill"
          iconColor={props.color}
        />
      )}
      <TextInput
        {...props}
        style={[styles.input, props.inputStyle && props.inputStyle]}
        placeholderTextColor={COLORS.secondaryLightGreyHex}
        ref={props.inputRef && props.inputRef}
      />
    </View>
  );
};

export default Input;

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    height: verticalScale(45),
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: COLORS.primaryDarkGreyHex,
    borderWidth: 0.2,
    borderColor: COLORS.primaryLightGreyHex,
    borderRadius: BORDERRADIUS.radius_15,

    borderCurve: "continuous",
    paddingHorizontal: spacingX._15,
    gap: spacingX._10,
  },
  input: {
    flex: 1,
    color: COLORS.primaryWhiteHex,
    fontSize: verticalScale(14),
  },
});
