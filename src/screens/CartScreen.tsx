import { StyleSheet, Text, View, ScrollView, Pressable } from "react-native";
import React from "react";
import {
  AntDesign,
  Entypo,
  Feather,
  FontAwesome5,
  Ionicons,
  MaterialCommunityIcons,
} from "@expo/vector-icons";
import {
  NavigationProp,
  RouteProp,
  useNavigation,
  useRoute,
} from "@react-navigation/native";
import { RootStackParamList } from "@/types/Datatypes";
import {
  CartState,
  decrementQuantity,
  incrementQuantity,
} from "@/redux/CartReducer";
import { useDispatch, useSelector } from "react-redux";
import { instructions } from "@/constants/Data";
import { Colors } from "@/constants/Colors";

const CartScreen = () => {
  const cart = useSelector((state: { cart: CartState }) => state.cart.cart);
  const router = useNavigation<NavigationProp<RootStackParamList>>();
  const route = useRoute<RouteProp<RootStackParamList, "HotelScreen">>();
  const { name } = route.params ?? "";
  const dispatch = useDispatch();

  const totalPrice = cart
    .map((item) => item.quantity * item.price)
    .reduce((current, prev) => current + prev, 0);

  const isCartEmpty = cart.length === 0 || !name;
  console.log(isCartEmpty, cart.length)
  return (
    <>
      {isCartEmpty ? (
        <View style={styles.emptyCartContainer}>
          <MaterialCommunityIcons name="cart-off" size={50} color="gray" />
          <Text style={styles.emptyCartText}>Cart is Empty</Text>
        </View>
      ) : (
        <ScrollView style={styles.cartContainer}>
          <View style={styles.cartContent}>
            <Ionicons
              onPress={() => router.goBack()}
              style={styles.cheveronIcon}
              name="chevron-back"
              size={28}
              color="black"
            />
            <Text>{name}</Text>
          </View>
          <View style={styles.deliveryStatus}>
            <Text>
              Delivery in{" "}
              <Text style={{ fontWeight: "500" }}>30 - 40 mins</Text>
            </Text>
          </View>
          <View style={styles.itemContainer}>
            <Text style={styles.itemContentHeader}>ITEM(S) ADDED</Text>
          </View>
          <View>
            {cart.map((item, id) => (
              <Pressable key={`item-added-${id}`} style={styles.cartQuantity}>
                <View style={styles.cartView}>
                  <Text style={styles.itemName}>{item.name}</Text>
                  <Pressable style={styles.quantityContainer}>
                    <Pressable
                      onPress={() => dispatch(decrementQuantity(item))}
                    >
                      <Text style={styles.minusItems}>-</Text>
                    </Pressable>
                    <Pressable>
                      <Text style={styles.totalItems}>{item.quantity}</Text>
                    </Pressable>
                    <Pressable
                      onPress={() => dispatch(incrementQuantity(item))}
                    >
                      <Text style={styles.plusItems}>+</Text>
                    </Pressable>
                  </Pressable>
                </View>
                <View style={styles.priceContent}>
                  <Text style={styles.priceText}>
                    ₹{item.price * item.quantity}
                  </Text>
                  <Text style={styles.priceDesc}>
                    Quantity : {item.quantity}
                  </Text>
                </View>
              </Pressable>
            ))}

            <View style={{ marginVertical: 10 }}>
              <Text style={styles.priceText}>Delivery Instrctions</Text>
              <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                {instructions.map((item, id) => (
                  <Pressable
                    key={`inst-${id}`}
                    style={styles.deliveryInstructions}
                  >
                    <View
                      key={`instContent-${id}`}
                      style={{ justifyContent: "center", alignItems: "center" }}
                    >
                      <FontAwesome5
                        name={item.iconName}
                        color={"gray"}
                        size={22}
                      />
                      <Text style={styles.deliveryText}>{item.name}</Text>
                    </View>
                  </Pressable>
                ))}
              </ScrollView>
            </View>

            <View key={`price`}>
              <View key={`price-1`} style={styles.moreItemSection}>
                <View style={styles.moreItemSectionContent}>
                  <Feather name="plus-circle" size={24} color="black" />
                  <Text>Add more Items</Text>
                </View>
                <AntDesign name="right" size={20} color={"black"} />
              </View>

              <View key={`price-2`} style={styles.moreItemSection}>
                <View style={styles.moreItemSectionContent}>
                  <Entypo name="new-message" size={24} color="black" />
                  <Text>Add more Coooking Instructions</Text>
                </View>
                <AntDesign name="right" size={20} color={"black"} />
              </View>

              <View key={`price-3`} style={styles.moreItemSection}>
                <View style={styles.moreItemSectionContent}>
                  <MaterialCommunityIcons
                    name="food-fork-drink"
                    size={24}
                    color="black"
                  />
                  <Text>Add more Items</Text>
                </View>
                <AntDesign name="right" size={20} color={"black"} />
              </View>
            </View>

            <View style={{ marginVertical: 15 }}>
              <Text style={styles.priceText}>Billing Details</Text>
              <View style={styles.priceContainer}>
                <View style={styles.priceContent}>
                  <Text style={styles.totalPrice}>Item Total</Text>
                  <Text style={styles.totalPrice}>₹{totalPrice}</Text>
                </View>
                <View style={styles.priceContent}>
                  <Text style={styles.totalPrice}>Handling fees</Text>
                  <Text style={styles.totalPrice}>₹15.00</Text>
                </View>
                <View style={styles.priceContent}>
                  <Text style={styles.totalPrice}>Delivery Partner fees</Text>
                  <Text style={styles.totalPrice}>₹75</Text>
                </View>
                <View style={styles.priceContent}>
                  <Text style={styles.priceText}>To Pay</Text>
                  <Text style={styles.priceText}>₹{totalPrice + 90}</Text>
                </View>
              </View>
            </View>
          </View>
        </ScrollView>
      )}

      {totalPrice === 0 ? null : (
        <Pressable style={styles.footerContainer}>
          <View>
            <Text style={styles.priceText}>Pay using cash</Text>
            <Text style={{ fontSize: 15, marginTop: 8 }}>Cash on Delivery</Text>
          </View>
          <Pressable style={styles.footerButton} onPress={() => router.navigate("Order", {
            name: name
          })} >
            <View>
              <Text
                style={{ color: "white", fontSize: 15, fontWeight: "bold" }}
              >
                {totalPrice + 90}
              </Text>
              <Text
                style={{
                  color: "white",
                  fontSize: 15,
                  fontWeight: "500",
                  marginTop: 3,
                }}
              >
                TOTAL
              </Text>
            </View>
            <Text
              style={{
                color: Colors.light.goldenYellow,
                fontSize: 15,
                fontWeight: "500",
              }}
            >
              Place Order
            </Text>
          </Pressable>
        </Pressable>
      )}
    </>
  );
};

export default CartScreen;

const styles = StyleSheet.create({
  cheveronIcon: {
    paddingHorizontal: 8,
    marginTop: 5,
  },
  cartContainer: {
    padding: 10,
    flex: 1,
    backgroundColor: "#F0F8FF",
  },
  cartContent: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  deliveryStatus: {
    backgroundColor: "white",
    borderRadius: 8,
    padding: 8,
    marginTop: 15,
  },
  itemContainer: {
    marginVertical: 12,
  },
  itemContentHeader: {
    textAlign: "center",
    letterSpacing: 3,
    fontSize: 15,
    color: "gray",
    fontWeight: "600",
  },
  cartQuantity: {
    backgroundColor: "white",
    padding: 10,
  },
  cartView: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 6,
  },
  itemName: {
    width: 200,
    fontSize: 16,
    fontWeight: "600",
  },
  quantityContainer: {
    borderColor: Colors.light.darkGreen,
    flexDirection: "row",
    paddingHorizontal: 10,
    paddingVertical: 5,
    alignItems: "center",
    borderWidth: 0.5,
    borderRadius: 10,
  },
  minusItems: {
    fontSize: 20,
    color: "green",
    paddingHorizontal: 6,
    fontWeight: "600",
  },
  totalItems: {
    fontSize: 19,
    color: "green",
    paddingHorizontal: 8,
    fontWeight: "600",
  },
  plusItems: {
    fontSize: 20,
    color: "green",
    paddingHorizontal: 6,
    fontWeight: "600",
  },
  priceContainer: {
    backgroundColor: "white",
    padding: 10,
    marginTop: 14,
    borderRadius: 7,
  },
  priceContent: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginVertical: 4,
  },
  priceText: {
    fontSize: 16,
    fontWeight: "bold",
  },
  priceDesc: {
    fontSize: 15,
    fontWeight: "600",
  },
  deliveryInstructions: {
    margin: 10,
    backgroundColor: "white",
    padding: 10,
    borderRadius: 10,
  },
  deliveryText: {
    width: 75,
    fontSize: 13,
    color: "#383838",
    paddingTop: 10,
    textAlign: "center",
  },
  moreItemSection: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: "white",
    paddingVertical: 10,
    paddingHorizontal: 10,
  },
  moreItemSectionContent: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
  },
  totalPrice: {
    fontSize: 15,
    fontWeight: "400",
    color: "#505050",
  },
  footerContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    padding: 20,
    backgroundColor: "white",
  },
  footerButton: {
    backgroundColor: Colors.light.darkGreen,
    padding: 10,
    width: 180,
    borderRadius: 8,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    gap: 10,
  },
  emptyCartContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#F0F8FF",
  },
  emptyCartText: {
    fontSize: 20,
    color: "gray",
    marginTop: 10,
  },
});
