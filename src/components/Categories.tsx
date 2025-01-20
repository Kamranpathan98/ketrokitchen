import { FlatList, StyleSheet, Text, TouchableOpacity, View, Image } from "react-native";
import React from "react";
import { horizontalData } from "@/constants/Data";
import { Colors } from "@/constants/Colors";

const Categories = () => {
  return (
    <View>
      <FlatList
        data={horizontalData}
        renderItem={({ item }) => (
          <TouchableOpacity style={styles.horizontalItemContainer}>
            <Image source={{ uri: item.uri }} style={styles.horizontalImage} />
            <Text style={styles.horizontalItemText}>{item.name}</Text>
          </TouchableOpacity>
        )}
        keyExtractor={(item, index) => item.name + index} // Unique key for each item
        horizontal={true} // Set to true for horizontal scrolling
        showsHorizontalScrollIndicator={false} // Hide horizontal scroll indicator
        contentContainerStyle={styles.horizontalListContainer} // Style for the horizontal list
      />
    </View>
  );
};

export default Categories;

const styles = StyleSheet.create({
    
  horizontalItemContainer: {
    backgroundColor: "transparent",
    borderRadius: 20,
    padding: 15,
    marginRight: 5,
  },
  horizontalImage: {
    width: 60,
    height: 50,
    marginBottom: 5,
  },

  horizontalItemText: {
    textAlign: "center",
    color: Colors.light.locationIcon,
    fontSize: 14,
    fontWeight: "bold",
  },

  horizontalListContainer: {
    paddingBottom: 5,
  },
});
