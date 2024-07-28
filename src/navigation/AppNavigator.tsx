import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen from '../screens/HomeScreen';
import ViewTranscriptionsScreen from '../screens/VerClase';
import StartTranscriptionScreen from '../screens/StartTranscriptionScreen';
import AvisoPrivacidad from '../screens/AvisoPrivacidad';
import JoinClassScreen from '../screens/JoinClass';
import JoinTranscriptionScreen from '../screens/JoinTranscription';
import Archivo from '../screens/Archivo';
import Create from '../screens/Create';
import SolicitudesBajas from '../screens/SolicitudesBajas';
import LoginReg from '../screens/LoginReg'; // Importing Login Screen
import RegisterScreen from '../screens/RegisterScreen'; // Importing Register Screen

export type RootStackParamList = {
  LoginReg: undefined;
  Home: undefined;
  ViewTranscriptions: { className: string };
  StartTranscription: undefined;
  AvisoPrivacidad: undefined;
  JoinClass: undefined;
  JoinTranscription: undefined;
  Archivo: undefined;
  Create: undefined;
  SolicitudesBajas: undefined;
  RegisterScreen: undefined;
};

const Stack = createStackNavigator<RootStackParamList>();

const AppNavigator = (): React.JSX.Element => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="LoginReg" component={LoginReg} />
      <Stack.Screen name="Home" component={HomeScreen} />
      <Stack.Screen name="ViewTranscriptions" component={ViewTranscriptionsScreen} />
      <Stack.Screen name="StartTranscription" component={StartTranscriptionScreen} />
      <Stack.Screen name="AvisoPrivacidad" component={AvisoPrivacidad} />
      <Stack.Screen name="JoinClass" component={JoinClassScreen} />
      <Stack.Screen name="JoinTranscription" component={JoinTranscriptionScreen} />
      <Stack.Screen name="Archivo" component={Archivo} />
      <Stack.Screen name="Create" component={Create} />
      <Stack.Screen name="SolicitudesBajas" component={SolicitudesBajas} />
      <Stack.Screen name="RegisterScreen" component={RegisterScreen} />
    </Stack.Navigator>
  );
};

export default AppNavigator;
