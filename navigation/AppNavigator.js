import React from 'react';
import { View, StyleSheet } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';

import HomeScreen from '../screens/HomeScreen';
import AddScreen from '../screens/AddScreen';
import HistoryScreen from '../screens/HistoryScreen';
import StatsScreen from '../screens/StatsScreen';
import ProfileScreen from '../screens/ProfileScreen';

import { COLORS, SHADOWS } from '../theme/colors';

const Tab = createBottomTabNavigator();

export default function AppNavigator() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarShowLabel: false,
        tabBarStyle: styles.tabBar,
        tabBarIcon: ({ focused, color }) => {
          let iconName;
          if (route.name === 'Home') iconName = focused ? 'home' : 'home-outline';
          else if (route.name === 'History') iconName = focused ? 'wallet' : 'wallet-outline';
          else if (route.name === 'Stats') iconName = focused ? 'pie-chart' : 'pie-chart-outline';
          else if (route.name === 'Profile') iconName = focused ? 'person' : 'person-outline';

          if (route.name === 'Add') {
            return (
              <View style={[styles.floatingButton, SHADOWS.premium]}>
                <Ionicons name="add" size={32} color="#FFF" />
              </View>
            );
          }

          return <Ionicons name={iconName} size={26} color={focused ? COLORS.primary : COLORS.textLight} />;
        },
      })}
    >
      <Tab.Screen name="Home" component={HomeScreen} />
      <Tab.Screen name="History" component={HistoryScreen} />
      <Tab.Screen name="Add" component={AddScreen} options={{ tabBarStyle: { display: 'none' } }} />
      <Tab.Screen name="Stats" component={StatsScreen} />
      <Tab.Screen name="Profile" component={ProfileScreen} />
    </Tab.Navigator>
  );
}

const styles = StyleSheet.create({
  tabBar: {
    position: 'absolute', bottom: 20, left: 20, right: 20,
    backgroundColor: COLORS.surface, borderRadius: 30, height: 70,
    shadowColor: '#000', shadowOffset: { width: 0, height: 10 }, shadowOpacity: 0.08, shadowRadius: 20, elevation: 5,
    borderTopWidth: 0,
  },
  floatingButton: {
    width: 60, height: 60, borderRadius: 30, backgroundColor: COLORS.primary,
    justifyContent: 'center', alignItems: 'center', top: -20,
  }
});