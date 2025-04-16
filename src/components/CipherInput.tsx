
import React from 'react';
import { useCipher } from '../context/CipherContext';
import { ArrowRightLeft } from 'lucide-react';
import CopyButton from './ui/copy-button';

const CipherInput: React.FC = () => {
  const { 
    inputText, 
    setInputText, 
    outputText, 
    encryptText, 
    decryptText, 
    operation, 
    setOperation 
  } = useCipher();

  const handleProcess = () => {
    if (operation === 'encrypt') {
      encryptText();
    } else {
      decryptText();
    }
  };

  const toggleOperation = () => {
    setOperation(prev => prev === 'encrypt' ? 'decrypt' : 'encrypt');
  };

  // The copy function is now handled by the CopyButton component

  return (
    <div className="grid gap-6 w-full">
      <div className="space-y-2">
        <div className="flex justify-between">
          <label htmlFor="input-text" className="text-sm font-medium">
            {operation === 'encrypt' ? 'Plaintext' : 'Ciphertext'}
          </label>
          <span className="text-xs text-muted-foreground">
            {inputText.length} characters
          </span>
        </div>
        <div className="relative">
          <textarea
            id="input-text"
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            placeholder={operation === 'encrypt' 
              ? 'Enter text to encrypt...' 
              : 'Enter text to decrypt...'}
            className="cipher-input min-h-32"
            rows={5}
          />
          {inputText && (
            <CopyButton 
              value={inputText} 
              className="absolute top-2 right-2" 
            />
          )}
        </div>
      </div>

      <div className="flex flex-col items-center gap-3">
        <button
          onClick={toggleOperation}
          className="cipher-button px-4 py-2 bg-muted hover:bg-muted/80 flex items-center gap-2 text-sm"
          aria-label="Toggle between encrypt and decrypt"
        >
          <ArrowRightLeft className="h-4 w-4" />
          <span>
            {operation === 'encrypt' ? 'Switch to Decrypt' : 'Switch to Encrypt'}
          </span>
        </button>
        
        <button
          onClick={handleProcess}
          disabled={!inputText}
          className="cipher-button px-6 py-2.5 bg-primary text-primary-foreground hover:bg-primary/90 w-full max-w-xs font-medium"
        >
          {operation === 'encrypt' ? 'Encrypt' : 'Decrypt'}
        </button>
      </div>

      <div className="space-y-2">
        <div className="flex justify-between">
          <label htmlFor="output-text" className="text-sm font-medium">
            {operation === 'encrypt' ? 'Ciphertext' : 'Plaintext'}
          </label>
          <span className="text-xs text-muted-foreground">
            {outputText.length} characters
          </span>
        </div>
        <div className="relative">
          <textarea
            id="output-text"
            value={outputText}
            readOnly
            placeholder="Result will appear here..."
            className="cipher-input min-h-32 bg-muted/30"
            rows={5}
          />
          {outputText && (
            <CopyButton 
              value={outputText} 
              className="absolute top-2 right-2" 
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default CipherInput;
