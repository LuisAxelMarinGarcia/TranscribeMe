import React from 'react';
import { ScrollView, View, Text, Image, TouchableOpacity } from 'react-native';
import { useNavigation, NavigationProp } from '@react-navigation/native';
import LinearGradient from 'react-native-linear-gradient';
import Header from '../components/Header';
import Footer from '../components/Footer';
import styles from '../styles/HomeStyles';
import { RootStackParamList } from '../navigation/AppNavigator';
import Icon from 'react-native-vector-icons/FontAwesome';

const classes = [
  {
    title: 'Minería de datos',
    instructor: 'Horacio Irán Solís Cisneros',
    students: 22,
    image: require('../../assets/instructor1.png'),
  },
  {
    title: 'Compiladores e intérpretes',
    instructor: 'Diana Beatriz Vazquez',
    students: 32,
    image: require('../../assets/instructor2.png'),
  },
];

const HomeScreen = (): React.JSX.Element => {
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();

  return (
    <LinearGradient colors={['#5E9CFA', '#8A2BE2']} style={styles.container}>
      <Header />
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <Text style={styles.title}>Materias</Text>
        {classes.map((cls, index) => (
          <View key={index} style={styles.courseCard}>
            <TouchableOpacity onPress={() => navigation.navigate('ViewTranscriptions', { className: cls.title })}>
              <Text style={styles.courseTitle}>{cls.title}</Text>
              <Text style={styles.instructor}>{cls.instructor}</Text>
              <View style={styles.courseFooter}>
                <Image source={cls.image} style={styles.instructorImage} />
                <View style={styles.studentsContainer}>
                  <Icon name="users" size={16} color="black" />
                  <Text style={styles.students}>{`${cls.students} estudiantes`}</Text>
                </View>
              </View>
            </TouchableOpacity>
            <TouchableOpacity>
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
