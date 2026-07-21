import React, { createContext, useContext, useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

interface User {
  id: string;
  name: string;
  email: string;
}

interface Preferences {
  theme: 'dark' | 'light';
}

interface AuthContextData {
  user: User | null;
  token: string | null;
  isLoading: boolean;
  preferences: Preferences;
  login: (email: string, pass: string) => Promise<void>;
  logout: () => Promise<void>;
  toggleTheme: () => void;
}

// Chaves para salvar no celular
const STORAGE_TOKEN_KEY = '@MiaDota:token';
const STORAGE_USER_KEY = '@MiaDota:user';
const STORAGE_PREFS_KEY = '@MiaDota:preferences';

const AuthContext = createContext<AuthContextData>({} as AuthContextData);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [preferences, setPreferences] = useState<Preferences>({ theme: 'dark' });

  // Restaura os dados salvos no celular ao abrir o App
  useEffect(() => {
    async function loadStorageData() {
      try {
        const [storedToken, storedUser, storedPrefs] = await Promise.all([
          AsyncStorage.getItem(STORAGE_TOKEN_KEY),
          AsyncStorage.getItem(STORAGE_USER_KEY),
          AsyncStorage.getItem(STORAGE_PREFS_KEY),
        ]);

        if (storedToken && storedUser) {
          setToken(storedToken);
          setUser(JSON.parse(storedUser));
        }

        if (storedPrefs) {
          setPreferences(JSON.parse(storedPrefs));
        }
      } catch (error) {
        console.error('Erro ao carregar dados do dispositivo:', error);
      } finally {
        setIsLoading(false);
      }
    }

    loadStorageData();
  }, []);

  // Função de Login que a LoginScreen chama
  const login = async (email: string, pass: string) => {
    // Exemplo da estrutura:
    const response = {
      token: 'token-jwt-exemplo-123456',
      user: {
        id: '1',
        name: 'Jogador Dota',
        email: email,
      },
    };

    // Atualiza os estados em memória
    setToken(response.token);
    setUser(response.user);

    // Persiste no armazenamento do celular
    await AsyncStorage.setItem(STORAGE_TOKEN_KEY, response.token);
    await AsyncStorage.setItem(STORAGE_USER_KEY, JSON.stringify(response.user));
  };

  // Função para encerrar a sessão
  const logout = async () => {
    setUser(null);
    setToken(null);
    await AsyncStorage.multiRemove([STORAGE_TOKEN_KEY, STORAGE_USER_KEY]);
  };

  // Função para alternar entre Dark e Light mode
  const toggleTheme = async () => {
    const newTheme: 'dark' | 'light' = preferences.theme === 'dark' ? 'light' : 'dark';
    const newPrefs: Preferences = { ...preferences, theme: newTheme };

    setPreferences(newPrefs);
    await AsyncStorage.setItem(STORAGE_PREFS_KEY, JSON.stringify(newPrefs));
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        token,
        isLoading,
        preferences,
        login,
        logout,
        toggleTheme,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export function useAuth() {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error('useAuth deve ser usado dentro de um AuthProvider');
  }

  return context;
}