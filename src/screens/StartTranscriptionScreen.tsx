import React, { useState, useEffect } from 'react';
import { SafeAreaView, View, Text, TouchableOpacity, Image } from 'react-native';
import { RouteProp, useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import Voice, { SpeechErrorEvent, SpeechResultsEvent } from '@react-native-community/voice';
import LinearGradient from 'react-native-linear-gradient';
import Header from '../components/Header';
import Footer from '../components/Footer';
import styles from '../styles/StartTranscriptionStyles';
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
  const { className, teacherName } = route.params;

  useEffect(() => {
    Voice.onSpeechStart = onSpeechStart;
    Voice.onSpeechEnd = onSpeechEnd;
    Voice.onSpeechError = onSpeechError;
    Voice.onSpeechResults = onSpeechResults;

    return () => {
      Voice.destroy().then(Voice.removeAllListeners);
    };
  }, []);

  const onSpeechStart = () => {
    setIsListening(true);
  };

  const onSpeechEnd = () => {
    setIsListening(false);
  };

  const onSpeechError = (e: SpeechErrorEvent) => {
    if (e.error) {
      console.error('Error en reconocimiento de voz: ', e.error.message || 'Unknown error');
    }
    setIsListening(false);
  };

  const onSpeechResults = (e: SpeechResultsEvent) => {
    setResults(e.value || []);
  };

  const handleStartListening = async () => {
    try {
      await Voice.start('es-ES');
      setIsListening(true);
    } catch (error) {
      console.error('Error al iniciar el reconocimiento de voz:', error);
      setIsListening(false);
    }
  };

  const handleStopListening = async () => {
    try {
      await Voice.stop();
      setIsListening(false);
    } catch (error) {
      console.error('Error al detener el reconocimiento de voz:', error);
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
        <View style={styles.transcriptionBox}>
          {results.map((result, index) => (
            <Text key={index} style={styles.resultText}>
              {result}
            </Text>
          ))}
        </View>
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
