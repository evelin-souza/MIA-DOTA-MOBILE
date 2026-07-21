import { StyleSheet } from 'react-native';
import { ThemeColors } from '../../theme/colors';

export const getProfileStyles = (theme: ThemeColors) =>
  StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: theme.background,
      paddingHorizontal: 24,
    },
    header: {
      color: theme.text,
      fontSize: 28,
      fontWeight: 'bold',
      marginBottom: 32,
    },
    profileHeader: {
      alignItems: 'center',
      marginBottom: 40,
    },
    avatarContainer: {
      width: 96,
      height: 96,
      borderRadius: 48,
      backgroundColor: theme.primary,
      justifyContent: 'center',
      alignItems: 'center',
      marginBottom: 16,
    },
    avatarText: {
      color: '#ffffff',
      fontSize: 36,
      fontWeight: 'bold',
    },
    userName: {
      color: theme.text,
      fontSize: 20,
      fontWeight: 'bold',
      marginBottom: 4,
    },
    userEmail: {
      color: theme.textMuted,
      fontSize: 14,
    },
    sectionContainer: {
      marginBottom: 32,
    },
    logoutButton: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
      height: 48,
      backgroundColor: 'transparent',
      borderRadius: 8,
      borderWidth: 1,
      borderColor: theme.status.danger,
      marginTop: 16,
    },
    logoutText: {
      color: theme.status.danger,
      fontSize: 16,
      fontWeight: 'bold',
    },
  });