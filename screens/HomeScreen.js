import React, { useContext } from 'react';
import { View, Text, StyleSheet, FlatList, SafeAreaView, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { GlobalContext } from '../context/GlobalState';
import TransactionCard from '../components/TransactionCard';
import { COLORS, SHADOWS } from '../theme/colors';

export default function HomeScreen({ navigation }) {
  const { transactions } = useContext(GlobalContext);

  const amounts = transactions.map(t => t.type === 'income' ? t.amount : -t.amount);
  const balance = amounts.reduce((acc, item) => (acc += item), 0).toFixed(2);
  const income = transactions.filter(t => t.type === 'income').reduce((acc, item) => (acc += item.amount), 0).toFixed(2);
  const expense = transactions.filter(t => t.type === 'expense').reduce((acc, item) => (acc += item.amount), 0).toFixed(2);

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <View>
          <Text style={styles.greeting}>Good Morning,</Text>
          <Text style={styles.name}>Alex Carter</Text>
        </View>
        <TouchableOpacity style={styles.profileBtn}>
          <Ionicons name="person" size={24} color={COLORS.primary} />
        </TouchableOpacity>
      </View>

      <View style={[styles.balanceCard, SHADOWS.premium]}>
        <Text style={styles.balanceLabel}>Total Balance</Text>
        <Text style={styles.balanceAmount}>${balance}</Text>
        <View style={styles.statsRow}>
          <View style={styles.stat}>
            <View style={styles.iconIncome}><Ionicons name="arrow-down" size={16} color={COLORS.income} /></View>
            <View>
              <Text style={styles.statLabel}>Income</Text>
              <Text style={styles.statValue}>${income}</Text>
            </View>
          </View>
          <View style={styles.stat}>
            <View style={styles.iconExpense}><Ionicons name="arrow-up" size={16} color={COLORS.expense} /></View>
            <View>
              <Text style={styles.statLabel}>Expense</Text>
              <Text style={styles.statValue}>${expense}</Text>
            </View>
          </View>
        </View>
      </View>

      <View style={styles.listHeader}>
        <Text style={styles.listTitle}>Recent Transactions</Text>
        <TouchableOpacity onPress={() => navigation.navigate('History')}><Text style={styles.seeAll}>See All</Text></TouchableOpacity>
      </View>

      <FlatList
        data={transactions.slice(0, 5)}
        keyExtractor={item => item.id.toString()}
        renderItem={({ item }) => <TransactionCard transaction={item} />}
        contentContainerStyle={{ paddingBottom: 100 }}
        showsVerticalScrollIndicator={false}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: COLORS.background, paddingHorizontal: 20 },
  header: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginTop: 20, marginBottom: 25 },
  greeting: { fontSize: 14, color: COLORS.textLight, fontWeight: '600' },
  name: { fontSize: 22, color: COLORS.text, fontWeight: 'bold', marginTop: 4 },
  profileBtn: { width: 45, height: 45, backgroundColor: COLORS.surface, borderRadius: 25, justifyContent: 'center', alignItems: 'center' },
  balanceCard: { backgroundColor: COLORS.primary, borderRadius: 24, padding: 25, marginBottom: 30 },
  balanceLabel: { color: 'rgba(255,255,255,0.8)', fontSize: 15, fontWeight: '500' },
  balanceAmount: { color: '#FFF', fontSize: 36, fontWeight: 'bold', marginVertical: 10 },
  statsRow: { flexDirection: 'row', justifyContent: 'space-between', marginTop: 15 },
  stat: { flexDirection: 'row', alignItems: 'center' },
  iconIncome: { width: 30, height: 30, borderRadius: 15, backgroundColor: 'rgba(0, 208, 158, 0.2)', justifyContent: 'center', alignItems: 'center', marginRight: 10 },
  iconExpense: { width: 30, height: 30, borderRadius: 15, backgroundColor: 'rgba(255, 107, 107, 0.2)', justifyContent: 'center', alignItems: 'center', marginRight: 10 },
  statLabel: { color: 'rgba(255,255,255,0.7)', fontSize: 12 },
  statValue: { color: '#FFF', fontSize: 16, fontWeight: '700' },
  listHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 15 },
  listTitle: { fontSize: 18, fontWeight: 'bold', color: COLORS.text },
  seeAll: { fontSize: 14, color: COLORS.primary, fontWeight: '600' }
});