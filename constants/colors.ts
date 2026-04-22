export const Colors = {
  dark: {
    primary: '#4A9EFF',
    background: '#0A0A0F',
    surface: '#16161F',
    surfaceLight: '#1E1E2A',
    text: '#FFFFFF',
    textSecondary: '#8E8E9A',
    accent: '#4A9EFF',
    accentLight: '#4A9EFF22',
    border: '#2A2A35',
    error: '#FF6B6B',
    success: '#4ADE80',
    tabBar: '#0E0E14',
    card: '#16161F',
  },
  light: {
    primary: '#2563EB',
    background: '#F8FAFC',
    surface: '#FFFFFF',
    surfaceLight: '#F1F5F9',
    text: '#0F172A',
    textSecondary: '#64748B',
    accent: '#2563EB',
    accentLight: '#2563EB15',
    border: '#E2E8F0',
    error: '#EF4444',
    success: '#22C55E',
    tabBar: '#FFFFFF',
    card: '#FFFFFF',
  },
};

export type ColorScheme = keyof typeof Colors;
