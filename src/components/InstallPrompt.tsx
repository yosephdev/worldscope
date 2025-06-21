import { useState } from 'react';
import { Download, X } from 'lucide-react';
import { Button } from './ui/button';
import { usePWA } from '@/hooks/usePWA';

export const InstallPrompt = () => {
  const [dismissed, setDismissed] = useState(false);
  const { isInstallable, installApp } = usePWA();

  if (!isInstallable || dismissed) return null;

  return (
    <div className="fixed bottom-4 left-4 right-4 md:left-auto md:right-4 md:max-w-sm bg-card border rounded-lg shadow-lg p-4 z-50">
      <div className="flex items-start gap-3">
        <Download className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
        <div className="flex-1">
          <h3 className="font-semibold text-sm text-card-foreground">
            Install WorldScope
          </h3>
          <p className="text-xs text-muted-foreground mt-1">
            Get quick access and offline support
          </p>
          <div className="flex gap-2 mt-3">
            <Button size="sm" onClick={installApp}>
              Install
            </Button>
            <Button 
              size="sm" 
              variant="ghost" 
              onClick={() => setDismissed(true)}
            >
              Later
            </Button>
          </div>
        </div>
        <Button
          size="sm"
          variant="ghost"
          className="p-1 h-auto"
          onClick={() => setDismissed(true)}
        >
          <X className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
};