import React, { useState, useContext } from 'react';
import { View, Text, StyleSheet, SafeAreaView, FlatList, TouchableOpacity } from 'react-native';
import { GlobalContext } from '../context/GlobalState';
import TransactionCard from '../components/TransactionCard';
import { COLORS } from '../theme/colors';

export default function HistoryScreen() {
  const { transactions } = useContext(GlobalContext);
  const [filter, setFilter] = useState('All'); // All, income, expense

  const filteredData = transactions.filter(t => {
    if (filter === 'All') return true;
    return t.type === filter;
  });

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.headerTitle}>Transaction History</Text>

      <View style={styles.filterContainer}>
        {['All', 'income', 'expense'].map((f) => (
          <TouchableOpacity 
            key={f} 
            style={[styles.filterBtn, filter === f && styles.filterBtnActive]}
            onPress={() => setFilter(f)}
          >
            <Text style={[styles.filterText, filter === f && styles.filterTextActive]}>
              {f.charAt(0).toUpperCase() + f.slice(1)}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      {filteredData.length === 0 ? (
        <View style={styles.emptyContainer}>
          <Text style={styles.emptyText}>No transactions found.</Text>
        </View>
      ) : (
        <FlatList
          data={filteredData}
          keyExtractor={item => item.id.toString()}
          renderItem={({ item }) => <TransactionCard transaction={item} />}
          contentContainerStyle={{ paddingBottom: 120 }}
          showsVerticalScrollIndicator={false}
        />
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: COLORS.background, paddingHorizontal: 20 },
  headerTitle: { fontSize: 24, fontWeight: 'bold', color: COLORS.text, marginTop: 20, marginBottom: 20, textAlign: 'center' },
  filterContainer: { flexDirection: 'row', backgroundColor: COLORS.surface, borderRadius: 12, padding: 4, marginBottom: 20 },
  filterBtn: { flex: 1, paddingVertical: 10, alignItems: 'center', borderRadius: 10 },
  filterBtnActive: { backgroundColor: COLORS.primary },
  filterText: { fontSize: 14, fontWeight: '600', color: COLORS.textLight },
  filterTextActive: { color: '#FFF' },
  emptyContainer: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  emptyText: { color: COLORS.textLight, fontSize: 16 }
});