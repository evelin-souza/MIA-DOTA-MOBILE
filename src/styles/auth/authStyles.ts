import { StyleSheet } from 'react-native';
import { ThemeColors } from '../../../../theme/colors';

export const getAuthStyles = (theme: ThemeColors) =>
  StyleSheet.create({
    safeArea: {
      flex: 1,
      backgroundColor: theme.background,
    },
    container: {
      flex: 1,
      padding: 24,
      backgroundColor: theme.background,
    },
    centerWrapper: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
    },
    headerArea: {
      alignItems: 'center',
      marginBottom: 32,
    },
    title: {
      fontSize: 24,
      fontWeight: 'bold',
      color: theme.text,
      marginBottom: 16,
    },
    subtitle: {
      fontSize: 16,
      color: theme.textMuted,
      marginBottom: 32,
    },
    logoContainer: {
      alignItems: 'center',
      marginBottom: 32,
    },
    logoCircle: {
      width: 72,
      height: 72,
      borderRadius: 36,
      backgroundColor: theme.primary,
      justifyContent: 'center',
      alignItems: 'center',
      marginBottom: 16,
    },
    logoText: {
      color: '#ffffff',
      fontSize: 24,
      fontWeight: 'bold',
    },
    formContainer: {
      width: '100%',
    },
    inputWrapper: {
      flexDirection: 'row',
      alignItems: 'center',
      marginBottom: 16,
    },
    inputIcon: {
      marginRight: 8,
    },
    input: {
      height: 44,
      borderColor: theme.border,
      borderWidth: 1,
      borderRadius: 8,
      paddingHorizontal: 12,
      marginBottom: 12,
      color: theme.text,
      backgroundColor: theme.surface,
    },
    button: {
      backgroundColor: theme.primary,
      paddingVertical: 12,
      borderRadius: 8,
      alignItems: 'center',
      justifyContent: 'center',
    },
    buttonText: {
      color: '#ffffff',
      fontSize: 16,
      fontWeight: 'bold',
    },
    registerLink: {
      marginTop: 16,
      alignItems: 'center',
    },
    registerText: {
      color: theme.textMuted,
      fontSize: 14,
    },
    mockActions: {
      marginTop: 24,
      alignItems: 'center',
    },
    mockButtonsRow: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      width: '100%',
    },
    mockButton: {
      backgroundColor: theme.surface,
      paddingVertical: 8,
      paddingHorizontal: 16,
      borderRadius: 4,
      alignItems: 'center',
      justifyContent: 'center',
      marginTop: 16,
    },
    mockButtonText: {
      color: theme.text,
      fontSize: 14,
    },
  });