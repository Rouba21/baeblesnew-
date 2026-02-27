import { useTheme } from '@/hooks/useTheme';

export function ThemeToggle() {
  // Initialize theme on mount
  useTheme();
  return null;
}
