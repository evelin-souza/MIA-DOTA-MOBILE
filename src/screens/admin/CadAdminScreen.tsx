import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Alert, StyleSheet } from 'react-native';
import { useAuth } from '../../context/AuthContext';
import { themes } from '../../theme/colors';
import { getFormStyles } from '../../styles/common/formStyles';

export default function CadAdminScreen() {
  const { preferences } = useAuth();
  const theme = themes[(preferences?.theme || 'dark') as 'dark' | 'light'];
  const styles = getFormStyles(theme);

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [adminToken, setAdminToken] = useState('');

  const handleRegisterAdmin = () => {
    if (!adminToken) {
      Alert.alert('Erro', 'Forneça a chave secreta da ONG.');
      return;
    }
    Alert.alert('Sucesso', 'Administrador cadastrado com sucesso!');
  };

  return (
    <View style={[styles.container, { backgroundColor: theme.background }]}>
      <Text style={[styles.title, { color: theme.text }]}>Novo Administrador</Text>

      <TextInput
        style={[styles.input, { color: theme.text, borderColor: theme.border, backgroundColor: theme.surface }]}
        placeholder="Nome do Voluntário/Admin"
        placeholderTextColor={theme.textMuted}
        value={name}
        onChangeText={setName}
      />
      <TextInput
        style={[styles.input, { color: theme.text, borderColor: theme.border, backgroundColor: theme.surface }]}
        placeholder="E-mail Institucional"
        placeholderTextColor={theme.textMuted}
        value={email}
        onChangeText={setEmail}
      />
      <TextInput
        style={[styles.input, { color: theme.text, borderColor: theme.border, backgroundColor: theme.surface }]}
        placeholder="Chave de Acesso ONG"
        placeholderTextColor={theme.textMuted}
        secureTextEntry
        value={adminToken}
        onChangeText={setAdminToken}
      />

      <TouchableOpacity style={[styles.button, { backgroundColor: theme.primary }]} onPress={handleRegisterAdmin}>
        <Text style={styles.buttonText}>Cadastrar Admin</Text>
      </TouchableOpacity>
    </View>
  );
}
