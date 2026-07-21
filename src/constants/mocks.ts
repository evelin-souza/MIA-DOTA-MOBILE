export interface User {
  id: string;
  name: string;
  email: string;
  senha: string;
  role: 'admin' | 'user'; 
  isGuest?: boolean;
}

// Mock de Administrador
export const MOCK_ADMIN: User = {
  id: 'admin-999',
  name: 'Admin',
  email: 'admin@miadota.com',
  senha: 'admin',
  role: 'admin',
  isGuest: false,
};

// Mock de Usuário Comum
export const MOCK_USER: User = {
  id: 'user-111',
  name: 'João Silva',
  email: 'user@miadota.com',
  senha: '123456789',
  role: 'user',
  isGuest: false,
};