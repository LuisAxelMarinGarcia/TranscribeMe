import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, Image, Alert } from "react-native";
import { StackNavigationProp } from "@react-navigation/stack";
import { RootStackParamList } from "../navigation/AppNavigator";
import Header from '../components/Header';
import Footer from '../components/Footer';
import LinearGradient from 'react-native-linear-gradient';
import styles from '../styles/CreateStyles';

type CreateScreenNavigationProp = StackNavigationProp<RootStackParamList, "Create">;

type Props = {
  navigation: CreateScreenNavigationProp;
};

const Create: React.FC<Props> = ({ navigation }) => {
  const [name, setName] = useState("");
  const [grade, setGrade] = useState("");
  const [group, setGroup] = useState("");
  const [teacher, setTeacher] = useState("");

  const sanitizeInput = (input: string) => input.replace(/[<>]/g, '');

  const validateFields = () => {
    const sanitizedGrade = sanitizeInput(grade);
    const sanitizedName = sanitizeInput(name);
    const sanitizedGroup = sanitizeInput(group);
    const sanitizedTeacher = sanitizeInput(teacher);

    if (sanitizedName.length === 0 || sanitizedName.length > 50) {
      Alert.alert("Error", "El nombre de la clase debe tener entre 1 y 50 caracteres");
      return false;
    }

    const gradeNumber = parseInt(sanitizedGrade);
    if (isNaN(gradeNumber) || gradeNumber < 1 || gradeNumber > 12) {
      Alert.alert("Error", "El grado debe ser un número entre 1 y 12");
      return false;
    }

    if (sanitizedGroup.length === 0 || sanitizedGroup.length > 10) {
      Alert.alert("Error", "El grupo debe tener entre 1 y 10 caracteres");
      return false;
    }

    if (sanitizedTeacher.length === 0 || sanitizedTeacher.length > 50) {
      Alert.alert("Error", "El nombre del profesor debe tener entre 1 y 50 caracteres");
      return false;
    }

    return true;
  };

  const handleCreateClass = () => {
    if (validateFields()) {
      Alert.alert("Éxito", "Clase creada exitosamente");
      navigation.navigate('Home');
    }
  };

  return (
    <LinearGradient colors={['#5E9CFA', '#8A2BE2']} style={styles.container}>
      <Header />
      <View style={{ alignItems: "center" }}>
        <Image source={require("../../assets/create.png")} style={styles.illustration} />
      </View>
      <View style={styles.formContainer}>
        <Text style={styles.formHeader}>Crear clase</Text>
        <TextInput
          style={styles.input}
          placeholder="Nombre de la clase"
          placeholderTextColor="#aaa"
          value={name}
          onChangeText={setName}
        />
        <TextInput
          style={styles.input}
          placeholder="Grado"
          placeholderTextColor="#aaa"
          value={grade}
          onChangeText={setGrade}
        />
        <TextInput
          style={styles.input}
          placeholder="Grupo"
          placeholderTextColor="#aaa"
          value={group}
          onChangeText={setGroup}
        />
        <TextInput
          style={styles.input}
          placeholder="Profesor"
          placeholderTextColor="#aaa"
          value={teacher}
          onChangeText={setTeacher}
        />
        <TouchableOpacity style={styles.createButton} onPress={handleCreateClass}>
          <Text style={styles.createButtonText}>Crear</Text>
        </TouchableOpacity>
      </View>
      <Footer />
    </LinearGradient>
  );
};

export default Create;
