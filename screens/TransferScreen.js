import React, { useState, useContext } from 'react';
import { View, Text, StyleSheet, SafeAreaView, TouchableOpacity, TextInput, Alert } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { GlobalContext } from '../context/GlobalState';
import { COLORS } from '../theme/colors';

export default function TransferScreen({ navigation }) {
  const { addTransaction } = useContext(GlobalContext);
  const [amount, setAmount] = useState('');
  const [recipient, setRecipient] = useState('');

  const handleSend = () => {
    if(!amount || !recipient) return;
    
    addTransaction({
      id: Math.floor(Math.random() * 100000),
      title: `Transfer to ${recipient}`,
      amount: +amount,
      type: 'expense',
      category: 'Transfer',
      date: new Date().toISOString().split('T')[0]
    });
    
    Alert.alert("Success", `Sent $${amount} to ${recipient}!`, [
      { text: "OK", onPress: () => navigation.navigate('Home') }
    ]);
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={28} color={COLORS.text} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Send Money</Text>
        <View style={{ width: 28 }} />
      </View>

      <View style={styles.content}>
        <View style={styles.inputGroup}>
          <Text style={styles.label}>Recipient Email or Tag</Text>
          <View style={styles.inputBox}>
            <Ionicons name="at" size={20} color={COLORS.textLight} style={styles.inputIcon} />
            <TextInput style={styles.input} placeholder="@username or email" value={recipient} onChangeText={setRecipient} placeholderTextColor={COLORS.textLight} />
          </View>
        </View>

        <View style={styles.amountGroup}>
          <Text style={styles.currencySign}>$</Text>
          <TextInput style={styles.amountInput} placeholder="0.00" keyboardType="numeric" value={amount} onChangeText={setAmount} placeholderTextColor={COLORS.border} autoFocus />
        </View>

        <TouchableOpacity style={[styles.sendBtn, (!amount || !recipient) && styles.sendBtnDisabled]} onPress={handleSend} disabled={!amount || !recipient}>
          <Text style={styles.sendBtnText}>Send Securely</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: COLORS.background, paddingHorizontal: 20 },
  header: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginTop: 20, marginBottom: 40 },
  headerTitle: { fontSize: 20, fontWeight: 'bold', color: COLORS.text },
  content: { flex: 1 },
  inputGroup: { marginBottom: 40 },
  label: { fontSize: 14, color: COLORS.textLight, fontWeight: '600', marginBottom: 10 },
  inputBox: { flexDirection: 'row', alignItems: 'center', backgroundColor: COLORS.surface, borderRadius: 16, paddingHorizontal: 15 },
  inputIcon: { marginRight: 10 },
  input: { flex: 1, paddingVertical: 18, fontSize: 16, color: COLORS.text },
  amountGroup: { flexDirection: 'row', justifyContent: 'center', alignItems: 'center', marginBottom: 50 },
  currencySign: { fontSize: 40, fontWeight: 'bold', color: COLORS.textLight, marginRight: 10 },
  amountInput: { fontSize: 60, fontWeight: 'bold', color: COLORS.text, minWidth: 150 },
  sendBtn: { backgroundColor: COLORS.primary, padding: 20, borderRadius: 16, alignItems: 'center' },
  sendBtnDisabled: { backgroundColor: COLORS.border },
  sendBtnText: { color: '#FFF', fontSize: 18, fontWeight: 'bold' }
});