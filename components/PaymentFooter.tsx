import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React from "react";
import Typo from "./Typo";
import { COLORS, FONTFAMILY, FONTSIZE, SPACING } from "@/constants/theme";

type priceProps = {
  price: string;
  currency: string;
};

type PaymentFooterProps = {
  price: priceProps;
  buttonPressHandler: () => void;
  buttonTitle: string;
  style?: object;
};

const PaymentFooter = ({
  price,
  buttonPressHandler,
  buttonTitle,
  style
}: PaymentFooterProps) => {
  return (
    <View style={[styles.priceFooter, style]} >
      <View style={styles.priceContainer}>
        <Typo
          size={FONTSIZE.size_12}
          fontWeight="600"
          style={{ fontFamily: FONTFAMILY.poppins_medium }}
          color={COLORS.secondaryLightGreyHex}
        >
          Price
        </Typo>
        <Typo
          fontWeight="900"
          size={FONTSIZE.size_20}
          style={{ fontFamily: FONTFAMILY.poppins_semibold }}
          color={COLORS.primaryOrangeHex}
        >
          {price?.currency}{" "}
          <Typo size={FONTSIZE.size_20} fontWeight="900">
            {price?.price}
          </Typo>
        </Typo>
      </View>
      <TouchableOpacity style={styles.payButton} onPress={()=>buttonPressHandler()}>
        <Typo color={COLORS.primaryWhiteHex} fontWeight="800">
          {buttonTitle}
        </Typo>
      </TouchableOpacity>
    </View>
  );
};

export default PaymentFooter;

const styles = StyleSheet.create({
  priceFooter: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: SPACING.space_20,
        padding: SPACING.space_20,
    marginBottom: SPACING.space_10
  },
  priceContainer: {
    alignItems: "center",
  },
  payButton: {
    backgroundColor: COLORS.primaryOrangeHex,
    padding: 10,
    flex: 1,
    borderRadius: SPACING.space_20,
    justifyContent: "center",
    alignItems: "center",
    height: SPACING.space_28 * 2,
  },
});
