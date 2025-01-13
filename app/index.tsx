import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';
import Entypo from '@expo/vector-icons/Entypo';
import AntDesign from '@expo/vector-icons/AntDesign';
import HomePage from './(home)';

// Screen components
const HomeScreen = () => (
    <View style={styles.screen}>
        <Text>Home Screen</Text>
    </View>
);

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

const Index = () => {
    return (
        <Tab.Navigator
            screenOptions={({ route }) => {
                let IconComponent: React.ElementType;
                let iconName: string;

                // Assign IconComponent based on the route name
                if (route.name === 'Home') {
                    IconComponent = Entypo;
                    iconName = 'home';
                } else if (route.name === 'Cart') {
                    IconComponent = AntDesign;
                    iconName = 'shoppingcart';
                } else if (route.name === 'Profile') {
                    IconComponent = AntDesign;
                    iconName = 'user';
                }

                // Return the icon component with appropriate props
                return {
                    headerShown: false, // Hide header for all screens
                    tabBarIcon: ({ color, size }) => (
                        <IconComponent name={iconName} size={size} color={color} />
                    ),
                    tabBarActiveTintColor: '#6200ee',
                    tabBarInactiveTintColor: 'gray',
                };
            }}
        >
            <Tab.Screen name="Home" component={HomePage} />
            <Tab.Screen name="Cart" component={CartScreen} />
            <Tab.Screen name="Profile" component={ProfileScreen} />
        </Tab.Navigator>
    );
};

export default Index;

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
});
