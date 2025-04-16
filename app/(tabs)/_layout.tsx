import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { Tabs } from "expo-router";
import CustomTabs from "@/components/CustomTabs";
import { COLORS } from "@/constants/theme";

const _layout = () => {
  return (
    <Tabs
      tabBar={CustomTabs}
      screenOptions={{
        headerShown: false,
        tabBarHideOnKeyboard: true,
        tabBarShowLabel: false,
      
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
  
});
