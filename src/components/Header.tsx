import { Moon, Sun, Download } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Button } from './ui/button';
import { useTheme } from '@/contexts/ThemeContext';
import { usePWA } from '@/hooks/usePWA';
import { APP_CONFIG } from '@/config/app';
import { analytics } from '@/lib/analytics';

export const Header = () => {
  const { isDark, toggleTheme } = useTheme();
  const { isInstallable, installApp } = usePWA();

  const handleThemeToggle = () => {
    toggleTheme();
    analytics.track({
      action: 'toggle_theme',
      category: 'engagement',
      label: isDark ? 'light' : 'dark'
    });
  };

  const handleInstall = () => {
    installApp();
    analytics.track({
      action: 'install_app',
      category: 'engagement',
      label: 'header_button'
    });
  };

  return (
    <header className="bg-card shadow-sm border-b">
      <div className="container mx-auto px-4 py-6 flex justify-between items-center">
        <Link to="/" className="text-2xl font-bold text-card-foreground hover:text-primary transition-colors">
          {APP_CONFIG.name}
        </Link>
        <div className="flex items-center gap-4">
          {isInstallable && (
            <Button
              variant="outline"
              size="sm"
              onClick={handleInstall}
              className="gap-2 hidden sm:flex"
            >
              <Download className="h-4 w-4" />
              Install App
            </Button>
          )}
          <Button
            variant="outline"
            size="sm"
            onClick={handleThemeToggle}
            className="gap-2"
          >
            {isDark ? (
              <>
                <Sun className="h-4 w-4" />
                <span className="hidden sm:inline">Light</span>
              </>
            ) : (
              <>
                <Moon className="h-4 w-4" />
                <span className="hidden sm:inline">Dark</span>
              </>
            )}
          </Button>
        </div>
      </div>
    </header>
  );
};
