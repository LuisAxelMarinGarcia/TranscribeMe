import React, { useState, useEffect } from 'react';
import { SafeAreaView, View, Text, TouchableOpacity, Image, ScrollView } from 'react-native';
import { RouteProp } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import Voice, { SpeechErrorEvent, SpeechResultsEvent } from '@react-native-community/voice';
import LinearGradient from 'react-native-linear-gradient';
import Header from '../components/Header';
import Footer from '../components/Footer';
import styles from '../styles/StartTranscriptionStyles';
import { RootStackParamList } from '../navigation/AppNavigator';
import levenshtein from 'fast-levenshtein';

type StartTranscriptionScreenNavigationProp = StackNavigationProp<RootStackParamList, 'StartTranscription'>;
type StartTranscriptionScreenRouteProp = RouteProp<RootStackParamList, 'StartTranscription'>;

type Props = {
  route: StartTranscriptionScreenRouteProp;
  navigation: StartTranscriptionScreenNavigationProp;
};

const StartTranscriptionScreen = ({ route, navigation }: Props) => {
  const [isListening, setIsListening] = useState(false);
  const [results, setResults] = useState<string[]>([]);
  const { className, teacherName } = route.params;

  useEffect(() => {
    const onSpeechStart = () => {
      console.log('Speech start');
      setIsListening(true);
    };
    const onSpeechEnd = () => {
      console.log('Speech end');
      setIsListening(false);
    };
    const onSpeechError = (e: SpeechErrorEvent) => {
      console.error('Speech error:', e.error);
      setIsListening(false);
    };
    const onSpeechResults = (e: SpeechResultsEvent) => {
      console.log('Speech results event:', e);
      const speechResults = e.value ?? [];
      setResults(prevResults => {
        console.log('Previous results:', prevResults);
        // Filtrar resultados similares y seleccionar el más representativo
        const newResults = speechResults.filter((result) => {
          const similarExists = prevResults.some(prevResult => areSimilar(prevResult, result));
          return !similarExists;
        });
        
        console.log('New results:', newResults);
        return [...prevResults, ...newResults];
      });
    };

    // Asignar los eventos de Voice
    Voice.onSpeechStart = onSpeechStart;
    Voice.onSpeechEnd = onSpeechEnd;
    Voice.onSpeechError = onSpeechError;
    Voice.onSpeechResults = onSpeechResults;

    // Limpieza de eventos al desmontar el componente
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
    return distance / longerLength < 0.25; // Considera similar si el 25% o menos de los caracteres son diferentes
  };

  const handleStartListening = async () => {
    try {
      await Voice.start('es-ES');
      setIsListening(true);
      console.log('Listening started');
    } catch (error) {
      console.error('Error starting listening:', error);
      setIsListening(false);
    }
  };

  const handleStopListening = async () => {
    try {
      await Voice.stop();
      setIsListening(false);
      console.log('Listening stopped');
    } catch (error) {
      console.error('Error stopping listening:', error);
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
          <Text style={styles.instructorName}>{teacherName}</Text>
          <Text style={styles.liveText}>• En Vivo</Text>
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
            style={styles.startButton}
            onPress={handleStartListening}
            disabled={isListening}
          >
            <Text style={styles.startButtonText}>Comenzar</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.stopButton}
            onPress={handleStopListening}
            disabled={!isListening}
          >
            <Text style={styles.stopButtonText}>Detener</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
      <Footer />
    </LinearGradient>
  );
};

export default StartTranscriptionScreen;
