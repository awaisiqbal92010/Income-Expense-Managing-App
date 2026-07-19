import React, { useState, useContext } from 'react';
import { View, Text, StyleSheet, SafeAreaView, TextInput, TouchableOpacity } from 'react-native';
import { GlobalContext } from '../context/GlobalState';
import { COLORS } from '../theme/colors';

export default function SignupScreen({ navigation }) {
  const { login } = useContext(GlobalContext);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSignup = () => {
    if(name && email && password) login({ email, name });
  };

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Create Account</Text>
      <Text style={styles.subtitle}>Start tracking your expenses today!</Text>

      <View style={styles.form}>
        <TextInput style={styles.input} placeholder="Full Name" value={name} onChangeText={setName} placeholderTextColor={COLORS.textLight} />
        <TextInput style={styles.input} placeholder="Email Address" value={email} onChangeText={setEmail} keyboardType="email-address" autoCapitalize="none" placeholderTextColor={COLORS.textLight} />
        <TextInput style={styles.input} placeholder="Password" value={password} onChangeText={setPassword} secureTextEntry placeholderTextColor={COLORS.textLight} />
        
        <TouchableOpacity style={styles.loginBtn} onPress={handleSignup}>
          <Text style={styles.loginBtnText}>Sign Up</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.backBtn} onPress={() => navigation.goBack()}>
          <Text style={styles.link}>Already have an account? Sign In</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: COLORS.background, paddingHorizontal: 20 },
  title: { fontSize: 28, fontWeight: 'bold', color: COLORS.text, marginTop: 80 },
  subtitle: { fontSize: 16, color: COLORS.textLight, marginTop: 8, marginBottom: 40 },
  form: { flex: 1 },
  input: { backgroundColor: COLORS.surface, padding: 18, borderRadius: 16, fontSize: 16, marginBottom: 15 },
  loginBtn: { backgroundColor: COLORS.primary, padding: 18, borderRadius: 16, alignItems: 'center', marginTop: 10 },
  loginBtnText: { color: '#FFF', fontSize: 16, fontWeight: 'bold' },
  backBtn: { marginTop: 30, alignItems: 'center' },
  link: { color: COLORS.primary, fontSize: 15, fontWeight: 'bold' }
});