import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React from "react";
import { useStore } from "@/store/store";
import { useBottomTabBarHeight } from "@react-navigation/bottom-tabs";
import ScreenWrapper from "@/components/ScreenWrapper";
import Header from "@/components/Header";
import EmptyListAnimation from "@/components/EmptyListAnimation";
import { SPACING } from "@/constants/theme";
import PaymentFooter from "@/components/PaymentFooter";
import { useRouter } from "expo-router";
import CartItem from "@/components/CartItem";

const Cart = () => {
  const cartList = useStore((state: any) => state.CartList);
  const cartPrice = useStore((state: any) => state.CartPrice);

  const incrementCartItemFromCart = useStore(
    (state: any) => state.incrementCartItemQuantity
  );
  const decrementCartItemFromCart = useStore(
    (state: any) => state.decrementCartItemQuantity
  );
  const calculateCartPrice = useStore((state: any) => state.calculateCartPrice);

  const tabBarHeight = useBottomTabBarHeight();
  const router = useRouter();
  const checkoutHandle = () => {
    router.push("/payment");
  };

  const incrementCartItemQuantityHandler = (id: string, size: string) => {
    incrementCartItemFromCart(id, size);
    calculateCartPrice();
  };
  const decrementCartItemQuantityHandler = (id: string, size: string) => {
    decrementCartItemFromCart(id, size);
    calculateCartPrice();
  };
  return (
    <ScreenWrapper>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollViewFlex}
      >
        <View
          style={[styles.scrollViewInnerView, { marginBottom: tabBarHeight }]}
        >
          <View style={{ flex: 1 }}>
            <Header title="Cart" />
            {cartList.length === 0 ? (
              <EmptyListAnimation title="Cart is Empty" />
            ) : (
              <View style={styles.listItemContainer}>
                {cartList.map((item: any) => (
                  <TouchableOpacity onPress={() => {}} key={item.id}>
                    <CartItem
                      id={item.id}
                      name={item.name}
                      roasted={item.roasted}
                      prices={item.prices}
                      type={item.type}
                      imagelink_square={item.imagelink_square}
                      special_ingredient={item.special_ingredient}
                      incrementCartItemQuantityHandler={
                        incrementCartItemQuantityHandler
                      }
                      decrementCartItemQuantityHandler={
                        decrementCartItemQuantityHandler
                      }
                    />
                  </TouchableOpacity>
                ))}
              </View>
            )}
          </View>
          {cartList.length !== 0 ? (
            <PaymentFooter
              buttonTitle="Checkout"
              price={{ price: cartPrice, currency: "$" }}
              buttonPressHandler={() => {
                checkoutHandle();
              }}
            />
          ) : (
            <></>
          )}
        </View>
      </ScrollView>
    </ScreenWrapper>
  );
};

export default Cart;

const styles = StyleSheet.create({
  scrollViewInnerView: {
    flex: 1,
    justifyContent: "space-between",
  },
  listItemContainer: {
    paddingHorizontal: 20,
    gap: SPACING.space_20,
  },
  scrollViewFlex: {
    flexGrow: 1,
  },
});
