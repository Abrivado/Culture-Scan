import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import MapView from 'react-native-maps';
import * as Location from 'expo-location';

const MapPage = () => {
  const [hasLocationPermission, setLocationPermission] = useState(null);
  const [showLocationMessage, setShowLocationMessage] = useState(false);
  const [initialRegion, setInitialRegion] = useState(null);

  useEffect(() => {
    checkLocationPermission();
  }, []);

  const checkLocationPermission = async () => {
    const { status } = await Location.requestForegroundPermissionsAsync();
    setLocationPermission(status === 'granted');
    setShowLocationMessage(status !== 'granted');
  };

  const handleLocationPermission = async () => {
    const { status } = await Location.requestForegroundPermissionsAsync();
    setLocationPermission(status === 'granted');
    setShowLocationMessage(false);
  };

  useEffect(() => {
    if (hasLocationPermission) {
      Location.getCurrentPositionAsync({}).then(position => {
        setInitialRegion({
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        });
      });
    }
  }, [hasLocationPermission]);

  return (
    <View style={styles.container}>
      {showLocationMessage}
      {initialRegion && (
        <MapView style={styles.map} initialRegion={initialRegion}>
          {/* Ajoutez ici les marqueurs pour les points d'intérêt */}
        </MapView>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  map: {
    flex: 1,
  },

});

export default MapPage;
