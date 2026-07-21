import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Alert, ActivityIndicator } from 'react-native';
import { router } from 'expo-router';
import { useAuth } from '../../context/AuthContext';
import { themes } from '../../theme/colors';
import { getFormStyles } from '../../styles/common/formStyles';
import { apiFetch } from '../../services/api';

export default function CadastroScreen() {
  const { preferences } = useAuth();
  const theme = themes[(preferences?.theme || 'dark') as 'dark' | 'light'];
  const styles = getFormStyles(theme);

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  // 🔍 Expressão Regular (Regex) para validar e-mail com @ e .
  const validateEmail = (emailToTest: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(emailToTest);
  };

  const handleRegister = async () => {
    // 1. Validação de campos vazios
    if (!name.trim() || !email.trim() || !password) {
      Alert.alert('Atenção', 'Preencha todos os campos do formulário.');
      return;
    }

    // Validação obrigatória de formato de E-mail (@ e .)
    if (!validateEmail(email.trim())) {
      Alert.alert(
        'E-mail Inválido',
        'Por favor, insira um e-mail válido contendo "@" e um domínio com "." (ex: usuario@email.com).'
      );
      return;
    }

    // Validação básica de tamanho de senha
    if (password.length < 6) {
      Alert.alert('Atenção', 'A senha deve ter pelo menos 6 caracteres.');
      return;
    }

    try {
      setLoading(true);

      // Envia o cadastro para a rota /auth/register da API NestJS
      await apiFetch('/auth/register', {
        method: 'POST',
        body: JSON.stringify({
          name: name.trim(),
          email: email.trim().toLowerCase(),
          password,
        }),
      });

      Alert.alert('Sucesso!', 'Sua conta foi criada com sucesso! Faça login para continuar.');
      router.back(); // Volta para a tela de Login
    } catch (error: any) {
      Alert.alert(
        'Erro ao cadastrar',
        error?.message || 'Não foi possível criar sua conta. Verifique se o e-mail já está em uso.'
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Criar Conta no MiaDota</Text>

      <Text style={styles.label}>Nome Completo</Text>
      <TextInput
        style={styles.input}
        placeholder="Digite seu nome"
        placeholderTextColor={theme.textMuted}
        value={name}
        onChangeText={setName}
        editable={!loading}
      />

      <Text style={styles.label}>E-mail</Text>
      <TextInput
        style={styles.input}
        placeholder="exemplo@dominio.com"
        placeholderTextColor={theme.textMuted}
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
        autoCapitalize="none"
        autoCorrect={false}
        editable={!loading}
      />

      <Text style={styles.label}>Senha</Text>
      <TextInput
        style={styles.input}
        placeholder="Sua senha (mínimo 6 caracteres)"
        placeholderTextColor={theme.textMuted}
        secureTextEntry
        value={password}
        onChangeText={setPassword}
        editable={!loading}
      />

      <TouchableOpacity
        style={[styles.button, loading && { opacity: 0.7 }]}
        onPress={handleRegister}
        disabled={loading}
      >
        {loading ? (
          <ActivityIndicator color="#ffffff" />
        ) : (
          <Text style={styles.buttonText}>Cadastrar</Text>
        )}
      </TouchableOpacity>
    </View>
  );
}