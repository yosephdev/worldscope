
import { Moon, Sun } from 'lucide-react';
import { useTheme } from '../contexts/ThemeContext';

const Header = () => {
  const { isDark, toggleTheme } = useTheme();

  return (
    <header className="bg-card shadow-md border-b">
      <div className="container mx-auto px-4 py-6 flex justify-between items-center">
        <h1 className="text-xl md:text-2xl font-bold font-nunito">
          Where in the world?
        </h1>
        <button
          onClick={toggleTheme}
          className="flex items-center gap-2 text-sm font-semibold hover:text-muted-foreground transition-colors"
          aria-label="Toggle theme"
        >
          {isDark ? <Sun size={16} /> : <Moon size={16} />}
          {isDark ? 'Light Mode' : 'Dark Mode'}
        </button>
      </div>
    </header>
  );
};

export default Header;
