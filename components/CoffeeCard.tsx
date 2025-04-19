import {
  Dimensions,
  ImageBackground,
  StyleSheet,
  Text,
  View,
} from "react-native";
import React from "react";
import Typo from "./Typo";
import { Coffee } from "@/type";
import { LinearGradient } from "expo-linear-gradient";
import {
  BORDERRADIUS,
  COLORS,
  FONTFAMILY,
  FONTSIZE,
  SPACING,
} from "@/constants/theme";
import CustomIcon from "./CustomIcon";
import * as Icons from "phosphor-react-native";
import { TouchableOpacity } from "react-native";
import BGIcon from "./BGIcon";

const CARD_WIDTH = Dimensions.get("window").width * 0.32;

const CoffeeCard = ({
  id,
  name,
  description,
  roasted,
  imagelink_square,
  ingredients,
  special_ingredient,
  prices,
  average_rating,
  ratings_count,
  favourite,
  type,
  index,
  buttonPressHandler,
}: Coffee) => {
  return (
    <LinearGradient
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
      colors={[COLORS.primaryGreyHex, COLORS.primaryBlackHex]}
      style={styles.cardLinearGradient}
    >
      <ImageBackground
        source={imagelink_square}
        style={styles.cardImageBG}
        resizeMode="cover"
      >
        <View style={styles.ratingContainer}>
          <CustomIcon
            icon={Icons.Star}
            iconColor={COLORS.primaryOrangeHex}
            iconSize={FONTSIZE.size_12}
          />
          <Typo
            size={FONTSIZE.size_10}
            color={COLORS.primaryWhiteHex}
            style={{ fontFamily: FONTFAMILY.poppins_medium, lineHeight: 22 }}
          >
            {average_rating}
          </Typo>
        </View>
      </ImageBackground>
      <Typo
        size={FONTSIZE.size_14}
        color={COLORS.primaryWhiteHex}
        style={{ fontFamily: FONTFAMILY.poppins_medium }}
      >
        {name}
      </Typo>
      <Typo
        size={FONTSIZE.size_10}
        color={COLORS.primaryWhiteHex}
        style={{ fontFamily: FONTFAMILY.poppins_light }}
      >
        {special_ingredient}
      </Typo>
      <View style={styles.cardFooter}>
        <View style={{ flexDirection: "row", alignItems: "center", gap: 2 }}>
          <Typo
            size={FONTSIZE.size_14}
            color={COLORS.primaryOrangeHex}
            style={{ fontFamily: FONTFAMILY.poppins_bold }}
            fontWeight={"600"}
          >
            $
          </Typo>
          <Typo
            size={FONTSIZE.size_14}
            color={COLORS.primaryWhiteHex}
            style={{ fontFamily: FONTFAMILY.poppins_bold }}
        fontWeight={"600"}
          >
            {prices.price}
          </Typo>
        </View>
        <TouchableOpacity onPress={() => {
          buttonPressHandler({
            id,
            index,
            type,
            name,
            roasted,
            imagelink_square,
            special_ingredient,
            ingredients,
            prices:[{...prices, quantity: 1}],
          });
        }}>
          <BGIcon
            icon={Icons.Plus}
            color={COLORS.primaryWhiteHex}
            BGColor={COLORS.primaryOrangeHex}
            size={FONTSIZE.size_12}
          />
        </TouchableOpacity>
      </View>
    </LinearGradient>
  );
};

export default CoffeeCard;

const styles = StyleSheet.create({
  cardLinearGradient: {
    padding: SPACING.space_15,
    borderRadius: BORDERRADIUS.radius_25,
  },
  cardImageBG: {
    height: CARD_WIDTH,
    width: CARD_WIDTH,
    borderRadius: BORDERRADIUS.radius_20,
    overflow: "hidden",
    marginBottom: SPACING.space_15,
  },
  ratingContainer: {
    flexDirection: "row",
    backgroundColor: COLORS.primaryBlackRGBA,
    alignItems: "center",
    justifyContent: "center",
    gap: SPACING.space_10,
    paddingHorizontal: SPACING.space_15,
    position: "absolute",
    borderBottomLeftRadius: BORDERRADIUS.radius_20,
    top: 0,
    right: 0,
  },
  cardFooter: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: SPACING.space_15,
  },
});
