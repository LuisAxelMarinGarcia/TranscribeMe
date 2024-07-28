import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, ImageBackground, Image, Alert } from "react-native";
import { StackNavigationProp } from "@react-navigation/stack";
import { RootStackParamList } from "../navigation/AppNavigator";
import LinearGradient from 'react-native-linear-gradient';
import styles from '../styles/RegisterScreenStyles';

type LoginRegScreenNavigationProp = StackNavigationProp<RootStackParamList, "LoginReg">;

type Props = {
  navigation: LoginRegScreenNavigationProp;
};

const RegisterScreen: React.FC<Props> = ({ navigation }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [surname, setSurname] = useState("");

  const sanitizeInput = (input: string) => {
    return input.replace(/[<>"]/g, '').replace(/'/g, '');
  };

  const handleRegister = async () => {
    // Registration logic here...

    Alert.alert("Registro", "This is a placeholder for the registration logic.");
  };

  return (
    <LinearGradient
      colors={['#5E9CFA', '#8A2BE2']}
      style={styles.container}
    >
      <View style={styles.imageBackground}>
        <ImageBackground source={require("../../assets/back2.png")} style={styles.imageBackgroundImage} />
        <Text style={styles.headerText}>TranscribeMe</Text>
        <View style={styles.logoContainer}>
          <Image source={require('../../assets/icon2.png')} style={styles.logo} />
        </View>
      </View>
      <View style={styles.registerContainer}>
        <View style={styles.buttonContainer}>
          <TouchableOpacity
            style={styles.buttonInactive}
            onPress={() => navigation.navigate("LoginReg")}
          >
            <Text style={styles.buttonText}>Iniciar sesión</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.buttonActive}>
            <Text style={styles.buttonText}>Registrar</Text>
          </TouchableOpacity>
        </View>
        <Text style={styles.welcomeText}>Welcome to TranscribeMe Register</Text>
        <Image source={require('../../assets/icon.png')} style={styles.logo} />
        <TouchableOpacity>
          <Text style={styles.uploadButtonText}>Subir Foto de Perfil</Text>
        </TouchableOpacity>
        <TextInput
          style={styles.input}
          placeholder="Correo electrónico"
          placeholderTextColor="#aaa"
          value={email}
          onChangeText={(text) => setEmail(sanitizeInput(text))}
          keyboardType="email-address"
          autoCapitalize="none"
        />
        <TextInput
          style={styles.input}
          placeholder="Contraseña"
          placeholderTextColor="#aaa"
          secureTextEntry={true}
          value={password}
          onChangeText={(text) => setPassword(sanitizeInput(text))}
        />
        <TextInput
          style={styles.input}
          placeholder="Nombre"
          placeholderTextColor="#aaa"
          value={name}
          onChangeText={(text) => setName(sanitizeInput(text))}
        />
        <TextInput
          style={styles.input}
          placeholder="Apellido"
          placeholderTextColor="#aaa"
          value={surname}
          onChangeText={(text) => setSurname(sanitizeInput(text))}
        />
        <TouchableOpacity
          style={styles.registerButton}
          onPress={handleRegister}
        >
          <Text style={styles.buttonText}>Registrar</Text>
        </TouchableOpacity>
        <Text style={styles.textQuestion}>¿Ya tienes una cuenta? <Text style={styles.linkText} onPress={() => navigation.navigate("LoginReg")}>Iniciar sesión</Text></Text>
      </View>
    </LinearGradient>
  );
};

export default RegisterScreen;
