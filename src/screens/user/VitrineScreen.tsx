import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, Image, TouchableOpacity, Alert, ActivityIndicator } from 'react-native';
import { router, Href } from 'expo-router'; 
import { useAuth } from '../../context/AuthContext';
import { themes } from '../../theme/colors';
import { getVitrineStyles } from '../../styles/common/vitrineStyles';
import { API_URL } from '../../services/api'; // 👈 Importa a URL da sua API NestJS

export default function VitrineScreen() {
  const { user, preferences, logout } = useAuth();
  const theme = themes[(preferences?.theme || 'dark') as 'dark' | 'light'];
  
  const styles = getVitrineStyles(theme);

  // Estados para os pets e controle de carregamento
  const [pets, setPets] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  // Função para buscar os animais cadastrados na API NestJS
  const fetchPets = async () => {
    try {
      setLoading(true);
      const response = await fetch(`${API_URL}/animals`);
      
      if (!response.ok) {
        throw new Error('Falha ao obter lista de animais.');
      }

      const data = await response.json();
      setPets(data);
    } catch (error: any) {
      console.error('Erro ao buscar animais:', error);
      Alert.alert('Erro de Conexão ⚠️', 'Não foi possível carregar os animais do servidor.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPets();
  }, []);

  const handleAction = (route: Href) => {
    if (user?.isGuest) {
      Alert.alert(
        'Atenção 🐾',
        'Você está navegando como visitante. Deseja acessar sua conta?',
        [
          { text: 'Continuar navegando', style: 'cancel' },
          { text: 'Ir para o Login', onPress: logout },
        ]
      );
      return;
    }
    router.push(route);
  };

  return (
    <View style={styles.container}>
      {/* Cabeçalho */}
      <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }}>
        <Text style={styles.title}>Vitrine de Animais</Text>

        <TouchableOpacity 
          style={{ backgroundColor: theme.primary, paddingHorizontal: 12, paddingVertical: 8, borderRadius: 6 }}
          onPress={logout}
        >
          <Text style={{ color: '#ffffff', fontWeight: 'bold', fontSize: 12 }}>
            {user?.isGuest ? 'Login' : 'Sair'}
          </Text>
        </TouchableOpacity>
      </View>

      {/* Banner de Visitante */}
      {user?.isGuest && (
        <TouchableOpacity style={styles.banner} onPress={logout}>
          <Text style={styles.bannerText}>
            Modo Visitante: Clique aqui para fazer Login e ter acesso completo à plataforma!
          </Text>
        </TouchableOpacity>
      )}

      {/* Estado de Carregamento */}
      {loading ? (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
          <ActivityIndicator size="large" color={theme.primary} />
          <Text style={{ color: theme.textMuted, marginTop: 12 }}>Buscando pets cadastrados...</Text>
        </View>
      ) : (
        /* Lista Dinâmica com Pull-To-Refresh */
        <FlatList
          data={pets}
          keyExtractor={(item) => String(item.id)}
          onRefresh={fetchPets}
          refreshing={loading}
          renderItem={({ item }) => (
            <View style={styles.card}>
              <Image 
                source={{ uri: item.photoUrl || item.photo_url || 'https://via.placeholder.com/500' }} 
                style={styles.image} 
              />
              <Text style={styles.petName}>{item.name}</Text>
              <Text style={styles.petDetails}>{item.species} • {item.age}</Text>

              <View style={styles.row}>
                <TouchableOpacity
                  style={styles.btn}
                  onPress={() => handleAction('/form-adocao')}
                >
                  <Text style={styles.btnText}>Adotar</Text>
                </TouchableOpacity>

                <TouchableOpacity
                  style={styles.btnOutline}
                  onPress={() => handleAction('/form-visita')}
                >
                  <Text style={styles.btnOutlineText}>Visitar</Text>
                </TouchableOpacity>   
              </View>
            </View>
          )}
        />
      )}
    </View>
  );
}