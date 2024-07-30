import React, { useState, useEffect } from 'react';
import { View, Text, Alert, ScrollView, TouchableOpacity, Image } from 'react-native';
import { useNavigation, NavigationProp } from '@react-navigation/native';
import LinearGradient from 'react-native-linear-gradient';
import Header from '../components/Header';
import Footer from '../components/Footer';
import styles from '../styles/HomeStyles';
import { RootStackParamList } from '../navigation/AppNavigator';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Icon from 'react-native-vector-icons/FontAwesome';

const HomeScreen = (): React.JSX.Element => {
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();
  const [courses, setCourses] = useState<any[]>([]);

  const fetchClasses = async () => {
    try {
      const userId = await AsyncStorage.getItem('userId');
      const token = await AsyncStorage.getItem('userToken');

      if (!userId || !token) {
        throw new Error('User ID or token not found');
      }

      const response = await fetch(`https://transcribeme-apigateway.integrador.xyz:3004/api/v1/list-users-classes/${userId}`, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });

      if (response.ok) {
        const data = await response.json();
        const classIds = data.map((item: any) => ({ class_id: item.class_id }));

        const classesResponse = await fetch(`https://transcribeme-apigateway.integrador.xyz:3004/api/v1/alumno-no-archivado/users-classes/status`, {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(classIds),
        });

        if (classesResponse.ok) {
          const classesData = await classesResponse.json();
          setCourses(classesData);
        } else {
          const errorText = await classesResponse.text();
          throw new Error('Failed to fetch classes');
        }
      } else {
        const errorText = await response.text();
        throw new Error('Failed to fetch class IDs');
      }
    } catch (error) {
      console.error("Error fetching classes:", error);
      Alert.alert("Error", "Error fetching classes");
    }
  };

  useEffect(() => {
    fetchClasses();
    const unsubscribe = navigation.addListener('focus', () => {
      fetchClasses();
    });
    return unsubscribe;
  }, []);

  const handleArchiveClass = async (classId: string) => {
    try {
      const token = await AsyncStorage.getItem('userToken');
      if (!token) {
        throw new Error('Token not found');
      }

      const response = await fetch(`https://transcribeme-apigateway.integrador.xyz:3004/api/v1/class/status/${classId}`, {
        method: 'PUT',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ status: 'archivado' }),
      });

      if (response.ok) {
        Alert.alert("Éxito", "Clase archivada exitosamente");
        fetchClasses();
      } else {
        const errorText = await response.text();
        throw new Error('Failed to archive class');
      }
    } catch (error) {
      console.error("Error archiving class:", error);
      Alert.alert("Error", "Error archiving class");
    }
  };

  return (
    <LinearGradient colors={['#5E9CFA', '#8A2BE2']} style={styles.container}>
      <Header />
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <Text style={styles.title}>Materias</Text>
        {courses.map((course, index) => (
          <View key={index} style={styles.courseCard}>
            <TouchableOpacity 
              onPress={() => navigation.navigate('ViewTranscriptions', { 
                className: course.name, 
                teacherName: course.teacher, 
                classCode: course.code, // Usar 'code' en lugar de 'id'
                numberOfStudents: course.number_of_students,
                classId: course.id, // Añadir ID de la clase
              })}
            >
              <Text style={styles.courseTitle}>{course.grade}B - {course.name}</Text>
              <Text style={styles.instructor}>{course.teacher}</Text>
              <View style={styles.courseFooter}>
                <Image source={require('../../assets/instructor1.png')} style={styles.instructorImage} />
                <View style={styles.studentsContainer}>
                  <Icon name="users" size={16} color="black" />
                  <Text style={styles.students}>{`${course.number_of_students} estudiantes`}</Text>
                </View>
              </View>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => handleArchiveClass(course.id)}>
              <Text style={styles.archiveButton}>Archivar clase</Text>
            </TouchableOpacity>
          </View>
        ))}
      </ScrollView>
      <Footer />
    </LinearGradient>
  );
};

export default HomeScreen;
