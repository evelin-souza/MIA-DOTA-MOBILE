import { Tabs } from 'expo-router';
import { useAuth } from '../../src/context/AuthContext';

export default function TabsLayout() {
  const { user } = useAuth();

  return (
    <Tabs screenOptions={{ headerShown: false }}>
      {/* Aba Vitrine */}
      <Tabs.Screen name="index" options={{ title: 'Vitrine' }} />
      
      {/* Aba Visitas */}
      <Tabs.Screen name="visitas" options={{ title: 'Visitas' }} />

      {/* Aba Admin (Pode ocultar se for visitante/usuário comum) */}
      <Tabs.Screen 
        name="admin" 
        options={{ 
          title: 'Cadastrar Pet',
          href: user?.isGuest ? null : '/admin' // Oculta a aba se for visitante
        }} 
      />
    </Tabs>
  );
}