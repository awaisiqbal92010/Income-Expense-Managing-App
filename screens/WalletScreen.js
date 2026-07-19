import React from 'react';
import { View, Text, StyleSheet, SafeAreaView, TouchableOpacity, ScrollView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { COLORS, SHADOWS } from '../theme/colors';

export default function WalletScreen({ navigation }) {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={28} color={COLORS.text} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>My Wallet</Text>
        <TouchableOpacity><Ionicons name="add-circle" size={28} color={COLORS.primary} /></TouchableOpacity>
      </View>

      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Premium Credit Card UI */}
        <View style={[styles.card, SHADOWS.premium]}>
          <View style={styles.cardTop}>
            <Ionicons name="hardware-chip" size={40} color="#FFD700" />
            <Text style={styles.cardType}>VISA</Text>
          </View>
          <Text style={styles.cardNumber}>**** **** **** 3456</Text>
          <View style={styles.cardBottom}>
            <View>
              <Text style={styles.cardLabel}>Card Holder</Text>
              <Text style={styles.cardValue}>Alex Carter</Text>
            </View>
            <View>
              <Text style={styles.cardLabel}>Expires</Text>
              <Text style={styles.cardValue}>12/28</Text>
            </View>
          </View>
        </View>

        <Text style={styles.sectionTitle}>Connected Accounts</Text>
        
        <View style={styles.accountItem}>
          <View style={styles.accountLeft}>
            <View style={[styles.iconBg, { backgroundColor: '#E5FAF4' }]}>
              <Ionicons name="business" size={24} color={COLORS.income} />
            </View>
            <View>
              <Text style={styles.accountName}>Chase Bank</Text>
              <Text style={styles.accountDesc}>Checking •••• 9876</Text>
            </View>
          </View>
          <Text style={styles.accountBalance}>$4,250.00</Text>
        </View>

        <View style={styles.accountItem}>
          <View style={styles.accountLeft}>
            <View style={[styles.iconBg, { backgroundColor: '#E8E5FF' }]}>
              <Ionicons name="logo-paypal" size={24} color={COLORS.primary} />
            </View>
            <View>
              <Text style={styles.accountName}>PayPal</Text>
              <Text style={styles.accountDesc}>alex.carter@example</Text>
            </View>
          </View>
          <Text style={styles.accountBalance}>$850.50</Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: COLORS.background, paddingHorizontal: 20 },
  header: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginTop: 20, marginBottom: 30 },
  headerTitle: { fontSize: 20, fontWeight: 'bold', color: COLORS.text },
  card: { backgroundColor: COLORS.secondary, borderRadius: 24, padding: 25, marginBottom: 30, overflow: 'hidden' },
  cardTop: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 30 },
  cardType: { color: '#FFF', fontSize: 22, fontWeight: 'bold', fontStyle: 'italic' },
  cardNumber: { color: '#FFF', fontSize: 22, letterSpacing: 2, marginBottom: 30, fontFamily: 'monospace' },
  cardBottom: { flexDirection: 'row', justifyContent: 'space-between' },
  cardLabel: { color: 'rgba(255,255,255,0.6)', fontSize: 12, marginBottom: 5 },
  cardValue: { color: '#FFF', fontSize: 16, fontWeight: 'bold', textTransform: 'uppercase' },
  sectionTitle: { fontSize: 18, fontWeight: 'bold', color: COLORS.text, marginBottom: 15 },
  accountItem: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', backgroundColor: COLORS.surface, padding: 15, borderRadius: 16, marginBottom: 15 },
  accountLeft: { flexDirection: 'row', alignItems: 'center' },
  iconBg: { width: 50, height: 50, borderRadius: 16, justifyContent: 'center', alignItems: 'center', marginRight: 15 },
  accountName: { fontSize: 16, fontWeight: '700', color: COLORS.text },
  accountDesc: { fontSize: 13, color: COLORS.textLight, marginTop: 4 },
  accountBalance: { fontSize: 16, fontWeight: 'bold', color: COLORS.text }
});