import React from 'react';
import { View, Text, TouchableOpacity, Modal } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import QRCode from 'react-native-qrcode-svg';
import styles from '../styles/CompartirQRStyles';

type CompartirQRProps = {
  visible: boolean;
  onClose: () => void;
  transcriptionData: any; // Cambia 'any' al tipo adecuado según tu modelo de datos
};

const CompartirQR: React.FC<CompartirQRProps> = ({ visible, onClose, transcriptionData }) => {
  return (
    <Modal
      visible={visible}
      transparent={true}
      animationType="slide"
      onRequestClose={onClose}
    >
      <View style={styles.modalContainer}>
        <View style={styles.qrContainer}>
          <Text style={styles.qrTitle}>Compartir Transcripción</Text>
          <QRCode
            value={JSON.stringify(transcriptionData)}
            size={200}
            color="black"
            backgroundColor="white"
          />
          <TouchableOpacity style={styles.closeButton} onPress={onClose}>
            <Icon name="times" size={20} color="white" />
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

export default CompartirQR;
