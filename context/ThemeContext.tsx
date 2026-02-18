import React, { createContext, useContext, useState, useEffect, useCallback, ReactNode } from 'react';
import { DingleTheme } from '../types/theme';
import { themes, themeList } from '../data/themes';

const STORAGE_KEY = 'dingle-theme';

interface ThemeContextType {
  theme: DingleTheme;
  setThemeById: (id: string) => void;
  allThemes: DingleTheme[];
}

const ThemeContext = createContext<ThemeContextType | null>(null);

function applyThemeCSSVars(theme: DingleTheme) {
  const root = document.documentElement;
  root.style.setProperty('--bg-base', theme.bgBase);
  root.style.setProperty('--bg-elevated', theme.bgElevated);
  root.style.setProperty('--bg-sunken', theme.bgSunken);
  root.style.setProperty('--bg-hover', theme.bgSunken); // re-use sunken for hover

  root.style.setProperty('--accent', theme.accent);
  root.style.setProperty('--accent-hover', theme.accentHover);
  root.style.setProperty('--accent-light', theme.accentLight);
  root.style.setProperty('--accent-medium', theme.accentMedium);
  root.style.setProperty('--accent-subtle', theme.accentLight);

  root.style.setProperty('--text-primary', theme.textPrimary);
  root.style.setProperty('--text-secondary', theme.textSecondary);
  root.style.setProperty('--text-tertiary', theme.textTertiary);

  root.style.setProperty('--border', theme.border);
  root.style.setProperty('--border-strong', theme.borderStrong);
  root.style.setProperty('--border-accent', theme.accentMedium);

  root.style.setProperty('--shadow-md', theme.shadow);

  // Update body bg for outer frame area
  document.body.style.backgroundColor = theme.bgBase;
}

export function ThemeProvider({ children }: { children: ReactNode }) {
  const [themeId, setThemeId] = useState<string>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved && themes[saved]) return saved;
    } catch { /* ignore */ }
    return 'default';
  });

  const theme = themes[themeId] || themes['default'];

  // Apply CSS vars on mount and theme change
  useEffect(() => {
    applyThemeCSSVars(theme);
  }, [theme]);

  const setThemeById = useCallback((id: string) => {
    if (themes[id]) {
      setThemeId(id);
      try {
        localStorage.setItem(STORAGE_KEY, id);
      } catch { /* ignore */ }
    }
  }, []);

  return (
    <ThemeContext.Provider value={{ theme, setThemeById, allThemes: themeList }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme(): ThemeContextType {
  const ctx = useContext(ThemeContext);
  if (!ctx) throw new Error('useTheme must be used inside ThemeProvider');
  return ctx;
}
