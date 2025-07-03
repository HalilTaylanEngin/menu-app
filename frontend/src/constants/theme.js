// Theme constants for the application
export const THEMES = {
  LIGHT: 'light',
  DARK: 'dark'
};

export const THEME_COLORS = {
  light: {
    // Background colors
    primary: '#ffffff',
    secondary: '#f8fafc',
    tertiary: '#f1f5f9',
    
    // Text colors
    textPrimary: '#1f2937',
    textSecondary: '#6b7280',
    textTertiary: '#9ca3af',
    
    // Border colors
    border: '#e5e7eb',
    borderLight: '#f3f4f6',
    
    // Button colors
    buttonPrimary: '#3b82f6',
    buttonPrimaryHover: '#2563eb',
    buttonSecondary: '#e5e7eb',
    buttonSecondaryHover: '#d1d5db',
    
    // Navigation colors
    navBackground: '#ffffff',
    navBorder: '#e5e7eb',
    navActive: '#dbeafe',
    navActiveText: '#2563eb',
    navInactive: '#6b7280',
    
    // Status colors
    success: '#10b981',
    error: '#ef4444',
    warning: '#f59e0b',
    info: '#3b82f6'
  },
  dark: {
    // Background colors
    primary: '#111827',
    secondary: '#1f2937',
    tertiary: '#374151',
    
    // Text colors
    textPrimary: '#f9fafb',
    textSecondary: '#d1d5db',
    textTertiary: '#9ca3af',
    
    // Border colors
    border: '#374151',
    borderLight: '#4b5563',
    
    // Button colors
    buttonPrimary: '#3b82f6',
    buttonPrimaryHover: '#2563eb',
    buttonSecondary: '#374151',
    buttonSecondaryHover: '#4b5563',
    
    // Navigation colors
    navBackground: '#1f2937',
    navBorder: '#374151',
    navActive: '#1e40af',
    navActiveText: '#60a5fa',
    navInactive: '#9ca3af',
    
    // Status colors
    success: '#10b981',
    error: '#ef4444',
    warning: '#f59e0b',
    info: '#3b82f6'
  }
};

export const THEME_CLASSES = {
  light: {
    // Background classes
    bgPrimary: 'bg-white',
    bgSecondary: 'bg-slate-50',
    bgTertiary: 'bg-slate-100',
    
    // Text classes
    textPrimary: 'text-gray-800',
    textSecondary: 'text-gray-600',
    textTertiary: 'text-gray-500',
    
    // Border classes
    border: 'border-gray-200',
    borderLight: 'border-gray-100',
    
    // Button classes
    btnPrimary: 'bg-blue-500 hover:bg-blue-600 text-white',
    btnSecondary: 'bg-gray-200 hover:bg-gray-300 text-gray-800',
    
    // Navigation classes
    navBg: 'bg-white',
    navBorder: 'border-gray-200',
    navActive: 'text-blue-600 bg-blue-50',
    navInactive: 'text-gray-600 hover:text-blue-600 hover:bg-gray-50'
  },
  dark: {
    // Background classes
    bgPrimary: 'bg-gray-900',
    bgSecondary: 'bg-gray-800',
    bgTertiary: 'bg-gray-700',
    
    // Text classes
    textPrimary: 'text-gray-100',
    textSecondary: 'text-gray-300',
    textTertiary: 'text-gray-400',
    
    // Border classes
    border: 'border-gray-700',
    borderLight: 'border-gray-600',
    
    // Button classes
    btnPrimary: 'bg-blue-600 hover:bg-blue-700 text-white',
    btnSecondary: 'bg-gray-700 hover:bg-gray-600 text-gray-200',
    
    // Navigation classes
    navBg: 'bg-gray-800',
    navBorder: 'border-gray-700',
    navActive: 'text-blue-400 bg-blue-900',
    navInactive: 'text-gray-400 hover:text-blue-400 hover:bg-gray-700'
  }
};
