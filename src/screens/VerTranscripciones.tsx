import React, { useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import Header from '../components/Header';
import Footer from '../components/Footer';
import Icon from 'react-native-vector-icons/FontAwesome';
import { RouteProp } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import styles from '../styles/VerTranscripcionStyles';
import { RootStackParamList } from '../navigation/AppNavigator';
import CompartirQR from '../components/CompartirQR'; // Importación del componente

type VerTranscripcionesScreenNavigationProp = StackNavigationProp<RootStackParamList, "VerTranscripciones">;
type VerTranscripcionesRouteProp = RouteProp<RootStackParamList, "VerTranscripciones">;

type Props = {
  navigation: VerTranscripcionesScreenNavigationProp;
  route: VerTranscripcionesRouteProp;
};

const VerTranscripciones: React.FC<Props> = ({ route }) => {
  const { transcript } = route.params;
  const [modalVisible, setModalVisible] = useState(false);

  const toggleModal = () => {
    setModalVisible(!modalVisible);
  };

  return (
    <LinearGradient colors={['#5E9CFA', '#8A2BE2']} style={styles.container}>
      <Header />
      <ScrollView contentContainerStyle={styles.content}>
        <View style={styles.classInfoContainer}>
          <Text style={styles.classTitle}>{transcript.clas}</Text>
          <Text style={styles.classSubtitle}>Instructor: {transcript.teacher}</Text>
        </View>
        <View style={styles.transcriptionCard}>
          <Text style={styles.transcriptionTitle}>Transcripción</Text>
          <Text style={styles.transcriptionText}>{transcript.transcription}</Text>
        </View>
        <TouchableOpacity style={styles.shareButton} onPress={toggleModal}>
          <Icon name="qrcode" size={24} color="white" />
          <Text style={styles.shareButtonText}>Compartir QR</Text>
        </TouchableOpacity>
      </ScrollView>
      {modalVisible && (
        <CompartirQR
          visible={modalVisible}
          onClose={toggleModal}
          transcriptionData={transcript} // Pasando datos al modal
        />
      )}
      <Footer />
    </LinearGradient>
  );
};

export default VerTranscripciones;
