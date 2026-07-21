import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, ScrollView, Alert, StyleSheet } from 'react-native';
import { router } from 'expo-router';
import { useAuth } from '../../context/AuthContext';
import { themes } from '../../theme/colors';
import { getFormStyles } from '../../styles/common/formStyles';

export default function FormAdocaoScreen() {
  const { preferences } = useAuth();
  const theme = themes[(preferences?.theme || 'dark') as 'dark' | 'light'];
  const styles = getFormStyles(theme);

  const [reason, setReason] = useState('');
  const [housing, setHousing] = useState('');

  const handleSubmit = () => {
    if (!reason || !housing) {
      Alert.alert('Atenção', 'Preencha todos os campos.');
      return;
    }
    Alert.alert('Sucesso!', 'Seu pedido de adoção foi enviado para análise.');
    router.back();
  };

  return (
    <ScrollView style={[styles.container, { backgroundColor: theme.background }]}>
      <Text style={[styles.title, { color: theme.text }]}>Solicitação de Adoção</Text>

      <Text style={[styles.label, { color: theme.text }]}>Tipo de Moradia (Casa, Apto, Chácara):</Text>
      <TextInput
        style={[styles.input, { color: theme.text, borderColor: theme.border, backgroundColor: theme.surface }]}
        value={housing}
        onChangeText={setHousing}
        placeholder="Ex: Casa com quintal fechado"
        placeholderTextColor={theme.textMuted}
      />

      <Text style={[styles.label, { color: theme.text }]}>Por que deseja adotar?</Text>
      <TextInput
        style={[styles.input, styles.textArea, { color: theme.text, borderColor: theme.border, backgroundColor: theme.surface }]}
        multiline
        numberOfLines={4}
        value={reason}
        onChangeText={setReason}
        placeholder="Conte um pouco sobre sua rotina..."
        placeholderTextColor={theme.textMuted}
      />

      <TouchableOpacity style={[styles.button, { backgroundColor: theme.primary }]} onPress={handleSubmit}>
        <Text style={styles.buttonText}>Enviar Formulário</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}
