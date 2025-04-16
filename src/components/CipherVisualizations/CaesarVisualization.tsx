
import React from 'react';
import { useCipher } from '../../context/CipherContext';

const CaesarVisualization: React.FC = () => {
  const { settings } = useCipher();
  const shift = settings.shift || 0;

  // Create two alphabets - original and shifted
  const alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('');
  const shiftedAlphabet = [
    ...alphabet.slice(shift % 26),
    ...alphabet.slice(0, shift % 26)
  ];

  return (
    <div className="p-4 bg-muted/30 rounded-lg animate-fade-in">
      <h3 className="text-sm font-medium mb-4">Caesar Cipher Visualization</h3>
      
      <div className="space-y-6">
        <div className="relative">
          <div className="flex justify-center">
            <div className="w-[300px] h-[300px] bg-primary/5 rounded-full relative border border-primary/20 animate-rotate-slow flex items-center justify-center">
              <div className="w-[250px] h-[250px] bg-background rounded-full flex items-center justify-center">
                <div className="text-center">
                  <div className="text-2xl font-semibold cipher-gradient">Shift {shift}</div>
                  <div className="text-sm text-muted-foreground">
                    {shift > 0 ? `${shift} positions forward` : 'No shift'}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        <div className="flex flex-col space-y-2 overflow-x-auto">
          <div className="flex space-x-2 justify-center">
            {alphabet.map((letter, i) => (
              <div 
                key={`orig-${i}`} 
                className="w-8 h-8 flex items-center justify-center text-sm font-mono border border-primary/20 rounded-md bg-primary/5"
              >
                {letter}
              </div>
            ))}
          </div>
          <div className="flex space-x-2 justify-center">
            {shiftedAlphabet.map((letter, i) => (
              <div 
                key={`shifted-${i}`} 
                className="w-8 h-8 flex items-center justify-center text-sm font-mono border border-secondary/30 rounded-md bg-secondary/5"
              >
                {letter}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CaesarVisualization;
