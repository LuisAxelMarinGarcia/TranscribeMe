import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, ImageBackground, Image, Alert } from "react-native";
import { StackNavigationProp } from "@react-navigation/stack";
import { RootStackParamList } from "../navigation/AppNavigator";
import LinearGradient from 'react-native-linear-gradient';
import styles from '../styles/LoginRegStyles';

type LoginRegScreenNavigationProp = StackNavigationProp<RootStackParamList, "LoginReg">;

type Props = {
  navigation: LoginRegScreenNavigationProp;
};

const LoginReg: React.FC<Props> = ({ navigation }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const sanitizeEmail = (input: string) => {
    return input.replace(/[<>]/g, '').trim().toLowerCase();
  };

  const sanitizePassword = (input: string) => {
    return input.replace(/[<>]/g, '').trim();
  };

  const handleLogin = async () => {
    const sanitizedEmail = sanitizeEmail(email);
    const sanitizedPassword = sanitizePassword(password);

    // Add login logic here...

    Alert.alert("Login", "This is just a placeholder for the login logic.");
  };

  return (
    <LinearGradient
      colors={['#5E9CFA', '#8A2BE2']}
      style={styles.container}
    >
      <View style={styles.imageBackground}>
        <ImageBackground source={require("../../assets/back2.png")} style={styles.imageBackgroundImage} />
        <Text style={styles.headerText}>TranscribeMe</Text>
      </View>
      <View style={styles.loginContainer}>
        <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.buttonActive}>
            <Text style={styles.buttonText}>Iniciar sesión</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.buttonInactive}
            onPress={() => navigation.navigate("RegisterScreen")}
          >
            <Text style={styles.buttonText}>Registrar</Text>
          </TouchableOpacity>
        </View>
        <Text style={styles.welcomeText}>Welcome to TranscribeMe</Text>
        <Image source={require('../../assets/icon.png')} style={styles.logo} />
        <TextInput
          style={styles.input}
          placeholder="Correo electrónico"
          placeholderTextColor="#aaa"
          value={email}
          onChangeText={(text) => setEmail(sanitizeEmail(text))}
          keyboardType="email-address"
          autoCapitalize="none"
        />
        <TextInput
          style={styles.input}
          placeholder="Contraseña"
          placeholderTextColor="#aaa"
          secureTextEntry={true}
          value={password}
          onChangeText={(text) => setPassword(sanitizePassword(text))}
        />
        <TouchableOpacity
          style={styles.loginButton}
          onPress={handleLogin}
        >
          <Text style={styles.buttonText}>Iniciar sesión</Text>
        </TouchableOpacity>
        <Text style={styles.textQuestion}>¿No tienes una cuenta? <Text style={styles.linkText} onPress={() => navigation.navigate("RegisterScreen")}>Regístrate</Text></Text>
      </View>
    </LinearGradient>
  );
};

export default LoginReg;
