import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Alert, StyleSheet } from 'react-native';
import { router } from 'expo-router';
import { useAuth } from '../../context/AuthContext';
import { themes } from '../../theme/colors';
import { getFormStyles } from '../../styles/common/formStyles';

export default function FormVisitaScreen() {
  const { preferences } = useAuth();
  const theme = themes[(preferences?.theme || 'dark') as 'dark' | 'light'];
  const styles = getFormStyles(theme);

  const [date, setDate] = useState('');
  const [time, setTime] = useState('');

  const handleSchedule = () => {
    if (!date || !time) {
      Alert.alert('Atenção', 'Informe a data e o horário.');
      return;
    }
    Alert.alert('Agendado!', `Visita marcada para ${date} às ${time}.`);
    router.back();
  };

  return (
    <View style={[styles.container, { backgroundColor: theme.background }]}>
      <Text style={[styles.title, { color: theme.text }]}>Agendar Visita ao Abrigo</Text>

      <Text style={[styles.label, { color: theme.text }]}>Data da Visita:</Text>
      <TextInput
        style={[styles.input, { color: theme.text, borderColor: theme.border, backgroundColor: theme.surface }]}
        placeholder="DD/MM/AAAA"
        placeholderTextColor={theme.textMuted}
        value={date}
        onChangeText={setDate}
      />

      <Text style={[styles.label, { color: theme.text }]}>Horário:</Text>
      <TextInput
        style={[styles.input, { color: theme.text, borderColor: theme.border, backgroundColor: theme.surface }]}
        placeholder="Ex: 14:00"
        placeholderTextColor={theme.textMuted}
        value={time}
        onChangeText={setTime}
      />

      <TouchableOpacity style={[styles.button, { backgroundColor: theme.primary }]} onPress={handleSchedule}>
        <Text style={styles.buttonText}>Confirmar Agendamento</Text>
      </TouchableOpacity>
    </View>
  );
}