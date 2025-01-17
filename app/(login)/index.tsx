// LoginScreen.js
import React, { useState } from 'react';
import { View, Text, Button, StyleSheet, TextInput, Image } from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';
import { MaterialIcons } from '@expo/vector-icons'; // Importing MaterialIcons for the food icon

// Define the type for the navigation prop
type LoginScreenNavigationProp = StackNavigationProp<any, 'Login'>;

interface Props {
    navigation: LoginScreenNavigationProp;
}

const LoginScreen: React.FC<Props> = ({ navigation }) => {
    const [phoneNumber, setPhoneNumber] = useState('');

    const handleLogin = () => {
        // Navigate to the main app (tab navigator) after login
        navigation.replace('Main'); // Uncomment this line to navigate after login
        console.log('Phone Number:', phoneNumber); // For demonstration purposes
    };

    return (
        <View style={styles.container}>
            {/* Image at the top */}
            <Image
                source={require('@/assets/images/Logo-102.jpg')} // Use require to import the image
                style={styles.image}
                resizeMode="cover" // Adjust the image to cover the area
            />
            <View style={styles.header}>
                <MaterialIcons name="fastfood" size={50} color="#6200ee" />
                <Text style={styles.title}>Hey, Foodie!</Text>
            </View>
            <TextInput
                style={styles.input}
                placeholder="Login with Phone Number"
                keyboardType="phone-pad"
                value={phoneNumber}
                onChangeText={setPhoneNumber}
            />
            <Button title="Login" onPress={handleLogin} />
        </View>
    );
};

export default LoginScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'flex-start', // Align items to the top
        alignItems: 'center',
        // backgroundColor: '#C2FFC7'
    },
    image: {
        width: '100%', // Full width
        height: '35%', // Half the screen height
        borderBottomLeftRadius: 30, // Curved border at the bottom left
        borderBottomRightRadius: 30, // Curved border at the bottom right
        overflow: 'hidden', // Ensure the curve is visible by clipping overflow
        marginBottom: 20, // Space between the image and header
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 20,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginLeft: 10,
    },
    input: {
        height: 50,
        width: '90%', // Adjusted width for better alignment
        borderColor: '#6200ee',
        borderWidth: 1,
        borderRadius: 5,
        paddingHorizontal: 10,
        marginBottom: 20,
    },
});
