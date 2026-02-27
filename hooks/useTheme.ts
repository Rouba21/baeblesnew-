import { useEffect, useState } from 'react';

export type ThemeMode = 'auto' | 'dark' | 'light';

const STORAGE_KEY = 'baebles_theme_mode';

export function useTheme() {
  const [themeMode, setThemeMode] = useState<ThemeMode>(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    return (saved as ThemeMode) || 'auto';
  });

  useEffect(() => {
    const applyTheme = (mode: ThemeMode) => {
      if (mode === 'auto') {
        const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
        document.documentElement.classList.toggle('dark', systemPrefersDark);
      } else {
        document.documentElement.classList.toggle('dark', mode === 'dark');
      }
    };

    applyTheme(themeMode);
    localStorage.setItem(STORAGE_KEY, themeMode);

    // Listen for system preference changes when in auto mode
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    const handleChange = () => {
      if (themeMode === 'auto') {
        document.documentElement.classList.toggle('dark', mediaQuery.matches);
      }
    };

    mediaQuery.addEventListener('change', handleChange);
    return () => mediaQuery.removeEventListener('change', handleChange);
  }, [themeMode]);

  return { themeMode, setThemeMode };
}
