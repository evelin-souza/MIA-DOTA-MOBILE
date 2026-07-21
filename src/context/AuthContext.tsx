import React, { createContext, useContext, useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { apiFetch } from '../services/api';
import { MOCK_ADMIN, MOCK_USER, User } from '../constants/mocks'; 

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

        if (storedUser) {
          const parsedUser: User = JSON.parse(storedUser);

          // 💡 Só restaura se não for visitante e possuir token
          if (storedToken && !parsedUser.isGuest) {
            setUser(parsedUser);
            setToken(storedToken);
          } else {
            await AsyncStorage.multiRemove([STORAGE_TOKEN_KEY, STORAGE_USER_KEY]);
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

  // Entrar como Visitante apenas na sessão atual (não salva no AsyncStorage)
  const loginAsGuest = async () => {
    const guestUser: User = { 
      id: 'guest', 
      name: 'Visitante', 
      email: '', 
      senha: '',
      role: 'user',
      isGuest: true 
    };

    try {
      setToken(null);
      setUser(guestUser);
      await AsyncStorage.multiRemove([STORAGE_TOKEN_KEY, STORAGE_USER_KEY]);
    } catch (error) {
      console.error('Erro ao iniciar sessão de visitante:', error);
    }
  };

  // Função de Login (Com suporte a Mocks e API Real)
  const login = async (email: string, pass: string) => {
    const emailLower = email.trim().toLowerCase();

    // MOCK DE ADMIN
    if (emailLower === MOCK_ADMIN.email) {
      setUser(MOCK_ADMIN);
      setToken('mock-jwt-token-admin');
      await AsyncStorage.setItem(STORAGE_TOKEN_KEY, 'mock-jwt-token-admin');
      await AsyncStorage.setItem(STORAGE_USER_KEY, JSON.stringify(MOCK_ADMIN));
      return;
    }

    //  MOCK DE USUÁRIO COMUM
    if (emailLower === MOCK_USER.email) {
      setUser(MOCK_USER);
      setToken('mock-jwt-token-user');
      await AsyncStorage.setItem(STORAGE_TOKEN_KEY, 'mock-jwt-token-user');
      await AsyncStorage.setItem(STORAGE_USER_KEY, JSON.stringify(MOCK_USER));
      return;
    }

    // LOGIN REAL NA API NESTJS
    try {
      const response = await apiFetch('/auth/login', {
        method: 'POST',
        body: JSON.stringify({ email: emailLower, password: pass }),
      });

      const userToken = response.access_token || response.token;
      const userData: User = response.user || {
        id: response.id || '1',
        name: response.name || 'Usuário',
        email: emailLower,
        role: response.role || 'user',
        isGuest: false,
      };

      setToken(userToken);
      setUser(userData);

      await AsyncStorage.setItem(STORAGE_TOKEN_KEY, userToken);
      await AsyncStorage.setItem(STORAGE_USER_KEY, JSON.stringify(userData));
    } catch (error) {
      console.error('Erro ao realizar login no backend:', error);
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