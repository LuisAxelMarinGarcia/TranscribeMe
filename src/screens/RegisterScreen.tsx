import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, ImageBackground, Image, Alert } from "react-native";
import { StackNavigationProp } from "@react-navigation/stack";
import { RootStackParamList } from "../navigation/AppNavigator";
import LinearGradient from 'react-native-linear-gradient';
import tw from "../styles/tailwind";
import { useUserStore } from '../store/UserStore';
import * as ImagePicker from 'react-native-image-picker';
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
  const [profileImage, setProfileImage] = useState<any>(null);
  const setUser = useUserStore((state) => state.set);

  const validateEmail = (email: string) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(String(email).toLowerCase());
  };

  const sanitizeInput = (input: string) => {
    return input.replace(/[<>"]/g, '').replace(/'/g, '');
  };

  const sanitizeEmailAndPassword = (input: string) => {
    return input.replace(/[<>"]/g, '').replace(/'/g, '').trim().toLowerCase();
  };

  const validatePasswordStrength = (password: string) => {
    const re = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{6,20}$/;
    return re.test(password);
  };

  const selectProfileImage = () => {
    ImagePicker.launchImageLibrary(
      {
        mediaType: 'photo',
      },
      (response: ImagePicker.ImagePickerResponse) => {
        if (response.didCancel) {
          console.log('User cancelled image picker');
        } else if (response.errorMessage) {
          console.log('ImagePicker Error: ', response.errorMessage);
        } else if (response.assets && response.assets.length > 0) {
          const selectedImage = response.assets[0];
          console.log('Selected Image:', selectedImage);
          if (selectedImage.uri) {
            setProfileImage(selectedImage);
          } else {
            Alert.alert("Error", "No se pudo seleccionar la imagen. Inténtalo de nuevo.");
          }
        }
      },
    );
  };

  const handleRegister = async () => {
    const sanitizedEmail = sanitizeEmailAndPassword(email);
    const sanitizedPassword = password.trim();
    const sanitizedName = sanitizeInput(name).trim();
    const sanitizedSurname = sanitizeInput(surname).trim();

    if (!validateEmail(sanitizedEmail)) {
      Alert.alert("Error en el registro", "Correo electrónico inválido");
      return;
    }

    if (!validatePasswordStrength(sanitizedPassword)) {
      Alert.alert("Error en el registro", "La contraseña debe tener entre 6 y 20 caracteres, incluyendo al menos una letra mayúscula, una letra minúscula y un número");
      return;
    }

    if (sanitizedName === "" || sanitizedSurname === "") {
      Alert.alert("Error en el registro", "El nombre y el apellido no pueden estar vacíos");
      return;
    }

    try {
      console.log("Iniciando registro...");
      const formData = new FormData();
      formData.append('email', sanitizedEmail);
      formData.append('password', sanitizedPassword);
      formData.append('name', sanitizedName);
      formData.append('surname', sanitizedSurname);
      if (profileImage) {
        formData.append('profile_image', {
          uri: profileImage.uri,
          name: profileImage.fileName || 'profile_image.jpg',
          type: profileImage.type || 'image/jpeg',
        } as any);
      }

      console.log("Enviando datos:", formData);

      const response = await fetch('https://transcribeme-usuarios.integrador.xyz:3003/users', {
        method: 'POST',
        headers: {
          'Content-Type': 'multipart/form-data',
        },
        body: formData,
      });

      console.log("Respuesta del servidor:", response);

      const responseText = await response.text();
      console.log("Texto de respuesta del servidor:", responseText);

      if (response.ok) {
        const responseData = JSON.parse(responseText);
        console.log("Datos de respuesta:", responseData);
        setUser({ email: sanitizedEmail });
        Alert.alert("Registro exitoso", "Usuario registrado correctamente");
        navigation.navigate("LoginReg");
      } else {
        console.log("Error en la respuesta:", responseText);
        Alert.alert("Error en el registro", "Hubo un problema al registrar el usuario");
      }
    } catch (error) {
      console.log("Error en el registro:", error);
      Alert.alert("Error en el registro", "Hubo un problema al registrar el usuario");
    }
  };

  return (
    <LinearGradient colors={['#5E9CFA', '#8A2BE2']} style={tw`flex-1`}>
      <View style={styles.imageBackground}>
        <ImageBackground source={require("../../assets/back2.png")} style={tw`w-full h-full`} />
        <Text style={styles.headerText}>TranscribeMe</Text>
        <View style={styles.logoContainer}>
          {profileImage ? (
            <Image source={{ uri: profileImage.uri }} style={styles.profileImage} />
          ) : (
            <Image source={require('../../assets/icon2.png')} style={styles.logo} />
          )}
        </View>
      </View>
      <View style={styles.registerContainer}>
        <View style={tw`w-full justify-center items-center`}>
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
          <Text style={styles.welcomeText}>Welcome to TranscribeMe register</Text>
          <View style={{ alignItems: 'center' }}>
            <TouchableOpacity onPress={selectProfileImage}>
              <Text style={styles.uploadButtonText}>Subir Foto de Perfil</Text>
            </TouchableOpacity>
          </View>
          <TextInput
            style={styles.input}
            placeholder="Correo electrónico"
            placeholderTextColor="#aaa"
            value={email}
            onChangeText={(text) => setEmail(sanitizeEmailAndPassword(text))}
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
      </View>
    </LinearGradient>
  );
};

export default RegisterScreen;
