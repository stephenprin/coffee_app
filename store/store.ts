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
          produce((state: any) => {
            let found = false;
            for (let i = 0; i < state.CartList.length; i++) {
              if (state.CartList[i].id === cartItem.id) {
                found = true;

                let size = false;
                for (let j = 0; j < state.CartList[i].prices.length; j++) {
                  if (
                    state.CartList[i].prices[j].size === cartItem.prices[0].size
                  ) {
                    size = true;
                    state.CartList[i].prices[j].quantity += cartItem.quantity;
                    break;
                  }
                }
                if (size == false) {
                  state.CartList[i].prices.push(cartItem.price[0]);
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
              }
            }
            if (!found) {
              state.CartList.push(cartItem);
            }
          })
        ),

      calculateCartPrice: () =>
        set(
          produce((state: any) => {
            let totalPrice = 0;
            for (let i = 0; i < state.CartList.length; i++) {
              let tempPrice = 0;
              for (let j = 0; j < state.CartList[i].prices.length; j++) {
                tempPrice +=
                  tempPrice +
                  parseFloat(state.CartList[i].prices[j].quantity) *
                    state.CartList[i].prices[j].price;
              }
              state.CartList[i].ItemPrice = tempPrice.toFixed(2).toString();
              totalPrice += parseFloat(tempPrice.toFixed(2));
            }
            state.CartPrice = totalPrice.toFixed(2).toString();
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
    }),
    { name: "coffee-app", storage: createJSONStorage(() => AsyncStorage) }
  )
);
