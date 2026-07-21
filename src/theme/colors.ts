export type ThemeColors = {
  background: string;
  surface: string;
  surfaceHighlight: string;
  text: string;
  textMuted: string;
  primary: string;
  primaryHover: string;
  border: string;
  status: {
    success: string;
    warning: string;
    danger: string;
  };
};


export const lightTheme: ThemeColors = {
  background: '#e5dbff',
  surface: '#ffffff',
  surfaceHighlight: '#f1edff',
  text: '#4a4355',
  textMuted: '#7C7C8A',
  primary: '#9c88ff',
  primaryHover: '#7f57ff',
  border: '#e1dbe9',
  status: {
    success: '#04D361',
    warning: '#E88B12',
    danger: '#E53E3E'
  }
};

export const darkTheme: ThemeColors = {
  background: '#121214',
  surface: '#1C1B1E',
  surfaceHighlight: '#2A262E',
  text: '#E1D9E6',
  textMuted: '#7C7C8A',
  primary: '#9c88ff',
  primaryHover: '#7f57ff',
  border: '#2A262E',
  status: {
    success: '#04D361',
    warning: '#FBA94C',
    danger: '#F75A68'
  }
};

export const themes = {
  dark: darkTheme,
  light: lightTheme
};

// Fallback legacy colors to not break existing screens before migration
export const colors = darkTheme;