import React from 'react';
import { View, ActivityIndicator } from 'react-native';
import { useAuth } from '../../src/context/AuthContext';
import { themes } from '../../src/theme/colors';
import LoginScreen from '../../src/screens/user/LoginScreen';
import VitrineScreen from '../../src/screens/user/VitrineScreen'; 

export default function HomeScreen() {
  const { user, isLoading, preferences } = useAuth();
  const theme = themes[(preferences?.theme || 'dark') as 'dark' | 'light'];

  // Enquanto carrega a sessão salva no celular
  if (isLoading) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: theme.background }}>
        <ActivityIndicator size="large" color={theme.primary} />
      </View>
    );
  }

  // Se NÃO houver usuário (ou se fez logout), mostra a tela de Login
  if (!user) {
    return <LoginScreen />;
  }

  // Se estiver logado (ou se escolheu entrar como visitante nesta sessão), exibe a Vitrine
  return <VitrineScreen />;
}