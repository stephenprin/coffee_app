import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useState } from "react";
import ScreenWrapper from "@/components/ScreenWrapper";
import GradientBGIcon from "@/components/GradientBGIcon";
import * as Icons from "phosphor-react-native";
import { BORDERRADIUS, COLORS, FONTSIZE, SPACING } from "@/constants/theme";
import Typo from "@/components/Typo";
import PaymentMethod from "@/components/PaymentMethod";
import PaymentFooter from "@/components/PaymentFooter";
import { useLocalSearchParams, useRouter } from "expo-router";
import { LinearGradient } from "expo-linear-gradient";
import CustomIcon from "@/components/CustomIcon";
import { useStore } from "@/store/store";
import PopUpAnimation from "@/components/PopUpAnimation";
const PaymentList = [
  {
    name: "Wallet",
    icon: "icon",
    isIcon: true,
  },

  {
    name: "Google Pay",
    icon: require("../assets/app_images/gpay.png"),
    isIcon: false,
  },
  {
    name: "Apple Pay",
    icon: require("../assets/app_images/applepay.png"),
    isIcon: false,
  },
  {
    name: "Amazon Pay",
    icon: require("../assets/app_images/amazonpay.png"),
    isIcon: false,
  },
];

const Payment = () => {
  const { amount } = useLocalSearchParams();
  const router = useRouter();
  const [paymentMode, setPaymentMode] = useState("Credit Card");
  const [showAnimation, setShowAnimation] = useState(false);  
  const addToOrderHistoryFromCart = useStore((state: any) => state.addToOrderHistoryFromCart);
  const calculateCartPrice= useStore((state: any) => state.calculateCartPrice);

  const buttonPressHandler = () => {
    setShowAnimation(true)
    addToOrderHistoryFromCart()
    calculateCartPrice()
    setTimeout(() => { 
      setShowAnimation(false)
      router.push("/(tabs)/history")
    }, 2000)
  };
  return (
    <ScreenWrapper>
      {showAnimation ? <PopUpAnimation style={styles.lottieAnimation} source={require("../lottie/successful.json") } />:<></>}
      <ScrollView
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.scrollContainer}
      >
        <View style={styles.headerContainer}>
          <GradientBGIcon
            onPress={() => {
              router.back();
            }}
            icon={Icons.ArrowLeft}
            color={COLORS.primaryLightGreyHex}
            iconSize={FONTSIZE.size_16}
          />

          <Typo fontWeight={"600"} size={FONTSIZE.size_20}>
            Payment
          </Typo>
          <View style={styles.emptyView} />
        </View>
        <View style={styles.paymentOptionContainer}>
          <TouchableOpacity
            onPress={() => {
              setPaymentMode("Credit Card");
            }}
          >
            <View
              style={[
                styles.CreditCardContainer,
                {
                  borderColor:
                    paymentMode === "Credit Card"
                      ? COLORS.primaryOrangeHex
                      : COLORS.primaryGreyHex,
                },
              ]}
            >
              <Typo
                size={FONTSIZE.size_14}
                fontWeight={"600"}
                color={COLORS.primaryWhiteHex}
                style={{ marginLeft: 10 }}
              >
                Credit Card
              </Typo>
              <View style={styles.creditCardBG}>
                <LinearGradient
                  start={{ x: 0, y: 0 }}
                  end={{ x: 1, y: 1 }}
                  colors={[COLORS.primaryGreyHex, COLORS.primaryBlackHex]}
                  style={styles.backgroundLinearCreditcard}
                >
                  <View style={styles.creditCardRow}>
                    <CustomIcon
                      icon={Icons.CreditCard}
                      iconColor={COLORS.primaryOrangeHex}
                      iconSize={FONTSIZE.size_20 * 2}
                    />
                    <CustomIcon
                      icon={Icons.Money}
                      iconColor={COLORS.primaryWhiteHex}
                      iconSize={FONTSIZE.size_30 * 2}
                    />
                  </View>
                  <View style={styles.creditCardNumber}>
                    <Typo
                      size={FONTSIZE.size_16}
                      color={COLORS.secondaryLightGreyHex}
                      fontWeight={"600"}
                      style={{letterSpacing: 4}}
                      
                    >
                     4234
                    </Typo>
                    <Typo
                      size={FONTSIZE.size_16}
                      color={COLORS.secondaryLightGreyHex}
                      fontWeight={"600"}
                      style={{letterSpacing: 4}}
                    >
                     6340
                    </Typo>
                    <Typo
                    size={FONTSIZE.size_16}
                    color={COLORS.secondaryLightGreyHex}
                    fontWeight={"600"}
                    style={{letterSpacing:4}}
                    >
                     2234
                    </Typo>
                    <Typo
                     size={FONTSIZE.size_16}
                     color={COLORS.secondaryLightGreyHex}
                     fontWeight={"600"}
                     style={{letterSpacing: 4}}
                    >
                    7689
                    </Typo>
                  </View>
                  <View style={styles.creditCardRow}>
                    <View style={styles.creditCardName}>
                      <Typo
                        size={FONTSIZE.size_12}
                        color={COLORS.secondaryLightGreyHex}
                        fontWeight={"400"}
                      >
                        Card Holder Name
                      </Typo>
                      <Typo
                        size={FONTSIZE.size_16}
                        color="white"
                        fontWeight={"600"}
                      >
                        Prince Nmezi
                      </Typo>
                    </View>
                    <View style={styles.creditCardExpiry}>
                      <Typo
                        size={FONTSIZE.size_12}
                        color={COLORS.secondaryLightGreyHex}
                        fontWeight={"600"}
                      >
                        Expiry Date
                      </Typo>
                      <Typo
                        size={FONTSIZE.size_16}
                        color="white"
                        fontWeight={"600"}
                      >
                        06/25
                      </Typo>
                    </View>
                  </View>
                </LinearGradient>
              </View>
            </View>
          </TouchableOpacity>
          {PaymentList.map((data) => (
            <TouchableOpacity
              key={data.name}
              onPress={() => {
                setPaymentMode(data.name);
              }}
            >
              <PaymentMethod
                paymentMode={paymentMode}
                name={data.name}
                icon={data.icon}
                isIcon={data.isIcon}
              />
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>
      <PaymentFooter
        buttonTitle={`Pay with ${paymentMode}`}
        price={{ price: amount, currency: "$" }}
        buttonPressHandler={buttonPressHandler}
      />
    </ScreenWrapper>
  );
};

export default Payment;

const styles = StyleSheet.create({
  scrollContainer: {
    flexGrow: 1,
  },
  headerContainer: {
    flexDirection: "row",
    paddingHorizontal: SPACING.space_24,
    paddingVertical: SPACING.space_15,
    alignItems: "center",
    justifyContent: "space-between",
  },
  emptyView: {
    height: SPACING.space_36,
    width: SPACING.space_36,
  },
  paymentOptionContainer: {
    padding: SPACING.space_15,
    gap: SPACING.space_15,
  },
  CreditCardContainer: {
    padding: SPACING.space_10,
    gap: SPACING.space_10,
    borderRadius: BORDERRADIUS.radius_15 * 2,
    borderWidth: 3,
  },
  creditCardBG: {
    backgroundColor: COLORS.primaryGreyHex,
    borderRadius: BORDERRADIUS.radius_25,
  },
  backgroundLinearCreditcard: {
    borderRadius: BORDERRADIUS.radius_25,
    gap: SPACING.space_36,
    paddingHorizontal: SPACING.space_15,
    paddingVertical: SPACING.space_10

  },
  creditCardRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  creditCardNumber: {
    flexDirection: "row",
    gap: SPACING.space_10,
   alignItems: "center",
  },
  creditCardName: {
    alignItems: "flex-start",
  },
  creditCardExpiry: {
    alignItems: "flex-end",
  },
  lottieAnimation: {
    flex:1
  }

});
