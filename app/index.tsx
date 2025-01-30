import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Entypo from "@expo/vector-icons/Entypo";
import AntDesign from "@expo/vector-icons/AntDesign";
import LoginScreen from "@/app/(login)/index"; /// Import the LoginScreen
import { View, Text, StyleSheet } from "react-native";
import HomeScreen from "@/src/screens/HomeScreen";
import HotelScreen from "@/src/screens/HotelScreen";
import { Provider } from "react-redux";
import store from "@/store";

// Screen components
const CartScreen = () => (
  <View style={styles.screen}>
    <Text>Cart Screen</Text>
  </View>
);

const ProfileScreen = () => (
  <View style={styles.screen}>
    <Text>Profile Screen</Text>
  </View>
);

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

const MainTabs = () => {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => {
        let IconComponent: React.ElementType;
        let iconName: string;

        // Assign IconComponent based on the route name
        if (route.name === "Home") {
          IconComponent = Entypo;
          iconName = "home";
        } else if (route.name === "Cart") {
          IconComponent = AntDesign;
          iconName = "shoppingcart";
        } else if (route.name === "Profile") {
          IconComponent = AntDesign;
          iconName = "user";
        }

        // Return the icon component with appropriate props
        return {
          headerShown: false, // Hide header for all screens
          tabBarIcon: ({ color, size }) => (
            <IconComponent name={iconName} size={size} color={color} />
          ),
          tabBarLabel: "",
          tabBarActiveTintColor: "#6200ee",
          tabBarInactiveTintColor: "gray",
        };
      }}
    >
      <Tab.Screen name="Home" component={HomeScreen} />
      <Tab.Screen name="Cart" component={CartScreen} />
      <Tab.Screen name="Profile" component={ProfileScreen} />
    </Tab.Navigator>
  );
};

const Index = () => {
  return (
    <Provider store={store}>
      <Stack.Navigator initialRouteName="Main">
        <Stack.Screen
          name="Login"
          component={LoginScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Main"
          component={MainTabs}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="HotelScreen"
          component={HotelScreen}
          options={{ headerShown: false }}
        />
      </Stack.Navigator>
    </Provider>
  );
};

export default Index;

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
