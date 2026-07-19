import React, { useContext } from 'react';
import { View, Text, StyleSheet, SafeAreaView, TouchableOpacity, ScrollView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { GlobalContext } from '../context/GlobalState';
import { COLORS } from '../theme/colors';

const SettingItem = ({ icon, title, color = COLORS.text, showArrow = true, onPress }) => (
  <TouchableOpacity style={styles.settingItem} activeOpacity={0.7} onPress={onPress}>
    <View style={styles.settingLeft}>
      <View style={styles.iconBox}>
        <Ionicons name={icon} size={22} color={color === COLORS.expense ? COLORS.expense : COLORS.primary} />
      </View>
      <Text style={[styles.settingTitle, { color }]}>{title}</Text>
    </View>
    {showArrow && <Ionicons name="chevron-forward" size={20} color={COLORS.textLight} />}
  </TouchableOpacity>
);

export default function ProfileScreen({ navigation }) {
  const { user, logout } = useContext(GlobalContext);

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: 100 }}>
        
        <Text style={styles.headerTitle}>Profile</Text>

        <View style={styles.profileHeader}>
          <View style={styles.avatar}>
            <Ionicons name="person" size={40} color={COLORS.primary} />
          </View>
          <Text style={styles.name}>{user?.name || 'Alex Carter'}</Text>
          <Text style={styles.email}>{user?.email || 'alex.carter@example.com'}</Text>
          <TouchableOpacity style={styles.editBtn} onPress={() => navigation.navigate('EditProfile')}>
            <Text style={styles.editBtnText}>Edit Profile</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.settingsGroup}>
          <Text style={styles.groupTitle}>Finance</Text>
          <SettingItem icon="wallet" title="My Wallet & Cards" onPress={() => navigation.navigate('Wallet')} />
          <SettingItem icon="send" title="Transfer Money" onPress={() => navigation.navigate('Transfer')} />
          <SettingItem icon="pie-chart" title="Manage Budgets" onPress={() => navigation.navigate('Budget')} />
        </View>

        <View style={styles.settingsGroup}>
          <Text style={styles.groupTitle}>General</Text>
          <SettingItem icon="settings" title="Settings" onPress={() => navigation.navigate('Settings')} />
          <SettingItem icon="lock-closed" title="Security & Privacy" onPress={() => {}} />
        </View>

        <View style={styles.settingsGroup}>
          <Text style={styles.groupTitle}>More</Text>
          <SettingItem icon="help-circle" title="Help & Support" onPress={() => {}} />
          <SettingItem icon="log-out" title="Log Out" color={COLORS.expense} showArrow={false} onPress={logout} />
        </View>

      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: COLORS.background },
  headerTitle: { fontSize: 24, fontWeight: 'bold', color: COLORS.text, marginTop: 20, textAlign: 'center', marginBottom: 20 },
  profileHeader: { alignItems: 'center', marginBottom: 30 },
  avatar: { width: 90, height: 90, borderRadius: 45, backgroundColor: COLORS.surface, justifyContent: 'center', alignItems: 'center', marginBottom: 15, shadowColor: '#000', shadowOffset: { width: 0, height: 4 }, shadowOpacity: 0.05, shadowRadius: 10, elevation: 3 },
  name: { fontSize: 22, fontWeight: 'bold', color: COLORS.text, marginBottom: 5 },
  email: { fontSize: 14, color: COLORS.textLight, marginBottom: 15 },
  editBtn: { paddingVertical: 8, paddingHorizontal: 20, backgroundColor: 'rgba(74, 58, 255, 0.1)', borderRadius: 20 },
  editBtnText: { color: COLORS.primary, fontWeight: '600' },
  settingsGroup: { paddingHorizontal: 20, marginBottom: 25 },
  groupTitle: { fontSize: 14, fontWeight: '600', color: COLORS.textLight, marginBottom: 10, marginLeft: 5 },
  settingItem: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', backgroundColor: COLORS.surface, padding: 15, borderRadius: 16, marginBottom: 10 },
  settingLeft: { flexDirection: 'row', alignItems: 'center' },
  iconBox: { width: 40, height: 40, borderRadius: 12, backgroundColor: 'rgba(74, 58, 255, 0.08)', justifyContent: 'center', alignItems: 'center', marginRight: 15 },
  settingTitle: { fontSize: 16, fontWeight: '500' }
});