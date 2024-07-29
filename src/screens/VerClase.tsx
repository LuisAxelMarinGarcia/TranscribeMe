import React from 'react';
import { ScrollView, View, Text, TouchableOpacity } from 'react-native';
import { RouteProp } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import Header from '../components/Header';
import Footer from '../components/Footer';
import styles from '../styles/VerClaseStyles';
import { RootStackParamList } from '../navigation/AppNavigator';
import LinearGradient from 'react-native-linear-gradient';
import Icon from 'react-native-vector-icons/FontAwesome';

type ViewTranscriptionsScreenNavigationProp = StackNavigationProp<RootStackParamList, 'ViewTranscriptions'>;
type ViewTranscriptionsScreenRouteProp = RouteProp<RootStackParamList, 'ViewTranscriptions'>;

type Props = {
  route: ViewTranscriptionsScreenRouteProp;
  navigation: ViewTranscriptionsScreenNavigationProp;
};

const transcriptions = [
  {
    title: 'Transcripción 1',
    author: 'Horacio Irán Solís Cisneros',
    date: '01/12/2003',
    image: require('../../assets/instructor1.png'), 
    description: 'Descripción de la transcripción 1.',
  },
  {
    title: 'Transcripción 2',
    author: 'Horacio Irán Solís Cisneros',
    date: '02/12/2003',
    image: require('../../assets/instructor2.png'), 
    description: 'Descripción de la transcripción 2.',
  },
];

const ViewTranscriptionsScreen = ({ route, navigation }: Props): React.JSX.Element => {
  const { className, teacherName, classCode, numberOfStudents } = route.params;

  return (
    <LinearGradient colors={['#5E9CFA', '#8A2BE2']} style={styles.container}>
      <Header />
      <ScrollView contentContainerStyle={styles.content}>
        <View style={styles.classInfoContainer}>
          <Text style={styles.classTitle}>{className}</Text>
          <Text style={styles.classSubtitle}>Instructor: {teacherName}</Text>
          <Text style={styles.classSubtitle}>Código de la clase: {classCode}</Text>
          <View style={styles.classDetails}>
            <Icon name="users" size={20} color="white" />
            <Text style={[styles.classSubtitle, { marginLeft: 5 }]}>{numberOfStudents} estudiantes</Text>
          </View>
        </View>
        {transcriptions.map((transcription, index) => (
          <TouchableOpacity 
            key={index} 
            style={styles.transcriptCard} 
            onPress={() => navigation.navigate('StartTranscription', {
              className,
              teacherName,
            })}
          >
            <View style={styles.transcriptTextContainer}>
              <Text style={styles.transcriptTitle}>{transcription.title}</Text>
              <Text style={styles.transcriptSubtitle}>{transcription.author}</Text>
            </View>
            <View style={styles.transcriptIcons}>
              <Text style={styles.transcriptDate}>{transcription.date}</Text>
              <Icon name="calendar" size={20} color="gray" style={{ marginHorizontal: 5 }} />
              <TouchableOpacity onPress={() => {/* Lógica para compartir QR */}}>
                <Icon name="share-alt" size={20} color="gray" />
              </TouchableOpacity>
            </View>
          </TouchableOpacity>
        ))}
        <TouchableOpacity 
          style={styles.transcriptionButton}
          onPress={() => navigation.navigate('StartTranscription', {
            className,
            teacherName,
          })}
        >
          <Text style={styles.transcriptionButtonText}>Iniciar Transcripción</Text>
        </TouchableOpacity>
      </ScrollView>
      <Footer />
    </LinearGradient>
  );
};

export default ViewTranscriptionsScreen;
