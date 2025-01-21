import { StyleSheet, Text, ScrollView, View } from "react-native";
import React from "react";
import Ionicons from "@expo/vector-icons/Ionicons";
import { RouteProp, useRoute, useNavigation } from "@react-navigation/native";
import { RootStackParamList } from "@/types/Datatypes";
import {
  AntDesign,
  Octicons,
  MaterialIcons,
  MaterialCommunityIcons,
} from "@expo/vector-icons";
import { Colors } from "@/constants/Colors";
import {menu} from '@/constants/Data'
import FoodItems from "../components/FoodItems";

const HotelScreen = () => {
  const router = useNavigation();
  const route = useRoute<RouteProp<RootStackParamList, "HotelScreen">>(); // Specify the type for route
  const { name, aggregate_rating, cuisines } = route.params;
  return (
    <ScrollView style={styles.container}>
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
    flexDirection: 'row',
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
    color: "white", // Change text color for better visibility
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
    alignItems: 'center',
    backgroundColor: '#D0F0C0',
    borderRadius: 20,
    paddingHorizontal: 10,
    paddingVertical:5,
    marginTop:12
  }
});
