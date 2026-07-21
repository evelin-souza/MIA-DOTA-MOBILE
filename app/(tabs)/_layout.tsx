import { Tabs } from 'expo-router';
import { useAuth } from '../../src/context/AuthContext';
import { themes } from '../../src/theme/colors';

export default function TabLayout() {
  const { user, preferences } = useAuth();
  const theme = themes[(preferences?.theme || 'dark') as 'dark' | 'light'];

  // Regras de Acesso
  const isAdmin = user?.role === 'admin';
  const isLoggedIn = Boolean(user && !user.isGuest); 

  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: theme.primary,
        tabBarStyle: { backgroundColor: theme.surface },
      }}
    >
      {/* Vitrine (Visível para todos: visitantes, usuários e admins) */}
      <Tabs.Screen
        name="index"
        options={{
          title: 'Vitrine',
        }}
      />

      {/* Visitas (Visível APENAS se estiver logado como Usuário ou Admin) */}
      <Tabs.Screen
        name="visitas"
        options={{
          title: 'Visitas',
          href: isLoggedIn ? '/visitas' : null, 
        }}
      />

      {/* Cadastrar Pet (Visível APENAS para Admin) */}
      <Tabs.Screen
        name="admin" 
        options={{
          title: 'Cadastrar Pet',
          href: isAdmin ? '/admin' : null, 
        }}
      />
    </Tabs>
  );
}