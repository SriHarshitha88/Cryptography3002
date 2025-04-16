
import React from 'react';
import { CipherType, cipherInfo, useCipher } from '../context/CipherContext';
import { ChevronDown } from 'lucide-react';

const CipherSelector: React.FC = () => {
  const { selectedCipher, setSelectedCipher, resetSettings } = useCipher();

  const handleCipherChange = (cipher: CipherType) => {
    setSelectedCipher(cipher);
    resetSettings();
  };

  return (
    <div className="w-full">
      <div className="relative">
        <select
          value={selectedCipher}
          onChange={(e) => handleCipherChange(e.target.value as CipherType)}
          className="cipher-select w-full appearance-none pr-10 cursor-pointer"
          aria-label="Select Cipher"
        >
          {Object.entries(cipherInfo).map(([type, info]) => (
            <option key={type} value={type}>
              {info.name}
            </option>
          ))}
        </select>
        <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 pointer-events-none text-foreground/70" />
      </div>
      <p className="mt-2 text-sm text-muted-foreground">
        {cipherInfo[selectedCipher].description}
      </p>
    </div>
  );
};

export default CipherSelector;
