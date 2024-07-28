import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    padding: 20,
  },
  bannerContainer: {
    position: 'relative',
    marginBottom: 20,
  },
  bannerImage: {
    width: '100%',
    height: 150,
    borderRadius: 10,
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  bannerText: {
    fontFamily: 'K2D',
    fontSize: 24,
    fontWeight: 'bold',
    color: 'white',
    textAlign: 'center',
  },
  table: {
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 15,
  },
  tableRow: {
    marginBottom: 15,
  },
  tableHeader: {
    fontFamily: 'K2D',
    fontSize: 16,
    fontWeight: 'bold',
    color: '#4C68D7',
    marginBottom: 5,
  },
  tableCell: {
    fontFamily: 'K2D',
    fontSize: 14,
    color: 'black',
    textAlign: 'justify',
  },
});
