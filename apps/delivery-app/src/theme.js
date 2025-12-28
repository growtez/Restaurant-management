// Theme configuration for Delivery App
export const spacing = {
    xs: 4,
    sm: 8,
    md: 12,
    lg: 16,
    xl: 24,
    xxl: 32,
};

export const borderRadius = {
    sm: 8,
    md: 12,
    lg: 16,
    xl: 20,
    full: 9999,
};

// Dark Theme Colors (default)
export const darkColors = {
    primary: '#4CAF50',      // Green for delivery
    primaryDark: '#388E3C',
    background: '#212121',
    card: '#2D2D2D',
    cardHover: '#333333',
    text: '#FFFFFF',
    textSecondary: '#CCCCCC',
    textMuted: '#888888',
    success: '#4CAF50',
    warning: '#FF9800',
    error: '#FF4444',
    border: '#333333',
    star: '#FFD700',
    online: '#4CAF50',
    offline: '#9E9E9E',
    overlay: 'rgba(0, 0, 0, 0.8)',
    inputBg: 'rgba(255, 255, 255, 0.1)',
};

// Light Theme Colors
export const lightColors = {
    primary: '#4CAF50',
    primaryDark: '#388E3C',
    background: '#F5F5F5',
    card: '#FFFFFF',
    cardHover: '#EEEEEE',
    text: '#212121',
    textSecondary: '#666666',
    textMuted: '#999999',
    success: '#4CAF50',
    warning: '#FF9800',
    error: '#FF4444',
    border: '#E0E0E0',
    star: '#FFD700',
    online: '#4CAF50',
    offline: '#9E9E9E',
    overlay: 'rgba(0, 0, 0, 0.5)',
    inputBg: 'rgba(0, 0, 0, 0.05)',
};

// Default export for backward compatibility
export const colors = darkColors;
