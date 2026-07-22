import { StyleSheet } from 'react-native';

export const getVitrineStyles = (theme: any) =>
  StyleSheet.create({
    container: {
      flex: 1,
      padding: 16,
      backgroundColor: theme.background,
    },
    title: {
      fontSize: 22,
      fontWeight: 'bold',
      color: theme.text,
      marginBottom: 16,
    },
    banner: {
      backgroundColor: theme.surface,
      padding: 10,
      borderRadius: 8,
      marginBottom: 16,
    },
    bannerText: {
      color: theme.text,
      fontWeight: 'bold',
      textAlign: 'center',
    },
    card: {
      borderRadius: 12,
      padding: 12,
      marginBottom: 16,
      backgroundColor: theme.surface,
    },
    image: {
      width: '100%',
      height: 180,
      borderRadius: 8,
      marginBottom: 8,
    },
    petName: {
      fontSize: 18,
      fontWeight: 'bold',
      color: theme.text,
    },
    petDetails: {
      fontSize: 14,
      color: theme.textMuted,
    },
    row: {
      flexDirection: 'row',
      gap: 10,
      marginTop: 12,
    },
    btn: {
      flex: 1,
      padding: 12,
      borderRadius: 8,
      alignItems: 'center',
      backgroundColor: theme.primary,
    },
    btnOutline: {
      flex: 1,
      padding: 12,
      borderRadius: 8,
      borderWidth: 1,
      borderColor: theme.primary,
      alignItems: 'center',
    },
    btnText: {
      color: theme.textmuted,
      fontWeight: 'bold',
    },
    btnOutlineText: {
      color: theme.primary,
      fontWeight: 'bold',
    },
  });