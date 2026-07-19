import React, { useState, useContext } from 'react';
import { View, Text, StyleSheet, SafeAreaView, TouchableOpacity, TextInput } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { GlobalContext } from '../context/GlobalState';
import { COLORS } from '../theme/colors';

export default function EditProfileScreen({ navigation }) {
  const { user } = useContext(GlobalContext);
  const [name, setName] = useState(user?.name || 'Alex Carter');
  const [phone, setPhone] = useState('+1 234 567 890');

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}><Ionicons name="arrow-back" size={28} color={COLORS.text} /></TouchableOpacity>
        <Text style={styles.headerTitle}>Edit Profile</Text>
        <TouchableOpacity onPress={() => navigation.goBack()}><Text style={styles.saveText}>Save</Text></TouchableOpacity>
      </View>

      <View style={styles.avatarSection}>
        <View style={styles.avatar}>
          <Ionicons name="person" size={50} color={COLORS.primary} />
          <TouchableOpacity style={styles.cameraBadge}>
            <Ionicons name="camera" size={16} color="#FFF" />
          </TouchableOpacity>
        </View>
      </View>

      <View style={styles.form}>
        <Text style={styles.label}>Full Name</Text>
        <TextInput style={styles.input} value={name} onChangeText={setName} />

        <Text style={styles.label}>Email Address (Read Only)</Text>
        <TextInput style={[styles.input, { color: COLORS.textLight }]} value={user?.email || 'alex.carter@example.com'} editable={false} />

        <Text style={styles.label}>Phone Number</Text>
        <TextInput style={styles.input} value={phone} onChangeText={setPhone} keyboardType="phone-pad" />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: COLORS.background, paddingHorizontal: 20 },
  header: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginTop: 20, marginBottom: 30 },
  headerTitle: { fontSize: 20, fontWeight: 'bold', color: COLORS.text },
  saveText: { color: COLORS.primary, fontSize: 16, fontWeight: 'bold' },
  avatarSection: { alignItems: 'center', marginBottom: 30 },
  avatar: { width: 100, height: 100, borderRadius: 50, backgroundColor: COLORS.surface, justifyContent: 'center', alignItems: 'center', position: 'relative' },
  cameraBadge: { position: 'absolute', bottom: 0, right: 0, backgroundColor: COLORS.primary, width: 32, height: 32, borderRadius: 16, justifyContent: 'center', alignItems: 'center', borderWidth: 3, borderColor: COLORS.background },
  form: { flex: 1 },
  label: { fontSize: 14, color: COLORS.textLight, fontWeight: '600', marginBottom: 8, marginLeft: 5 },
  input: { backgroundColor: COLORS.surface, padding: 18, borderRadius: 16, fontSize: 16, color: COLORS.text, marginBottom: 20 }
});