import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { COLORS } from '../theme/colors';

const getCategoryIcon = (category) => {
  const icons = {
    Food: 'fast-food', Work: 'briefcase', Entertainment: 'tv', Transportation: 'car', Default: 'wallet'
  };
  return icons[category] || icons['Default'];
};

export default function TransactionCard({ transaction }) {
  const isIncome = transaction.type === 'income';

  return (
    <TouchableOpacity style={styles.card} activeOpacity={0.7}>
      <View style={styles.left}>
        <View style={[styles.iconContainer, { backgroundColor: isIncome ? COLORS.incomeBg : COLORS.expenseBg }]}>
          <Ionicons name={getCategoryIcon(transaction.category)} size={24} color={isIncome ? COLORS.income : COLORS.expense} />
        </View>
        <View style={styles.details}>
          <Text style={styles.title}>{transaction.title}</Text>
          <Text style={styles.category}>{transaction.category}</Text>
        </View>
      </View>
      <Text style={[styles.amount, { color: isIncome ? COLORS.income : COLORS.expense }]}>
        {isIncome ? '+' : '-'}${transaction.amount.toFixed(2)}
      </Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center',
    backgroundColor: COLORS.surface, padding: 16, marginBottom: 12,
    borderRadius: 20, shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.03, shadowRadius: 8, elevation: 2,
  },
  left: { flexDirection: 'row', alignItems: 'center' },
  iconContainer: { width: 50, height: 50, borderRadius: 25, justifyContent: 'center', alignItems: 'center', marginRight: 15 },
  details: { justifyContent: 'center' },
  title: { fontSize: 16, fontWeight: '700', color: COLORS.text, marginBottom: 4 },
  category: { fontSize: 13, color: COLORS.textLight, fontWeight: '500' },
  amount: { fontSize: 16, fontWeight: 'bold' }
});