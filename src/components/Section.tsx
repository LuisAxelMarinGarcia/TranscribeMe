// src/components/Section.tsx
import React from 'react';
import { Text, View } from 'react-native';
import { styles } from '../styles/globalStyles';

type SectionProps = {
  title: string;
  children: React.ReactNode;
};

const Section = ({ title, children }: SectionProps): React.JSX.Element => {
  return (
    <View style={styles.sectionContainer}>
      <Text style={styles.sectionTitle}>{title}</Text>
      <Text style={styles.sectionDescription}>{children}</Text>
    </View>
  );
};

export default Section;
