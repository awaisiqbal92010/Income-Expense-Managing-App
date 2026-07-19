import React, { useRef, useState } from 'react';
import { View, Text, StyleSheet, SafeAreaView, FlatList, Dimensions, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { COLORS } from '../theme/colors';

const { width, height } = Dimensions.get('window');

const slides = [
  { id: '1', title: 'Track Your Spending', desc: 'Easily track your daily income and expenses.', icon: 'wallet' },
  { id: '2', title: 'Set Budgets', desc: 'Take control of your money by setting category budgets.', icon: 'pie-chart' },
  { id: '3', title: 'Achieve Goals', desc: 'Save more and achieve your financial goals faster.', icon: 'trending-up' }
];

export default function OnboardingScreen({ navigation }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const ref = useRef(null);

  const updateIndex = (e) => {
    const contentOffsetX = e.nativeEvent.contentOffset.x;
    const index = Math.round(contentOffsetX / width);
    setCurrentIndex(index);
  };

  const nextSlide = () => {
    if (currentIndex < slides.length - 1) {
      ref.current.scrollToIndex({ index: currentIndex + 1 });
    } else {
      navigation.replace('Login');
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <FlatList 
        ref={ref}
        data={slides}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        onMomentumScrollEnd={updateIndex}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.slide}>
            <View style={styles.iconBg}>
              <Ionicons name={item.icon} size={80} color={COLORS.primary} />
            </View>
            <Text style={styles.title}>{item.title}</Text>
            <Text style={styles.desc}>{item.desc}</Text>
          </View>
        )}
      />
      
      <View style={styles.footer}>
        <View style={styles.indicators}>
          {slides.map((_, index) => (
            <View key={index} style={[styles.indicator, currentIndex === index && styles.indicatorActive]} />
          ))}
        </View>
        <TouchableOpacity style={styles.btn} onPress={nextSlide}>
          <Text style={styles.btnText}>{currentIndex === slides.length - 1 ? 'Get Started' : 'Next'}</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: COLORS.background },
  slide: { width, alignItems: 'center', justifyContent: 'center', padding: 20 },
  iconBg: { width: 180, height: 180, backgroundColor: 'rgba(74, 58, 255, 0.1)', borderRadius: 90, justifyContent: 'center', alignItems: 'center', marginBottom: 40 },
  title: { fontSize: 28, fontWeight: 'bold', color: COLORS.text, marginBottom: 15, textAlign: 'center' },
  desc: { fontSize: 16, color: COLORS.textLight, textAlign: 'center', paddingHorizontal: 20, lineHeight: 24 },
  footer: { padding: 20, paddingBottom: 40, alignItems: 'center' },
  indicators: { flexDirection: 'row', marginBottom: 30 },
  indicator: { width: 10, height: 10, backgroundColor: COLORS.border, borderRadius: 5, marginHorizontal: 5 },
  indicatorActive: { backgroundColor: COLORS.primary, width: 25 },
  btn: { width: '100%', backgroundColor: COLORS.primary, padding: 18, borderRadius: 16, alignItems: 'center' },
  btnText: { color: '#FFF', fontSize: 16, fontWeight: 'bold' }
});