import { StatusBar, StyleSheet, Text, TextInput, View } from "react-native";
import React from "react";
import HeaderBar from "../components/HeaderBar";
import { AntDesign } from "@expo/vector-icons";
import { Colors } from "@/constants/Colors";
import OfferSlider from "../components/OfferSlider";
import { FlatList } from "react-native-gesture-handler";
import Categories from "../components/Categories";
import { hotels } from "@/constants/Data";
import Hotels from "../components/Hotels";

// Define the type for the data items
interface DataItem {
  id: string;
  type: "offerSlider" | "prompt" | "category" | "hotels";
}

const HomeScreen: React.FC = () => {
  // Data for the FlatList
  const data: DataItem[] = [
    { id: "1", type: "offerSlider" },
    { id: "2", type: "prompt" },
    { id: "3", type: "category" },
    { id: "4", type: "hotels" },
  ];

  // Render item function with type definition
  const renderItem = ({ item }: { item: DataItem }) => {
    switch (item.type) {
      case "offerSlider":
        return <OfferSlider />;
      case "prompt":
        return (
          <View style={styles.promptContainer}>
            <View style={styles.line} />
            <Text style={styles.promptText}>What would you like?</Text>
            <View style={styles.line} />
          </View>
        );
      case "category":
        return <Categories />;
      case "hotels":
        return (
          <>
            <View style={styles.promptContainer}>
            <View style={styles.line} />
            <Text style={styles.promptText}>ALL RESTAURANTS</Text>
            <View style={styles.line} />
          </View>
            <View>
              {hotels.map((item, id) => (
                <Hotels key={id} item={item} />
              ))}
            </View>
          </>
        );
      default:
        return null;
    }
  };

  return (
    <>
      <View>
        <StatusBar backgroundColor={"green"} />
        <HeaderBar />
        <View style={styles.searchContainer}>
          <TextInput
            style={styles.searchText}
            placeholder="Search for foods, hotels"
          />
          <AntDesign
            name="search1"
            size={24}
            color={Colors.light.locationIcon}
          />
        </View>
      </View>
      <FlatList
        data={data}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
        showsVerticalScrollIndicator={false}
      />
    </>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  searchContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    borderWidth: 1,
    borderColor: "Red",
    paddingHorizontal: 10,
    paddingVertical: 5,
    marginTop: 10,
    marginBottom: 10,
    marginHorizontal: 15,
    borderRadius: 23,
  },
  searchText: {
    color: "#c4c4c4",
  },
  promptContainer: {
    flexDirection: "row", // Align items in a row
    alignItems: "center", // Center items vertically
    marginHorizontal: 20, // Horizontal margin for alignment
  },
  line: {
    flex: 1, // Take up remaining space
    height: 1, // Height of the line
    backgroundColor: "#c4c4c4", // Color of the line
  },
  promptText: {
    fontSize: 18, // Font size for the prompt text
    fontWeight: "bold", // Bold text for emphasis
    color: "#c4c4c4", // Text color
    marginHorizontal: 10, // Space between the text and lines
    fontFamily: "Macondo",
  },
  hotelContainer: {
    justifyContent: "center", // Center vertically
    alignItems: "center", // Center horizontally
    marginVertical: 10, // Add some vertical margin
  },
  hotelText: {
    color: "lightgrey", // Change text color to gray
    fontSize: 20, // Adjust font size as needed
    fontWeight: "bold", // Optional: make it bold
  },
});
