import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { useLocalSearchParams } from "expo-router";

const Details = () => {
  const { index, id, type } = useLocalSearchParams();
  console.log("Details", index, id, type);
  return (
    <View>
      <Text>Details</Text>
    </View>
  );
};

export default Details;

const styles = StyleSheet.create({});
