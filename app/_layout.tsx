import { View, Text, StyleSheet } from "react-native";
import React from "react";
import { Stack } from "expo-router";

const StackLayout = () => {
  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="index" options={{ animation: "slide_from_bottom" }} />
      <Stack.Screen
        name="payment"
        options={{ animation: "slide_from_bottom" }}
      />
    </Stack>
  );
};

export default StackLayout;

const styles = StyleSheet.create({});
