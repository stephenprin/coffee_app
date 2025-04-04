import { View, Text, StyleSheet, Image } from "react-native";
import React, { useEffect } from "react";
import { COLORS } from "@/constants/theme";
import { useRouter } from "expo-router";

const index = () => {
  const router = useRouter();

  useEffect(() => {
    setTimeout(() => {
      router.replace("/(tabs)");
    }, 2000);
  }, []);
  return (
    <View style={styles.container}>
      <Image
        style={styles.logo}
        source={require("../assets/logo.png")}
        resizeMode="contain"
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#2f2b2b",
  },
  logo: {
    height: "20%",
    aspectRatio: 1,
  },
});

export default index;
