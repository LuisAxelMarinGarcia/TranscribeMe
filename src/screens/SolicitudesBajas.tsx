import React, { useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity } from 'react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Header from '../components/Header';
import Footer from '../components/Footer';
import ConfirmacionBajaModal from '../components/ConfirmacionBajaModal';
import LinearGradient from 'react-native-linear-gradient';
import styles from '../styles/SolicitudesBajasStyles';

interface Solicitud {
  id: number;
  alumno: string;
  materia: string;
}

const solicitudes: Solicitud[] = [
  { id: 1, alumno: 'José Manuel Galindo González', materia: 'Matemáticas discretas - 7B' },
  { id: 2, alumno: 'José Manuel Galindo González', materia: 'Matemáticas discretas - 7B' },
  { id: 3, alumno: 'José Manuel Galindo González', materia: 'Matemáticas discretas - 7B' },
  { id: 4, alumno: 'José Manuel Galindo González', materia: 'Matemáticas discretas - 7B' },
  { id: 5, alumno: 'José Manuel Galindo González', materia: 'Matemáticas discretas - 7B' },
];

const SolicitudesBajas: React.FC = () => {
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedSolicitud, setSelectedSolicitud] = useState<Solicitud | null>(null);

  const openModal = (solicitud: Solicitud) => {
    setSelectedSolicitud(solicitud);
    setModalVisible(true);
  };

  const closeModal = () => {
    setModalVisible(false);
    setSelectedSolicitud(null);
  };

  const confirmBaja = () => {
    console.log('Baja confirmada para:', selectedSolicitud);
    closeModal();
  };

  return (
    <LinearGradient colors={['#5E9CFA', '#8A2BE2']} style={styles.container}>
      <Header />
      <ScrollView contentContainerStyle={styles.content}>
        <Text style={styles.title}>Solicitudes de Bajas de Alumnos</Text>
        {solicitudes.map((solicitud) => (
          <View key={solicitud.id} style={styles.solicitudCard}>
            <Text style={styles.solicitudText}><FontAwesome name="user" size={16} /> Alumno: {solicitud.alumno}</Text>
            <Text style={styles.solicitudText}><FontAwesome name="book" size={16} /> Materia: {solicitud.materia}</Text>
            <View style={styles.actionButtons}>
              <TouchableOpacity style={styles.rejectButton}>
                <FontAwesome name="times" size={24} color="white" />
              </TouchableOpacity>
              <TouchableOpacity style={styles.acceptButton} onPress={() => openModal(solicitud)}>
                <FontAwesome name="check" size={24} color="white" />
              </TouchableOpacity>
            </View>
          </View>
        ))}
        <Text style={styles.subtitle}>Ayer</Text>
        {solicitudes.map((solicitud) => (
          <View key={solicitud.id + 5} style={styles.solicitudCard}>
            <Text style={styles.solicitudText}><FontAwesome name="user" size={16} /> Alumno: {solicitud.alumno}</Text>
            <Text style={styles.solicitudText}><FontAwesome name="book" size={16} /> Materia: {solicitud.materia}</Text>
            <View style={styles.actionButtons}>
              <TouchableOpacity style={styles.rejectButton}>
                <FontAwesome name="times" size={24} color="white" />
              </TouchableOpacity>
              <TouchableOpacity style={styles.acceptButton} onPress={() => openModal(solicitud)}>
                <FontAwesome name="check" size={24} color="white" />
              </TouchableOpacity>
            </View>
          </View>
        ))}
      </ScrollView>
      <Footer />
      {selectedSolicitud && (
        <ConfirmacionBajaModal
          visible={modalVisible}
          onClose={closeModal}
          onConfirm={confirmBaja}
          solicitud={selectedSolicitud}
        />
      )}
    </LinearGradient>
  );
};

export default SolicitudesBajas;
