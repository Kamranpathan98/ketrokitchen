import { Pressable, StyleSheet, Text, View, Image } from "react-native";
import React from "react";
import { MenuItem } from "@/types/Datatypes";
import { FontAwesome } from "@expo/vector-icons";
import { Colors } from "@/constants/Colors";

interface MenuItemsProps {
  item: MenuItem;
}

const MenuItems: React.FC<MenuItemsProps> = ({ item }) => {
  return (
    <View>
      <Pressable style={styles.itemContainer}>
        <View>
          <Text style={styles.itemName}>{item.name}</Text>
          <Text style={styles.itemPrice}>₹ {item.price}</Text>
          <View style={styles.reviewContainer}>
            {[0, 0, 0, 0, 0].map((_, id) => (
              <FontAwesome
                key={id}
                style={styles.reviewIcon}
                name={id < Math.floor(item.rating) ? "star" : "star-o"}
                size={15}
                color="#FFD700"
              />
            ))}
          </View>
          <Text style={styles.itemDescription}>
            {typeof item.description === 'string' && item.description.length > 80 
              ? item.description.substr(0, 50) + '...' 
              : item.description}
          </Text>
        </View>
        <Pressable>
          <Image style={styles.descImg} source={require("@/assets/images/Logo-102.jpg")} />
          <Pressable style={styles.addItems}>
            <Text style={styles.addItemsText}>ADD</Text>
          </Pressable>
        </Pressable>
      </Pressable>
    </View>
  );
};

export default MenuItems;

const styles = StyleSheet.create({
  itemContainer: {
    justifyContent: 'space-between',
    flexDirection: 'row',
    height: 160,
    margin: 10,
    marginVertical: 10,
    padding: 10,
    backgroundColor: '#fff',
    borderRadius: 20,
    shadowColor: 'black', // Optional: Add shadow for elevation
    shadowOffset: { width: 0, height: 2 }, // Optional: Shadow offset
    shadowOpacity: 0, // Optional: Shadow opacity
    shadowRadius: 4, // Optional: Shadow radius
    elevation: 5, // Optional: Elevation for Android
  },
  descImg: {
    width:120,
    height: 120,
    borderRadius: 15
  },

  itemName: {
    fontWeight: '600',
    fontSize: 18,
  },
  itemPrice: {
    fontSize: 15,
    fontWeight: '500',
    marginTop: 5,
  },
  reviewContainer: {
    flexDirection: 'row',
    marginTop: 5,
  },
  reviewIcon: {
    paddingHorizontal: 3,
  },
  itemDescription: {
    marginTop: 5,
    color: 'gray', // Optional: Change color for better visibility
    width: 200,
    fontSize:16
  },
  addItems: {
    position: 'absolute',
    flexDirection: "row",
    alignItems: "center",
    top: 95,
    left: 20,
    borderWidth: 1,
    borderColor: Colors.light.darkGreen,
    borderRadius: 5,
    paddingHorizontal: 25,
    paddingVertical: 5,
    backgroundColor: "white"
  },
  addItemsText: {
    fontSize: 16,
    fontWeight: '600'
  }
});