import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Image } from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../navigation/AppNavigator';
import LinearGradient from 'react-native-linear-gradient';
import Header from '../components/Header';
import Footer from '../components/Footer';
import styles from '../styles/JoinClassStyles';

type JoinClassScreenNavigationProp = StackNavigationProp<RootStackParamList, 'JoinClass'>;

type Props = {
  navigation: JoinClassScreenNavigationProp;
};

const JoinClass: React.FC<Props> = ({ navigation }) => {
  const [codeClass, setCodeClass] = useState('');
  const [reference, setReference] = useState('');

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
            <TouchableOpacity style={styles.joinButton}>
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
