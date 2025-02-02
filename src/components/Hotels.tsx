import { Pressable, StyleSheet, Image, View, Text } from "react-native";
import React from "react";
import { Hotel, RootStackParamList } from "@/types/Datatypes";
import AntDesign from "@expo/vector-icons/AntDesign";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import Ionicons from "@expo/vector-icons/Ionicons";
import { Colors } from "@/constants/Colors";
import { useNavigation } from "@react-navigation/native"; // Import useNavigation
import { StackNavigationProp } from "@react-navigation/stack";

interface HotelsProps {
  item: Hotel;
}

const Hotels: React.FC<HotelsProps> = ({ item }) => {
  const navigation = useNavigation<StackNavigationProp<RootStackParamList>>(); // Get the navigation object
  return (
    <Pressable
      onPress={() =>
        navigation.navigate("HotelScreen", {
          id: item.id,
          name: item.name,
          address: item.adress,
          cuisines: item.cuisines,
          smallAddress: item.smalladress,
          aggregate_rating: item.aggregate_rating
        })
      } // Navigate to HotelScreen
      style={styles.clickStyle}
    >
      <Image
        style={styles.featureImage}
        source={{ uri: item.featured_image }}
      />
      <View style={styles.container}>
        <View style={styles.descriptionContainer}>
          <Text style={styles.hotelName}>{item.name}</Text>
          <Text style={styles.details}>{item.cuisines}</Text>
          <View style={styles.timeContainer}>
            <Ionicons name="timer-sharp" size={18} color="green" />
            <Text style={styles.time}>{item.time}</Text>
          </View>
        </View>
        <View style={styles.ratings}>
          <AntDesign name="star" size={13} color="white" />
          <Text style={styles.ratingText}>{item.aggregate_rating}</Text>
        </View>
      </View>
      <View style={styles.offerDivider} />
      <View style={styles.offerContainer}>
        <MaterialCommunityIcons
          name="brightness-percent"
          size={24}
          color={Colors.light.goldenYellow}
        />
        <Text>20% OFF up to Rs. 100</Text>
      </View>
    </Pressable>
  );
};

export default Hotels;

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center", // Center items vertically
    justifyContent: "space-between",
  },
  featureImage: {
    width: "100%",
    aspectRatio: 6 / 4,
    borderTopLeftRadius: 6,
    borderTopRightRadius: 6,
  },
  clickStyle: {
    marginHorizontal: 15,
    marginVertical: 12,
    borderRadius: 20,
    backgroundColor: "white",
    // Shadow properties for iOS
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.5,
    // Elevation for Android
    elevation: 5,
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
  descriptionContainer: {
    paddingVertical: 8,
    paddingHorizontal: 3,
    flex: 1, // Allow this container to grow and take available space
  },
  hotelName: {
    fontWeight: "bold",
    fontSize: 18,
    paddingHorizontal: 10,
  },
  timeContainer: {
    flexDirection: "row", // Align icon and text horizontally
    alignItems: "center", // Center icon and text vertically
    marginTop: 5, // Add some margin to separate from the previous text
    paddingHorizontal: 10,
  },
  time: {
    fontWeight: "bold",
    marginLeft: 4, // Add space between icon and text
  },
  details: {
    fontWeight: "500",
    marginTop: 5,
    color: "gray",
    paddingHorizontal: 10,
  },
  ratingText: {
    color: "white", // Change text color for better visibility
    marginLeft: 4,
  },
  offerDivider: {
    borderWidth: 0.5,
    borderColor: "#C8C8C8",
    marginHorizontal: 10,
    marginVertical: 5,
  },
  offerContainer: {
    flexDirection: "row",
    gap: 4,
    alignItems: "center",
    marginHorizontal: 8,
    marginVertical: 3,
  },
});
