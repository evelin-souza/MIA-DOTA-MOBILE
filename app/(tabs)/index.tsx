import React from 'react';
import { View, Text, ActivityIndicator } from 'react-native';
import { useAuth } from '../../src/context/AuthContext';
import { themes } from '../../src/theme/colors';
import LoginScreen from '../../src/screens/user/LoginScreen';

export default function HomeScreen() {
  const { user, isLoading, preferences, loginAsGuest } = useAuth();
  const theme = themes[(preferences?.theme || 'dark') as 'dark' | 'light'];

  // Enquanto carrega as informações salvas no celular
  if (isLoading) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: theme.background }}>
        <ActivityIndicator size="large" color={theme.primary} />
      </View>
    );
  }

  // Se NÃO estiver logado, exibe a tela de login
  if (!user) {
    return <LoginScreen />;
  }

  // Se estiver logado, exibe o conteúdo da Home
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: theme.background }}>
      <Text style={{ color: theme.text, fontSize: 18, fontWeight: 'bold' }}>
        Bem-vindo ao MIA-DOTA, {user.name || 'Visitante'}!
      </Text>
    </View>
  );
}