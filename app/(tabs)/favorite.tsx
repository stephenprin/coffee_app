import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React from "react";
import { useStore } from "@/store/store";
import { useBottomTabBarHeight } from "@react-navigation/bottom-tabs";
import { useRouter } from "expo-router";
import { SPACING } from "@/constants/theme";
import ScreenWrapper from "@/components/ScreenWrapper";
import Header from "@/components/Header";
import EmptyListAnimation from "@/components/EmptyListAnimation";
import FavouritiesItemCard from "@/components/FavouritiesItemCard";

const Favorite = () => {
  const favouriteList = useStore((state: any) => state.FavoritesList);
  const addToFavouriteList = useStore((state: any) => state.addToFavouriteList);
  const deleteFromFavouriteList = useStore(
    (state: any) => state.deleteFromFavouriteList
  );

  const ToggleFavourite = (favourite: boolean, type: string, id: string) => {
    favourite
      ? deleteFromFavouriteList(type, id)
      : addToFavouriteList(type, id);
  };

  const tabBarHeight = useBottomTabBarHeight();
  const router = useRouter();
  return (
    <ScreenWrapper>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollViewFlex}
      >
        <View
          style={[styles.scrollViewInnerView, { marginBottom: tabBarHeight }]}
        >
          <View style={{ flex: 1 }}>
            <Header title="Favorites" />
            {favouriteList.length === 0 ? (
              <EmptyListAnimation title="No Favorites" />
            ) : (
              <View style={styles.listItemContainer}>
                {favouriteList.map((item: any) => (
                  <TouchableOpacity
                    onPress={() => {
                      router.push({
                        pathname: "/details",
                        params: {
                          index: item.index,
                          id: item.id,
                          type: item.type,
                        },
                      });
                    }}
                    key={item.id}
                  >
                    <FavouritiesItemCard
                      id={item.id}
                      name={item.name}
                      roasted={item.roasted}
                      type={item.type}
                      imagelink_portrait={item.imagelink_portrait}
                      special_ingredient={item.special_ingredient}
                      average_rating={item.average_rating}
                      rating_count={item.rating_count}
                      description={item.description}
                      favourite={item.favourite}
                      toggleFavouriteItem={ToggleFavourite}
                    />
                  </TouchableOpacity>
                ))}
              </View>
            )}
          </View>
        </View>
      </ScrollView>
    </ScreenWrapper>
  );
};

export default Favorite;

const styles = StyleSheet.create({
  scrollViewInnerView: {
    flex: 1,
    justifyContent: "space-between",
  },
  listItemContainer: {
    paddingHorizontal: 20,
    gap: SPACING.space_20,
  },
  scrollViewFlex: {
    flexGrow: 1,
  },
});
