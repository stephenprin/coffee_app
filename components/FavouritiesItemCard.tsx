import { ImageProps, StyleSheet, Text, View } from "react-native";
import React from "react";

import ImageBackgroundInfo from "./ImageBackgroundInfo";
import { LinearGradient } from "expo-linear-gradient";
import {
  BORDERRADIUS,
  COLORS,
  FONTFAMILY,
  FONTSIZE,
  SPACING,
} from "@/constants/theme";
import Typo from "./Typo";

type FavouritiesItemCardProps = {
  id: string;
  name: string;
  roasted: string;
  type: string;
  imagelink_portrait: ImageProps;
  special_ingredient: string;
  average_rating: number;
  rating_count: string;
  description: string;
  favourite: boolean;
  toggleFavouriteItem: any;
};
const FavouritiesItemCard = ({
  id,
  name,
  roasted,
  type,
  imagelink_portrait,
  special_ingredient,
  average_rating,
  rating_count,
  description,
  favourite,
  toggleFavouriteItem,
}: FavouritiesItemCardProps) => {
  console.log("IMAGE", imagelink_portrait);
  return (
    <View style={styles.CardContainer}>
      <ImageBackgroundInfo
        enabledBackHandler={false}
        imagelink_portrait={imagelink_portrait}
        type={type}
        id={id}
        favourite={favourite}
        name={name}
        special_ingredient={special_ingredient}
        average_rating={average_rating}
        ratings_count={rating_count}
        roasted={roasted}
        ingredients={special_ingredient}
        toggleFavourite={toggleFavouriteItem}
      />
      <LinearGradient
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        colors={[COLORS.primaryGreyHex, COLORS.primaryBlackHex]}
        style={styles.containerBackgroundLinear}
      >
        <Typo
          fontFamily={FONTFAMILY.poppins_semibold}
          color={COLORS.secondaryLightGreyHex}
          size={FONTSIZE.size_16}
          fontWeight={"600"}
          style={{ marginBottom: 5 }}
        >
          Description
        </Typo>
        <Typo
          fontFamily={FONTFAMILY.poppins_regular}
          color={COLORS.primaryWhiteHex}
          size={FONTSIZE.size_12}
        >
          {description}
        </Typo>
      </LinearGradient>
    </View>
  );
};

export default FavouritiesItemCard;

const styles = StyleSheet.create({
  containerBackgroundLinear: {
    gap: SPACING.space_10,
    padding: SPACING.space_20,
  },
  CardContainer: {
    borderRadius: BORDERRADIUS.radius_25,
    overflow: "hidden",
  },
});
