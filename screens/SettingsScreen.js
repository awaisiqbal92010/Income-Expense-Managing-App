import React, { useState } from 'react';
import { View, Text, StyleSheet, SafeAreaView, TouchableOpacity, Switch } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { COLORS } from '../theme/colors';

const SettingToggle = ({ icon, title, value, onValueChange }) => (
  <View style={styles.settingItem}>
    <View style={styles.settingLeft}>
      <View style={styles.iconBox}>
        <Ionicons name={icon} size={22} color={COLORS.primary} />
      </View>
      <Text style={styles.settingTitle}>{title}</Text>
    </View>
    <Switch value={value} onValueChange={onValueChange} trackColor={{ false: COLORS.border, true: COLORS.primary }} />
  </View>
);

export default function SettingsScreen({ navigation }) {
  const [notifications, setNotifications] = useState(true);
  const [darkMode, setDarkMode] = useState(false);
  const [faceId, setFaceId] = useState(true);

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}><Ionicons name="arrow-back" size={28} color={COLORS.text} /></TouchableOpacity>
        <Text style={styles.headerTitle}>Settings</Text>
        <View style={{ width: 28 }} />
      </View>

      <View style={styles.settingsGroup}>
        <Text style={styles.groupTitle}>Preferences</Text>
        <SettingToggle icon="notifications" title="Push Notifications" value={notifications} onValueChange={setNotifications} />
        <SettingToggle icon="moon" title="Dark Mode" value={darkMode} onValueChange={setDarkMode} />
      </View>

      <View style={styles.settingsGroup}>
        <Text style={styles.groupTitle}>Security</Text>
        <SettingToggle icon="scan" title="Face ID / Touch ID" value={faceId} onValueChange={setFaceId} />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: COLORS.background, paddingHorizontal: 20 },
  header: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginTop: 20, marginBottom: 30 },
  headerTitle: { fontSize: 20, fontWeight: 'bold', color: COLORS.text },
  settingsGroup: { marginBottom: 30 },
  groupTitle: { fontSize: 14, fontWeight: '600', color: COLORS.textLight, marginBottom: 15, marginLeft: 5 },
  settingItem: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', backgroundColor: COLORS.surface, padding: 15, borderRadius: 16, marginBottom: 10 },
  settingLeft: { flexDirection: 'row', alignItems: 'center' },
  iconBox: { width: 40, height: 40, borderRadius: 12, backgroundColor: 'rgba(74, 58, 255, 0.08)', justifyContent: 'center', alignItems: 'center', marginRight: 15 },
  settingTitle: { fontSize: 16, fontWeight: '500', color: COLORS.text }
});