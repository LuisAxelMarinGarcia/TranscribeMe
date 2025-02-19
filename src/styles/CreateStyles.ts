import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "space-between",
    backgroundColor: '#5E9CFA',
  },
  formContainer: {
    margin: 20,
    backgroundColor: "#FFFFFF",
    borderRadius: 20,
    padding: 20,
  },
  formHeader: {
    fontFamily: "K2D",
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 10,
    textAlign: "center",
    color: "#333",
  },
  input: {
    fontFamily: "K2D",
    fontSize: 15,
    color: "black",
    width: "100%",
    borderWidth: 1,
    borderColor: "#ccc",
    padding: 10,
    borderRadius: 5,
    marginBottom: 10,
    backgroundColor: "#F5F5F5",
  },
  createButton: {
    backgroundColor: "#8A2BE2",
    paddingVertical: 12,
    borderRadius: 25,
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
  },
  createButtonText: {
    fontFamily: "K2D",
    color: "white",
    fontSize: 15,
  },
  illustration: {
    width: 150,
    height: 150,
    marginVertical: 20,
  },
});
