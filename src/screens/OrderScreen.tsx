import { SafeAreaView, StatusBar, StyleSheet, Text, View, Image } from 'react-native';
import React, { useRef, useState, useEffect } from 'react';
import moment from 'moment';
import { Colors } from '@/constants/Colors';
import MapView, { Marker, Polyline } from 'react-native-maps';
import * as Location from 'expo-location';
import { RootStackParamList } from '@/types/Datatypes';
import { useRoute, RouteProp } from '@react-navigation/native';

const OrderScreen = () => { 
  const timePlaced = moment().format("LT");
  const mapView = useRef<MapView>(null);
  const route = useRoute<RouteProp<RootStackParamList, "Cart">>();
  const { name } = route.params ?? "";
  
  const [coordinates, setCoordinates] = useState<{ latitude: number; longitude: number }[]>([]);
  const [initialRegion, setInitialRegion] = useState({
    latitude: 0,
    longitude: 0,
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421,
  });

  useEffect(() => {
    const getLocation = async () => {
      // Request permission to access location
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        console.error('Permission to access location was denied');
        return;
      }

      // Get the user's current location
      let location = await Location.getCurrentPositionAsync({});
      const { latitude, longitude } = location.coords;

      // Set the coordinates and initial region
      setCoordinates([{ latitude, longitude }, { latitude: 13.0451, longitude: 77.6269 }]); // Add hotel location
      setInitialRegion({
        latitude,
        longitude,
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0421,
      });
    };

    getLocation();
  }, []);

  useEffect(() => {
    if (coordinates.length > 0) {
      mapView.current?.fitToCoordinates(coordinates, {
        edgePadding: {
          top: 50,
          bottom: 50,
          left: 50,
          right: 50,
        },
      });
    }
  }, [coordinates]);

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar backgroundColor={"white"} />
      <View style={styles.orderContainer}>
        <View>
          <Text style={styles.deliveryStatusText}>Delivery in 25 mins.</Text>
          <Text style={styles.deliveryStatusText}>Order placed at {timePlaced}</Text>
          
        </View>
        <Text style={styles.deliveryStatusText}>Help</Text>
      </View>
      <MapView
        ref={mapView}
        style={styles.map}
        initialRegion={initialRegion}
      >
        {coordinates.map((coordinate, index) => (
          <Marker key={index} coordinate={coordinate} title={index === 0 ? "Your Location" : "Hotel Location"} />
        ))}
        <Polyline coordinates={coordinates} strokeColor='black' />
      </MapView>
      <Text style={styles.orderAcceptedText}>{name} has accepted your order!</Text>
      <View style={styles.riderContainer}>
        <Image source={require('@/assets/images/Bike.jpg')} style={styles.riderImage} /> {/* Adjust the path as necessary */}
        <Text style={styles.orderOnWayText}>Order on your way!</Text>
      </View>
    </SafeAreaView>
  );
}

export default OrderScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  orderContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    height: 60,
    padding: 10,
    backgroundColor: Colors.light.darkGreen,
  },
  deliveryStatusText: {
    fontSize: 16,
    fontWeight: "600",
    color: "white",
  },
  orderAcceptedText: {
    fontSize: 16,
    fontWeight: "600",
    color: "black",
    marginTop: 5,
    marginLeft: 15
  },
  map: {
    width: "100%",
    height: 400,
  },
  riderContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    padding: 10,
  },
  riderImage: {
    width: 50, // Adjust size as needed
    height: 50, // Adjust size as needed
    marginRight: 10,
  },
  orderOnWayText: {
    fontSize: 16,
    fontWeight: "600",
    color: "black",
  },
});