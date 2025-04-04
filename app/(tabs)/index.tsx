import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useState } from "react";
import ScreenWrapper from "@/components/ScreenWrapper";
import { useStore } from "@/store/store";
import { CategoryList, getCategoriesFromData, verticalScale } from "@/utils/styling";
import Header from "@/components/Header";
import * as Icons from "phosphor-react-native";
import Typo from "@/components/Typo";
import { COLORS, FONTFAMILY, FONTSIZE, SPACING, spacingY } from "@/constants/theme";
import CustomIcon from "@/components/CustomIcon";
import Input from "@/components/Input";

const Home = () => {
  const CoffeeList = useStore((state: any) => state.CoffeeList);
  const BeanList = useStore((state: any) => state.BeanList);
  const [searchText, setSearchText] = useState("");
  const [categories, setCategories] = useState(
    getCategoriesFromData(CoffeeList)
  );
  const [categoryIndex, setCategoryIndex] = useState({
    index: 0,
    category: categories[0],
  });
  const [sortedCoffee, setSortedCoffee] = useState(
    CategoryList(categoryIndex.category, CoffeeList)
  );
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
        <View style={styles.InputContainer}>
          <TouchableOpacity onPress={()=>{}}>
            <Input icon={Icons.MagnifyingGlass} color={ searchText.length > 0
                  ? COLORS.primaryOrangeHex
              : COLORS.primaryLightGreyHex} size={FONTSIZE.size_18} placeholder="Find Your Coffee..."
              value={searchText}
                  onChangeText={(value) =>
                    setSearchText(value)
                  }/>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </ScreenWrapper>
  );
};

export default Home;

const styles = StyleSheet.create({
  InputContainer: {

    margin: SPACING.space_30,
   
  }
});
