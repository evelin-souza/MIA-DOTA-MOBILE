import React, { useState } from 'react';
import { View, Text, FlatList, Image, TouchableOpacity, Alert } from 'react-native';
import { router, Href } from 'expo-router'; 
import { useAuth } from '../../context/AuthContext';
import { themes } from '../../theme/colors';
import { getVitrineStyles } from '../../styles/common/vitrineStyles';

export default function VitrineScreen() {
  //  Resgatamos o método 'logout' do AuthContext
  const { user, preferences, logout } = useAuth();
  const theme = themes[(preferences?.theme || 'dark') as 'dark' | 'light'];
  
  const styles = getVitrineStyles(theme);

  const [pets] = useState([
    {
      id: '1',
      name: 'Frederico',
      species: 'Cão',
      age: '2 anos',
      photoUrl: 'https://images.unsplash.com/photo-1543466835-00a7907e9de1?w=500',
    },
  ]);

  const handleAction = (route: Href) => {
    if (user?.isGuest) {
      Alert.alert(
        'Atenção 🐾',
        'Você está navegando como visitante. Deseja acessar sua conta?',
        [
          { text: 'Continuar navegando', style: 'cancel' },
          { text: 'Ir para o Login', onPress: logout }, // 👈 O logout reseta a sessão e manda de volta ao Login
        ]
      );
      return;
    }
    router.push(route);
  };

  return (
    <View style={styles.container}>
      {/*  Cabeçalho com o botão de Entrar/Sair no canto superior direito */}
      <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }}>
        <Text style={styles.title}>Vitrine de Animais</Text>

        <TouchableOpacity 
          style={{ backgroundColor: theme.primary, paddingHorizontal: 12, paddingVertical: 8, borderRadius: 6 }}
          onPress={logout}
        >
          <Text style={{ color: '#ffffff', fontWeight: 'bold', fontSize: 12 }}>
            {user?.isGuest ? 'Entrar / Login 🔑' : 'Sair 🚪'}
          </Text>
        </TouchableOpacity>
      </View>

      {/* Banner interativo: se o visitante clicar nele, também vai para o Login */}
      {user?.isGuest && (
        <TouchableOpacity style={styles.banner} onPress={logout}>
          <Text style={styles.bannerText}>
            Modo Visitante: Clique aqui para fazer Login 🔑
          </Text>
        </TouchableOpacity>
      )}

      <FlatList
        data={pets}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.card}>
            <Image source={{ uri: item.photoUrl }} style={styles.image} />
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
    </View>
  );
}