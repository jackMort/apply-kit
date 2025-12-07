import { useState, useEffect } from 'react';

export type Theme = 'light' | 'dark' | 'system';

export function useTheme() {
  const [theme, setTheme] = useState<Theme>(() => {
    if (typeof window === 'undefined') return 'system';
    return (localStorage.getItem('theme') as Theme) || 'system';
  });

  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    const root = document.documentElement;
    const systemDark = window.matchMedia('(prefers-color-scheme: dark)');

    const applyTheme = () => {
      const dark = theme === 'dark' || (theme === 'system' && systemDark.matches);
      setIsDark(dark);
      root.classList.toggle('dark', dark);
    };

    applyTheme();

    if (theme === 'system') {
      systemDark.addEventListener('change', applyTheme);
      return () => systemDark.removeEventListener('change', applyTheme);
    }
  }, [theme]);

  const setAndSave = (newTheme: Theme) => {
    setTheme(newTheme);
    localStorage.setItem('theme', newTheme);
  };

  const toggle = () => {
    setAndSave(isDark ? 'light' : 'dark');
  };

  return { theme, setTheme: setAndSave, isDark, toggle };
}
