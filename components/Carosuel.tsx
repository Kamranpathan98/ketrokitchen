import {
  StyleSheet,
  Text,
  FlatList,
  View,
  Image,
  TouchableOpacity,
} from "react-native";
import React from "react";
import { Card } from "react-native-paper"; // Import Card from react-native-paper
import { Rating } from "react-native-ratings"; // Import Rating component
import { Colors } from "@/constants/Colors";

// Define the type for the data items
interface DataItem {
  name: string;
  uri?: string; // URI for images
  description?: string; // Description for the item
  price?: string; // Price for the item
  rating?: number; // Rating for the item
}

// Sample data for the vertical FlatList with random images, descriptions, and ratings
const dataTest: DataItem[] = [
  {
    name: "Hotel Sunshine",
    uri: "https://img.icons8.com/color/96/000000/pizza.png",
    description: "A beautiful hotel with a sea view. testing the lines",
    price: "$120/night",
    rating: 4.5, // Rating out of 5
  },
  {
    name: "Mountain Retreat",
    uri: "https://source.unsplash.com/random/200x200?hotel2",
    description: "Relax in the mountains.",
    price: "$150/night",
    rating: 4.0,
  },
  {
    name: "City Center Inn",
    uri: "https://source.unsplash.com/random/200x200?hotel3",
    description: "Stay in the heart of the city.",
    price: "$100/night",
    rating: 3.5,
  },
  {
    name: "Beach Resort",
    uri: "https://source.unsplash.com/random/200x200?hotel4",
    description: "Enjoy the sun and sand.",
    price: "$200/night",
    rating: 5.0,
  },
  {
    name: "Luxury Suites",
    uri: "https://source.unsplash.com/random/200x200?hotel5",
    description: "Experience luxury at its finest.",
    price: "$300/night",
    rating: 4.8,
  },
];

// Sample data for the horizontal FlatList with food images
const horizontalData: DataItem[] = [
  {
    name: "Burger",
    uri: "https://img.icons8.com/color/96/000000/hamburger.png",
  },
  {
    name: "Biryani",
    uri: "https://img.icons8.com/color/96/000000/rice-bowl.png",
  },
  { name: "Pizza", uri: "https://img.icons8.com/color/96/000000/pizza.png" },
  {
    name: "Ice Cream",
    uri: "https://img.icons8.com/color/96/000000/ice-cream.png",
  },
];

const Carosuel = () => {
  // Render the horizontal FlatList as the header
  const renderHorizontalList = () => (
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
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={dataTest}
        renderItem={({ item }) => (
          <Card style={styles.cardContainer}>
            <Card.Content>
              <View style={styles.cardContent}>
                <Image source={{ uri: item.uri }} style={styles.cardImage} />
                <View style={styles.cardDetails}>
                  <Text style={styles.itemText}>{item.name}</Text>
                  <Text style={styles.itemDescription}>{item.description}</Text>
                  <Text style={styles.itemPrice}>{item.price}</Text>
                  <View style={styles.ratingContainer}>
                    <Rating
                      type="heart"
                      ratingCount={5}
                      imageSize={20}
                      readonly
                      startingValue={item.rating} // Set the rating value
                      tintColor="white"
                    />
                  </View>
                </View>
              </View>
            </Card.Content>
          </Card>
        )}
        keyExtractor={(item, index) => item.name + index} // Unique key for each item
        contentContainerStyle={styles.contentContainer} // Style for the content container
        showsVerticalScrollIndicator={false}
        ListHeaderComponent={renderHorizontalList} // Use the horizontal list as the header
      />
    </View>
  );
};

export default Carosuel;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
  },
  cardContainer: {
    marginVertical: 10,
    marginHorizontal: 5,
    borderRadius: 10,
    elevation: 3, // Shadow effect for Android
    shadowColor: "#000", // Shadow color for iOS
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    backgroundColor: 'white'
  },
  cardContent: {
    flexDirection: "row", // Align items in a row
    alignItems: "center", // Center items vertically
  },
  cardImage: {
    width: 80, // Set width for the image
    height: 80, // Set height for the image
    marginRight: 10, // Space between image and text
    borderRadius: 5, // Optional: round the corners of the image
  },
  cardDetails: {
    flex: 1, // Allow text to take remaining space
  },
  itemText: {
    color: "black", // Change text color for better visibility
    fontSize: 18,
    fontWeight: "bold",
  },
  itemDescription: {
    color: "gray", // Description text color
    fontSize: 14,
  },
  itemPrice: {
    color: "green", // Price text color
    fontSize: 16,
    fontWeight: "bold",
  },
  ratingContainer: {
    flexDirection: "row", // Align stars in a row
    alignItems: "flex-start", // Align items to the start (left)
  },
  contentContainer: {
    paddingBottom: 20,
  },

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
