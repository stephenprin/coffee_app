import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { Tabs } from "expo-router";
import CustomTabs from "@/components/CustomTabs";
import { BlurView } from "expo-blur";

const _layout = () => {
  return (
    <Tabs
      tabBar={CustomTabs}
      screenOptions={{
        headerShown: false,
        tabBarHideOnKeyboard: true,
        tabBarShowLabel: false,
        tabBarBackground: () => (
          <View style={styles.blurContainer}>
            <BlurView intensity={50} tint="light" style={styles.blurView} />
          </View>
        ),
      }}
    >
      <Tabs.Screen name="index" />
      <Tabs.Screen name="cart" />
      <Tabs.Screen name="favorite" />
      <Tabs.Screen name="history" />
      <Tabs.Screen name="profile" />
    </Tabs>
  );
};

export default _layout;

const styles = StyleSheet.create({
  blurContainer: {
    position: "absolute",
    width: "100%",
    height: "100%",
    overflow: "hidden",
  },
  blurView: {
    flex: 1,
  },
});
