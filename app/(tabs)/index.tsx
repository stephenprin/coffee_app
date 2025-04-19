import {
  Dimensions,
  FlatList,
  ScrollView,
  StyleSheet,
  Text,
  ToastAndroid,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useCallback, useEffect, useRef, useState } from "react";
import ScreenWrapper from "@/components/ScreenWrapper";
import { useStore } from "@/store/store";
import {
  getCategoriesFromData,
  getCategoryList,
  verticalScale,
} from "@/utils/styling";
import Header from "@/components/Header";
import * as Icons from "phosphor-react-native";
import Typo from "@/components/Typo";
import {
  BORDERRADIUS,
  COLORS,
  FONTFAMILY,
  FONTSIZE,
  SPACING,
} from "@/constants/theme";
import Input from "@/components/Input";
import CoffeeCard from "@/components/CoffeeCard";
import { useBottomTabBarHeight } from "@react-navigation/bottom-tabs";
import debounce from "lodash.debounce";
import { Coffee } from "@/type";
import { useRouter } from "expo-router";
import Toast from 'react-native-toast-message';


const Home = () => {
  const CoffeeList = useStore((state: any) => state.CoffeeList);
  const BeansList = useStore((state: any) => state.BeansList);
  const [searchText, setSearchText] = useState("");
  const [categories, setCategories] = useState(
    getCategoriesFromData(CoffeeList)
  );
  const [categoryIndex, setCategoryIndex] = useState({
    index: 0,
    category: categories[0],
  });
  const [sortedCoffee, setSortedCoffee] = useState(
    getCategoryList(categoryIndex.category, CoffeeList)
  );
  const router= useRouter()

  const tabBarHeight = useBottomTabBarHeight();
  const addToCart = useStore((state: any) => state.addToCart);
  const calculateCartPrice= useStore((state: any) => state.calculateCartPrice);

  const searchCoffee = (search: string) => {
    const trimmed = search.trim().toLowerCase();

    if (trimmed !== "") {
      setCategoryIndex({ index: 0, category: categories[0] });

      const filtered = CoffeeList.filter(
        (coffee: Coffee) =>
          coffee.name.toLowerCase().includes(trimmed) ||
          coffee.description.toLowerCase().includes(trimmed)
      );

      setSortedCoffee(filtered);
    } else {
      setSortedCoffee(CoffeeList);
    }
  };

  const debouncedSearch = useCallback(debounce(searchCoffee, 300), []);

  const CoffeeCardAddToCart = ({
    id,
    index,
    type,
    name,
    roasted,
    imagelink_square,
    special_ingredient,
    ingredients,
    prices
  }:any) => {
    addToCart({ id,
      type,
      index,
      name,
      roasted,
      imagelink_square,
      special_ingredient,
      ingredients,
      prices
    });
    calculateCartPrice()
    Toast.show({
      type: 'success',
      text1: `${name} added to cart`,
      text2: `The ${name} has been successfully added.`,
    });

  };

  useEffect(() => {
    debouncedSearch(searchText);
    return debouncedSearch.cancel;
  }, [searchText, debouncedSearch]);

  const reSetSearchCoffee = () => {
    setCategoryIndex({ index: 0, category: categories[0] });
    setSortedCoffee([...CoffeeList]);
    setSearchText("");
  };

  return (
    <ScreenWrapper>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ flexGrow: 1 }}
      >
        <Header />
        <Typo
          size={FONTSIZE.size_24}
          color={COLORS.primaryWhiteHex}
          fontWeight={"700"}
          style={{
            paddingLeft: SPACING.space_12,
            fontFamily: FONTFAMILY.poppins_semibold,
          }}
        >
          {" "}
          Enjoy the finest coffee,{"\n"} made just for you
        </Typo>
        {/* Search Input */}
        <View style={styles.InputContainer}>
          <TouchableOpacity>
            <Input
              icon={Icons.MagnifyingGlass}
              color={
                searchText.length > 0
                  ? COLORS.primaryOrangeHex
                  : COLORS.primaryLightGreyHex
              }
              size={FONTSIZE.size_16}
              placeholder="Find Your Coffee..."
              value={searchText}
              onChangeText={(value) => setSearchText(value)}
              searchText={searchText}
              onPress={() => {
                reSetSearchCoffee();
              }}
            />
          </TouchableOpacity>
        </View>

        {/* Categories */}
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.CategoryView}
        >
          {categories.map((data, index) => (
            <View key={index.toString()} style={styles.categoryContainer}>
              <TouchableOpacity
                style={styles.categoryItem}
                onPress={() => {
                  setCategoryIndex({
                    index: index,
                    category: categories[index],
                  });
                  setSortedCoffee([
                    ...getCategoryList(categories[index], CoffeeList),
                  ]);
                }}
              >
                <Typo
                  size={FONTSIZE.size_14}
                  color={COLORS.secondaryLightGreyHex}
                  style={[
                    styles.categoryText,
                    categoryIndex.index == index
                      ? { color: COLORS.primaryOrangeHex }
                      : {},
                  ]}
                >
                  {data}
                </Typo>
                {categoryIndex.index == index ? (
                  <View style={styles.ActiveCategory} />
                ) : (
                  <></>
                )}
              </TouchableOpacity>
            </View>
          ))}
        </ScrollView>

        {/* Coffee Flatlist */}
        <FlatList
          horizontal
          ListEmptyComponent={
            <View style={styles.emptyListContainer}>
              <Typo color={COLORS.primaryLightGreyHex}>No Coffee Available</Typo>
            </View>
          }
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.flatListContainer}
          data={sortedCoffee}
          renderItem={({ item }) => {
            return (
              <TouchableOpacity onPress={() =>
                router.push({
                  pathname: "/details",
                  params: {
                    index: item.index,
                    id: item.id,
                    type: item.type,
                  },
                })
              }>
                <CoffeeCard
                  id={item.id}
                  name={item.name}
                  description={item.description}
                  roasted={item.roasted}
                  imagelink_square={item.imagelink_square}
                  ingredients={item.ingredients}
                  special_ingredient={item.special_ingredient}
                  prices={item.prices[2]}
                  average_rating={item.average_rating}
                  ratings_count={item.ratings_count}
                  favourite={item.favourite}
                  type={item.type}
                  index={item.index}
                  buttonPressHandler={CoffeeCardAddToCart}
                />
              </TouchableOpacity>
            );
          }}
          keyExtractor={(item) => item.id}
        />

        {/* Bean fLATLIST */}
        <Typo
          size={FONTSIZE.size_18}
          color={COLORS.primaryWhiteHex}
          style={styles.coffeeTitle}
          fontWeight={"600"}
        >
          Coffee Beans
        </Typo>

        <FlatList
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={[
            styles.flatListContainer,
            { marginBottom: tabBarHeight },
          ]}
          data={BeansList}
          renderItem={({ item }) => {
            return (
              <TouchableOpacity onPress={() =>
                router.push({
                  pathname: "/details",
                  params: {
                    index: item.index,
                    id: item.id,
                    type: item.type,
                  },
                })
              }>
                <CoffeeCard
                  id={item.id}
                  name={item.name}
                  description={item.description}
                  roasted={item.roasted}
                  imagelink_square={item.imagelink_square}
                  ingredients={item.ingredients}
                  special_ingredient={item.special_ingredient}
                  prices={item.prices[2]}
                  average_rating={item.average_rating}
                  ratings_count={item.ratings_count}
                  favourite={item.favourite}
                  type={item.type}
                  index={item.index}
                  buttonPressHandler={CoffeeCardAddToCart}
                />
              </TouchableOpacity>
            );
          }}
          keyExtractor={(item) => item.id}
        />
      </ScrollView>
    </ScreenWrapper>
  );
};

export default Home;

const styles = StyleSheet.create({
  InputContainer: {
    margin: SPACING.space_30,
  },
  CategoryView: {
    paddingHorizontal: SPACING.space_20,
    marginBottom: SPACING.space_20,
  },
  ActiveCategory: {
    height: SPACING.space_10,
    width: SPACING.space_10,
    borderRadius: BORDERRADIUS.radius_10,
    backgroundColor: COLORS.primaryOrangeHex,
    marginTop: 5,
  },
  categoryContainer: {
    paddingHorizontal: SPACING.space_15,
  },
  categoryText: {
    fontFamily: FONTFAMILY.poppins_semibold,
  },
  categoryItem: {
    alignItems: "center",
  },
  flatListContainer: {
    gap: SPACING.space_20,
    paddingVertical: SPACING.space_20,
    paddingHorizontal: SPACING.space_30,
  },
  coffeeTitle: {
    fontFamily: FONTFAMILY.poppins_bold,
    marginLeft: SPACING.space_30,
    marginTop: SPACING.space_20,
  },
  emptyListContainer: {
    width: Dimensions.get('window').width - SPACING.space_30 * 2,
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: SPACING.space_30 *2
  },
});
