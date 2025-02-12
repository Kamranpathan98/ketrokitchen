import {
  StyleSheet,
  Text,
  ScrollView,
  View,
  Pressable,
  Animated,
  ViewStyle,
} from "react-native";
import React, { useRef, useState } from "react";
import { RouteProp, useRoute, useNavigation, NavigationProp } from "@react-navigation/native";
import { RootStackParamList } from "@/types/Datatypes";
import {
  AntDesign,
  Octicons,
  MaterialIcons,
  MaterialCommunityIcons,
  Ionicons,
} from "@expo/vector-icons";
import { Colors } from "@/constants/Colors";
import { menu } from "@/constants/Data";
import FoodItems from "../components/FoodItems";
import { useSelector } from "react-redux";
import { CartState } from "@/redux/CartReducer";
import Modal from "react-native-modal";
import { useSearchParams } from "expo-router/build/hooks";

const HotelScreen = () => {
  const params = useSearchParams();
  const cart = useSelector((state: { cart: CartState }) => state.cart.cart);
  const router = useNavigation<NavigationProp<RootStackParamList>>();
  const route = useRoute<RouteProp<RootStackParamList, "HotelScreen">>();
  const { name, aggregate_rating, cuisines } = route.params;

  // Define the ref with the correct type
  const scrollViewRef = useRef<ScrollView | null>(null);
  const scrollAnimation = useRef(new Animated.Value(0)).current;
  const ITEM_HEIGHT = 650;
  const [openModal, setOpenModal] = useState<boolean>(false);

  const scrollToCategory = (index: number) => {
    const yOffSet = index * ITEM_HEIGHT;
    Animated.timing(scrollAnimation, {
      toValue: yOffSet,
      duration: 500,
      useNativeDriver: true,
    }).start();

    if (scrollViewRef.current) {
      scrollViewRef.current.scrollTo({ y: yOffSet, animated: true }); // Ensure animated is set to true
    }
  };

  // Function to get the menuContent style based on cart length
  const getMenuContentStyle = (cartLength: number): ViewStyle => ({
    width: 60,
    height: 60,
    borderRadius: 30,
    justifyContent: "center",
    alignItems: "center",
    position: "absolute", // Ensure this is one of the allowed types
    right: 25,
    bottom: cartLength > 0 ? 70 : 35,
    backgroundColor: Colors.light.goldenYellow,
  });

  console.log(params, name)
  return (
    <>
      <ScrollView ref={scrollViewRef} style={styles.container}>
        <View style={styles.headingContainer}>
          <Ionicons
            onPress={() => router.goBack()}
            style={styles.cheveronIcon}
            name="chevron-back"
            size={28}
            color="black"
          />
          <View style={styles.rightIcons}>
            <MaterialCommunityIcons name="camera" size={28} color="black" />
            <Octicons name="bookmark" size={28} color="black" />
            <MaterialIcons name="share" size={28} color="black" />
          </View>
        </View>
        <View style={styles.descriptionContainer}>
          <Text style={{ fontSize: 20, fontWeight: "bold" }}>{name}</Text>
          <Text style={{ fontSize: 15, fontWeight: "500", color: "gray" }}>
            {cuisines}
          </Text>
          <View style={styles.details}>
            <View style={styles.ratings}>
              <AntDesign name="star" size={15} color="white" />
              <Text style={styles.ratingText}>{aggregate_rating}</Text>
            </View>
            <Text style={styles.ratingDetails}>3.25K Ratings</Text>
          </View>
          <View style={styles.areaDetails}>
            <Text>35 - 40 min • 8Km | Pune</Text>
          </View>
        </View>
        {menu.map((item, id) => (
          <FoodItems key={id} item={item} />
        ))}
      </ScrollView>

      <View style={styles.subMenuContainer}>
        {menu.map((Item, id) => (
          <Pressable
            key={`sub-${id}`}
            style={styles.subMenuItems}
            onPress={() => scrollToCategory(id)}
          >
            <Text>{Item.name}</Text>
          </Pressable>
        ))}
      </View>

      <Pressable
        style={getMenuContentStyle(cart.length)}
        onPress={() => setOpenModal(!openModal)}
      >
        <Ionicons
          style={{ alignItems: "center" }}
          name="fast-food-outline"
          size={24}
          color="black"
        />
        <Text style={styles.menuText}>Menu</Text>
      </Pressable>

      {cart.length > 0 && (
        <Pressable
          style={styles.addCartContainer}
          onPress={() => {
            router.navigate("Cart", {
              name: name
            });
          }}
        >
          <Text style={styles.addItemText}>{cart.length} items added</Text>
          <Text style={styles.addItemText}>
            Add item(s) worth 240 to get free delivery
          </Text>
        </Pressable>
      )}

      <Modal isVisible={openModal} onBackdropPress={() => setOpenModal(false)}>
        <View style={styles.modalContainer}>
          {menu.map((items, index) => (
            <View key={index} style={styles.modalContent}>
              <Text style={styles.modalTitle}>{items.name}</Text>
              <Text style={styles.modalTitle}>{items.items.length}</Text>
            </View>
          ))}
          {/* <Text style={styles.modalTitle}>Menu</Text>
          <Pressable onPress={() => setOpenModal(false)}>
            <Text style={styles.closeButton}>Close</Text>
          </Pressable> */}
        </View>
      </Modal>
    </>
  );
};

export default HotelScreen;

const styles = StyleSheet.create({
  container: {
    backgroundColor: "white",
  },
  cheveronIcon: {
    paddingHorizontal: 8,
    marginTop: 5,
  },
  headingContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginTop: 15,
  },
  descriptionContainer: {
    alignItems: "center",
    justifyContent: "center",
    marginVertical: 15,
  },
  details: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 10,
  },
  rightIcons: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 14,
    gap: 10,
  },
  ratings: {
    flexDirection: "row",
    alignItems: "center",
    borderRadius: 4,
    backgroundColor: Colors.light.darkGreen,
    paddingHorizontal: 4,
    paddingVertical: 5,
    marginRight: 10,
  },
  ratingText: {
    color: "white",
    marginLeft: 4,
    fontSize: 15,
    fontWeight: "bold",
  },
  ratingDetails: {
    fontSize: 15,
    fontWeight: "600",
  },
  areaDetails: {
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#D0F0C0",
    borderRadius: 20,
    paddingHorizontal: 10,
    paddingVertical: 5,
    marginTop: 12,
  },
  addCartContainer: {
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 10,
    paddingVertical: 10,
    backgroundColor: Colors.light.darkGreen,
  },
  addItemText: {
    fontSize: 15,
    alignItems: "center",
    color: Colors.light.goldenYellow,
    // color: "white",
    fontWeight: "500",
  },
  subMenuContainer: {
    flexDirection: "row",
    backgroundColor: "white",
  },
  subMenuItems: {
    paddingHorizontal: 7,
    paddingVertical: 5,
    marginVertical: 10,
    marginHorizontal: 10,
    alignItems: "center",
    justifyContent: "center",
    borderColor: "#181818",
    borderWidth: 1,
    borderRadius: 4,
  },
  menuText: {
    textAlign: "center",
    fontWeight: "700",
    fontSize: 13,
    marginTop: 3,
    color: "black",
  },
  modalContainer: {
    height: 190,
    width: 280,
    position: "absolute",
    backgroundColor: Colors.light.darkGreen,
    bottom: 45,
    right: 10,
    borderRadius: 7,
  },
  modalContent: {
    padding: 15,
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "space-between",
  },
  modalTitle: {
    color: Colors.light.goldenYellow,
    // color: "white",
    fontSize: 18,
    fontWeight: "600",
  },
  closeButton: {
    color: "blue",
    marginTop: 10,
  },
});
