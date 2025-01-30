import { Pressable, StyleSheet, Text, View } from "react-native";
import React from "react";
import { MenuCategory } from "@/types/Datatypes";
import { AntDesign } from "@expo/vector-icons";
import MenuItems from "./MenuItems";

interface FoodItemsProps {
  item: MenuCategory;
}

const FoodItems: React.FC<FoodItemsProps> = ({ item }) => {
  const data = [item];
  return (
    <View>
      {data.map((item, index) => (
        <React.Fragment key={index}>
          <Pressable style={styles.container}>
            <Text style={styles.itemName}>
              {item.name} ({item.items.length})
            </Text>
            <AntDesign name="down" size={15} color="black" />
          </Pressable>
          {item.items.map((menu, id) => (
            <MenuItems key={id} item={menu} />
          ))}
        </React.Fragment>
      ))}
    </View>
  );
};

export default FoodItems;

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    margin: 10,
  },
  itemName: {
    fontSize: 19,
    fontWeight: 'bold'
  }
});