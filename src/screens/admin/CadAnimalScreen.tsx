import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  ActivityIndicator,
  Alert,
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useAuth } from '../../context/AuthContext';
import { themes } from '../../theme/colors';

export default function CadAnimalScreen() {
  const { preferences } = useAuth();
  const theme = themes[(preferences?.theme || 'dark') as 'dark' | 'light'];
  const insets = useSafeAreaInsets();

  const [name, setName] = useState('');
  const [species, setSpecies] = useState<'Cão' | 'Gato'>('Cão');
  const [size, setSize] = useState<'PEQUENO' | 'MEDIO' | 'GRANDE'>('PEQUENO');
  const [gender, setGender] = useState<'Macho' | 'Fêmea'>('Macho');
  const [age, setAge] = useState('');
  const [arrivalDate, setArrivalDate] = useState('');
  const [org, setOrg] = useState('');
  const [status, setStatus] = useState('Disponível');
  const [photoUrl, setPhotoUrl] = useState('');
  const [description, setDescription] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  // Função equivalente ao cadastrarPet(event)
  const handleCadastrarPet = async () => {
    if (!name || !age || !arrivalDate || !photoUrl || !description) {
      Alert.alert('Atenção', 'Por favor, preencha todos os campos obrigatórios.');
      return;
    }

    setIsLoading(true);

    try {
      const payload = {
        name,
        species,
        size,
        gender,
        age,
        arrivalDate,
        org,
        status,
        photoUrl,
        description,
      };

      // TODO: Substitua pela chamada real à sua API / Backend
      console.log('Enviando Pet:', payload);

      Alert.alert('Sucesso!', 'Pet cadastrado e colocado na vitrine!');
      
      // Limpar formulário
      setName('');
      setAge('');
      setArrivalDate('');
      setPhotoUrl('');
      setDescription('');
    } catch (error) {
      Alert.alert('Erro', 'Não foi possível cadastrar o pet.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <KeyboardAvoidingView
      style={{ flex: 1, backgroundColor: theme.background }}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <ScrollView
        contentContainerStyle={{
          paddingHorizontal: 20,
          paddingTop: insets.top + 16,
          paddingBottom: insets.bottom + 32,
        }}
        keyboardShouldPersistTaps="handled"
      >
        <Text style={[styles.title, { color: theme.text }]}>
          Cadastrar Novo Pet para a Vitrine
        </Text>

        {/* Nome do Pet */}
        <View style={styles.formGroup}>
          <Text style={[styles.label, { color: theme.text }]}>Nome do Pet *</Text>
          <TextInput
            style={[styles.input, { color: theme.text, borderColor: theme.border, backgroundColor: theme.surface }]}
            placeholder="Ex: Frederico"
            placeholderTextColor={theme.textMuted}
            value={name}
            onChangeText={setName}
          />
        </View>

        {/* Espécie (Cão / Gato) */}
        <View style={styles.formGroup}>
          <Text style={[styles.label, { color: theme.text }]}>Espécie *</Text>
          <View style={styles.chipRow}>
            {(['Cão', 'Gato'] as const).map((item) => (
              <TouchableOpacity
                key={item}
                style={[
                  styles.chip,
                  { borderColor: theme.border },
                  species === item && { backgroundColor: theme.primary, borderColor: theme.primary },
                ]}
                onPress={() => setSpecies(item)}
              >
                <Text style={{ color: species === item ? '#fff' : theme.text, fontWeight: 'bold' }}>
                  {item}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* Porte (Pequeno / Médio / Grande) */}
        <View style={styles.formGroup}>
          <Text style={[styles.label, { color: theme.text }]}>Porte *</Text>
          <View style={styles.chipRow}>
            {(['PEQUENO', 'MEDIO', 'GRANDE'] as const).map((item) => (
              <TouchableOpacity
                key={item}
                style={[
                  styles.chip,
                  { borderColor: theme.border },
                  size === item && { backgroundColor: theme.primary, borderColor: theme.primary },
                ]}
                onPress={() => setSize(item)}
              >
                <Text style={{ color: size === item ? '#fff' : theme.text, fontWeight: 'bold' }}>
                  {item === 'PEQUENO' ? 'Pequeno' : item === 'MEDIO' ? 'Médio' : 'Grande'}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* Sexo (Macho / Fêmea) */}
        <View style={styles.formGroup}>
          <Text style={[styles.label, { color: theme.text }]}>Sexo *</Text>
          <View style={styles.chipRow}>
            {(['Macho', 'Fêmea'] as const).map((item) => (
              <TouchableOpacity
                key={item}
                style={[
                  styles.chip,
                  { borderColor: theme.border },
                  gender === item && { backgroundColor: theme.primary, borderColor: theme.primary },
                ]}
                onPress={() => setGender(item)}
              >
                <Text style={{ color: gender === item ? '#fff' : theme.text, fontWeight: 'bold' }}>
                  {item}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* Idade Estimada */}
        <View style={styles.formGroup}>
          <Text style={[styles.label, { color: theme.text }]}>Idade Estimada *</Text>
          <TextInput
            style={[styles.input, { color: theme.text, borderColor: theme.border, backgroundColor: theme.surface }]}
            placeholder="Ex: 2 anos ou 5 meses"
            placeholderTextColor={theme.textMuted}
            value={age}
            onChangeText={setAge}
          />
        </View>

        {/* Data de Chegada */}
        <View style={styles.formGroup}>
          <Text style={[styles.label, { color: theme.text }]}>Data de Chegada *</Text>
          <TextInput
            style={[styles.input, { color: theme.text, borderColor: theme.border, backgroundColor: theme.surface }]}
            placeholder="AAAA-MM-DD"
            placeholderTextColor={theme.textMuted}
            value={arrivalDate}
            onChangeText={setArrivalDate}
          />
        </View>

        {/* Status Inicial */}
        <View style={styles.formGroup}>
          <Text style={[styles.label, { color: theme.text }]}>Status Inicial *</Text>
          <View style={styles.chipRow}>
            {['Disponível', 'Adotado', 'Em Tratamento'].map((item) => (
              <TouchableOpacity
                key={item}
                style={[
                  styles.chip,
                  { borderColor: theme.border },
                  status === item && { backgroundColor: theme.primary, borderColor: theme.primary },
                ]}
                onPress={() => setStatus(item)}
              >
                <Text style={{ color: status === item ? '#fff' : theme.text, fontWeight: 'bold' }}>
                  {item}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* URL da Foto */}
        <View style={styles.formGroup}>
          <Text style={[styles.label, { color: theme.text }]}>URL da Foto do Pet *</Text>
          <TextInput
            style={[styles.input, { color: theme.text, borderColor: theme.border, backgroundColor: theme.surface }]}
            placeholder="https://linkdafoto.com/imagem.jpg"
            placeholderTextColor={theme.textMuted}
            value={photoUrl}
            onChangeText={setPhotoUrl}
            autoCapitalize="none"
            keyboardType="url"
          />
        </View>

        {/* Descrição / História */}
        <View style={styles.formGroup}>
          <Text style={[styles.label, { color: theme.text }]}>Descrição / História *</Text>
          <TextInput
            style={[
              styles.input,
              styles.textArea,
              { color: theme.text, borderColor: theme.border, backgroundColor: theme.surface },
            ]}
            placeholder="Fale sobre as características e temperamento do animal..."
            placeholderTextColor={theme.textMuted}
            value={description}
            onChangeText={setDescription}
            multiline
            numberOfLines={4}
            textAlignVertical="top"
          />
        </View>

        {/* Botão de Envio */}
        <TouchableOpacity
          style={[styles.submitButton, { backgroundColor: theme.primary }]}
          onPress={handleCadastrarPet}
          disabled={isLoading}
          activeOpacity={0.8}
        >
          {isLoading ? (
            <ActivityIndicator color="#fff" />
          ) : (
            <Text style={styles.submitButtonText}>Colocar na Vitrine</Text>
          )}
        </TouchableOpacity>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 24,
  },
  formGroup: {
    marginBottom: 18,
  },
  label: {
    fontSize: 14,
    fontWeight: '600',
    marginBottom: 8,
  },
  input: {
    height: 48,
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 12,
    fontSize: 15,
  },
  textArea: {
    height: 100,
    paddingTop: 12,
  },
  chipRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  chip: {
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 20,
    borderWidth: 1,
  },
  submitButton: {
    height: 50,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 12,
  },
  submitButtonText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});