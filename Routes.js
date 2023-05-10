import React, { useState } from 'react'; // On importe useState pour gérer l'état des icones
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';
import { View } from 'react-native';
import Home from './pages/Home';
import Camera from './pages/Camera';
import Map from './pages/Map';

const Tab = createBottomTabNavigator();

const Routes = () => {
  const [homeColor, setHomeColor] = useState('#6E798C'); // On crée un état pour la couleur de l'icone home
  const [mapColor, setMapColor] = useState('#6E798C'); // On crée un état pour la couleur de l'icone map

  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={{
          tabBarShowLabel: false,
          tabBarStyle: [{
            display: 'flex'
          }, null],
        }}
      >
        <Tab.Screen
          name="Home"
          component={Home}
          options={{
            tabBarIcon: ({ color, size }) => (
              // On utilise la variable homeColor pour déterminer la couleur de l'icone home
              <Ionicons name="home" color={homeColor} size={size} />
            ),
          }}
          // On ajoute un listener pour changer la couleur de l'icone home quand on accède à sa page
          listeners={{
            focus: () => setHomeColor('#53A1E8'),
            blur: () => setHomeColor('#6E798C'),
          }}
        />
        <Tab.Screen
          name="Scannez un QR code"
          component={Camera}
          options={{
            tabBarIcon: ({ color, size }) => (
              // On garde le même code pour l'icone camera
              <View
                style={{
                  position: 'relative',
                  backgroundColor: '#53A1E8',
                  borderRadius: 50,
                  width: 75,
                  height: 75,
                  justifyContent: 'center',
                  alignItems: 'center',
                  top: -15,
                }}
              >
                <Ionicons name="camera" color="white" size={32} />
              </View>
            ),
          }}
        />
        <Tab.Screen
          name="Map"
          component={Map}
          options={{
            tabBarIcon: ({ color, size }) => (
              // On utilise la variable mapColor pour déterminer la couleur de l'icone map
              <Ionicons name="map" color={mapColor} size={size} />
            ),
          }}
          // On ajoute un listener pour changer la couleur de l'icone map quand on accède à sa page
          listeners={{
            focus: () => setMapColor('#53A1E8'),  // couleur bleue quand l'icone est sélectionnée
            blur: () => setMapColor('#6E798C'),   // couleur grise quand l'icone n'est pas sélectionnée
          }}
        />
      </Tab.Navigator>
    </NavigationContainer>
  );
};

export default Routes;
