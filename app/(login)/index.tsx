// LoginScreen.js
import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, Image, TouchableOpacity } from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';
import { MaterialIcons } from '@expo/vector-icons'; // Importing MaterialIcons for the food icon

// Define the type for the navigation prop
type LoginScreenNavigationProp = StackNavigationProp<any, 'Login'>;

interface Props {
    navigation: LoginScreenNavigationProp;
}

const LoginScreen: React.FC<Props> = ({ navigation }) => {
    const [phoneNumber, setPhoneNumber] = useState(''); // Phone number input
    const countryCode = '+91'; // Default country code

    const handleLogin = () => {
        // Navigate to the main app (tab navigator) after login
        navigation.replace('Main'); // Uncomment this line to navigate after login
        console.log('Phone Number:', countryCode + phoneNumber); // For demonstration purposes
    };

    return (
        <View style={styles.container}>
            {/* Image at the top */}
            <Image
                source={require('@/assets/images/Logo-104.jpg')} // Use require to import the image
                style={styles.image}
                resizeMode="cover" // Adjust the image to cover the area
            />
            <View style={styles.header}>
                <MaterialIcons name="fastfood" size={50} color="#01461b" />
                <Text style={styles.title}>Food Journey Begins Here!</Text>
            </View>
            {/* Straight line with text in the middle */}
            <View style={styles.lineContainer}>
                <View style={styles.line} />
                <Text style={styles.loginText}>Login or Sign Up</Text>
                <View style={styles.line} />
            </View>
            <View style={styles.inputContainer}>
                <TextInput
                    style={styles.countryCodeInput}
                    value={countryCode}
                    editable={false} // Make the country code input non-editable
                />
                <TextInput
                    style={styles.phoneInput}
                    placeholder="Phone Number"
                    keyboardType="phone-pad"
                    value={phoneNumber}
                    onChangeText={setPhoneNumber}
                />
            </View>
            <TouchableOpacity style={styles.button} onPress={handleLogin}>
                <Text style={styles.buttonText}>Login</Text>
            </TouchableOpacity>
            <View style={styles.footer}>
                <Text style={styles.footerText}>
                    By Continuing, You Agree To Our{' '}
                    <Text style={styles.termsText}>Terms and Conditions</Text> And <Text style={styles.termsText}>Privacy Policy</Text>
                </Text>
            </View>
        </View>
    );
};

export default LoginScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'flex-start', // Align items to the top
        alignItems: 'center',
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
        marginBottom: 10,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginLeft: 10,
        color: '#01461b',
    },
    lineContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        width: '90%', // Adjust width for better alignment
        marginVertical: 30, // Space above and below the line
    },
    line: {
        flex: 1,
        height: 1,
        backgroundColor: 'grey', // Color of the line
    },
    loginText: {
        color: 'grey', // Grey color for the login text
        fontSize: 16, // Font size for the login text
        marginHorizontal: 10, // Space between the text and the lines
    },
    inputContainer: {
        flexDirection: 'row',
        width: '90%', // Adjusted width for better alignment
        marginBottom: 30,
    },
    countryCodeInput: {
        height: 50,
        width: '20%', // Width for the country code input
        borderColor: '#01461b',
        borderWidth: 1,
        borderRadius: 5,
        paddingHorizontal: 10,
        textAlign: 'center', // Center the text in the country code input
        marginRight: 10, // Space between country code and phone number input
    },
    phoneInput: {
        height: 50,
        width: '80%', // Width for the phone number input
        borderColor: '#01461b',
        borderWidth: 1,
        borderRadius: 5,
        paddingHorizontal: 10,
    },
    button: {
        backgroundColor: '#01461b', // Button background color
        paddingVertical: 15, // Increased vertical padding for a bigger button
        paddingHorizontal: 30, // Horizontal padding
        borderRadius: 5,
        width: '90%',
    },
    buttonText : {
        color: 'white', // Button text color
        fontSize: 18, // Increased font size for better visibility
        textAlign: 'center', // Center the text
    },
    footer: {
        position: 'absolute', // Position the footer at the bottom
        bottom: 20, // Distance from the bottom
        left: 20, // Padding from the left
        right: 20, // Padding from the right
        alignItems: 'center', // Center the footer text
    },
    footerText: {
        textAlign: 'center', // Center the text
        color: 'black', // Default text color
        fontSize: 11
    },
    termsText: {
        color: 'orange', // Color for the Terms and Conditions text
        fontWeight: 'bold', // Bold text for emphasis
    },
});