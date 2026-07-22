import AsyncStorage from '@react-native-async-storage/async-storage';

//  Chave igual à usada no AuthContext.tsx
const STORAGE_TOKEN_KEY = '@MiaDota:token';

const BASE_URL = process.env.EXPO_PUBLIC_API_URL || 'http://localhost:3000';

export const API_URL = `${BASE_URL}/api`;
export const AUTH_URL = `${BASE_URL}/auth`;

export const apiFetch = async (endpoint: string, options: RequestInit = {}) => {
  try {
    // Decide a URL de destino
    const url = endpoint.startsWith('http')
      ? endpoint
      : `${endpoint.startsWith('/auth') ? AUTH_URL : API_URL}${endpoint.replace('/auth', '')}`;

    //  Recupera a chave correta salva pelo AuthContext
    const token = await AsyncStorage.getItem(STORAGE_TOKEN_KEY);

    let headers: Record<string, string> = {
      'Content-Type': 'application/json',
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
      ...((options.headers as Record<string, string>) || {}),
    };

    // Remove Content-Type se for envio de fotos/arquivos via FormData
    if (options.body instanceof FormData) {
      delete headers['Content-Type'];
    }

    const response = await fetch(url, {
      ...options,
      headers,
    });

    // Lê a resposta em texto
    const text = await response.text();
    const data = text ? JSON.parse(text) : null;

    //  Captura a mensagem de erro detalhada vinda do NestJS
    if (!response.ok) {
      const errorMessage = data?.message
        ? Array.isArray(data.message)
          ? data.message.join(', ')
          : data.message
        : `Erro na API [${response.status}]`;

      throw new Error(errorMessage);
    }

    return data;
  } catch (error: any) {
    console.error(`API Fetch Error [${endpoint}]:`, error?.message || error);
    throw error;
  }
};