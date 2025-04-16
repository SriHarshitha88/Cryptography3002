
import React from 'react';
import { useCipher } from '../../context/CipherContext';

const RailFenceVisualization: React.FC = () => {
  const { settings, inputText, operation } = useCipher();
  const rails = settings.rails || 3;
  const text = inputText.slice(0, 30); // Limit to 30 chars for visualization

  // Create the rail fence pattern
  const pattern: { char: string; isActive: boolean }[][] = Array(rails)
    .fill(null)
    .map(() => Array(text.length).fill({ char: '', isActive: false }));

  let rail = 0;
  let direction = 1;

  // Fill in the pattern
  for (let i = 0; i < text.length; i++) {
    pattern[rail][i] = { char: text[i], isActive: true };

    rail += direction;

    if (rail === 0 || rail === rails - 1) {
      direction *= -1;
    }
  }

  // For encrypt, show plaintext in zigzag
  // For decrypt, show ciphertext in straight lines
  const displayPattern = operation === 'encrypt' ? pattern : [];

  if (operation === 'decrypt') {
    let index = 0;
    // This is a simplification - actual decryption is more complex
    for (let r = 0; r < rails; r++) {
      for (let c = 0; c < text.length; c++) {
        if (pattern[r][c].isActive && index < text.length) {
          pattern[r][c] = { char: text[index++], isActive: true };
        }
      }
    }
    for (let r = 0; r < rails; r++) {
      const row = pattern[r].filter(cell => cell.isActive);
      if (row.length > 0) {
        displayPattern.push(row);
      }
    }
  }

  return (
    <div className="p-4 bg-muted/30 rounded-lg animate-fade-in">
      <h3 className="text-sm font-medium mb-4">Rail Fence Visualization</h3>

      <div className="overflow-x-auto pb-2">
        <div className="min-w-max">
          {displayPattern.map((row, railIndex) => (
            <div key={railIndex} className="flex mb-1">
              {row.map((cell, colIndex) => (
                <div
                  key={`${railIndex}-${colIndex}`}
                  className={`w-8 h-8 flex items-center justify-center text-sm font-mono mx-0.5 rounded ${
                    cell.isActive 
                      ? 'bg-primary/10 border border-primary/20' 
                      : 'bg-transparent'
                  }`}
                >
                  {cell.char}
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>

      <div className="text-xs text-muted-foreground mt-2">
        {operation === 'encrypt' 
          ? 'Text is arranged in a zigzag pattern across rails' 
          : 'Text is read off in rows to form plaintext'}
      </div>
    </div>
  );
};

export default RailFenceVisualization;
