import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { BORDERRADIUS, SPACING } from '@/constants/theme';
import CustomIcon from './CustomIcon';

type BGIconsProps = {
    icon?: React.ElementType; 
    color: string;
    size: number;
    BGColor:string
}

const BGIcon = ({ icon,
    color,
    size,
    BGColor,}:BGIconsProps) => {
  return (
    <View style={[styles.iconBG, {backgroundColor: BGColor}]}>
          <CustomIcon icon={icon} iconColor={color} iconSize={size} iconWeight="bold" />
    </View>
  )
}

export default BGIcon

const styles = StyleSheet.create({
    iconBG: {
        height: SPACING.space_28,
        width: SPACING.space_28,
        justifyContent: "center",
        alignItems: "center",
        borderRadius:BORDERRADIUS.radius_8
    }
})