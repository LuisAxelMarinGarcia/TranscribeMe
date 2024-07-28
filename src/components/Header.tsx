import React, { useState } from 'react';
import { View, Text, TouchableOpacity, Modal, Animated, TouchableWithoutFeedback } from 'react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { useNavigation, NavigationProp } from '@react-navigation/native';
import { RootStackParamList } from '../navigation/AppNavigator';
import styles from '../styles/HeaderStyles';

const Header: React.FC = () => {
  const [menuVisible, setMenuVisible] = useState(false);
  const [menuAnimation] = useState(new Animated.Value(-250));
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();

  const toggleMenu = () => {
    if (menuVisible) {
      Animated.timing(menuAnimation, {
        toValue: -250,
        duration: 300,
        useNativeDriver: true,
      }).start(() => setMenuVisible(false));
    } else {
      setMenuVisible(true);
      Animated.timing(menuAnimation, {
        toValue: 0,
        duration: 300,
        useNativeDriver: true,
      }).start();
    }
  };

  return (
    <>
      <View style={styles.header}>
        <TouchableOpacity onPress={toggleMenu}>
          <FontAwesome name="bars" size={24} color="white" style={styles.menuIcon} />
        </TouchableOpacity>
        <Text style={styles.headerText}>TranscribeMe</Text>
        <FontAwesome name="user-circle" size={24} color="white" style={styles.profileIcon} />
      </View>

      <Modal
        transparent={true}
        visible={menuVisible}
        animationType="none"
        onRequestClose={toggleMenu}
      >
        <TouchableWithoutFeedback onPress={toggleMenu}>
          <View style={styles.modalOverlay}>
            <Animated.View style={[styles.menu, { transform: [{ translateX: menuAnimation }] }]}>
              <TouchableOpacity style={styles.menuItem} onPress={() => { toggleMenu(); navigation.navigate('Archivo'); }}>
                <MaterialIcons name="archive" size={20} color="black" style={styles.menuIcon} />
                <Text style={styles.menuItemText}>Clases Archivadas</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.menuItem} onPress={() => { toggleMenu(); navigation.navigate('Create'); }}>
                <Ionicons name="create-outline" size={20} color="black" style={styles.menuIcon} />
                <Text style={styles.menuItemText}>Crear Clase</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.menuItem} onPress={() => { toggleMenu(); navigation.navigate('SolicitudesBajas'); }}>
                <FontAwesome name="file-text" size={20} color="black" style={styles.menuIcon} />
                <Text style={styles.menuItemText}>Solicitudes de bajas</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.menuItem} onPress={() => { toggleMenu(); navigation.navigate('AvisoPrivacidad'); }}>
                <FontAwesome name="file" size={20} color="black" style={styles.menuIcon} />
                <Text style={styles.menuItemText}>Aviso de privacidad</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.menuItem} onPress={() => { toggleMenu(); navigation.navigate('Home'); }}>
                <FontAwesome name="sign-out" size={20} color="black" style={styles.menuIcon} />
                <Text style={styles.menuItemText}>Cerrar Sesion</Text>
              </TouchableOpacity>
            </Animated.View>
          </View>
        </TouchableWithoutFeedback>
      </Modal>
    </>
  );
};

export default Header;
