import { Image, StyleSheet, Text, View } from "react-native";
import React from "react";
import { LinearGradient } from "expo-linear-gradient";
import { BORDERRADIUS, COLORS, FONTSIZE, SPACING } from "@/constants/theme";
import CustomIcon from "./CustomIcon";
import * as Icons from "phosphor-react-native";
import Typo from "./Typo";

type PaymentMethodProps = {
  paymentMode: string;
  name: string;
  icon: any;
  isIcon: boolean;
};

const PaymentMethod = ({
  paymentMode,
  name,
  icon,
  isIcon,
}: PaymentMethodProps) => {
  return (
    <View
      style={[
        styles.paymentCardContainer,
        {
          borderColor:
            paymentMode === name
              ? COLORS.primaryOrangeHex
              : COLORS.primaryGreyHex,
        },
      ]}
    >
      {isIcon ? (
        <LinearGradient
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          colors={[COLORS.primaryGreyHex, COLORS.primaryBlackHex]}
          style={styles.backgroundLinearWallet}
        >
          <View style={styles.walletRow}>
            <CustomIcon
              icon={Icons.Wallet}
              iconColor={COLORS.primaryOrangeHex}
              iconSize={FONTSIZE.size_30}
            />
            <Typo size={FONTSIZE.size_16} color="white" fontWeight={"600"}>{name}</Typo>
          </View>
          <Typo size={FONTSIZE.size_14} color={COLORS.secondaryLightGreyHex} fontWeight={"600"}>$ 1000.00</Typo>
        </LinearGradient>
      ) : (
        <LinearGradient
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          colors={[COLORS.primaryGreyHex, COLORS.primaryBlackHex]}
          style={styles.backgroundLinearRegularWallet}
        >
          <Image source={icon} style={styles.paymentImage} />
          <Typo size={FONTSIZE.size_14} color="white" fontWeight={"600"}>{name}</Typo>

    
        </LinearGradient>
      )}
    </View>
  );
};

export default PaymentMethod;

const styles = StyleSheet.create({
  paymentCardContainer: {
    borderRadius: BORDERRADIUS.radius_15 * 2,
    backgroundColor: COLORS.primaryGreyHex,
    borderWidth: 3,
  },
  backgroundLinearWallet: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: SPACING.space_24,
    borderRadius: BORDERRADIUS.radius_15 * 2,
    gap: SPACING.space_10,
  padding: SPACING.space_12,

  },
  backgroundLinearRegularWallet: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: SPACING.space_24,
    borderRadius: BORDERRADIUS.radius_15 * 2,
    gap: SPACING.space_10,
  padding: SPACING.space_12,

  },
  walletRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: SPACING.space_20,
  },
  paymentImage: {
    width: SPACING.space_30,
    height: SPACING.space_30,
  }
});
