import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { COLORS, SPACING } from '@/constants/theme'
import { Image } from 'expo-image';
import { getProfileImage } from '@/services/imageServices';

const ProfilePic = () => {
    const user= null
  return (
    <View style={styles.container}>
        <Image
              source={getProfileImage(user)}
              style={styles.avatar}
              contentFit="cover"
              transition={100}
            />
    </View>
  )
}

export default ProfilePic

const styles = StyleSheet.create({
    container: {
        height: SPACING.space_36,
        width: SPACING.space_36,
        borderRadius: SPACING.space_12,
        borderWidth: 2,
        borderColor: COLORS.secondaryDarkGreyHex,
        alignItems: "center",
        justifyContent: "center",
        overflow:"hidden"
     
    },
    avatar: {
        height: SPACING.space_36,
        width: SPACING.space_36
    }
})