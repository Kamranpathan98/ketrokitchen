import { StatusBar, StyleSheet, Text, TextInput, View } from "react-native";
import React from "react";
import HeaderBar from "../components/HeaderBar";
import { AntDesign } from "@expo/vector-icons";
import { Colors } from "@/constants/Colors";
import Carosuel from "@/src/components/Carosuel";
import OfferSlider from "../components/OfferSlider";

const HomeScreen = () => {
  return (
    <>
      <View>
        <StatusBar backgroundColor={"orange"} />
        <HeaderBar />
        <View style={styles.searchContainer}>
          <TextInput style={styles.searchText} placeholder="Search for foods, hotels" />
          <AntDesign
            name="search1"
            size={24}
            color={Colors.light.locationIcon}
          />
        </View>
        <OfferSlider />
        {/* Add the text prompt with lines above the Carosuel component */}
        <View style={styles.promptContainer}>
          <View style={styles.line} />
          <Text style={styles.promptText}>What would you like?</Text>
          <View style={styles.line} />
        </View>
      </View>
      <Carosuel />
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
    marginHorizontal: 20,
    borderRadius: 23,
  },
  searchText: {
    color: "#c4c4c4"
  },
  promptContainer: {
    flexDirection: 'row', // Align items in a row
    alignItems: 'center', // Center items vertically
    marginTop: 20, // Space above the prompt
    marginHorizontal: 20, // Horizontal margin for alignment
  },
  line: {
    flex: 1, // Take up remaining space
    height: 1, // Height of the line
    backgroundColor: '#c4c4c4', // Color of the line
  },
  promptText: {
    fontSize: 18, // Font size for the prompt text
    fontWeight: "bold", // Bold text for emphasis
    color: "#c4c4c4", // Text color
    marginHorizontal: 10, // Space between the text and lines
    fontFamily: 'Macondo'
  },
});