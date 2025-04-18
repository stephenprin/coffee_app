import {
  Pressable,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from "react-native";
import React, { useState } from "react";
import { useLocalSearchParams, useRouter } from "expo-router";
import { useStore } from "@/store/store";
import ScreenWrapper from "@/components/ScreenWrapper";
import {
  BORDERRADIUS,
  COLORS,
  FONTFAMILY,
  FONTSIZE,
  SPACING,
} from "@/constants/theme";
import { ScrollView } from "react-native";
import ImageBackgroundInfo from "@/components/ImageBackgroundInfo";
import Typo from "@/components/Typo";
import PaymentFooter from "@/components/PaymentFooter";

const Details = () => {
  const { index, id, type } = useLocalSearchParams();
  const [fullDesc, setFullDesc] = useState(false);

  const itemOfIndex = useStore((state: any) =>
    type === "Coffee" ? state.CoffeeList : state.BeansList
  )[Number(index)];
  const [price, setPrice] = useState(itemOfIndex.prices[0]);
  const router = useRouter();

  const backHandler = () => {
    router.back();
  };
  const addToFavouriteList = useStore((state: any) => state.addToFavouriteList);
  const deleteFromFavouriteList = useStore(
    (state: any) => state.deleteFromFavouriteList
  );
  const addToCart = useStore((state: any) => state.addToCart);
  const calculateCartPrice= useStore((state: any) => state.calculateCartPrice);

  const ToggleFavourite = (favourite: boolean, type: string, id: string) => {
    favourite
      ? deleteFromFavouriteList(type, id)
      : addToFavouriteList(type, id);
  };
  const addToCartHandler = ({
    id,
    index,
    type,
    name,
    roasted,
    imagelink_square,
    special_ingredient,
    ingredients,
    price
  }:any) => {
    addToCart({ id,
      type,
      index,
      name,
      roasted,
      imagelink_square,
      special_ingredient,
      ingredients,
      prices: [{ ...price, quantity: 1 }]
    });
    calculateCartPrice()
    router.push("/cart");
  };

  return (
    <ScreenWrapper>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollViewFlex}
      >
        <ImageBackgroundInfo
          enabledBackHandler={true}
          imagelink_portrait={itemOfIndex.imagelink_portrait}
          type={itemOfIndex.type}
          id={itemOfIndex.id}
          favourite={itemOfIndex.favourite}
          name={itemOfIndex.name}
          special_ingredient={itemOfIndex.special_ingredient}
          average_rating={itemOfIndex.average_rating}
          ratings_count={itemOfIndex.ratings_count}
          roasted={itemOfIndex.roasted}
          ingredients={itemOfIndex.ingredients}
          backHandler={backHandler}
          toggleFavourite={ToggleFavourite}
        />
        <View style={styles.footerInfo}>
          <Typo
            size={FONTSIZE.size_16}
            fontWeight={"600"}
            style={{
              fontFamily: FONTFAMILY.poppins_semibold,
              marginBottom: SPACING.space_10,
            }}
          >
            Description
          </Typo>
          {fullDesc ? (
            <Pressable
              onPress={() => {
                setFullDesc((prev) => !prev);
              }}
            >
              <Typo
                size={FONTSIZE.size_12}
                style={{
                  fontFamily: FONTFAMILY.poppins_regular,
                  marginBottom: SPACING.space_30,
                  letterSpacing: 0.5,
                }}
              >
                {itemOfIndex.description}
              </Typo>
            </Pressable>
          ) : (
            <Pressable
              onPress={() => {
                setFullDesc((prev) => !prev);
              }}
            >
              <Typo
                size={FONTSIZE.size_12}
                style={{
                  fontFamily: FONTFAMILY.poppins_regular,
                  marginBottom: SPACING.space_30,
                  letterSpacing: 0.5,
                }}
                numberOfLines={3}
              >
                {itemOfIndex.description}
              </Typo>
            </Pressable>
          )}

          <Typo
            size={FONTSIZE.size_16}
            fontWeight={"600"}
            style={{
              fontFamily: FONTFAMILY.poppins_semibold,
              marginBottom: SPACING.space_10,
            }}
          >
            Size
          </Typo>
          <View style={styles.sizeOuterContainer}>
            {itemOfIndex.prices.map((item: any) => (
              <TouchableOpacity
                style={[
                  {
                    borderColor:
                      item.size === price.size
                        ? COLORS.primaryOrangeHex
                        : COLORS.primaryDarkGreyHex,
                  },
                  styles.sizeBox,
                ]}
                key={item.size}
                onPress={() => {
                  setPrice(item);
                }}
              >
                <Typo
                  size={
                    itemOfIndex.type === "Bean"
                      ? FONTSIZE.size_12
                      : FONTSIZE.size_14
                  }
                  color={
                    item.size === price.size
                      ? COLORS.primaryOrangeHex
                      : COLORS.primaryLightGreyHex
                  }
                  fontWeight={"700"}
                >
                  {item.size}
                </Typo>
              </TouchableOpacity>
            ))}
          </View>

        </View>

        <PaymentFooter
          price={price}
          buttonTitle="Add to Cart"
          buttonPressHandler={() => {
            addToCartHandler({
              id: itemOfIndex.id,
              index:itemOfIndex.index,
              type: itemOfIndex.type,
              name: itemOfIndex.name,
              roasted: itemOfIndex.roasted,
              imagelink_square: itemOfIndex.imagelink_square,
              special_ingredient: itemOfIndex.special_ingredient,
              ingredients: itemOfIndex.ingredients,
              price:price
          })}}
        />
      </ScrollView>
    </ScreenWrapper>
  );
};

export default Details;

const styles = StyleSheet.create({
  scrollViewFlex: {
    flexGrow: 1,
    justifyContent: "space-between",
  },
  footerInfo: {
    padding: SPACING.space_20,
  },
  sizeOuterContainer: {
    flex: 1,
    justifyContent: "space-between",
    flexDirection: "row",
    gap: SPACING.space_20,
  },
  sizeBox: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: COLORS.primaryDarkGreyHex,
    borderWidth: 2,
    borderRadius: BORDERRADIUS.radius_10,
    height: SPACING.space_24 * 2,
  },
});
