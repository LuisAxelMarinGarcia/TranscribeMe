import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, Image, Alert } from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../navigation/AppNavigator';
import Header from '../components/Header';
import Footer from '../components/Footer';
import LinearGradient from 'react-native-linear-gradient';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import styles from '../styles/JoinClassStyles';

type JoinClassScreenNavigationProp = StackNavigationProp<RootStackParamList, 'JoinClass'>;

type Props = {
  navigation: JoinClassScreenNavigationProp;
};

const JoinClass: React.FC<Props> = ({ navigation }) => {
  const [codeClass, setCodeClass] = useState('');
  const [userId, setUserId] = useState<string | null>(null);
  const [reference, setReference] = useState('');

  useEffect(() => {
    const getUserId = async () => {
      const storedUserId = await AsyncStorage.getItem('userId');
      if (storedUserId) {
        setUserId(storedUserId);
      } else {
        Alert.alert('Error', 'No se pudo obtener el ID del usuario');
      }
    };

    getUserId();
  }, []);

  const validateInput = () => {
    const codeRegex = /^[A-Za-z0-9]{10,15}$/;
    const referenceRegex = /^[A-Za-z0-9-]{36,40}$/;

    if (!codeClass.match(codeRegex)) {
      Alert.alert('Error', 'El código de la clase debe ser alfanumérico y tener entre 10 y 15 caracteres.');
      return false;
    }

    if (!reference.match(referenceRegex)) {
      Alert.alert('Error', 'La referencia debe ser alfanumérica, puede contener guiones y tener entre 36 y 40 caracteres.');
      return false;
    }

    if (!userId || !reference || !codeClass) {
      Alert.alert('Error', 'Por favor, complete todos los campos.');
      return false;
    }

    return true;
  };

  const joinClass = async () => {
    if (!validateInput()) return;

    try {
      const token = await AsyncStorage.getItem('userToken');
      if (!token) {
        throw new Error('Token not found');
      }

      const myHeaders = {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      };

      // First request
      await axios.post(`https://transcribeme-apigateway.integrador.xyz:3004/api/v1/users-classes/${userId}/${reference}/${codeClass}`, {}, { headers: myHeaders });

      // Second request
      await axios.put(`https://transcribeme-apigateway.integrador.xyz:3004/api/v1/class/add-number-student/${reference}`, {}, { headers: myHeaders });

      Alert.alert('Éxito', 'Te has unido exitosamente a la clase');
    } catch (error) {
      if (axios.isAxiosError(error)) {
        console.error('Axios Error:', error.message);
        console.error('Axios Error Response:', error.response?.data);
      } else {
        console.error('Unexpected Error:', error);
      }
      Alert.alert('Error', 'Hubo un error al unirse a la clase');
    }
  };

  return (
    <LinearGradient colors={['#5E9CFA', '#8A2BE2']} style={styles.container}>
      <Header />
      <View style={styles.content}>
        <View style={styles.joinContainer}>
          <Text style={styles.title}>Unirse a una clase</Text>
          <Image source={require('../../assets/join-icon.png')} style={styles.joinIcon} />
          <Text style={styles.subtitle}>Ingrese el código proporcionado por su maestro:</Text>
          <TextInput
            style={styles.input}
            placeholder="Código de clase"
            placeholderTextColor="#aaa"
            value={codeClass}
            onChangeText={setCodeClass}
          />
          <TextInput
            style={styles.input}
            placeholder="Referencia"
            placeholderTextColor="#aaa"
            value={reference}
            onChangeText={setReference}
          />
          <View style={styles.buttonContainer}>
            <TouchableOpacity style={styles.joinButton} onPress={joinClass}>
              <Text style={styles.joinButtonText}>Unirse</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.cancelButton} onPress={() => navigation.goBack()}>
              <Text style={styles.cancelButtonText}>Cancelar</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
      <Footer />
    </LinearGradient>
  );
};

export default JoinClass;
