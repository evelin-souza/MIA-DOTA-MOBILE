import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, ScrollView, Alert, ActivityIndicator } from 'react-native';
import { router } from 'expo-router';
import { useAuth } from '../../context/AuthContext';
import { themes } from '../../theme/colors';
import { getFormStyles } from '../../styles/common/formStyles';
import { API_URL } from '../../services/api'; 


export default function FormAdocaoScreen() {
  const { user, preferences } = useAuth();
  const theme = themes[(preferences?.theme || 'dark') as 'dark' | 'light'];
  const styles = getFormStyles(theme);

  const [reason, setReason] = useState('');
  const [housing, setHousing] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    if (!reason || !housing) {
      Alert.alert('Atenção', 'Preencha todos os campos do formulário.');
      return;
    }

    try {
      setLoading(true);

      // Requisição POST para o módulo 'adoptions' do seu NestJS
      const response = await fetch(`${API_URL}/adoptions`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          userId: user?.id,
          housing: housing,
          reason: reason,
        }),
      });

      if (!response.ok) {
        throw new Error('Falha ao enviar formulário para o servidor.');
      }

      Alert.alert('Sucesso!', 'Seu pedido de adoção foi cadastrado no backend!');
      router.back();
    } catch (error: any) {
      Alert.alert('Erro ao enviar', error.message || 'Não foi possível conectar ao servidor NestJS.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Solicitação de Adoção</Text>

      <Text style={styles.label}>Tipo de Moradia (Casa, Apto, Chácara):</Text>
      <TextInput
        style={styles.input}
        value={housing}
        onChangeText={setHousing}
        placeholder="Ex: Casa com quintal fechado"
        placeholderTextColor={theme.textMuted}
        editable={!loading}
      />

      <Text style={styles.label}>Por que deseja adotar?</Text>
      <TextInput
        style={[styles.input, styles.textArea]}
        multiline
        numberOfLines={4}
        value={reason}
        onChangeText={setReason}
        placeholder="Conte um pouco sobre sua rotina..."
        placeholderTextColor={theme.textMuted}
        editable={!loading}
      />

      <TouchableOpacity
        style={[styles.button, loading && { opacity: 0.7 }]}
        onPress={handleSubmit}
        disabled={loading}
      >
        {loading ? (
          <ActivityIndicator color="#ffffff" />
        ) : (
          <Text style={styles.buttonText}>Enviar Formulário</Text>
        )}
      </TouchableOpacity>
    </ScrollView>
  );
}