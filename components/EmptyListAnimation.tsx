import { StyleSheet, Text, View } from "react-native";
import React from "react";
import LottieView from "lottie-react-native";
import Typo from "./Typo";
import { COLORS, FONTSIZE } from "@/constants/theme";

type EmptyListAnimationProps = {
  title: string;
};

const EmptyListAnimation = ({ title }: EmptyListAnimationProps) => {
  return (
    <View style={styles.emptyList}>
      <LottieView
        source={require("../lottie/coffeecup.json")}
        autoPlay
        loop
        style={{ height:300 }}
          />
          <Typo size={FONTSIZE.size_16} color={COLORS.primaryOrangeHex} style={{
    textAlign: "center",marginTop:-20
          }}> { title}</Typo>
    </View>
  );
};

export default EmptyListAnimation;

const styles = StyleSheet.create({
  emptyList: {
    flex: 1,
        justifyContent: "center",
  
   
  },
});
