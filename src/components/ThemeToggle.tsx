
import React from 'react';
import { useCipher } from '../context/CipherContext';
import { Moon, Sun } from 'lucide-react';

const ThemeToggle: React.FC = () => {
  const { isDarkMode, setIsDarkMode } = useCipher();

  const toggleTheme = () => {
    const newMode = !isDarkMode;
    setIsDarkMode(newMode);
    document.documentElement.classList.toggle('dark', newMode);
  };

  return (
    <button
      onClick={toggleTheme}
      className="p-2 rounded-full bg-secondary/50 hover:bg-secondary/80 transition-colors duration-200"
      aria-label={isDarkMode ? 'Switch to light mode' : 'Switch to dark mode'}
    >
      {isDarkMode ? (
        <Sun className="h-5 w-5 text-foreground" />
      ) : (
        <Moon className="h-5 w-5 text-foreground" />
      )}
    </button>
  );
};

export default ThemeToggle;
