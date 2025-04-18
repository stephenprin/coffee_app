import { StatusBar, StyleSheet, Text, View } from "react-native";
import React from "react";
import { useLocalSearchParams, useRouter } from "expo-router";
import { useStore } from "@/store/store";
import ScreenWrapper from "@/components/ScreenWrapper";
import { COLORS } from "@/constants/theme";
import { ScrollView } from "react-native";
import ImageBackgroundInfo from "@/components/ImageBackgroundInfo";

const Details = () => {
  const { index, id, type } = useLocalSearchParams();
  const itemOfIndex = useStore((state: any) => {
    const list = type === "Coffee" ? state.CoffeeList : state.BeansList;
    return list.find((item: any) => item.id === id);
  });

  const router = useRouter();

  const backHandler = () => {
    router.back();
  };
  const addToFavouriteList = useStore((state: any) => state.addToFavouriteList);
  const deleteFromFavouriteList = useStore(
    (state: any) => state.deleteFromFavouriteList
  );

  const ToggleFavourite = (favourite: boolean, type: string, id: string) => {
    favourite
      ? deleteFromFavouriteList(type, id)
      : addToFavouriteList(type, id);
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
      </ScrollView>
    </ScreenWrapper>
  );
};

export default Details;

const styles = StyleSheet.create({
  scrollViewFlex: {
    flexGrow: 1,
  },
});
