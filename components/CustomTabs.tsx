import { View, Platform, TouchableOpacity, StyleSheet } from "react-native";
import { BottomTabBarProps } from "@react-navigation/bottom-tabs";
import * as Icon from "phosphor-react-native";
import { COLORS, spacingY } from "../constants/theme";
import { verticalScale } from "@/utils/styling";

export default function MyTabBar({
  state,
  descriptors,
  navigation,
}: BottomTabBarProps) {
  //   const { colors } = useTheme();
  //   const { buildHref } = useLinkBuilder();

  const tabIcons: any = {
    index: (isFocused: boolean) => (
      <Icon.House
        size={verticalScale(26)}
        weight={isFocused ? "fill" : "regular"}
        color={
          isFocused ? COLORS.primaryOrangeHex : COLORS.secondaryLightGreyHex
        }
      />
    ),
    cart: (isFocused: boolean) => (
      <Icon.ShoppingCart
        size={verticalScale(26)}
        weight={isFocused ? "fill" : "regular"}
        color={
          isFocused ? COLORS.primaryOrangeHex : COLORS.secondaryLightGreyHex
        }
      />
    ),
    favorite: (isFocused: boolean) => (
      <Icon.Heart
        size={verticalScale(26)}
        weight={isFocused ? "fill" : "regular"}
        color={
          isFocused ? COLORS.primaryOrangeHex : COLORS.secondaryLightGreyHex
        }
      />
    ),
    history: (isFocused: boolean) => (
      <Icon.AddressBook
        size={verticalScale(26)}
        weight={isFocused ? "fill" : "regular"}
        color={
          isFocused ? COLORS.primaryOrangeHex : COLORS.secondaryLightGreyHex
        }
      />
    ),
    profile: (isFocused: boolean) => (
      <Icon.User
        size={verticalScale(26)}
        weight={isFocused ? "fill" : "regular"}
        color={
          isFocused ? COLORS.primaryOrangeHex : COLORS.secondaryLightGreyHex
        }
      />
    ),
  };

  return (
    <View style={styles.tabbar}>
      {state.routes.map((route, index) => {
        const { options } = descriptors[route.key];
        const label: any =
          options.tabBarLabel !== undefined
            ? options.tabBarLabel
            : options.title !== undefined
            ? options.title
            : route.name;

        const isFocused = state.index === index;

        const onPress = () => {
          const event = navigation.emit({
            type: "tabPress",
            target: route.key,
            canPreventDefault: true,
          });

          if (!isFocused && !event.defaultPrevented) {
            navigation.navigate(route.name, route.params);
          }
        };

        const onLongPress = () => {
          navigation.emit({
            type: "tabLongPress",
            target: route.key,
          });
        };

        return (
          <TouchableOpacity
            // href={buildHref(route.name, route.params)}
            key={route.name}
            accessibilityState={isFocused ? { selected: true } : {}}
            accessibilityLabel={options.tabBarAccessibilityLabel}
            testID={options.tabBarButtonTestID}
            onPress={onPress}
            onLongPress={onLongPress}
            style={styles.tabbarItem}
          >
            {tabIcons[route.name] && tabIcons[route.name](isFocused)}
          </TouchableOpacity>
        );
      })}
    </View>
  );
}
const styles = StyleSheet.create({
  tabbar: {
    flexDirection: "row",
    width: "100%",
    height: Platform.OS === "ios" ? verticalScale(73) : verticalScale(55),
    backgroundColor: COLORS.primaryBlackRGBA,
    justifyContent: "space-around",
    alignItems: "center",
    borderTopColor: "transparent",
    borderWidth: 1,
  },
  tabbarItem: {
    marginBottom: Platform.OS === "ios" ? spacingY._10 : spacingY._5,
    justifyContent: "center",
    alignItems: "center",
  },
});
