import React, { useEffect } from 'react';
import { useCipher } from '../context/CipherContext';
import ThemeToggle from './ThemeToggle';
import CipherSelector from './CipherSelector';
import CipherSettings from './CipherSettings';
import CipherInput from './CipherInput';
import CipherVisualization from './CipherVisualizations';
import { KeySquare, Shield, Info } from 'lucide-react';

const CipherApp: React.FC = () => {
  const { isDarkMode } = useCipher();

  useEffect(() => {
    document.documentElement.classList.toggle('dark', isDarkMode);
  }, [isDarkMode]);

  return (
    <div className="bg-background text-foreground transition-colors duration-200">
      <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
        {/* Sidebar with cipher selection and settings */}
        <div className="md:col-span-4 space-y-6">
          <div className="cipher-card p-5">
            <div className="flex items-center space-x-2 mb-4">
              <Shield className="h-5 w-5 text-primary" />
              <h2 className="text-lg font-semibold">Cipher Selection</h2>
            </div>
            <CipherSelector />
          </div>
          
          <CipherSettings />

          <div className="cipher-card p-5">
            <div className="flex items-center space-x-2 mb-2">
              <Info className="h-5 w-5 text-primary" />
              <h2 className="text-lg font-semibold">About Ciphers</h2>
            </div>
            <p className="text-sm text-muted-foreground">
              Classical ciphers are cryptographic techniques used throughout history to encode 
              messages. They range from simple substitution ciphers to more complex transposition 
              methods. While not secure by modern standards, they form the foundation of 
              cryptography and provide valuable insights into encryption principles.
            </p>
          </div>
        </div>

        {/* Main content with input/output and visualization */}
        <div className="md:col-span-8 space-y-6">
          <CipherInput />
          <CipherVisualization />
        </div>
      </div>
    </div>
  );
};

export default CipherApp;
