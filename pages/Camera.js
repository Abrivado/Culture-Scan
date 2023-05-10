import React, { useState, useEffect, useRef } from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import { Camera } from 'expo-camera';
import { Ionicons } from '@expo/vector-icons';

const CameraPage = () => {
  const [hasCameraPermission, setHasCameraPermission] = useState(null);
  const [type, setType] = useState(Camera.Constants.Type.back);
  const [flashMode, setFlashMode] = useState(Camera.Constants.FlashMode.off);
  const cameraRef = useRef(null);

  useEffect(() => {
    (async () => {
      const { status } = await Camera.requestCameraPermissionsAsync();
      setHasCameraPermission(status === 'granted');
    })();
  }, []);

  const handleCameraType = () => {
    setType(
      type === Camera.Constants.Type.back
        ? Camera.Constants.Type.front
        : Camera.Constants.Type.back
    );
  };

  const handleFlashMode = () => {
    setFlashMode(
      flashMode === Camera.Constants.FlashMode.off
        ? Camera.Constants.FlashMode.torch
        : Camera.Constants.FlashMode.off
    );
  };

  if (hasCameraPermission === null) {
    return <View />;
  } else if (hasCameraPermission === false) {
    return <Text>No access to camera</Text>;
  } else {
    return (
      <View style={styles.container}>
        <Camera style={styles.camera} type={type} flashMode={flashMode} ref={cameraRef}>
          <View style={styles.cameraView}>
            <TouchableOpacity style={styles.cameraIcon} onPress={handleFlashMode}>
              <Ionicons name={flashMode === Camera.Constants.FlashMode.off ? 'flash-off' : 'flash'} size={30} color="#fff" />
            </TouchableOpacity>
            <TouchableOpacity style={styles.cameraIcon} onPress={handleCameraType}>
              <Ionicons name="camera-reverse" size={30} color="#fff" />
            </TouchableOpacity>
          </View>
        </Camera>
      </View>
    );
  }
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: '#000',
  },
  camera: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  cameraView: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    flexDirection: 'row',
    justifyContent: 'space-between',
    margin: 10,
  },
  cameraIcon: {
    margin: 10,
  },
});

export default CameraPage;
