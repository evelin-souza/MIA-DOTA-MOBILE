import { Stack } from 'expo-router';
import { AuthProvider } from '../src/context/AuthContext';

export default function RootLayout() {
  return (
    <AuthProvider>
      <Stack screenOptions={{ headerShown: false }}>
        {/* Navegação principal por abas */}
        <Stack.Screen name="(tabs)" />

        {/* Rotas secundárias */}
        <Stack.Screen name="form-adocao" options={{ headerShown: true, title: 'Solicitar Adoção' }} />
        <Stack.Screen name="form-visita" options={{ headerShown: true, title: 'Agendar Visita' }} />
        <Stack.Screen name="cad-user" options={{ headerShown: true, title: 'Cadastre-se' }} />
        <Stack.Screen name="cad-admin" options={{ headerShown: true, title: 'Novo Admin' }} />
      </Stack>
    </AuthProvider>
  );
}