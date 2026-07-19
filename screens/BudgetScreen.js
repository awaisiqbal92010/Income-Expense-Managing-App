import React, { useContext, useState } from 'react';
import { View, Text, StyleSheet, SafeAreaView, FlatList, TouchableOpacity, TextInput } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { GlobalContext } from '../context/GlobalState';
import { COLORS } from '../theme/colors';

export default function BudgetScreen({ navigation }) {
  const { budgets, transactions, updateBudget } = useContext(GlobalContext);
  const [newCategory, setNewCategory] = useState('');
  const [newLimit, setNewLimit] = useState('');

  const handleAddBudget = () => {
    if(newCategory && newLimit) {
      updateBudget({ id: Math.random(), category: newCategory, limit: +newLimit });
      setNewCategory(''); setNewLimit('');
    }
  };

  const renderItem = ({ item }) => {
    const spent = transactions
      .filter(t => t.category.toLowerCase() === item.category.toLowerCase() && t.type === 'expense')
      .reduce((acc, t) => acc + t.amount, 0);
    
    const progress = Math.min((spent / item.limit) * 100, 100);
    const isExceeded = spent > item.limit;

    return (
      <View style={styles.card}>
        <View style={styles.header}>
          <Text style={styles.category}>{item.category}</Text>
          <Text style={styles.amounts}>${spent.toFixed(2)} / ${item.limit}</Text>
        </View>
        <View style={styles.barBg}>
          <View style={[styles.barFill, { width: `${progress}%`, backgroundColor: isExceeded ? COLORS.expense : COLORS.primary }]} />
        </View>
        {isExceeded && <Text style={styles.warning}>Budget Exceeded!</Text>}
      </View>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.navHeader}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={28} color={COLORS.text} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Budgets</Text>
        <View style={{ width: 28 }} />
      </View>

      <View style={styles.addSection}>
        <TextInput style={[styles.input, { flex: 2, marginRight: 10 }]} placeholder="Category (e.g. Food)" value={newCategory} onChangeText={setNewCategory} />
        <TextInput style={[styles.input, { flex: 1, marginRight: 10 }]} placeholder="$ Limit" keyboardType="numeric" value={newLimit} onChangeText={setNewLimit} />
        <TouchableOpacity style={styles.addBtn} onPress={handleAddBudget}>
          <Ionicons name="add" size={24} color="#FFF" />
        </TouchableOpacity>
      </View>

      <FlatList 
        data={budgets} 
        keyExtractor={item => item.id.toString()} 
        renderItem={renderItem} 
        contentContainerStyle={{ paddingBottom: 50 }}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: COLORS.background, paddingHorizontal: 20 },
  navHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginTop: 20, marginBottom: 20 },
  headerTitle: { fontSize: 20, fontWeight: 'bold', color: COLORS.text },
  addSection: { flexDirection: 'row', marginBottom: 30 },
  input: { backgroundColor: COLORS.surface, padding: 15, borderRadius: 12 },
  addBtn: { backgroundColor: COLORS.primary, justifyContent: 'center', alignItems: 'center', padding: 15, borderRadius: 12 },
  card: { backgroundColor: COLORS.surface, padding: 20, borderRadius: 16, marginBottom: 15 },
  header: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 10 },
  category: { fontSize: 16, fontWeight: '600' },
  amounts: { fontSize: 14, color: COLORS.textLight, fontWeight: '500' },
  barBg: { height: 10, backgroundColor: COLORS.border, borderRadius: 5, overflow: 'hidden' },
  barFill: { height: '100%', borderRadius: 5 },
  warning: { color: COLORS.expense, fontSize: 12, marginTop: 8, fontWeight: 'bold' }
});