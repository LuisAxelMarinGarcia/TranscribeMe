import React, { useState, useEffect } from 'react';
import { SafeAreaView, View, Text, TouchableOpacity, Image, ScrollView, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Voice, { SpeechErrorEvent, SpeechResultsEvent } from '@react-native-community/voice';
import LinearGradient from 'react-native-linear-gradient';
import Header from '../components/Header';
import Footer from '../components/Footer';
import styles from '../styles/StartTranscriptionStyles';
import { RouteProp } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import levenshtein from 'fast-levenshtein';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { RootStackParamList } from '../navigation/AppNavigator';

type StartTranscriptionScreenNavigationProp = StackNavigationProp<RootStackParamList, 'StartTranscription'>;
type StartTranscriptionScreenRouteProp = RouteProp<RootStackParamList, 'StartTranscription'>;

type Props = {
  route: StartTranscriptionScreenRouteProp;
  navigation: StartTranscriptionScreenNavigationProp;
};

const StartTranscriptionScreen = ({ route, navigation }: Props) => {
  const [isListening, setIsListening] = useState(false);
  const [results, setResults] = useState<string[]>([]);
  const { className, teacherName, classId } = route.params;

  useEffect(() => {
    const onSpeechStart = () => setIsListening(true);
    const onSpeechEnd = () => setIsListening(false);
    const onSpeechError = (e: SpeechErrorEvent) => {
      console.error('Speech error:', e.error);
      setIsListening(false);
    };
    const onSpeechResults = (e: SpeechResultsEvent) => {
      const speechResults = e.value ?? [];
      setResults(prevResults => {
        const newResults = speechResults.filter(result => {
          const similarExists = prevResults.some(prevResult => areSimilar(prevResult, result));
          return !similarExists;
        });
        return [...prevResults, ...newResults];
      });
    };

    Voice.onSpeechStart = onSpeechStart;
    Voice.onSpeechEnd = onSpeechEnd;
    Voice.onSpeechError = onSpeechError;
    Voice.onSpeechResults = onSpeechResults;

    return () => {
      Voice.destroy().then(Voice.removeAllListeners);
    };
  }, []);

  const normalizeText = (text: string) => text.trim().toLowerCase().replace(/[^a-z0-9]/gi, '');
  
  const areSimilar = (str1: string, str2: string) => {
    const normalized1 = normalizeText(str1);
    const normalized2 = normalizeText(str2);
    const distance = levenshtein.get(normalized1, normalized2);
    const longerLength = Math.max(normalized1.length, normalized2.length);
    return distance / longerLength < 0.25;
  };

  const handleStartListening = async () => {
    try {
      await Voice.start('es-ES');
      setIsListening(true);
    } catch (error) {
      console.error('Error starting listening:', error);
      setIsListening(false);
    }
  };

  const handleStopListening = async () => {
    try {
      await Voice.stop();
      setIsListening(false);
    } catch (error) {
      console.error('Error stopping listening:', error);
    }
  };
  const handleSaveTranscription = async () => {
    if (results.length === 0) {
      Alert.alert('Error', 'No hay transcripción para guardar');
      return;
    }
  
    const transcriptionData = {
      teacher: teacherName,
      clas: className,
      class_id: classId,
      transcription: results.join(' '),
    };
  
    try {
      const token = await AsyncStorage.getItem('userToken');
      if (!token) {
        throw new Error('Token no encontrado');
      }
  
      const response = await fetch('https://transcribeme-transcripciones.integrador.xyz:3001/transcription', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(transcriptionData)
      });
  
      if (response.ok) {
        Alert.alert('Éxito', 'Transcripción guardada correctamente');
      } else {
        const responseText = await response.text();
        Alert.alert('Error', `Error al guardar la transcripción: ${responseText}`);
      }
    } catch (error) {
      console.error('Error en la transcripción:', error);
  
      if (error instanceof TypeError && error.message.includes('Network request failed')) {
        // No mostramos alerta de error de red si se asume que la transcripción se guardó correctamente.
        console.warn('Transcripción guardada, pero error de red ocurrió:', error.message);
      } else {
        // Mostrar errores distintos a errores de red.
        Alert.alert('Error', 'Ocurrió un error al guardar la transcripción');
      }
    }
  };
  

  return (
    <LinearGradient colors={['#5E9CFA', '#8A2BE2']} style={styles.container}>
      <Header />
      <SafeAreaView style={styles.content}>
        <Text style={styles.courseTitle}>Transcripción en Vivo</Text>
        <Text style={styles.courseTitle}>{className}</Text>
        <View style={styles.instructorContainer}>
          <Image source={require('../../assets/instructor1.png')} style={styles.instructorImage} />
          <View>
            <Text style={styles.instructorName}>{teacherName}</Text>
            <Text style={styles.instructorName}>ID de la clase: {classId}</Text>
          </View>
        </View>
        <Image source={require('../../assets/voice-recorder.png')} style={styles.recorderImage} />
        <ScrollView style={styles.transcriptionBox}>
          {results.length > 0 ? (
            results.map((result, index) => (
              <Text key={index} style={styles.resultText}>
                {result}
              </Text>
            ))
          ) : (
            <Text style={styles.resultText}>No results</Text>
          )}
        </ScrollView>
        <View style={styles.buttonsContainer}>
          <TouchableOpacity
            style={[styles.button, styles.startButton]}
            onPress={handleStartListening}
            disabled={isListening}
          >
            <FontAwesome name="microphone" size={20} color="white" />
            <Text style={styles.buttonText}>Comenzar</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.button, styles.stopButton]}
            onPress={handleStopListening}
            disabled={!isListening}
          >
            <FontAwesome name="microphone-slash" size={20} color="white" />
            <Text style={styles.buttonText}>Detener</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.button, styles.saveButton]}
            onPress={handleSaveTranscription}
          >
            <MaterialIcons name="save" size={20} color="white" />
            <Text style={styles.buttonText}>Guardar</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
      <Footer />
    </LinearGradient>
  );
};

export default StartTranscriptionScreen;
