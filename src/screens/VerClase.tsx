import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, ScrollView, Alert } from 'react-native';
import { RouteProp } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import Header from '../components/Header';
import Footer from '../components/Footer';
import styles from '../styles/VerClaseStyles';
import { RootStackParamList } from '../navigation/AppNavigator';
import LinearGradient from 'react-native-linear-gradient';
import Icon from 'react-native-vector-icons/FontAwesome';
import CompartirQR from '../components/CompartirQR';
import AsyncStorage from '@react-native-async-storage/async-storage';

type ViewTranscriptionsScreenNavigationProp = StackNavigationProp<RootStackParamList, 'ViewTranscriptions'>;
type ViewTranscriptionsScreenRouteProp = RouteProp<RootStackParamList, 'ViewTranscriptions'>;

type Props = {
  route: ViewTranscriptionsScreenRouteProp;
  navigation: ViewTranscriptionsScreenNavigationProp;
};

const ViewTranscriptionsScreen = ({ route, navigation }: Props): React.JSX.Element => {
  const { className, teacherName, classCode, numberOfStudents, classId } = route.params;
  const [transcriptions, setTranscriptions] = useState<any[]>([]);
  const [modalVisible, setModalVisible] = useState(false);

  useEffect(() => {
    const fetchTranscriptions = async () => {
      try {
        const token = await AsyncStorage.getItem('userToken');
        if (!token) {
          throw new Error('Token not found');
        }

        const myHeaders = {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        };

        const response = await fetch(`https://transcribeme-apigateway.integrador.xyz:3004/api/v1/transcription/${classId}`, {
          method: 'GET',
          headers: myHeaders,
        });

        if (response.ok) {
          const data = await response.json();
          setTranscriptions(data);
        } else {
          throw new Error('Failed to fetch transcriptions');
        }
      } catch (error) {
        console.error("Error fetching transcriptions:", error);
        Alert.alert("Error", "Error fetching transcriptions");
      }
    };

    fetchTranscriptions();
  }, [classId]);

  const toggleModal = () => {
    setModalVisible(!modalVisible);
  };

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
            onPress={() => navigation.navigate('VerTranscripciones', {
              transcript: transcription,
            })}
          >
            <View style={styles.transcriptTextContainer}>
              <Text style={styles.transcriptTitle}>Transcripción {index + 1}</Text>
            </View>
            <View style={styles.transcriptIcons}>
              <Icon name="calendar" size={20} color="gray" style={{ marginHorizontal: 5 }} />
              <TouchableOpacity onPress={toggleModal}>
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
            classId,
          })}
        >
          <Text style={styles.transcriptionButtonText}>Iniciar Transcripción</Text>
        </TouchableOpacity>
      </ScrollView>
      <CompartirQR visible={modalVisible} onClose={toggleModal} />
      <Footer />
    </LinearGradient>
  );
};

export default ViewTranscriptionsScreen;
