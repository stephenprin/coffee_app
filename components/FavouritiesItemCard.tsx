import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { ImageProps } from "expo-image";
import ImageBackgroundInfo from "./ImageBackgroundInfo";
import { LinearGradient } from "expo-linear-gradient";
import { COLORS } from "@/constants/theme";
import Typo from "./Typo";

type FavouritiesItemCardProps = {
  id: string;
  name: string;
  roasted: string;
  type: string;
  imagelink_square: ImageProps;
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
  imagelink_square,
  special_ingredient,
  average_rating,
  rating_count,
  description,
  favourite,
  toggleFavouriteItem,
}: FavouritiesItemCardProps) => {
  return (
    <View>
      <ImageBackgroundInfo />
      <LinearGradient
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        colors={[COLORS.primaryGreyHex, COLORS.primaryBlackHex]}
        style={styles.containerBackgroundLinear}
          >
              <Typo>{description}</Typo>
              <Typo>{description }</Typo>
      </LinearGradient>
    </View>
  );
};

export default FavouritiesItemCard;

const styles = StyleSheet.create({
    containerBackgroundLinear:{}
});
