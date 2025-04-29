import { create } from "zustand";
import { produce } from "immer";
import { persist, createJSONStorage } from "zustand/middleware";
import AsyncStorage from "@react-native-async-storage/async-storage";
import CoffeeData from "@/data/CoffeeData";
import BeansData from "@/data/BeansData";
import Favorite from "@/app/(tabs)/favorite";

export const useStore = create(
  persist(
    (set, get) => ({
      CoffeeList: CoffeeData,
      BeansList: BeansData,
      CartPrice: 0,
      FavoritesList: [],
      CartList: [],
      OrderHistoryList: [],
      addToCart: (cartItem: any) =>
        set(
          produce((state) => {
            let found = false;
            for (let i = 0; i < state.CartList.length; i++) {
              if (state.CartList[i].id == cartItem.id) {
                found = true;
                let size = false;
                for (let j = 0; j < state.CartList[i].prices.length; j++) {
                  if (
                    state.CartList[i].prices[j].size == cartItem.prices[0].size
                  ) {
                    size = true;
                    state.CartList[i].prices[j].quantity++;
                    break;
                  }
                }
                if (size == false) {
                  state.CartList[i].prices.push(cartItem.prices[0]);
                }
                state.CartList[i].prices.sort((a: any, b: any) => {
                  if (a.size > b.size) {
                    return -1;
                  }
                  if (a.size < b.size) {
                    return 1;
                  }
                  return 0;
                });
                break;
              }
            }
            if (found == false) {
              state.CartList.push(cartItem);
            }
          })
        ),

      calculateCartPrice: () =>
        set(
          produce((state) => {
            let totalprice = 0;
            for (let i = 0; i < state.CartList.length; i++) {
              let tempprice = 0;
              for (let j = 0; j < state.CartList[i].prices.length; j++) {
                tempprice =
                  tempprice +
                  parseFloat(state.CartList[i].prices[j].price) *
                    state.CartList[i].prices[j].quantity;
              }
              state.CartList[i].ItemPrice = tempprice.toFixed(2).toString();
              totalprice = totalprice + tempprice;
            }
            state.CartPrice = totalprice.toFixed(2).toString();
          })
        ),
      addToFavouriteList: (type: string, id: string) =>
        set(
          produce((state: any) => {
            if (type === "Coffee") {
              for (let i = 0; i < state.CoffeeList.length; i++) {
                if (state.CoffeeList[i].id === id) {
                  if (!state.CoffeeList[i].favourite) {
                    state.CoffeeList[i].favourite = true;
                    state.FavoritesList.unshift(state.CoffeeList[i]);
                  }
                  break;
                }
              }
            } else if (type === "Bean") {
              for (let i = 0; i < state.BeansList.length; i++) {
                if (state.BeansList[i].id === id) {
                  if (!state.BeansList[i].favourite) {
                    state.BeansList[i].favourite = true;
                    state.FavoritesList.unshift(state.BeansList[i]);
                  }
                  break;
                }
              }
            }
          })
        ),

      deleteFromFavouriteList: (type: string, id: string) =>
        set(
          produce((state: any) => {
            for (let i = 0; i < state.FavoritesList.length; i++) {
              if (state.FavoritesList[i].id === id) {
                state.FavoritesList[i].favourite = false;
                state.FavoritesList.splice(i, 1);
                break;
              }
            }
            if (type === "Coffee") {
              for (let i = 0; i < state.CoffeeList.length; i++) {
                if (state.CoffeeList[i].id === id) {
                  state.CoffeeList[i].favourite = false;
                  break;
                }
              }
            } else if (type === "Bean") {
              for (let i = 0; i < state.BeansList.length; i++) {
                if (state.BeansList[i].id === id) {
                  state.BeansList[i].favourite = false;
                  break;
                }
              }
            }
          })
        ),
      incrementCartItemQuantity: (id: string, size: string) =>
        set(
          produce((state: any) => {
            for (let i = 0; i < state.CartList.length; i++) {
              if (state.CartList[i].id === id) {
                for (let j = 0; j < state.CartList[i].prices.length; j++) {
                  if (state.CartList[i].prices[j].size === size) {
                    state.CartList[i].prices[j].quantity++;
                    break;
                  }
                }
                break;
              }
            }
          })
        ),
      decrementCartItemQuantity: (id: string, size: string) =>
        set(
          produce((state: any) => {
            for (let i = 0; i < state.CartList.length; i++) {
              if (state.CartList[i].id === id) {
                for (let j = 0; j < state.CartList[i].prices.length; j++) {
                  if (state.CartList[i].prices[j].size === size) {
                    if (state.CartList[i].prices[j].quantity > 1) {
                      state.CartList[i].prices[j].quantity--;
                    } else {
                      state.CartList[i].prices.splice(j, 1);
                    }
                    if (state.CartList[i].prices.length === 0) {
                      state.CartList.splice(i, 1);
                    }
                    break;
                  }
                }
                break;
              }
            }
          })
        ),
      clearCart: () =>
        set(
          produce((state: any) => {
            state.CartList = [];
            state.CartPrice = 0;
          })
        ),
      addToOrderHistoryFromCart: () =>
        set(
          produce((state: any) => {
            let temp = state.CartList.reduce(
              (accumulator: number, currentItem: any) =>
                accumulator + parseFloat(currentItem.ItemPrice),
              0
            );
            let currentCartListTotalPrice = temp.toFixed(2).toString();
            if (state.CartList.length > 0) {
              state.OrderHistoryList.unshift({
                order: state.CartList,
                totalPrice: currentCartListTotalPrice,
                orderDate:
                  new Date().toLocaleString() +
                  " " +
                  new Date().toLocaleTimeString(),
              });
            } else {
              state.OrderHistoryList.unshift({
                order: state.CartList,
                totalPrice: currentCartListTotalPrice,
                orderDate:
                  new Date().toLocaleString() +
                  " " +
                  new Date().toLocaleTimeString(),
              });
            }
            state.CartList = [];
          })
        ),
    }),
    { name: "coffee-app", storage: createJSONStorage(() => AsyncStorage) }
  )
);
