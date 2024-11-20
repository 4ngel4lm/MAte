import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import LoginScreen from '../Vistas/LoginScreen';
import CentralScreen from '../Vistas/CentralScreen';
import PreviasScreen from '../Vistas/PreviasScreen';
import RecursarScreen from '../Vistas/RecursarScreen';
import IntensificarScreen from '../Vistas/IntensificarScreen';
import MP1 from '../Vistas/Materias/Previas/MP1';
import MP2 from '../Vistas/Materias/Previas/MP2';
import MP3 from '../Vistas/Materias/Previas/MP3';
import MI1 from '../Vistas/Materias/Intensificar/MI1';
import MI2 from '../Vistas/Materias/Intensificar/MI2';
import MI3 from '../Vistas/Materias/Intensificar/MI3';
import MI4 from '../Vistas/Materias/Intensificar/MI4';
import MI5 from '../Vistas/Materias/Intensificar/MI5';
import MI6 from '../Vistas/Materias/Intensificar/MI6';
import MR from '../Vistas/Materias/Recursar/MR';
import MR2 from '../Vistas/Materias/Recursar/MR2';

const Stack = createStackNavigator();

export default function StackNavigation() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Login">
        <Stack.Screen 
          name="Login" 
          component={LoginScreen} 
          options={{ headerShown: false }}
        />
        <Stack.Screen 
          name="Central" 
          component={CentralScreen} 
          options={{headerShown: false }} 
        />
        <Stack.Screen
          name="Previas"
          component={PreviasScreen}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="Recursar"
          component={RecursarScreen}              
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="Intensificar"
          component={IntensificarScreen}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="Previas1Screen"
          component={MP1}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="Previas2Screen"
          component={MP2}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="Previas3Screen"
          component={MP3}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="Intensificar1Screen"
          component={MI1}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="Intensificar2Screen"
          component={MI2}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="Intensificar3Screen"
          component={MI3}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="Intensificar4Screen"
          component={MI4}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="Intensificar5Screen"
          component={MI5}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="Intensificar6Screen"
          component={MI6}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="Recursar1Screen"
          component={MR}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="Recursar2Screen"
          component={MR2}
          options={{headerShown: false}}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
