import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React from "react";
import { Image, ImageProps } from "expo-image";
import { LinearGradient } from "expo-linear-gradient";
import { BORDERRADIUS, COLORS, FONTSIZE, SPACING } from "@/constants/theme";
import Typo from "./Typo";
import CustomIcon from "./CustomIcon";
import * as Icons from "phosphor-react-native";

type CartItemProps = {
  id: string;
  name: string;
  roasted: string;
  prices: any;
  type: string;
  imagelink_square: ImageProps;
  special_ingredient: string;
  incrementCartItemQuantityHandler: any;
  decrementCartItemQuantityHandler: any;
};
const CartItem = ({
  id,
  name,
  roasted,
  prices,
  type,
  imagelink_square,
  special_ingredient,
  incrementCartItemQuantityHandler,
  decrementCartItemQuantityHandler,
}: CartItemProps) => {
  return (
    <View>
      {prices.length != 1 ? (
        <LinearGradient
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          colors={[COLORS.primaryGreyHex, COLORS.primaryBlackHex]}
          style={styles.cartItemLinear}
        >
          <View style={styles.cartItemRow}>
            <Image
              source={imagelink_square}
              style={styles.cartItemImage}
              contentFit="cover"
            />
            <View style={styles.cartItemInfo}>
              <View>
                <Typo
                  size={SPACING.space_16}
                  color={COLORS.primaryOrangeHex}
                  fontFamily="Poppins_600SemiBold"
                  style={{ marginBottom: 5 }}
                >
                  {name}
                </Typo>
                <Typo
                  size={SPACING.space_12}
                  color={COLORS.primaryWhiteHex}
                  fontFamily="Poppins_400Regular"
                >
                  {special_ingredient}
                </Typo>
              </View>
              <View style={styles.cartItemRoastedContainer}>
                <CustomIcon
                  icon={Icons.Fire}
                  iconSize={FONTSIZE.size_20}
                  iconColor={COLORS.primaryOrangeHex}
                />
                <Typo
                  color={COLORS.primaryWhiteHex}
                  size={FONTSIZE.size_10}
                  fontWeight={"400"}
                >
                  {roasted}
                </Typo>
              </View>
            </View>
          </View>
          {prices.map((data, index) => (
            <View
              key={index.toString()}
              style={styles.cartItemSizeRowContainer}
            >
              <View style={styles.cartItemSizeValueContainer}>
                <View style={styles.sizeBox}>
                  <Typo
                    fontFamily="poppins_medium"
                    color={COLORS.secondaryLightGreyHex}
                    size={type == "Bean" ? FONTSIZE.size_12 : FONTSIZE.size_14}
                  >
                    {data.size}
                  </Typo>
                </View>
                <Typo
                  fontFamily="poppins_semibold"
                  color={COLORS.primaryOrangeHex}
                  size={FONTSIZE.size_16}
                  fontWeight={"800"}
                >
                  {data.currency}{" "}
                  <Typo fontWeight={"800"} color={COLORS.primaryWhiteHex}>
                    {data.price}
                  </Typo>
                </Typo>
              </View>
              <View style={styles.cartItemSizeValueContainer}>
                <CustomIcon
                  icon={Icons.Minus}
                  iconColor={COLORS.primaryWhiteHex}
                  iconSize={FONTSIZE.size_12}
                  style={styles.cartItemIcon}
                  iconWeight="bold"
                  onPress={() => {
                    decrementCartItemQuantityHandler(id, data.size);
                  }}
                />
                <View style={styles.quantityContainer}>
                  <Typo size={FONTSIZE.size_12}>{data.quantity}</Typo>
                </View>
                <CustomIcon
                  icon={Icons.Plus}
                  iconColor={COLORS.primaryWhiteHex}
                  iconSize={FONTSIZE.size_12}
                  style={styles.cartItemIcon}
                  iconWeight="bold"
                  onPress={() => {
                    incrementCartItemQuantityHandler(id, data.size);
                  }}
                />
              </View>
            </View>
          ))}
        </LinearGradient>
      ) : (
        <LinearGradient
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          colors={[COLORS.primaryGreyHex, COLORS.primaryBlackHex]}
          style={styles.cartItemSingleLinearGradient}
        >
          <View>
            <Image
              source={imagelink_square}
              style={styles.cartItemSingleImage}
              contentFit="cover"
            />
          </View>
          <View style={styles.cartItemSingleInfoContainer}>
            <View>
              <Typo
                size={FONTSIZE.size_14}
                color={COLORS.primaryWhiteHex}
                fontFamily="poppins_medium"
                style={{ paddingBottom: 5 }}
              >
                {name}
              </Typo>
              <Typo
                size={FONTSIZE.size_12}
                color={COLORS.secondaryLightGreyHex}
                fontFamily="poppins_regular"
              >
                {special_ingredient}
              </Typo>
            </View>
            <View style={styles.cartItemSizeSingleValueContainer}>
              <View style={[styles.sizeBox, { marginTop: 10 }]}>
                <Typo
                  fontFamily="poppins_medium"
                  fontWeight={"700"}
                  color={COLORS.secondaryLightGreyHex}
                  size={type == "Bean" ? FONTSIZE.size_12 : FONTSIZE.size_16}
                >
                  {prices[0].size}
                </Typo>
              </View>
              <View>
                <Typo
                  fontFamily="poppins_semibold"
                  color={COLORS.primaryOrangeHex}
                  size={FONTSIZE.size_16}
                  fontWeight={"800"}
                >
                  {prices[0].currency}{" "}
                  <Typo fontWeight={"800"} color={COLORS.primaryWhiteHex}>
                    {prices[0].price}
                  </Typo>
                </Typo>
              </View>
              </View>
              <View style={styles.cartItemQuantityContainer}>
                <CustomIcon
                  icon={Icons.Minus}
                  iconColor={COLORS.primaryWhiteHex}
                  iconSize={FONTSIZE.size_12}
                  style={styles.cartItemIcon}
                  iconWeight="bold"
                  onPress={() => {
                    decrementCartItemQuantityHandler(id, prices[0].size);
                  }}
                />
                <View style={styles.quantityContainer}>
                  <Typo size={FONTSIZE.size_14}>{prices[0].quantity}</Typo>
                </View>
                <CustomIcon
                  icon={Icons.Plus}
                  iconColor={COLORS.primaryWhiteHex}
                  iconSize={FONTSIZE.size_12}
                  style={styles.cartItemIcon}
                  iconWeight="bold"
                  onPress={() => {
                    incrementCartItemQuantityHandler(id, prices[0].size);
                  }}
                />
              </View>
          </View>
        </LinearGradient>
      )}
    </View>
  );
};

export default CartItem;

const styles = StyleSheet.create({
  cartItemLinear: {
    flex: 1,
    borderRadius: BORDERRADIUS.radius_25,
    padding: SPACING.space_12,
    gap: SPACING.space_12,
  },
  cartItemImage: {
    height: 130,
    width: 130,
    borderRadius: BORDERRADIUS.radius_25,
  },
  cartItemRow: {
    flex: 1,
    flexDirection: "row",
    gap: SPACING.space_10,
  },
  cartItemInfo: {
    flex: 1,
    paddingVertical: SPACING.space_2,
    justifyContent: "space-between",
  },
  cartItemRoastedContainer: {
    flexDirection: "row",
    gap: SPACING.space_10,
    height: 50,
    width: 50 * 2 + SPACING.space_20,
    borderRadius: BORDERRADIUS.radius_15,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: SPACING.space_4,
    backgroundColor: COLORS.primaryDarkGreyHex,
  },
  cartItemSizeRowContainer: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    gap: SPACING.space_20,
  },
  cartItemSizeValueContainer: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  sizeBox: {
    backgroundColor: COLORS.primaryBlackHex,
    height: 40,
    width: 70,
    borderRadius: BORDERRADIUS.radius_10,
    justifyContent: "center",
    alignItems: "center",
  },
  cartItemIcon: {
    backgroundColor: COLORS.primaryOrangeHex,
    padding: SPACING.space_12,
    borderRadius: BORDERRADIUS.radius_10,
    justifyContent: "center",
    alignItems: "center",
  },
  quantityContainer: {
    backgroundColor: COLORS.primaryBlackHex,
    borderWidth: 2,
    borderColor: COLORS.primaryOrangeHex,
    width: 60,
    borderRadius: BORDERRADIUS.radius_10,
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: SPACING.space_4,
  },
  cartItemSingleLinearGradient: {
    flexDirection: "row",
    alignItems: "center",
    padding: SPACING.space_12,
    gap: SPACING.space_12,
    borderRadius: BORDERRADIUS.radius_25,
  },
  cartItemSingleImage: {
    height: 140,
    width: 140,
    borderRadius: BORDERRADIUS.radius_20,
  },
  cartItemSingleInfoContainer: {
    flex: 1,
    alignSelf: "stretch",
    justifyContent:"space-around"
  },
  cartItemSizeSingleValueContainer: {
    flexDirection: "row",
    justifyContent: "space-evenly",
    alignItems:"center"
  },
  cartItemQuantityContainer: {
    flexDirection: "row",
    justifyContent: "space-evenly",
    alignItems: "center",
    marginTop:5
  }
});
