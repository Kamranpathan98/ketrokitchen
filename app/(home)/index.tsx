import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Alert,
  ScrollView,
  Pressable,
} from "react-native";
import * as Location from "expo-location";
import Entypo from "@expo/vector-icons/Entypo";
import { Colors } from "@/constants/Colors";

const Index = () => {
  const [locationEnabled, setLocationEnabled] = useState<boolean>(false);
  const [displayCurrentAddress, setDisplayCurrentAddress] = useState<string>(
    "Fetching your location.."
  );

  const getCurrentAddress = async () => {
    try {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        Alert.alert(
          "Location service is disabled",
          "Please enable it to continue",
          [{ text: "OK" }],
          { cancelable: false }
        );
      }

      let location = await Location.getCurrentPositionAsync({});
      let address = await Location.reverseGeocodeAsync({
        latitude: location.coords.latitude,
        longitude: location.coords.longitude,
      });

      if (address.length > 0) {
        const { city, region, country, postalCode } = address[0];
        setDisplayCurrentAddress(
          `${city}, ${postalCode} ${region}, ${country}`
        );
      } else {
        setDisplayCurrentAddress("Unable to determine location");
      }
    } catch (error) {
      console.error("Error getting location:", error);
    }
  };

  const checkLocationIsEnabled = async () => {
    let enabled = await Location.hasServicesEnabledAsync();
    setLocationEnabled(enabled);
    if (!enabled) {
      Alert.alert(
        "Location service is disabled",
        "Please enable it to continue",
        [{ text: "OK" }],
        { cancelable: false }
      );
    } else {
      setLocationEnabled(true);
    }
  };

  useEffect(() => {
    checkLocationIsEnabled();
    getCurrentAddress();
  }, []);

  return (
    <ScrollView
      style={[styles.container, { backgroundColor: Colors.light.background }]}
    >
      <View style={styles.titleContainer}>
        <Entypo name="location" size={24} color={Colors.light.locationIcon} />
        <View style={{ flex: 1 }}>
          <Text
            style={{
              color: Colors.light.text,
              fontSize: 15,
              fontWeight: "500",
            }}
          >
            Deliver to
          </Text>
          <Text
            style={{ color: Colors.light.secondaryText }}
            numberOfLines={1}
            ellipsizeMode="tail"
          >
            {displayCurrentAddress}
          </Text>
        </View>
        <Pressable
          style={[styles.pressable, { backgroundColor: Colors.light.tint }]}
        >
          <Text style={{ color: Colors.light.text }}>K</Text>
        </Pressable>
      </View>
    </ScrollView>
  );
};

export default Index;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  titleContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    marginTop: 40,
    padding: 10,
  },
  pressable: {
    width: 40,
    height: 40,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 20,
  },
});
