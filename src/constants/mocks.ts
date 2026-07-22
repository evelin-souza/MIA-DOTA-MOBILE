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

// src/constants/mocks.ts

export interface Animal {
  id: string;
  name: string;
  species: 'dog' | 'cat' | 'other';
  breed?: string;
  age: string;
  gender: 'macho' | 'femea';
  size: 'Pequeno' | 'Médio' | 'Grande';
  description: string;
  imageUrl: string;
  status: 'disponivel' | 'adotado';
}

// 🐾 Lista de animais mockados para testes
export const MOCK_ANIMALS: Animal[] = [
  {
    id: 'pet-1',
    name: 'Thor',
    species: 'dog',
    breed: 'Vira-lata (SRD)',
    age: '2 anos',
    gender: 'macho',
    size: 'Médio',
    description: 'Thor é super brincalhão, dócil e adora correr no parque. Ideal para famílias com espaço!',
    imageUrl: 'https://images.unsplash.com/photo-1543466835-00a7907e9de1?q=80&w=600',
    status: 'disponivel',
  },
  {
    id: 'pet-2',
    name: 'Mia',
    species: 'cat',
    breed: 'Siamês',
    age: '1 ano',
    gender: 'femea',
    size: 'Pequeno',
    description: 'Mia é uma gatinha muito carinhosa que adora um colo e dormir ao sol.',
    imageUrl: 'https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?q=80&w=600',
    status: 'disponivel',
  },
  {
    id: 'pet-3',
    name: 'Bob',
    species: 'dog',
    breed: 'Golden Retriever',
    age: '3 anos',
    gender: 'macho',
    size: 'Grande',
    description: 'Bob é extremamente calmo, treinado e se dá bem com outros cachorros e crianças.',
    imageUrl: 'https://images.unsplash.com/photo-1552053831-71594a27632d?q=80&w=600',
    status: 'disponivel',
  },
  {
    id: 'pet-4',
    name: 'Luna',
    species: 'cat',
    breed: 'Persa',
    age: '6 meses',
    gender: 'femea',
    size: 'Pequeno',
    description: 'Filhote cheia de energia, adora brinquedos de pena e arranhadores.',
    imageUrl: 'https://images.unsplash.com/photo-1573865526739-10659fec78a5?q=80&w=600',
    status: 'disponivel',
  },
];