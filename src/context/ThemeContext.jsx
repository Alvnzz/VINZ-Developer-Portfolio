import { createContext, useContext, useEffect, useState, useCallback } from 'react';

const ThemeContext = createContext(null);

/**
 * Converts a hex color string to space-separated RGB values.
 * Required because Tailwind's opacity modifiers (e.g., /70) only work
 * when CSS variables store raw RGB triplets, not hex strings.
 * Example: '#8ed5ff' → '142 213 255'
 */
function hexToRgb(hex) {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  if (!result) return hex; // fallback for non-hex values
  return `${parseInt(result[1], 16)} ${parseInt(result[2], 16)} ${parseInt(result[3], 16)}`;
}

/**
 * Complete color token palettes.
 * Dark mode matches the ORIGINAL design exactly.
 * Light mode is a carefully crafted inversion.
 * Values stored as hex for readability — converted to RGB at runtime.
 */
const THEME_TOKENS = {
  light: {
    '--color-on-surface-variant': '#44474f',
    '--color-surface-variant': '#e1e2ec',
    '--color-surface': '#fafbff',
    '--color-surface-dim': '#d9d9e0',
    '--color-inverse-primary': '#8ed5ff',
    '--color-on-error': '#ffffff',
    '--color-on-secondary': '#ffffff',
    '--color-error-container': '#ffdad6',
    '--color-on-primary-fixed': '#001e2c',
    '--color-on-tertiary-fixed-variant': '#004c6e',
    '--color-primary': '#006590',
    '--color-background': '#fafbff',
    '--color-primary-container': '#c4e7ff',
    '--color-on-primary': '#ffffff',
    '--color-on-primary-container': '#001e2c',
    '--color-surface-tint': '#006590',
    '--color-surface-container-low': '#f3f3fa',
    '--color-tertiary-container': '#c9e6ff',
    '--color-on-secondary-fixed-variant': '#39485a',
    '--color-on-error-container': '#410002',
    '--color-inverse-on-surface': '#f1f0f7',
    '--color-tertiary': '#006494',
    '--color-inverse-surface': '#2f3036',
    '--color-error': '#ba1a1a',
    '--color-tertiary-fixed-dim': '#89ceff',
    '--color-secondary-fixed-dim': '#b9c8de',
    '--color-primary-fixed': '#c4e7ff',
    '--color-on-secondary-fixed': '#0d1c2d',
    '--color-tertiary-fixed': '#c9e6ff',
    '--color-surface-container': '#ededf4',
    '--color-on-primary-fixed-variant': '#004c69',
    '--color-surface-bright': '#fafbff',
    '--color-on-tertiary-container': '#001e2f',
    '--color-on-tertiary': '#ffffff',
    '--color-primary-fixed-dim': '#7bd0ff',
    '--color-on-secondary-container': '#0d1c2d',
    '--color-surface-container-highest': '#e2e1e9',
    '--color-on-surface': '#1b1b21',
    '--color-on-background': '#1b1b21',
    '--color-outline': '#74777f',
    '--color-on-tertiary-fixed': '#001e2f',
    '--color-surface-container-high': '#e7e5ed',
    '--color-outline-variant': '#c4c6d0',
    '--color-secondary-fixed': '#d4e4fa',
    '--color-secondary-container': '#d4e4fa',
    '--color-secondary': '#505f72',
    '--color-surface-container-lowest': '#ffffff',
  },
  dark: {
    // *** EXACT original design colors ***
    '--color-on-surface-variant': '#bdc8d1',
    '--color-surface-variant': '#34343a',
    '--color-surface': '#121318',
    '--color-surface-dim': '#121318',
    '--color-inverse-primary': '#00668a',
    '--color-on-error': '#690005',
    '--color-on-secondary': '#233143',
    '--color-error-container': '#93000a',
    '--color-on-primary-fixed': '#001e2c',
    '--color-on-tertiary-fixed-variant': '#004c6e',
    '--color-primary': '#8ed5ff',
    '--color-background': '#121318',
    '--color-primary-container': '#38bdf8',
    '--color-on-primary': '#00354a',
    '--color-on-primary-container': '#004965',
    '--color-surface-tint': '#7bd0ff',
    '--color-surface-container-low': '#1a1b21',
    '--color-tertiary-container': '#43bbff',
    '--color-on-secondary-fixed-variant': '#39485a',
    '--color-on-error-container': '#ffdad6',
    '--color-inverse-on-surface': '#2f3036',
    '--color-tertiary': '#98d3ff',
    '--color-inverse-surface': '#e3e1e9',
    '--color-error': '#ffb4ab',
    '--color-tertiary-fixed-dim': '#89ceff',
    '--color-secondary-fixed-dim': '#b9c8de',
    '--color-primary-fixed': '#c4e7ff',
    '--color-on-secondary-fixed': '#0d1c2d',
    '--color-tertiary-fixed': '#c9e6ff',
    '--color-surface-container': '#1e1f25',
    '--color-on-primary-fixed-variant': '#004c69',
    '--color-surface-bright': '#38393f',
    '--color-on-tertiary-container': '#00486a',
    '--color-on-tertiary': '#00344d',
    '--color-primary-fixed-dim': '#7bd0ff',
    '--color-on-secondary-container': '#a7b6cc',
    '--color-surface-container-highest': '#34343a',
    '--color-on-surface': '#e3e1e9',
    '--color-on-background': '#e3e1e9',
    '--color-outline': '#87929a',
    '--color-on-tertiary-fixed': '#001e2f',
    '--color-surface-container-high': '#292a2f',
    '--color-outline-variant': '#3e484f',
    '--color-secondary-fixed': '#d4e4fa',
    '--color-secondary-container': '#39485a',
    '--color-secondary': '#b9c8de',
    '--color-surface-container-lowest': '#0d0e13',
  },
};

/**
 * Manages dark/light mode by toggling the `dark` class on <html>
 * and programmatically setting CSS custom properties as RGB triplets.
 * Persists preference to localStorage.
 */
export function ThemeProvider({ children }) {
  const [isDark, setIsDark] = useState(() => {
    const stored = localStorage.getItem('theme');
    if (stored) return stored === 'dark';
    return true; // default to dark mode
  });

  useEffect(() => {
    const html = document.documentElement;

    if (isDark) {
      html.classList.add('dark');
    } else {
      html.classList.remove('dark');
    }

    // Convert hex to RGB triplets so Tailwind opacity modifiers (e.g. /70) work
    const tokens = isDark ? THEME_TOKENS.dark : THEME_TOKENS.light;
    for (const [property, value] of Object.entries(tokens)) {
      html.style.setProperty(property, hexToRgb(value));
    }

    localStorage.setItem('theme', isDark ? 'dark' : 'light');
  }, [isDark]);

  const toggleTheme = useCallback(() => setIsDark(prev => !prev), []);

  return (
    <ThemeContext.Provider value={{ isDark, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const ctx = useContext(ThemeContext);
  if (!ctx) throw new Error('useTheme must be used within ThemeProvider');
  return ctx;
}
