import { StyleSheet, Text, View } from "react-native";
import React from "react";
import {  GradientButtonProps } from "@/type";
import { useRouter } from "expo-router";
import { TouchableOpacity } from "react-native";
import { CaretCircleLeft } from "phosphor-react-native";
import { verticalScale } from "@/utils/styling";
import { COLORS, SPACING } from "@/constants/theme";
import { LinearGradient } from 'expo-linear-gradient';
import * as Icons from "phosphor-react-native"
import CustomIcon from "./CustomIcon";

const GradientBGIcon = ({ style, icon, color, iconSize = 24 , onPress}: GradientButtonProps) => {
const router = useRouter();
return (
    <TouchableOpacity onPress={onPress} style={[style]}>
     <View style={styles.container}>
     <LinearGradient
            start={{ x: 0, y: 0 }} 
            end={{ x: 1, y: 1 }}
            colors={[COLORS.primaryGreyHex, COLORS.primaryBlackHex]}
            style={styles. backgroundLinear}
                        >
                    {icon && <CustomIcon icon={icon} iconSize={iconSize} iconColor={color} iconWeight="fill" />}
        </LinearGradient>
     </View>
    </TouchableOpacity>
);
};

export default GradientBGIcon;

const styles = StyleSheet.create({
    container: {
        borderWidth: 2,
        borderColor: COLORS.secondaryDarkGreyHex,
        borderRadius: SPACING.space_12,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: COLORS.secondaryDarkGreyHex,
        overflow:"hidden"

    },
    backgroundLinear: {
        height: SPACING.space_36,
        width: SPACING.space_36,
        alignItems: "center",
        justifyContent:"center"
    }
});