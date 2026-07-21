import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  ActivityIndicator,
  Alert,
  KeyboardAvoidingView,
  Platform,
  ScrollView
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { router } from 'expo-router'; 
import { useAuth } from '../../context/AuthContext';
import { getAuthStyles } from '../../styles/auth/authStyles';
import { themes } from '../../theme/colors';

export default function LoginScreen() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  // Extrai login, loginAsGuest e preferências do contexto
  const { login: contextLogin, loginAsGuest, preferences } = useAuth();
  const theme = themes[(preferences?.theme || 'dark') as 'dark' | 'light'];
  const styles = getAuthStyles(theme);

  const insets = useSafeAreaInsets();

  // Login tradicional por E-mail e Senha
  const handleLogin = async () => {
    if (!email || !password) {
      Alert.alert('Atenção', 'Por favor, preencha todos os campos.');
      return;
    }

    setIsLoading(true);
    try {
      await contextLogin(email, password);
    } catch (error: any) {
      Alert.alert('Erro ao entrar', error?.message || 'Não foi possível conectar ao servidor.');
    } finally {
      setIsLoading(false);
    }
  };

  // Entrada em modo visitante
  const handleGuestLogin = async () => {
    try {
      await loginAsGuest();
    } catch (error: any) {
      Alert.alert('Erro', 'Não foi possível iniciar o modo visitante.');
    }
  };

  return (
    <KeyboardAvoidingView
      style={{ flex: 1, backgroundColor: theme.background }}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <ScrollView
        contentContainerStyle={[
          styles.container,
          { paddingTop: insets.top + 20, paddingBottom: insets.bottom + 20 }
        ]}
        keyboardShouldPersistTaps="handled"
      >
        <View style={styles.logoContainer}>
          <View style={styles.logoCircle}>
            <Text style={styles.logoText}>MIA</Text>
          </View>
        </View>

        <View style={styles.headerArea}>
          <Text style={styles.title}>MIA-DOTA</Text>
          <Text style={styles.subtitle}>Faça login para continuar</Text>
        </View>

        <View style={styles.formContainer}>
          <TextInput
            style={styles.input}
            placeholder="E-mail"
            placeholderTextColor={theme.textMuted}
            value={email}
            onChangeText={setEmail}
            keyboardType="email-address"
            autoCapitalize="none"
            autoCorrect={false}
            returnKeyType="next"
          />

          <TextInput
            style={styles.input}
            placeholder="Senha"
            placeholderTextColor={theme.textMuted}
            value={password}
            onChangeText={setPassword}
            secureTextEntry
            returnKeyType="done"
            onSubmitEditing={handleLogin}
          />

          <TouchableOpacity
            style={styles.button}
            onPress={handleLogin}
            disabled={isLoading}
            activeOpacity={0.8}
          >
            {isLoading ? (
              <ActivityIndicator color={theme.surface} />
            ) : (
              <Text style={styles.buttonText}>Entrar</Text>
            )}
          </TouchableOpacity>

          {/* 👈 2. Link de Cadastro com Expo Router (Sem a trava do navigation) */}
          <TouchableOpacity
            style={{ marginTop: 16, alignItems: 'center' }}
            onPress={() => router.push('/cad-user')}
            activeOpacity={0.7}
          >
            <Text style={{ color: theme.textMuted, fontSize: 14 }}>
              Não tem uma conta?{' '}
              <Text style={{ color: theme.primary, fontWeight: 'bold' }}>
                Cadastre-se
              </Text>
            </Text>
          </TouchableOpacity>

          {/* Botão de Visitante */}
          <TouchableOpacity
            style={{ marginTop: 16, alignItems: 'center' }}
            onPress={handleGuestLogin}
            activeOpacity={0.7}
          >
            <Text style={{ color: theme.textMuted, fontSize: 14 }}>
              Apenas navegando?{' '}
              <Text style={{ color: theme.primary, fontWeight: 'bold' }}>
                Entrar sem login
              </Text>
            </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}