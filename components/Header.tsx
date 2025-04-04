import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { HeaderProps } from "@/type";
import Typo from "./Typo";
import { COLORS, FONTFAMILY, FONTSIZE, SPACING } from "@/constants/theme";
import ProfilePic from "./ProfilePic";
import GradientBGIcon from "./GradientBGIcon";
import * as Icons from "phosphor-react-native";

const Header = ({ title = "", leftIcon, style }: HeaderProps) => {
  return (
    <View style={[styles.container, style]}>
      <GradientBGIcon
        icon={Icons.CubeFocus}
        color={COLORS.primaryLightGreyHex}
        iconSize={FONTSIZE.size_16}
      />
      <Typo style={styles.headerText}>{title}</Typo>
      <ProfilePic />
    </View>
  );
};

export default Header;

const styles = StyleSheet.create({
  container: {
    width: "100%",
    padding: SPACING.space_30,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  leftIcon: {
    alignSelf: "flex-start",
  },
  headerText: {
    fontFamily: FONTFAMILY.poppins_semibold,
    fontSize: FONTSIZE.size_20,
    color: COLORS.primaryWhiteHex,
  },
});
