// src/styles/globalStyles.ts
import { StyleSheet } from 'react-native';

export const Colors = {
  white: '#FFFFFF',
  black: '#000000',
  light: '#F3F4F6',
  dark: '#1F2937',
  darker: '#111827',
  lighter: '#E5E7EB',
};

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
  },
  highlight: {
    fontWeight: '700',
  },
});
