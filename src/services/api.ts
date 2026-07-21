import AsyncStorage from '@react-native-async-storage/async-storage';
const BASE_URL = process.env.EXPO_PUBLIC_API_URL || 'http://localhost:3000';

export const API_URL = `${BASE_URL}/api`;
export const AUTH_URL = `${BASE_URL}/auth`;

export const apiFetch = async (endpoint: string, options: RequestInit = {}) => {
  try {
    // Decide a URL de destino: se o endpoint começar com '/auth', vai para AUTH_URL
    const url = endpoint.startsWith('http')
      ? endpoint
      : `${endpoint.startsWith('/auth') ? AUTH_URL : API_URL}${endpoint.replace('/auth', '')}`;

    // Tenta recuperar o token de autenticação caso o usuário esteja logado
    const token = await AsyncStorage.getItem('@user_token');

    let headers: any = {
      'Content-Type': 'application/json',
      ...(token ? { Authorization: `Bearer ${token}` } : {}), // Injeta o token se existir
      ...(options.headers || {}),
    };

    // Remove Content-Type se for envio de fotos/arquivos via FormData
    if (options.body instanceof FormData) {
      delete headers['Content-Type'];
    }

    const response = await fetch(url, {
      ...options,
      headers,
    });

    if (!response.ok) {
      throw new Error(`Erro na API [${response.status}]`);
    }

    const text = await response.text();
    if (!text) return null;
    return JSON.parse(text);
  } catch (error) {
    console.error(`API Fetch Error [${endpoint}]:`, error);
    throw error;
  }
};