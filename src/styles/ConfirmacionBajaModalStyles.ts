import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContainer: {
    width: '80%',
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 20,
    alignItems: 'center',
  },
  closeButton: {
    position: 'absolute',
    top: 10,
    right: 10,
  },
  modalTitle: {
    fontFamily: 'K2D',
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  modalIcon: {
    marginBottom: 20,
  },
  modalMateria: {
    fontFamily: 'K2D',
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  modalText: {
    fontFamily: 'K2D',
    fontSize: 16,
    textAlign: 'center',
    marginBottom: 20,
  },
  modalConfirmText: {
    fontFamily: 'K2D',
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  confirmButton: {
    backgroundColor: '#8A2BE2',
    paddingVertical: 10,
    paddingHorizontal: 30,
    borderRadius: 5,
  },
  confirmButtonText: {
    fontFamily: 'K2D',
    color: 'white',
    fontSize: 16,
  },
});
