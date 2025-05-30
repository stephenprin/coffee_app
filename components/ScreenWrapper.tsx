import { Dimensions, Platform, StatusBar, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { ScreenWrapperProps } from '@/type'
import { COLORS } from "../constants/theme";

const  {height} = Dimensions.get("window")

const ScreenWrapper = ({ style, children }: ScreenWrapperProps) => {
    const paddingTop= Platform.OS === "ios" ? height * 0.04 : 40
  return (
      <View style={[{ paddingTop, flex: 1, backgroundColor: COLORS.primaryBlackHex }, style]}>
          <StatusBar barStyle="light-content" />
      {children}
    </View>
  )
}

export default ScreenWrapper

const styles = StyleSheet.create({})