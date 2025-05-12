import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { COLORS } from '@/constants/theme'
import LottieView from 'lottie-react-native'

type PopUpAnimationProps = {
    style: any,
    source:any
}

const PopUpAnimation = ({ style, source }:PopUpAnimationProps) => {
  return (
    <View style={styles.lottieAnimationContainer}>
          <LottieView style={style} source={source} autoPlay loop={ false} />
    </View>
  )
}

export default PopUpAnimation

const styles = StyleSheet.create({
    lottieAnimationContainer: {
        flex: 1,
        position: "absolute",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,        
        zIndex: 100,
        backgroundColor: COLORS.secondaryBlackRGBA,
        justifyContent: "center",
    }
})