import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { useAuth } from '../../context/AuthContext';
import { themes } from '../../theme/colors';
import { getProfileStyles } from '../../styles/common/profileStyles';

export default function PerfilScreen() {
  const { user, preferences, logout, toggleTheme } = useAuth();
  const theme = themes[(preferences?.theme || 'dark') as 'dark' | 'light'];

    const styles = getProfileStyles(theme); 
  return (
    <View style={[styles.container, { backgroundColor: theme.background }]}>
      <View style={[styles.avatarContainer, { backgroundColor: theme.primary }]}>
        <Text style={styles.avatarText}>{user?.name?.charAt(0) || 'U'}</Text>
      </View>

      <Text style={[styles.userName, { color: theme.text }]}>{user?.name || 'Usuário'}</Text>
      <Text style={{ color: theme.textMuted, marginBottom: 24 }}>
        {user?.isGuest ? 'Modo Visitante' : user?.email}
      </Text>

      <TouchableOpacity style={[styles.OptionButton, { backgroundColor: theme.surface }]} onPress={toggleTheme}>
        <Text style={{ color: theme.text, fontWeight: '600' }}>
          Alternar Tema (Atual: {preferences?.theme?.toUpperCase()})
        </Text>
      </TouchableOpacity>

      <TouchableOpacity style={[styles.OptionButton, { backgroundColor: '#FF3B30', marginTop: 12 }]} onPress={logout}>
        <Text style={{ color: '#FFF', fontWeight: 'bold', textAlign: 'center' }}>Sair da Conta</Text>
      </TouchableOpacity>
    </View>
  );
}
