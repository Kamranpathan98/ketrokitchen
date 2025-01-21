import { Pressable, StyleSheet, Text, View } from "react-native";
import React from "react";
import { MenuItem } from "@/types/Datatypes";

interface MenuItemsProps {
  item: MenuItem;
}

const MenuItems: React.FC<MenuItemsProps> = ({ item }) => {
  return (
    <View>
      <Pressable>
        <View>
          <Text>{item.name}</Text>
          <Text>₹ {item.price}</Text>
        </View>
      </Pressable>
    </View>
  );
};

export default MenuItems;

const styles = StyleSheet.create({});
