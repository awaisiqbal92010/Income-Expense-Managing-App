import React, { useContext } from 'react';
import { View, Text, StyleSheet, SafeAreaView, ScrollView } from 'react-native';
import { GlobalContext } from '../context/GlobalState';
import { COLORS, SHADOWS } from '../theme/colors';
import { Ionicons } from '@expo/vector-icons';

export default function StatsScreen() {
  const { transactions } = useContext(GlobalContext);

  // Calculate expenses by category
  const expenses = transactions.filter(t => t.type === 'expense');
  const totalExpense = expenses.reduce((acc, item) => acc + item.amount, 0);
  
  const categoryTotals = expenses.reduce((acc, item) => {
    acc[item.category] = (acc[item.category] || 0) + item.amount;
    return acc;
  }, {});

  // Sort categories by highest expense
  const sortedCategories = Object.keys(categoryTotals)
    .map(key => ({ category: key, amount: categoryTotals[key] }))
    .sort((a, b) => b.amount - a.amount);

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.headerTitle}>Analytics</Text>

      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: 120 }}>
        
        <View style={[styles.summaryCard, SHADOWS.card]}>
          <Text style={styles.summaryLabel}>Total Spent This Month</Text>
          <Text style={styles.summaryAmount}>${totalExpense.toFixed(2)}</Text>
        </View>

        <Text style={styles.sectionTitle}>Expense Breakdown</Text>

        {sortedCategories.length === 0 ? (
          <Text style={styles.emptyText}>No expenses to analyze yet.</Text>
        ) : (
          sortedCategories.map((item, index) => {
            const percentage = totalExpense > 0 ? (item.amount / totalExpense) * 100 : 0;
            return (
              <View key={index} style={styles.statRow}>
                <View style={styles.statHeader}>
                  <Text style={styles.statCategory}>{item.category}</Text>
                  <Text style={styles.statAmount}>${item.amount.toFixed(2)}</Text>
                </View>
                <View style={styles.progressBarBg}>
                  <View style={[styles.progressBarFill, { width: `${percentage}%` }]} />
                </View>
                <Text style={styles.statPercentage}>{percentage.toFixed(1)}%</Text>
              </View>
            );
          })
        )}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: COLORS.background, paddingHorizontal: 20 },
  headerTitle: { fontSize: 24, fontWeight: 'bold', color: COLORS.text, marginTop: 20, marginBottom: 20, textAlign: 'center' },
  summaryCard: { backgroundColor: COLORS.surface, padding: 25, borderRadius: 24, alignItems: 'center', marginBottom: 30 },
  summaryLabel: { fontSize: 14, color: COLORS.textLight, fontWeight: '600', marginBottom: 5 },
  summaryAmount: { fontSize: 32, fontWeight: 'bold', color: COLORS.expense },
  sectionTitle: { fontSize: 18, fontWeight: 'bold', color: COLORS.text, marginBottom: 15 },
  statRow: { marginBottom: 20 },
  statHeader: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 8 },
  statCategory: { fontSize: 16, fontWeight: '600', color: COLORS.text },
  statAmount: { fontSize: 16, fontWeight: '600', color: COLORS.text },
  progressBarBg: { height: 10, backgroundColor: COLORS.border, borderRadius: 5, overflow: 'hidden' },
  progressBarFill: { height: '100%', backgroundColor: COLORS.primary, borderRadius: 5 },
  statPercentage: { fontSize: 12, color: COLORS.textLight, marginTop: 4, textAlign: 'right', fontWeight: '500' },
  emptyText: { color: COLORS.textLight, textAlign: 'center', marginTop: 20 }
});