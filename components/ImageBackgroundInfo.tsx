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
import {
  BORDERRADIUS,
  COLORS,
  FONTFAMILY,
  FONTSIZE,
  SPACING,
} from "@/constants/theme";
import Typo from "./Typo";
import CustomIcon from "./CustomIcon";
import { Colors } from "@/constants/Colors";

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
              color={favourite ? "red" : COLORS.primaryLightGreyHex}
              iconSize={FONTSIZE.size_16}
              onPress={() => {
                toggleFavourite?.(favourite, type, id);
              }}
            />
          </View>
        ) : (
          <View style={styles.imageHeaderContainerWithBackWithOutBack}>
            <GradientBGIcon
              icon={Icons.Heart}
              color={favourite ? "red" : COLORS.primaryLightGreyHex}
              iconSize={FONTSIZE.size_16}
              onPress={() => {
                toggleFavourite?.(favourite, type, id);
              }}
            />
          </View>
        )}
        <View style={styles.imageInfoOuterContainer}>
          <View style={styles.imageInfoInnerContainer}>
            <View style={styles.infoContainerRow}>
              <View>
                <Typo
                  size={FONTSIZE.size_24}
                  color={COLORS.primaryWhiteHex}
                  fontWeight={"600"}
                >
                  {name}
                </Typo>
                <Typo
                  size={FONTSIZE.size_12}
                  color={COLORS.primaryWhiteHex}
                  style={{ fontFamily: FONTFAMILY.poppins_medium }}
                >
                  {special_ingredient}
                </Typo>
              </View>
              <View style={styles.itemPropertiesContainer}>
                <View style={styles.properFirst}>
                  <CustomIcon
                    icon={type == "Bean" ? Icons.CoffeeBean : Icons.Coffee}
                    iconSize={
                      type == "Bean" ? FONTSIZE.size_18 : FONTSIZE.size_18
                    }
                    iconColor={COLORS.primaryOrangeHex}
                  />
                  <Typo
                    color={COLORS.primaryWhiteHex}
                    size={FONTSIZE.size_10}
                    fontWeight={"400"}
                    style={{
                      marginTop:
                        type == "Bean"
                          ? SPACING.space_2 + SPACING.space_2
                          : SPACING.space_2 + SPACING.space_2,
                    }}
                  >
                    {type}
                  </Typo>
                </View>
                <View style={styles.properFirst}>
                  <CustomIcon
                    icon={type == "Bean" ? Icons.NavigationArrow : Icons.Drop}
                    iconSize={FONTSIZE.size_16}
                    iconColor={COLORS.primaryOrangeHex}
                  />
                  <Typo
                    color={COLORS.primaryWhiteHex}
                    size={FONTSIZE.size_10}
                    fontWeight={"400"}
                    style={{
                      marginTop:
                        type == "Bean"
                          ? SPACING.space_2 + SPACING.space_2
                          : SPACING.space_2 + SPACING.space_2,
                      justifyContent:"center"
                    }}
                  >
                    {ingredients}
                  </Typo>
                </View>
              </View>
            </View>
            <View style={styles.infoContainerRow}>
              <View style={styles.ratingContainer}>
                <CustomIcon
                  icon={Icons.Star}
                  iconSize={FONTSIZE.size_18}
                  iconColor={COLORS.primaryOrangeHex}
                />
                <Typo
                  color={COLORS.primaryWhiteHex}
                  size={FONTSIZE.size_12}
                  fontWeight={"600"}
                >
                  {average_rating}
                </Typo>
                <Typo
                  color={COLORS.primaryWhiteHex}
                  size={FONTSIZE.size_10}
                  fontWeight={"400"}
                >
                  ({ratings_count})
                </Typo>
              </View>
              <View style={styles.roastedContainer}>
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
        </View>
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
  imageInfoOuterContainer: {
    paddingVertical: SPACING.space_24,
    paddingHorizontal: SPACING.space_30,
    backgroundColor: COLORS.primaryBlackRGBA,
    borderTopLeftRadius: BORDERRADIUS.radius_20 * 2,
    borderTopRightRadius: BORDERRADIUS.radius_20 * 2,
  },
  imageInfoInnerContainer: {
    justifyContent: "space-between",
    gap: SPACING.space_20,
  },
  infoContainerRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  itemPropertiesContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: SPACING.space_20,
  },
  properFirst: {
    height: 55,
    width: 60,
    borderRadius: BORDERRADIUS.radius_20,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: COLORS.primaryBlackHex,
  },
  ratingContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: SPACING.space_10,
  },
  roastedContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: SPACING.space_10,
  },
});
