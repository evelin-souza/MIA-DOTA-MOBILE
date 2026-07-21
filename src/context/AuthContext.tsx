import React, { createContext, useContext, useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

interface User {
  id: string;
  name: string;
  email: string;
  isGuest?: boolean; 
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
  loginAsGuest: () => Promise<void>;
  logout: () => Promise<void>;
  toggleTheme: () => void;
}

const STORAGE_TOKEN_KEY = '@MiaDota:token';
const STORAGE_USER_KEY = '@MiaDota:user';
const STORAGE_PREFS_KEY = '@MiaDota:preferences';

const AuthContext = createContext<AuthContextData>({} as AuthContextData);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [preferences, setPreferences] = useState<Preferences>({ theme: 'dark' });

  // Restaura os dados salvos no dispositivo ao abrir o App
  useEffect(() => {
    async function loadStorageData() {
      try {
        const [storedToken, storedUser, storedPrefs] = await Promise.all([
          AsyncStorage.getItem(STORAGE_TOKEN_KEY),
          AsyncStorage.getItem(STORAGE_USER_KEY),
          AsyncStorage.getItem(STORAGE_PREFS_KEY),
        ]);

        // Restaura usuário (seja Visitante ou Logado)
        if (storedUser) {
          const parsedUser: User = JSON.parse(storedUser);
          setUser(parsedUser);

          // Se tiver token e não for visitante, restaura o token
          if (storedToken && !parsedUser.isGuest) {
            setToken(storedToken);
          }
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

  // Entrar como Visitante sem travar a UI
  const loginAsGuest = async () => {
    const guestUser: User = { 
      id: 'guest', 
      name: 'Visitante', 
      email: '', 
      isGuest: true 
    };

    try {
      setToken(null);
      setUser(guestUser); // Atualiza a tela imediatamente
      await AsyncStorage.setItem(STORAGE_USER_KEY, JSON.stringify(guestUser));
      await AsyncStorage.removeItem(STORAGE_TOKEN_KEY);
    } catch (error) {
      console.error('Erro ao salvar sessão de visitante:', error);
    }
  };

  // Função de Login Tradicional
  const login = async (email: string, pass: string) => {
    const response = {
      token: 'token-jwt-exemplo-123456',
      user: {
        id: '1',
        name: 'Jogador Dota',
        email: email,
        isGuest: false,
      },
    };

    try {
      setToken(response.token);
      setUser(response.user);

      await AsyncStorage.setItem(STORAGE_TOKEN_KEY, response.token);
      await AsyncStorage.setItem(STORAGE_USER_KEY, JSON.stringify(response.user));
    } catch (error) {
      console.error('Erro ao salvar login:', error);
      throw error;
    }
  };

  // Encerra a sessão
  const logout = async () => {
    try {
      setUser(null);
      setToken(null);
      await AsyncStorage.multiRemove([STORAGE_TOKEN_KEY, STORAGE_USER_KEY]);
    } catch (error) {
      console.error('Erro ao fazer logout:', error);
    }
  };

  // Alterna tema Dark / Light
  const toggleTheme = async () => {
    try {
      const newTheme: 'dark' | 'light' = preferences.theme === 'dark' ? 'light' : 'dark';
      const newPrefs: Preferences = { ...preferences, theme: newTheme };

      setPreferences(newPrefs);
      await AsyncStorage.setItem(STORAGE_PREFS_KEY, JSON.stringify(newPrefs));
    } catch (error) {
      console.error('Erro ao alternar tema:', error);
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        token,
        isLoading,
        preferences,
        login,
        loginAsGuest,
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