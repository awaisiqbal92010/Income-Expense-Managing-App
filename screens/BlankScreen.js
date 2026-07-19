import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { COLORS } from '../theme/colors';
import { Ionicons } from '@expo/vector-icons';

export default function BlankScreen({ route }) {
  return (
    <View style={styles.container}>
      <Ionicons name="construct" size={60} color={COLORS.primary} />
      <Text style={styles.title}>{route.name} Screen</Text>
      <Text style={styles.subtitle}>Ask the AI for the code for this screen next!</Text>
    </View>
  );
}
const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: COLORS.background },
  title: { fontSize: 24, fontWeight: 'bold', color: COLORS.text, marginTop: 15 },
  subtitle: { fontSize: 16, color: COLORS.textLight, marginTop: 10 }
});