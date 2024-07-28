import React, { useState } from "react";
import { View, Text, Image, TouchableOpacity, ScrollView } from "react-native";
import { StackNavigationProp } from "@react-navigation/stack";
import { RootStackParamList } from "../navigation/AppNavigator";
import LinearGradient from 'react-native-linear-gradient';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Header from '../components/Header';
import Footer from '../components/Footer';
import styles from '../styles/ArchivoStyles';

type ArchivoScreenNavigationProp = StackNavigationProp<RootStackParamList, "Archivo">;

type Props = {
  navigation: ArchivoScreenNavigationProp;
};

const courses = [
  {
    id: '1',
    name: 'Matemáticas',
    teacher: 'Prof. Juan Pérez',
    number_of_students: 30,
    image: require('../../assets/instructor1.png'),
  },
  {
    id: '2',
    name: 'Historia',
    teacher: 'Prof. Ana Gómez',
    number_of_students: 25,
    image: require('../../assets/instructor2.png'),
  },
  // Add more courses as needed
];

const Archivo: React.FC<Props> = ({ navigation }) => {

  const handleUnarchive = (classId: string) => {
    // Logic to unarchive the class
    console.log("Desarchivar clase con ID:", classId);
  };

  return (
    <LinearGradient colors={['#5E9CFA', '#8A2BE2']} style={styles.container}>
      <Header />

      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <Text style={styles.title}>Clases Archivadas</Text>
        {courses.map((course) => (
          <View key={course.id} style={styles.courseCard}>
            <Text style={styles.courseTitle}>7B - {course.name}</Text>
            <Text style={styles.instructor}>{course.teacher}</Text>
            <View style={styles.courseFooter}>
              <Image source={course.image} style={styles.instructorImage} />
              <View style={styles.studentsContainer}>
                <FontAwesome name="users" size={16} color="black" />
                <Text style={styles.students}>{course.number_of_students}</Text>
              </View>
              <TouchableOpacity onPress={() => handleUnarchive(course.id)}>
                <Text style={{ color: "blue" }}>Desarchivar</Text>
              </TouchableOpacity>
            </View>
          </View>
        ))}
      </ScrollView>

      <Footer />
    </LinearGradient>
  );
};

export default Archivo;
