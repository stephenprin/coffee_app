import {
  ImageProps,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React from "react";
import { ImageBackground } from "react-native";
import GradientBGIcon from "./GradientBGIcon";
import * as Icons from "phosphor-react-native";
import { COLORS, FONTSIZE, SPACING } from "@/constants/theme";

type ImageBackgroundInfoProps = {
  enabledBackHandler: boolean;
  imagelink_portrait: ImageProps;
  type: string;
  id: string;
  favourite: boolean;
  name: string;
  special_ingredient: string;
  average_rating: number;
  ratings_count: string;
  roasted: string;
  ingredients: string;
  backHandler?: any;
  toggleFavourite?: any;
};
const ImageBackgroundInfo = ({
  enabledBackHandler,
  imagelink_portrait,
  type,
  id,
  favourite,
  name,
  special_ingredient,
  average_rating,
  ratings_count,
  roasted,
  ingredients,
  backHandler,
  toggleFavourite,
}: ImageBackgroundInfoProps) => {
  console.log("fsvorite iMageCOMP", favourite);
  return (
    <View>
      <ImageBackground
        source={imagelink_portrait}
        style={styles.itemImageBG}
        resizeMode="cover"
      >
        {enabledBackHandler ? (
          <View style={styles.imageHeaderContainerWithBack}>
            <GradientBGIcon
              icon={Icons.ArrowLeft}
              color={COLORS.primaryLightGreyHex}
              iconSize={FONTSIZE.size_16}
              onPress={() => {
                backHandler?.();
              }}
            />

            <GradientBGIcon
              icon={Icons.Heart}
              color={
                favourite ? "red" : COLORS.primaryLightGreyHex
              }
              iconSize={FONTSIZE.size_16}
              onPress={() => {
                console.log("❤️ Heart pressed");
                toggleFavourite?.(favourite, type, id);
              }}
            />
          </View>
        ) : (
          <View style={styles.imageHeaderContainerWithBackWithOutBack}>
            <TouchableOpacity
              onPress={() => {
                toggleFavourite(favourite, type, id);
              }}
            >
              <GradientBGIcon
                icon={Icons.Heart}
                color={
                  favourite ? COLORS.primaryRedHex : COLORS.primaryLightGreyHex
                }
                iconSize={FONTSIZE.size_16}
              />
            </TouchableOpacity>
          </View>
        )}
      </ImageBackground>
    </View>
  );
};

export default ImageBackgroundInfo;

const styles = StyleSheet.create({
  itemImageBG: {
    width: "100%",
    aspectRatio: 20 / 25,
    justifyContent: "space-between",
  },
  imageHeaderContainerWithBack: {
    flexDirection: "row",
    padding: SPACING.space_20,
    alignItems: "center",
    justifyContent: "space-between",
  },
  imageHeaderContainerWithBackWithOutBack: {
    flexDirection: "row",
    padding: SPACING.space_28,
    alignItems: "center",
    justifyContent: "flex-end",
  },
});
