import React, { useState, useContext } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, SafeAreaView, KeyboardAvoidingView } from 'react-native';
import { GlobalContext } from '../context/GlobalState';
import { COLORS } from '../theme/colors';

export default function AddScreen({ navigation }) {
  const { addTransaction } = useContext(GlobalContext);
  const [type, setType] = useState('expense');
  const [title, setTitle] = useState('');
  const [amount, setAmount] = useState('');
  const [category, setCategory] = useState('Food');

  const onSubmit = () => {
    if (!title || !amount) return;
    const newTransaction = {
      id: Math.floor(Math.random() * 100000),
      title,
      amount: +amount,
      type,
      category,
      date: new Date().toISOString().split('T')[0]
    };
    addTransaction(newTransaction);
    navigation.goBack();
  };

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.headerTitle}>Add Transaction</Text>

      <View style={styles.typeSelector}>
        <TouchableOpacity style={[styles.typeBtn, type === 'income' && styles.typeBtnActiveIncome]} onPress={() => setType('income')}>
          <Text style={[styles.typeText, type === 'income' && { color: '#FFF' }]}>Income</Text>
        </TouchableOpacity>
        <TouchableOpacity style={[styles.typeBtn, type === 'expense' && styles.typeBtnActiveExpense]} onPress={() => setType('expense')}>
          <Text style={[styles.typeText, type === 'expense' && { color: '#FFF' }]}>Expense</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.form}>
        <Text style={styles.label}>Amount</Text>
        <TextInput style={styles.input} placeholder="$0.00" keyboardType="numeric" value={amount} onChangeText={setAmount} placeholderTextColor={COLORS.textLight} />

        <Text style={styles.label}>Title</Text>
        <TextInput style={styles.input} placeholder="e.g. Groceries" value={title} onChangeText={setTitle} placeholderTextColor={COLORS.textLight} />

        <Text style={styles.label}>Category</Text>
        <TextInput style={styles.input} placeholder="e.g. Food, Work..." value={category} onChangeText={setCategory} placeholderTextColor={COLORS.textLight} />

        <TouchableOpacity style={styles.submitBtn} onPress={onSubmit}>
          <Text style={styles.submitBtnText}>Save Transaction</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: COLORS.background, paddingHorizontal: 20 },
  headerTitle: { fontSize: 24, fontWeight: 'bold', color: COLORS.text, textAlign: 'center', marginTop: 20, marginBottom: 30 },
  typeSelector: { flexDirection: 'row', backgroundColor: COLORS.surface, borderRadius: 16, padding: 5, marginBottom: 30 },
  typeBtn: { flex: 1, paddingVertical: 12, borderRadius: 12, alignItems: 'center' },
  typeBtnActiveIncome: { backgroundColor: COLORS.income },
  typeBtnActiveExpense: { backgroundColor: COLORS.expense },
  typeText: { fontSize: 16, fontWeight: '600', color: COLORS.textLight },
  form: { flex: 1 },
  label: { fontSize: 14, color: COLORS.textLight, marginBottom: 8, fontWeight: '500', marginLeft: 4 },
  input: { backgroundColor: COLORS.surface, borderRadius: 16, padding: 18, fontSize: 16, color: COLORS.text, marginBottom: 20 },
  submitBtn: { backgroundColor: COLORS.primary, borderRadius: 16, padding: 18, alignItems: 'center', marginTop: 20 },
  submitBtnText: { color: '#FFF', fontSize: 16, fontWeight: 'bold' }
});