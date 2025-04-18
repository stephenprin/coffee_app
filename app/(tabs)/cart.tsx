import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { useStore } from '@/store/store';

const Cart = () => {
  const cartList = useStore((state: any) => state.CartList);
  console.log(cartList);
  return (
    <View>
      <Text>Cart</Text>
    </View>
  )
}

export default Cart

const styles = StyleSheet.create({})